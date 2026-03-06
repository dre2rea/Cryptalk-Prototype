# Cryptalk v2.0 User Research Synthesis

Research conducted Feb–Mar 2026. This document summarizes findings from a feedback survey (63 valid responses, excluding 2 test entries) and 4 in-depth user interviews (30 min each). All respondents were recruited through Mr. Choi's Telegram channels. The survey sample skews toward active Telegram users and may not represent all potential Cryptalk users.

---

## Who We Talked To

Respondents are Korean crypto investors who check information multiple times per day (83%). Experience ranges from 3–7+ years. The sample includes a mix of spot-focused investors, futures traders, and hybrid investors. All were recruited via Telegram, which is a meaningful sample bias — these are already information-heavy users embedded in the Korean crypto Telegram ecosystem.

**Primary information sources (survey, multi-select):**

- Telegram: 56/63
- Exchange apps (Upbit, Bithumb, Binance): 39/63
- Twitter/X: 34/63
- CoinNess (코인니스): 12/63
- YouTube: 11/63
- DC Inside/Coinpan: 5/63

**Key observation from interviews:** Telegram is not just one source among many — it is the central nervous system. Interviewees described monitoring 20–30+ channels daily with push alerts on key channels. Twitter serves as a secondary source (primarily for international KOL tracking). Sites like CoinNess are considered too slow relative to Telegram. 

---

## How They Engaged With Cryptalk

**Exploration depth:**

- 15+ minutes (thorough): 28/63 (43%)
- 5–15 minutes: 23/63 (35%)
- Under 5 minutes (quick scan): 14/63 (22%)

**Features actually used (multi-select):**

- 종목 골라보기 (Coin Screener): 49/63
- 대시보드 개인화 (Dashboard Personalization): 46/63
- 텔레그램 알림 (Telegram Alerts): 27/63
- 종목 토론 (Coin Discussion): 12/63

**Most useful single feature:**

- Dashboard Personalization: 31/63 (48%)
- Coin Screener: 27/63 (42%)
- Telegram Alerts: 6/63 (9%)
- Coin Discussion: 1/63 (2%)

**Features that disappointed (multi-select, excluding "none"):**

- Coin Screener: 18/63
- Community/Discussion: 17/63
- Dashboard Personalization: 12/63
- Telegram Alerts: 7/63

Note the paradox: the screener is both the most-used feature AND the most-disappointed feature. This is not contradictory — it means people saw potential but felt the execution fell short.

---

## Would Cryptalk Help Their Trading?

- "I'd use it right now": 28/63 (43%)
- "I'd use it if improved": 23/63 (35%)
- "Not sure": 13/63 (20%)
- "Wouldn't use it": 1/63 (2%)

The 35% conditional cohort is the primary audience for v2.0. They saw enough value to not dismiss Cryptalk, but not enough to adopt it. This group will likely not return for a third evaluation if v2.0 doesn't deliver.

---

## Five Core Findings

### 1. Users want curation, not customization

The screener's value is as a pre-filtered shortlist, not as a power-user filtering tool. Interview evidence:

- **Interviewee 1** (full-time trader, 7+ years): Only used the pre-built filters — 단기 과매수 and 단기 과매도. Did not create custom filters.
- **Interviewee 3** (3–4 years, spot+futures): Found the screener helpful for narrowing down entry candidates — "처음부터 내가 알아서 찾으려고 하면 막막할 수 있는데 종목 탐색을 도와줘서 좋은것 같음." But also flagged a key paradox: users advanced enough to customize technical filters probably don't need the tool, while beginners can't understand the indicators well enough to configure them.
- **Interviewee 4** (4–5 years, spot-focused): Found the screener filters overwhelming — "필터나 이런게 너무 많아서 어떻게 써야 할지 모르겠다."
- **Dashboard personalization** was rated as the most useful feature, but actual engagement was shallow: 20/31 who found it useful only adjusted settings once or twice. 4 never changed defaults at all.

