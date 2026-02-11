# Product Requirements Document
## RPM Rockies Unified Operations Platform
### Prototype Dashboard for Jarid Sinkler

---

## Executive Summary

This PRD outlines a prototype dashboard demonstrating a unified operations platform for Real Property Management of the Rockies. The goal is to show Jarid what "everything connected in one place" actually looks like — replacing Rent Engine, eliminating manual reporting, and giving his team a single source of truth.

**This is not a spec for production.** This is a visualization prototype to help Jarid see the vision and understand what he'd be getting.

---

## The Problem We're Solving

Based on discovery conversations, RPM Rockies currently experiences:

| Pain Point | Current State | Impact |
|------------|---------------|--------|
| Disconnected tools | AppFolio + Rent Engine + manual processes | Team is the "middleware" — copying/pasting between systems |
| Manual owner reporting | Click-export-email for each property | Hours wasted weekly, inconsistent communication |
| No positive signal on AI | Can see complaints, can't measure wins | Paying for Rent Engine without knowing ROI |
| Software fatigue | Multiple rollouts that "didn't quite work" | Low team morale, skepticism toward new tools |
| Scattered KPIs | Data lives in spreadsheets and AppFolio exports | No real-time visibility into operations |
| Website widget limitations | Rent Engine or clunky AppFolio embed | Poor first impression for prospective tenants |

**The core insight:** Jarid doesn't need another tool. He needs a **system architect** — someone to connect everything and build a unified layer that works exactly how his business operates.

---

## Product Vision

### One Sentence
> "The single screen that runs RPM Rockies — everything connected, nothing manual, fully owned."

### What This Replaces
- Rent Engine subscription (voice AI, widget, reporting)
- Manual owner report generation
- Scattered KPI tracking in spreadsheets
- Multiple logins and disconnected dashboards

### What Jarid Said He Wants
1. **Automated owner reporting** — "Data is there... no one should even know it's happening"
2. **Internal KPI dashboards** — "We're behind on renewals" — needs visibility
3. **Better website widget** — "Couldn't we just have a better widget?"
4. **Voice AI with measurable outcomes** — "How do you measure whether it was a good interaction?"
5. **Accountability layer** — "You can't hide... it's just going to go"

---

## Prototype Scope

### What We're Building (Prototype)
A **clickable visualization** that demonstrates:
- Unified dashboard interface
- Real-time KPI panels
- Owner reporting module
- Leasing pipeline view
- Team performance metrics
- Automated report preview
- System integration indicators

### What We're NOT Building (Yet)
- Actual AppFolio API integration
- Live data connections
- Functional voice AI
- Production-ready code

**Purpose:** Help Jarid visualize the end state and understand the value before committing to a full build.

---

## User Personas

### Primary: Jarid Sinkler (Owner/Operator)
**Needs to see:**
- High-level business health at a glance
- Owner communication status
- Team accountability metrics
- ROI on AI investments
- Confidence that this replaces Rent Engine

**Key question in his mind:** "Will this actually work, or is this another software promise?"

### Secondary: Property Managers (Team)
**Needs to see:**
- Their portfolio status
- Tasks and priorities
- Renewal deadlines
- Lead response metrics

**Key question:** "Is this going to make my job easier or harder?"

### Tertiary: Property Owners (Clients)
**Needs to see:**
- Property performance reports
- Leasing activity
- Financial summary

**Key question:** "Is my property being managed well?"

---

## Dashboard Architecture

### Navigation Structure

```
RPM ROCKIES COMMAND CENTER
│
├── 🏠 Overview (Default Landing)
│   ├── KPI Summary Cards
│   ├── Activity Feed
│   ├── Alerts & Attention Items
│   └── Quick Actions
│
├── 📊 Portfolio Performance
│   ├── All Properties Grid
│   ├── Vacancy Report
│   ├── Rent Roll Summary
│   └── Maintenance Overview
│
├── 🔄 Leasing Pipeline
│   ├── Lead Funnel Visualization
│   ├── Active Inquiries
│   ├── Showings Scheduled
│   ├── Applications in Progress
│   └── Response Time Metrics
│
├── 📋 Renewals Center
│   ├── Upcoming Renewals (30/60/90 day)
│   ├── Renewal Status Tracker
│   ├── At-Risk Tenants
│   └── Renewal Rate Trends
│
├── 👥 Owner Communications
│   ├── Report Queue
│   ├── Sent Reports Log
│   ├── Owner Portal Preview
│   └── Auto-Report Settings
│
├── 🤖 AI Performance
│   ├── Call Volume & Outcomes
│   ├── Positive vs Negative Signals
│   ├── Resolution Rate
│   └── Human Escalation Log
│
├── 👤 Team Performance
│   ├── Property Manager Scorecards
│   ├── Response Time Leaderboard
│   ├── Task Completion Rates
│   └── Workload Distribution
│
└── ⚙️ System Health
    ├── Integration Status (AppFolio, etc.)
    ├── Automation Logs
    ├── Error Alerts
    └── Data Sync Status
```

