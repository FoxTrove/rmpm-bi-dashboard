import Anthropic from "@anthropic-ai/sdk";

export interface BriefingData {
  greeting: string;
  attentionItems: {
    level: "critical" | "warning";
    category: string;
    title: string;
    detail: string;
    link?: string;
  }[];
  wins: {
    title: string;
    detail: string;
  }[];
  teamFocus: {
    person: string;
    priority: "critical" | "warning";
    tasks: string[];
  }[];
  snapshot: {
    label: string;
    value: string;
    sub: string;
    good: boolean;
  }[];
}

interface PortfolioSnapshot {
  totalProperties: number;
  totalUnits: number;
  occupiedUnits: number;
  vacantUnits: number;
  vacancyRate: string;
  totalMonthlyRent: number;
  criticalRenewals: number;
  urgentRenewals: number;
  totalRenewals30d: number;
  activeLeads: number;
  propertiesWithHighVacancy: string[];
  topLeadSources: string[];
}

const SYSTEM_PROMPT = `You are an AI property management assistant for Rocky Mountain Property Management. Generate a JSON morning briefing for the owner/operator based on the real portfolio data provided.

Your response MUST be valid JSON matching this exact structure:
{
  "greeting": "A personalized 2-3 sentence morning greeting addressing Jarid. Reference specific numbers from the data — occupancy, vacancy, notable trends. Keep it warm but professional.",
  "attentionItems": [
    {
      "level": "critical" or "warning",
      "category": "Leasing" or "Renewals" or "Maintenance" or "Collections",
      "title": "Short headline",
      "detail": "1-2 sentences with specific property names, unit numbers, dollar amounts from the data"
    }
  ],
  "wins": [
    {
      "title": "Short win headline",
      "detail": "1-2 sentences with specific numbers"
    }
  ],
  "teamFocus": [
    {
      "person": "Team member name",
      "priority": "critical" or "warning",
      "tasks": ["Specific actionable task with property/unit references"]
    }
  ],
  "snapshot": [
    {
      "label": "Metric name",
      "value": "The value",
      "sub": "Context or comparison",
      "good": true/false
    }
  ]
}

Rules:
- Generate 2-4 attention items based on the data (critical renewals, vacant units, etc.)
- Generate 1-3 wins (positive metrics, improvements)
- Generate 2-4 team focus areas with realistic team member names
- Generate 5-6 snapshot metrics
- Use REAL property names and numbers from the data provided
- Be specific — reference actual vacancy rates, rent amounts, property names
- Attention items should focus on revenue at risk
- Return ONLY the JSON object, no markdown or code fences`;

export async function generateBriefing(
  snapshot: PortfolioSnapshot
): Promise<BriefingData> {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    throw new Error("ANTHROPIC_API_KEY not configured");
  }

  const client = new Anthropic({ apiKey });

  const userPrompt = `Here is today's portfolio data for Rocky Mountain Property Management:

Total Properties: ${snapshot.totalProperties}
Total Units: ${snapshot.totalUnits}
Occupied Units: ${snapshot.occupiedUnits}
Vacant Units: ${snapshot.vacantUnits}
Vacancy Rate: ${snapshot.vacancyRate}%
Total Monthly Rent: $${snapshot.totalMonthlyRent.toLocaleString()}
Critical Renewals (0-14 days): ${snapshot.criticalRenewals}
Urgent Renewals (15-30 days): ${snapshot.urgentRenewals}
Total Renewals Due in 30 Days: ${snapshot.totalRenewals30d}
Active Leads in Pipeline: ${snapshot.activeLeads}
Properties with High Vacancy (>7%): ${snapshot.propertiesWithHighVacancy.join(", ") || "None"}
Top Lead Sources: ${snapshot.topLeadSources.join(", ") || "N/A"}

Generate the morning briefing JSON.`;

  const message = await client.messages.create({
    model: "claude-haiku-4-5-20251001",
    max_tokens: 2048,
    temperature: 0.3,
    messages: [
      { role: "user", content: userPrompt },
    ],
    system: SYSTEM_PROMPT,
  });

  const textBlock = message.content.find((b) => b.type === "text");
  if (!textBlock || textBlock.type !== "text") {
    throw new Error("No text response from Claude");
  }

  // Parse JSON — strip any markdown fences if present
  let jsonStr = textBlock.text.trim();
  if (jsonStr.startsWith("```")) {
    jsonStr = jsonStr.replace(/^```(?:json)?\n?/, "").replace(/\n?```$/, "");
  }

  const parsed = JSON.parse(jsonStr) as BriefingData;
  return parsed;
}