**Implication:** The v2.0 home screen should lead with curated, pre-processed signals rather than configurable tools. "Here's what's interesting right now" beats "here are tools to find what's interesting."

### 2. The missing layer is "why," not "what"

The most consistent unmet need across both the survey and interviews is contextual explanation — why a coin is moving, not just that it moved.

- **Survey respondent:** "현재는 코인 가격과 변동성 지표 등 단편적인 정보 위주입니다... '이 데이터가 왜 중요한지'를 설명해 주는 맥락적 정보가 부족합니다."
- **Survey respondent:** "'왜'에 대한 부분이 없어서 선뜻 다른 사이트와 차별이 안되는데, 다른사이트가 정보는 더 많아서 굳이 크립톡을 주력으로 사용해야하나 하는 생각이 드네요."
- **Interviewee 3** (3–4 years): Described the information asymmetry between expert and retail traders — experts catch signals like arbitrage gaps and net inflow/outflow in real time, while regular investors only hear about these opportunities after the fact. "확실히 이런 데이터가 있을때 적시에 캐치하면 좋을 것 같음."
- **Interviewee 4** (4–5 years): Explicitly said the value of Telegram is not just speed of news, but that channels explain *what to do with the news* — "어떤 소식이 있을때, 이걸 빠르게 접하는 것과 이걸로 돈벌 수 있는 방법을 알려주는 건 별개."

**Feature request themes from open text (survey):**

- News/headlines/issues: 12 mentions
- Community/discussion: 12 mentions
- Chart/indicator additions: 12 mentions
- UI/UX improvements: 12 mentions
- 김프/exchange gap/price differential: 9 mentions
- Alert improvements: 9 mentions
- Real-time data/speed: 8 mentions
- Mobile/app: 7 mentions
- Portfolio/watchlist: 4 mentions
- KOL/blogger/expert content: 3 mentions
- On-chain/whale tracking: 2 mentions

**Implication:** v2.0 features like the news card, KOL 관심도, and SNS 센티먼트 directly address this gap — but only if they provide interpretation, not just aggregation. A news feed that simply lists headlines replicates what CoinNess already does (which users already consider too slow and shallow compared to Telegram).

### 3. Telegram is the real competitor

This is not a comfortable finding, but it's the clearest signal in the data. Telegram is used by 89% of respondents and is the primary information source for all 4 interviewees. More importantly, experienced users describe Telegram as already sufficient:

- **Interviewee 2** (7 years, futures-focused): "정보 자체는 레드오션인 것 같음" — information itself is a red ocean. Said Telegram + AI already provides everything needed.
- **Interviewee 1** (full-time trader): Gets all key information from Telegram. Follows 100+ channels, checks 30 daily. Said Korean channels alone are sufficient for staying current.
- **Interviewee 4** (4–5 years): Said CoinNess alerts are pointless because Telegram is always faster.

**What this means for v2.0:** Cryptalk cannot win on speed or raw information volume against Telegram. The viable differentiation is in synthesis and curation — doing the work of monitoring 30 Telegram channels and distilling the signal. The "AI 현황 요약" concept and social signal cards in the wireframe are aimed at this, but they need to deliver genuinely processed insight, not reformatted Telegram content.

### 4. Retention is the bottleneck, and users are naming it

Multiple respondents unprompted described the stickiness problem — they found value in a single visit but had no reason to return:

- "이 사이트에 머무를 이유는 딱히 찾지 못했습니다. 그냥 종목만 체크하고 끌것 같은데."
- "매일 매일 유저가 들어와서 사용할만한 기능은 없는것 같음."
- "정보 제공도 좋으나 정보만 있으면 그냥 한번 씩 정보를 찾아보려고 들어오는 웹사이트가 될것 같습니다."
- **Interviewee 3**: "전반적으로 볼때, 현재 제공하는 전문적인 분석도구도 필요하지만 일상적으로 계속 유저가 들어올 유인이 부족하다고 생각함."

