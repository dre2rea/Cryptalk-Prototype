# Cryptalk v2.0 Design Prototype

This is a **throwaway design exploration project** — not the production codebase. The goal is to rapidly prototype UI concepts for the Cryptalk v2.0 redesign and generate visual artifacts that can be shared with stakeholders and referenced during production implementation.

Nothing built here will be deployed or merged into the main repo. Speed and visual fidelity matter more than code quality.

## What Cryptalk Is

Korean cryptocurrency insights platform targeting retail traders. Currently live at v1.5. We're redesigning the home screen and key flows based on user research that says:

- Users want **curation, not customization** — show them what matters, don't make them configure tools
- The biggest gap is **context** ("why is this coin moving?"), not more data points
- Telegram is the real competitor — anything slower or less contextual than Telegram won't retain users
- 종목 골라보기 (coin screener) is the strongest existing feature, but users engage with pre-built filters, not custom setups
- Community exists but was buried too deep — users didn't even know it was there

## Stack

- Next.js (App Router), TypeScript, Tailwind CSS
- This prototype does NOT use Feature-Sliced Design — flat structure is fine
- All data is **mock data** hardcoded in the components or in a `/data` folder
- No API calls, no auth, no backend

## Design Direction

Cryptalk's visual identity: **dark theme, crypto-native, clean but information-dense**. Reference the existing production UI for color palette and general tone. The redesign aims to feel more curated and editorially structured — less "data dashboard", more "daily briefing".

Key UI elements being explored:
- Card-based vertical layout for the home screen
- AI 현황 요약 (market context summary) as the lead element
- 상승종목 / 하락종목 / 실시간 검색 상위 as quick-scan cards
- 주요 종목 가격 정보 (condensed from v1.5's full price table)
- 뉴스 card (contextualized, not just headline aggregation)
- KOL 관심도 / SNS 센티먼트 / 최신 커뮤니티 글 as social signal cards
- Global-level community access (not buried inside individual coin pages)



## How to Work With Me

I'm a UX designer exploring these concepts through code. I can read and modify frontend code but I'm not an experienced developer.

- **Show, don't ask.** When I describe a UI idea, build it. Don't ask clarifying questions unless the request is genuinely ambiguous. Bias toward producing something I can see and react to.
- **One component at a time.** Build each card/widget as a self-contained component I can view in isolation, then compose into full layouts.
- **Mock data should feel real.** Use actual Korean crypto terminology, realistic coin names (비트코인, 이더리움, 솔라나, etc.), plausible price data, Korean-language UI text. Placeholder text like "Lorem ipsum" or "Coin A" kills the ability to evaluate a design.
- **Visual fidelity matters.** This is for redesign explorations. Polish the UI — spacing, typography, color, micro-interactions. Don't cut corners on visual details just because it's a prototype.
- **Dark theme by default.** Background should be dark (near-black, not pure #000). Use the existing Cryptalk palette as a starting point: dark backgrounds, subtle borders, green/red for price movement, muted text hierarchy.
- **Mobile-responsive.** Cryptalk is primarily used on mobile. Design for ~390px width. 
- **Korean UI text.** All user-facing labels, headers, and content should be in Korean. Code (variable names, comments) can be in English.


## When I Give Feedback

I'll often react to what you built and ask for changes. When I do:
- Apply the feedback to the existing component — don't rebuild from scratch unless I say so
- If my feedback conflicts with an earlier decision, follow the latest instruction
- If I say "이건 좀 아닌 것 같아" or similar vague reactions, ask me what specifically feels off before changing things

## File Structure

Keep it simple:

```
app/
  page.tsx          — home screen layout composing all cards
  layout.tsx        — root layout with global styles
components/
  MarketSummary.tsx
  TopMovers.tsx
  PriceTable.tsx
  NewsCard.tsx
  SocialSignals.tsx
  CommunityPreview.tsx
  [etc.]
data/
  mockData.ts       — all mock data in one place
```

No need for deeper nesting, barrel exports, or architectural patterns. If a component file gets too long, split it — that's the only rule.

## Things NOT to Do

- Don't set up testing, linting, CI/CD, or any infra beyond what `create-next-app` gives you
- Don't build routing between pages unless I specifically ask for a detail view
- Don't abstract prematurely — no shared component libraries, no design token systems, no utility layers
- Don't add packages without telling me what and why — keep dependencies minimal
- Don't optimize for performance, accessibility, or SEO — this is a visual prototype only