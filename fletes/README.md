# Freight dispatch · portfolio demo

**[Open the interactive demo](https://luisdelat710.github.io/demand-capture-operations-case-study/fletes/)**

This is a public recreation of selected rules from a freight dispatch application made for an operating need at Pisos y Azulejos Acosta. The original application captured delivery requests, attached invoice material, supported screenshot-assisted extraction, suggested an assignment, displayed orders on a calendar, tracked status and exported reports. This demo narrows the scope to a decision a dispatcher can inspect. The original application and its data are not in this repository.

## Operational question

Given a new freight request, which service/vehicle should be suggested, and is there another scheduled order that deserves review as a combined trip?

## Rules reproduced

| Input or condition | Demo behavior | Boundary example |
| --- | --- | --- |
| External carrier selected | Suggest **External carrier** without a weight-based own-fleet assignment | A 200 kg external request stays external |
| Own-fleet weight ≤ 1,230 kg | Suggest **Light truck** | 1,230 kg → light truck |
| Own-fleet weight > 1,230 kg | Suggest **Heavy truck** | 1,230.01 kg → heavy truck |
| Potential combination | Compare light-truck orders on the same date and local/regional zone, within 120 minutes, with combined weight **above** 1,200 kg | 700 + 620 kg and 60 minutes apart → prompt; exactly 1,200 kg → no prompt |
| Status | Advance **To prepare → En route → Delivered** | Delivered is terminal |

The consolidation result is an **advisory** to consider the heavy truck. It does not automatically merge orders or choose a route. A dispatcher must check actual capacity, geography, order priority and availability before acting. The 1,200 kg prompt and 1,230 kg individual assignment limit are distinct rules in the source workflow; this demo preserves that distinction.

## Walkthrough

1. The default sample order F-103 weighs 700 kg, is local and scheduled on 6 October at 11:00. F-101 is 620 kg, local, at 10:00 on the same day. The individual suggestion is **Light truck**, and the combined 1,320 kg produces a review prompt.
2. Set the new weight to 1,231 kg. The individual suggestion becomes **Heavy truck** and the combination prompt disappears.
3. Return to 700 kg, switch to **Regional**, or move the time beyond the two-hour window. The example pair no longer qualifies.
4. Add the draft to the board and advance its status. This only changes in-memory sample data.

## Scope and safeguards

- Every order ID, date and weight in the demo is fabricated. No names, phone numbers, addresses, invoices or original data are published.
- No authentication, database, upload, OCR, map or routing service is connected. Reloading resets the page.
- This is a rule demonstration, not a performance study. No savings, delivery improvement or adoption metric is claimed.
- The original product was developed with AI-assisted tools. This public case presents the operational problem, rules and review logic; it does not claim independent hand-coding of the original product.

## Run and verify

Open `index.html` using any static web server (ES modules may not work through `file://`). From the repository root, run `node --test fletes/rules.test.mjs` to check weight boundaries, consolidation gates and status progression. The source is `rules.mjs` and the interface is `index.html`.