The Telegram alert feature — the most natural retention mechanism — had very low stickiness: of the 6 respondents who answered the retention question, only 1 was still receiving alerts, 2 had turned them off, and 3 had set them up but never received any.

**Implication:** The home screen redesign needs to answer "why should I come back tomorrow?" The current v1.5 home screen is a static data display that looks the same every visit. v2.0 cards like 실시간 검색 상위, 최신 커뮤니티 글, and a contextualized news feed could create a sense of "something new every time" — but only if the content genuinely refreshes with timely, relevant signals.

### 5. The community feature has demand but faces a cold-start problem

Community/discussion was the second most-disappointed feature (17 mentions). Users noticed it was empty or hard to find:

- "커뮤니티 활성화가 너무 안되어있네요"
- "크립톡이라는 사이트가... 이름도 토크인데 토크할 요소가 없어서 좀 의아했음" (Interviewee 3)
- "종토방이 있는지조차 몰랐습니다" (survey respondent, mobile user)
- **Interviewee 3** uses community content in other platforms for "인간지표" (human sentiment indicator) — market sentiment gauging, not deep discussion.

However, the current DAU makes interactive community unviable. Without a critical mass of active posters, the community will remain a ghost town regardless of UI improvements.

**Implication:** The v2.0 wireframe's approach of surfacing community at the global level (최신 커뮤니티 글 card) is directionally correct for visibility. But the content strategy matters more than the UI: read-only expert commentary or curated KOL digests may be more realistic at current scale than user-generated discussion.

---

## Secondary Signals Worth Noting

**김프 / exchange price gap:** 9 respondents independently requested cross-exchange price differential data. Interviewee 4 (the arbitrage-focused trader) described this use case in depth — including the need to check deposit/withdrawal availability alongside price gaps. This is a concrete, specific data feature with clear demand, though it skews toward more advanced traders.

**Accessibility and onboarding:** Multiple respondents and interviewees flagged that technical indicator terminology creates a barrier for beginners. Interviewee 3 described a paradox: "상급자를 위한 툴인것 같음. 종목 골라보기에서 어떤 지표를 추가하고 커스터마이징 한다는거 자체가 이미 상급자인데, 그 정도 상급자라면 이런걸 안봐도 되는게 아닌가." Survey respondents asked for tooltips, guides, and simpler language.

**Identity confusion:** Both interviewees and survey respondents expressed uncertainty about what Cryptalk is trying to be. "현재 크립톡은 어떤 사이트를 지향하는 건지 잘 모르겠음" (Interviewee 4). "뭔가 바이낸스나 업비트 같은 거래소 사이트같다는 느낌" (Interviewee 3). The v1.5 home screen's resemblance to an exchange data page contributes to this — v2.0's editorial/briefing direction should help differentiate.

**Mobile experience:** 7 respondents mentioned mobile/app needs. Given Cryptalk is mobile-first, UI legibility and navigation on small screens is a prerequisite, not a feature.

---

## What This Means for the v2.0 Home Screen

The research supports moving from a data-dashboard layout to a curated briefing layout. Specifically:

- **Lead with context, not data.** The AI 현황 요약 at the top of the wireframe aligns with the "why" gap. It should feel like a market brief, not a data summary.
- **Pre-filtered signals over configurable tools.** 상승종목/하락종목/실시간 검색 상위 work as quick-scan cards precisely because they require zero configuration. The screener can remain as a deeper tool on its own page.
- **The news and social cards are the differentiation bet.** If KOL 관심도, SNS 센티먼트, and 뉴스 deliver genuine synthesis (not just aggregated headlines), they address the core "why" gap that no Korean competitor currently fills. If they're shallow, they'll be ignored.
- **Community needs visibility but not interactivity (yet).** Surfacing 최신 커뮤니티 글 on the home screen fixes the discoverability problem. Building interactive community features should wait for higher DAU.
- **Price table stays but gets demoted.** It's table stakes (pun intended), not a differentiator. Condensing it and placing it in the middle of the page (not the top) matches how users actually described their priorities.

