# AppFolio API Integration

## Status: Phase 1 Implemented

**Subdomain received:** `rpmco004`
**Credentials:** Client ID + Client Secret in `app/.env.local`
**Environment variable:** `APPFOLIO_DATABASE=rpmco004`

## What's Live (Phase 1)

### API Routes
| Endpoint | Data Source | Fallback |
|----------|-----------|----------|
| `GET /api/appfolio/health` | Connectivity test | — |
| `GET /api/appfolio/renewals` | `rent_roll` + `in_progress_workflows` | Mock data |
| `GET /api/appfolio/leasing` | `prospect_source_tracking` + `rental_applications` | Mock data |
| `GET /api/appfolio/overview` | `rent_roll` aggregates | Mock data |

### Pages Updated
- **Overview** (`/`) — Total Doors, Vacancy Rate, Renewals Due KPIs from live data
- **Renewals** (`/renewals`) — Full renewal pipeline from AppFolio lease data + workflows
- **Leasing** (`/leasing`) — Funnel, lead sources, active leads from AppFolio

### Architecture
- All AppFolio API calls are **server-side only** (credentials never sent to browser)
- HTTP Basic Auth: `Authorization: Basic base64(clientId:clientSecret)`
- **Rate limiter:** Sliding window, 7 requests per 15 seconds
- **In-memory cache:** 5-minute TTL per endpoint
- **Graceful fallback:** If AppFolio is unreachable, pages render mock data with a "Demo data" warning badge
- Pages show mock data instantly on load, then swap to live data (no loading flash)

### Key Files
| File | Purpose |
|------|---------|
| `lib/appfolio/client.ts` | Server-side API client (auth, rate limiting, pagination, caching) |
| `lib/appfolio/types.ts` | AppFolio response types + dashboard data types |
| `lib/transformers/renewals.ts` | rent_roll + workflows → renewal dashboard shapes |
| `lib/transformers/leasing.ts` | prospect sources + applications → leasing shapes |
| `lib/transformers/overview.ts` | rent_roll → KPI cards |
| `hooks/useAppFolioData.ts` | Client-side fetch hook (5-min auto-refresh, fallback) |
| `components/DataSourceBadge.tsx` | "Live" / "Demo data" indicator badge |

## Vercel Deployment

Add these env vars in Vercel dashboard:
- `APPFOLIO_CLIENT_ID`
- `APPFOLIO_CLIENT_SECRET`
- `APPFOLIO_DATABASE` = `rpmco004`

## API Type: Reporting API v2

- REST / JSON, read-only
- Auth: HTTP Basic Auth (Client ID + Client Secret)
- Rate limit: 7 requests per 15 seconds (pagination exempt)
- Base URL: `https://rpmco004.appfolio.com/api/v2/reports/<report_name>.json`

## Phase 2: Owner Reporting & Financials (Next)

| Report Endpoint | Powers |
|-----------------|--------|
| `income_statement` | Owner P&L reports per property |
| `charge_detail` / `expense_distribution` | Maintenance spend YoY |
| `aged_receivable_detail` | Collections tracking |
| `receivables_activity` | Payment rates, delinquency |
| `balance_sheet` | Property-level financials |

## Phase 3: Maintenance, Map & Market Data

| Report Endpoint | Powers |
|-----------------|--------|
| `in_progress_workflows` (maintenance type) | Work order dashboard |
| Property addresses from `rent_roll` | Interactive map of all doors |
| RentCast API (separate) | Market rent comps vs actual rents |

## Credential Rotation
**Recommend Jarid rotate these credentials after integration is confirmed working** (Account > General Settings > Manage API Settings)