---

## Screen-by-Screen Specifications

### 1. Overview Dashboard (Landing Page)

**Purpose:** Give Jarid a 10-second health check on the entire business.

#### KPI Summary Cards (Top Row)
| Card | Metric | Visual | Data Note |
|------|--------|--------|-----------|
| Total Doors | 847 | Large number | Pull from AppFolio |
| Vacancy Rate | 4.2% | Percentage + trend arrow | Calculate from occupied/total |
| Leasing Pipeline | $284K | Dollar value | Sum of potential rent from active leads |
| Avg Response Time | 12 min | Time + color indicator | Green <15min, Yellow 15-60, Red >60 |
| Renewals Due (30 days) | 23 | Count + urgency color | From lease end dates |
| Owner Reports Sent | 142/156 | Fraction + progress bar | This week's auto-sends |

#### Activity Feed (Left Column)
Real-time stream showing:
- "Lead qualified — 123 Main St — 3 min ago"
- "Renewal signed — Unit 4B, Oak Apartments — 1 hour ago"
- "Maintenance completed — 456 Elm St — 2 hours ago"
- "Owner report sent — Johnson Portfolio (12 properties) — Auto"
- "AI call resolved — Rent inquiry — No escalation needed"

#### Alerts & Attention Items (Right Column)
- 🔴 "3 leads with no response >2 hours"
- 🟡 "7 renewals expiring in <14 days — no contact"
- 🟡 "Owner report failed to send — Smith Property"
- 🟢 "All systems operational"

#### Quick Actions (Bottom)
- "Generate Owner Report"
- "View Leasing Pipeline"
- "Check AI Performance"
- "Team Scorecard"

---

### 2. Leasing Pipeline

**Purpose:** Replace Rent Engine's funnel visualization with something better.

#### Funnel Visualization
```
INQUIRIES          SHOWINGS          APPLICATIONS        APPROVED          LEASED
   127       →        43         →        18          →      12       →      8
  (100%)            (34%)              (14%)              (9%)            (6%)
                                                                    
  This Week: +31    This Week: +12    This Week: +5     This Week: +3   This Week: +2
```

#### Lead Source Breakdown
| Source | Leads | Conversion | Avg Response Time |
|--------|-------|------------|-------------------|
| Zillow | 52 | 7.2% | 8 min |
| Website | 34 | 9.1% | 11 min |
| Apartments.com | 28 | 5.4% | 14 min |
| Phone (AI Answered) | 13 | 12.3% | Instant |

#### Active Leads Table
| Property | Lead Name | Source | Status | Response Time | Assigned To | Next Action |
|----------|-----------|--------|--------|---------------|-------------|-------------|
| 123 Main St | Sarah M. | Zillow | Showing Scheduled | 4 min | Maria | Tomorrow 2pm |
| 456 Oak Ave | James T. | Website | Awaiting Response | 🔴 3 hours | Unassigned | URGENT |
| 789 Pine Dr | Lisa K. | AI Call | Application Sent | Instant | Auto | Awaiting docs |

---

### 3. Owner Communications Center

**Purpose:** Show how owner reporting becomes automatic.

