# Fleet operations · portfolio demo

**[Open the interactive demo](https://luisdelat710.github.io/demand-capture-operations-case-study/flotilla/)**

This is a public recreation of selected rules from a fleet and fuel tracking application made for an operating need at Pisos y Azulejos Acosta. The original AI-assisted application handled daily unit reports, attention items, fuel entries, sales inputs, dashboard summaries and data review. The public demo uses fictitious units and numbers, in memory only.

## Operational question

Which expected daily reports are missing, what needs a coordinator's review, and how do fuel spend and odometer readings translate into simple measures?

## Rules reproduced

| Measure or condition | Calculation / behavior | Edge case |
| --- | --- | --- |
| Expected reports | Monday–Saturday dates in month × active units | Sundays excluded |
| Reported | Distinct unit/date combinations within selected month | Duplicate on same day counts once |
| Missing | Expected − reported | More than 3 missing unit-days triggers a review cue in this example |
| Attention item | A daily entry marked **Needs attention** appears for coordinator review | Demo buttons close synthetic examples only |
| Fuel share | Total fleet fuel spend ÷ monthly sales × 100 | Zero sales → N/A |
| Distance | Last odometer − first odometer for one unit and period | Falling reading → input error/review |
| Efficiency | Distance ÷ logged liters for the same unit and period | Zero liters → N/A |

The source prototype used a three-missing-report threshold and a 2% fuel-share reference in its dashboard. They are **context-specific review cues**, not universal fleet standards or evidence that an employee qualified for compensation. The sample interface calls for review instead of making employment or finance decisions.

## Walkthrough

1. The synthetic September 2026 view has 26 Monday–Saturday days × 3 units = 78 expected unit-days. Four missing reports put the sample outside the three-missing threshold.
2. Select **Record one missing report**. A distinct unit/day entry raises reported coverage from 74 to 75 and reduces missing to three.
3. Review the two example exception flags. The buttons simulate closing a tire item and verifying a questionable odometer reading.
4. Change fuel spend or sales and recalculate. The starting example is 48,000 ÷ 2,400,000 × 100 = 2.0%. Unit A's 12,800 − 12,500 km over 75 liters = 4.0 km/l. Enter a final odometer below the initial reading to see the data-quality warning.

## Interpretation limits

- All vehicles, events and numbers are fabricated. No driver, employee, transaction or real sales data are published.
- Mileage difference divided by logged liters is meaningful only if readings and liters align to the same unit and period. The public demo does not reconcile receipts, missed fills, idling or meter corrections.
- A report's existence is not evidence of data accuracy. Alerts require human review and a record of the actual resolution in an operational deployment.
- No login, database, fuel import, mobile capture or persistence is connected. Reloading resets the page. No measured savings or performance result is claimed.
- The original product was developed with AI-assisted tools. This public case presents the operations logic and review flow without claiming independent hand-coding of the original product.

## Run and verify

Open `index.html` through a static web server. From the repository root, run `node --test flotilla/rules.test.mjs` to check calendar counting, duplicates, the missing-report boundary, zero denominators and a falling odometer. The source is `rules.mjs` and the interface is `index.html`.