#### Auto-Report Status
```
THIS WEEK'S REPORTS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Sent Successfully:     142  ████████████████████░░░░  91%
Scheduled (Pending):    11  ██░░░░░░░░░░░░░░░░░░░░░░   7%
Failed (Needs Review):   3  ░░░░░░░░░░░░░░░░░░░░░░░░   2%
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

#### Report Preview
Visual mockup of what owners receive:
```
┌─────────────────────────────────────────────────────────────┐
│  RPM ROCKIES — PROPERTY PERFORMANCE REPORT                  │
│  Week of February 10, 2025                                  │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  123 MAIN STREET, FORT COLLINS                              │
│  ─────────────────────────────────                          │
│  Status: 🟢 LEASED                                          │
│  Current Tenant: Johnson, M.                                │
│  Lease Expires: August 31, 2025                             │
│  Rent: $1,850/mo (Paid Current)                             │
│                                                             │
│  THIS WEEK'S ACTIVITY                                       │
│  • No maintenance requests                                  │
│  • Rent received on time                                    │
│  • Lease renewal notice sent (180 days out)                 │
│                                                             │
│  ───────────────────────────────────                        │
│  456 OAK AVENUE, LOVELAND                                   │
│  Status: 🟡 FOR LEASE (12 days)                             │
│                                                             │
│  LEASING FUNNEL                                             │
│  Inquiries: 23 │ Showings: 8 │ Applications: 2             │
│                                                             │
│  [View Full Report Online] [Contact Your Manager]           │
└─────────────────────────────────────────────────────────────┘
```

#### Auto-Report Settings
- Frequency: Twice weekly (Tue/Fri)
- Include: Active listings, occupied status, maintenance, financials
- Format: Email + PDF attachment
- Trigger: Automatic at 8am MT

---

### 4. AI Performance Dashboard

**Purpose:** Solve Jarid's #1 complaint — "I can't measure if the AI is working."

#### Call Outcome Summary
```
LAST 30 DAYS — AI VOICE PERFORMANCE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Total Calls Handled:        847
  ├── Resolved by AI:       612  (72%) ████████████████████░░░░░░░░
  ├── Transferred to Human: 198  (23%) ██████░░░░░░░░░░░░░░░░░░░░░░
  └── Abandoned:             37  (5%)  █░░░░░░░░░░░░░░░░░░░░░░░░░░░

POSITIVE OUTCOMES (AI Resolved)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
• Showing Scheduled:        127
• Question Answered:        312
• Maintenance Logged:        89
• Payment Info Provided:     84

NEGATIVE SIGNALS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
• "Want to talk to human":   142
• Caller Frustrated:          31
• Repeat Calls (unresolved):  25

ESTIMATED VALUE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Hours Saved: 47 hrs/month
Leads Captured After-Hours: 89
Estimated Revenue Protected: $12,400/month
```

#### Sentiment Tracking
| Week | Positive | Neutral | Negative | Net Score |
|------|----------|---------|----------|-----------|
| Feb 3-9 | 64% | 24% | 12% | +52 |
| Jan 27-Feb 2 | 61% | 27% | 12% | +49 |
| Jan 20-26 | 58% | 28% | 14% | +44 |
| Trend | 📈 +6% | — | 📉 -2% | Improving |

---

### 5. Renewals Center

**Purpose:** Give visibility into the renewal pipeline Jarid mentioned.

#### Renewal Timeline View
```
RENEWALS BY URGENCY
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🔴 CRITICAL (0-14 days)     7 units     $12,850/mo at risk
🟡 URGENT (15-30 days)     16 units     $28,400/mo at risk  
🟢 UPCOMING (31-60 days)   34 units     
⚪ PLANNED (61-90 days)    52 units     

RENEWAL STATUS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Renewed:          23  ████████████░░░░░░░░  58%
In Negotiation:    8  ████░░░░░░░░░░░░░░░░  20%
No Contact Yet:    6  ███░░░░░░░░░░░░░░░░░  15%
Moving Out:        3  █░░░░░░░░░░░░░░░░░░░   7%
```

#### Renewals Table
| Property | Unit | Tenant | Lease Ends | Status | Assigned | Last Contact |
|----------|------|--------|------------|--------|----------|--------------|
| Oak Apts | 4B | Martinez | Feb 18 | 🔴 No Contact | Maria | Never |
| Pine Ct | 12 | Johnson | Feb 22 | 🟡 Negotiating | Chris | Feb 8 |
| Main St | — | Williams | Feb 28 | 🟢 Renewed | Maria | Feb 10 |

---

### 6. Team Performance Scorecards

**Purpose:** Create accountability without micromanagement.

#### Property Manager Leaderboard
| Rank | Manager | Doors | Response Time | Renewal Rate | Tasks Done | Score |
|------|---------|-------|---------------|--------------|------------|-------|
| 1 | Maria S. | 187 | 8 min | 94% | 98% | 96 |
| 2 | Chris T. | 203 | 14 min | 89% | 95% | 91 |
| 3 | Devon R. | 156 | 22 min | 86% | 87% | 84 |
| 4 | Jordan K. | 178 | 31 min | 82% | 79% | 76 |

#### Individual Scorecard View
```
MARIA SANCHEZ — PERFORMANCE DASHBOARD
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Portfolio: 187 doors across 12 owners

THIS MONTH
• Avg Response Time:     8 min  (Target: <15)  ✅
• Renewal Rate:         94%    (Target: 85%)  ✅
• Owner Reports Sent:   24/24  (100%)         ✅
• Maintenance Closed:   31/34  (91%)          ✅
• Leads Converted:      12%    (Target: 10%)  ✅

ATTENTION NEEDED
• 2 renewals expiring <14 days — no contact
• 1 maintenance request >48 hours open
```

---

### 7. System Integration Status

**Purpose:** Show that everything is connected and working.

#### Integration Health
```
CONNECTED SYSTEMS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

AppFolio          🟢 Connected    Last sync: 2 min ago
Voice AI          🟢 Active       847 calls this month
Email System      🟢 Connected    142 reports sent this week
Website Widget    🟢 Live         34 inquiries today
Calendar          🟢 Synced       Showings auto-scheduled

DATA FLOW STATUS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
AppFolio → Dashboard:      ✅ Real-time
Dashboard → Owner Reports: ✅ Automated
Website → Lead Pipeline:   ✅ Instant capture
Voice AI → CRM:            ✅ Auto-logged
```

---

## Visual Design Specifications

### Design Principles
1. **Clean, not cluttered** — Jarid's been burned by complex software
2. **Information hierarchy** — Most important metrics visible immediately
3. **Action-oriented** — Every screen should answer "what do I do next?"
4. **Trust-building** — Show system status, sync times, data freshness

### Color Palette
| Use | Color | Hex |
|-----|-------|-----|
| Primary (Brand) | Deep Blue | #1E3A5F |
| Accent | Gold | #C9A227 |
| Success | Green | #2E7D32 |
| Warning | Amber | #F9A825 |
| Critical | Red | #C62828 |
| Background | Light Gray | #F5F7FA |
| Cards | White | #FFFFFF |
| Text Primary | Dark Gray | #212121 |
| Text Secondary | Medium Gray | #666666 |

### Typography
- **Headers:** Inter Bold
- **Body:** Inter Regular
- **Numbers/Metrics:** Inter Medium (tabular figures)
- **Monospace (data):** JetBrains Mono

### Component Patterns
- **Cards:** White background, subtle shadow, 8px border radius
- **Status Indicators:** Colored dots (🟢🟡🔴) + text labels
- **Progress Bars:** Rounded, filled with gradient
- **Tables:** Alternating row colors, hover states, sortable columns
- **Charts:** Clean lines, minimal gridlines, clear legends

---

## Prototype Deliverables

### Phase 1: Static Mockups (This Week)
- [ ] Overview Dashboard (Figma or built in code)
- [ ] Leasing Pipeline view
- [ ] Owner Report preview
- [ ] AI Performance dashboard

### Phase 2: Clickable Prototype
- [ ] Navigation between screens
- [ ] Hover states and interactions
- [ ] Sample data that feels real
- [ ] Mobile-responsive preview

### Phase 3: Live Demo Version (If Engagement Proceeds)
- [ ] Hosted prototype URL
- [ ] Fake data that updates
- [ ] Interactive filters
- [ ] Export/report generation preview

---

## Success Metrics for Prototype

The prototype is successful if Jarid:

1. **Sees himself in it** — "That's exactly what I need"
2. **Understands the value** — Can articulate what this replaces
3. **Feels confidence** — Believes this could actually work
4. **Wants to move forward** — Asks "how do we start?" or "what's next?"

---

## Appendix: Jarid's Exact Words (From Discovery Call)

Quotes to design around:

> "I'd rather just turn it off... AppFolio has all the data."

→ Show AppFolio as the data source, not a competitor

> "No one should even know it's happening... it's just going to be distributed."

→ Emphasize automation, zero-touch workflows

> "How do you measure whether it was a good interaction?"

→ AI Performance dashboard with clear positive/negative signals

> "Here's your data in Excel... that doesn't look great."

→ Beautiful, visual reports that owners actually understand

> "Accountability layer... you can't hide."

→ Team scorecards with transparent metrics

> "Bait and switch... not quite what you thought."

→ Clean, honest design. No feature bloat. Does exactly what it shows.

---

## Next Steps

1. **Build Overview + 2-3 key screens** as visual prototype
2. **Share with Jarid** after February 12th meeting (or during, if timing works)
3. **Gather feedback** on what resonates vs. what's missing
4. **Scope Phase 1 build** based on his priorities

---

*This PRD is a living document. Update based on February 12th meeting discoveries.*
