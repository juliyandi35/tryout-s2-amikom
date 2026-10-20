---
name: Ruang Belajar TKA
description: A personal TKA practice app drawn as one printed computer answer sheet (LJK), answered by filling bubbles in pencil.
colors:
  desk: "#E9E8E2"
  sheet: "#FBFAF6"
  ink: "#C23B14"
  ink-fill: "#E4572E"
  ink-deep: "#A8310F"
  ink-tint: "#FBEAE2"
  graphite: "#2E2E33"
  text: "#26231F"
  text-2: "#5C544D"
  ok: "#1F6B4E"
typography:
  title:
    fontFamily: "Archivo Variable, system-ui, sans-serif"
    fontSize: "clamp(1.75rem, 3.4vw, 2.5rem)"
    fontWeight: 800
    lineHeight: 1.05
    letterSpacing: "0.02em"
  label:
    fontFamily: "Archivo Variable, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 800
    lineHeight: 1.2
    letterSpacing: "0.08em"
  button:
    fontFamily: "Archivo Variable, system-ui, sans-serif"
    fontSize: "0.95rem"
    fontWeight: 800
    lineHeight: 1
    letterSpacing: "0.08em"
  body:
    fontFamily: "Atkinson Hyperlegible, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.55
  question:
    fontFamily: "Atkinson Hyperlegible, system-ui, sans-serif"
    fontSize: "1.15rem"
    fontWeight: 400
    lineHeight: 1.65
  figure:
    fontFamily: "Martian Mono Variable, ui-monospace, monospace"
    fontSize: "1.05rem"
    fontWeight: 600
    lineHeight: 1.2
rounded:
  r: "2px"
  bubble: "50%"
spacing:
  xs: "8px"
  sm: "12px"
  md: "16px"
  lg: "28px"
  xl: "36px"
components:
  button-primary:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.sheet}"
    typography: "{typography.button}"
    rounded: "{rounded.r}"
    height: "44px"
    padding: "0 20px"
  button-primary-hover:
    backgroundColor: "{colors.ink-deep}"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    rounded: "{rounded.r}"
    height: "44px"
  button-danger:
    backgroundColor: "{colors.graphite}"
    textColor: "{colors.sheet}"
    rounded: "{rounded.r}"
  chip:
    backgroundColor: "{colors.sheet}"
    textColor: "{colors.text}"
    rounded: "{rounded.r}"
    height: "40px"
    padding: "0 14px"
  chip-on:
    backgroundColor: "{colors.graphite}"
    textColor: "{colors.sheet}"
  print-band:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.sheet}"
    height: "56px"
  bubble:
    backgroundColor: "{colors.sheet}"
    textColor: "{colors.ink}"
    rounded: "{rounded.bubble}"
    size: "26px"
  choice-row:
    backgroundColor: "transparent"
    textColor: "{colors.text}"
    height: "64px"
    padding: "14px 8px"
  choice-row-hover:
    backgroundColor: "{colors.ink-tint}"
  explain-box:
    backgroundColor: "{colors.ink-tint}"
    textColor: "{colors.text}"
    rounded: "{rounded.r}"
    padding: "14px 16px"
---

# Design System: Ruang Belajar TKA

## Overview

**Creative North Star: "The Computer Answer Sheet"**

The whole app is one LJK (lembar jawaban komputer): a neutral off-white sheet lying on a thin warm-grey desk. Everything printed on the form (rules, labels, numbers, the top band, the answer circles) is one vermilion printing ink. Everything the learner does is pencil graphite: a filled bubble, a flag, the current row. Answering a question literally means blackening a bubble, and a finished session reads as a filled-in sheet.

Density is calm and ruled, not carded. Content sits in ruled form rows with hairline dividers; there are no stacked cards and no progress bars (progress is bubbles filled in proportion). Timing marks run down the sheet's left edge as on a real answer form. The world is light only: paper has no dark mode, and dark mode is deliberately deferred, not forgotten.

**Key Characteristics:**
- One print ink (vermilion) for all form structure; graphite only for the user's marks; green only for correct answers in review.
- Ruled rows with 1px to 2px ink-line dividers instead of cards.
- Squared 2px corners everywhere except the circular bubble.
- Condensed uppercase Archivo for printed labels, Atkinson Hyperlegible for reading, Martian Mono for every number.
- Tonal depth only: desk, then sheet; shadow exists solely on the sheet and the exit dialog.

## Colors

A restrained printed-form palette: warm paper greys, one vermilion ink, one pencil graphite, one semantic green.

### Primary
- **Print Vermilion** (#C23B14): the form ink. Print band, primary buttons, section labels, links, bubble rings, question numbers, rules (as ink-line). Text-safe on the sheet.
- **Vermilion Fill** (#E4572E, `ink-fill`): the lighter fill variant of the print ink, declared for large printed fills.
- **Pressed Vermilion** (#A8310F, `ink-deep`): primary button hover/pressed only.
- **Ink Tint** (#FBEAE2): hover wash on rows, explanation panel, wrong-answer row.

### Secondary
- **Pencil Graphite** (#2E2E33): marks made by the user only. Filled bubbles, selected chips, current row in the answer key, low-time timer, flag, focus outline, text selection, danger button.

### Tertiary
- **Checked Green** (#1F6B4E): correct answer in review, and the correct-answer row tint (8% alpha). Nowhere else.

### Neutral
- **Warm Desk** (#E9E8E2): page background behind the sheet.
- **LJK Sheet** (#FBFAF6): the paper surface and text on ink.
- **Body Ink** (#26231F): reading text.
- **Muted Ink** (#5C544D): hints, secondary lines, empty states.
- **Ink Line** (rgba(194,59,20,.42) of vermilion, `ink-line`): every rule, border and divider. Defined in CSS as an alpha value, so it is not a frontmatter color.

### Named Rules
**The One Ink Rule.** All printed structure is vermilion; all user input is graphite. A user mark is never vermilion, and a printed element is never graphite.
**The Green Is Verdict Rule.** Checked green appears only to mark a correct answer in review. It is never decoration or a generic success color.
**The Wrong Keeps Its Pencil Rule.** A wrong choice keeps the user's graphite mark; only the printed ring turns ink. Wrong is never shown in a new alarm color.

## Typography

**Label Font:** Archivo Variable (system-ui fallback), set condensed (font-stretch 78% to 85%), uppercase
**Body Font:** Atkinson Hyperlegible (system-ui fallback)
**Numeric Font:** Martian Mono Variable (ui-monospace fallback), tabular

**Character:** Condensed uppercase Archivo reads as the form's printed labels; Atkinson keeps questions and explanations maximally legible; the mono face makes every number look typed onto the sheet.

### Hierarchy
- **Title** (800, clamp(1.75rem, 3.4vw, 2.5rem), 1.05): page `h1`, uppercase, stretch 80%.
- **Label** (800, 1rem, 1.2, 0.08em, uppercase, ink): section headings with a 2px ink-line underline; smaller 0.9 to 0.95rem for sub-labels.
- **Button** (800, 0.95rem, 1, 0.08em, uppercase, stretch 85%): all buttons; band links 600 at 0.875rem.
- **Body** (400, 1rem, 1.55): app text; option text and rows 0.9 to 1.08rem.
- **Question** (400, 1.15rem, 1.65, max 70ch): quiz question text; 1.05rem on mobile.
- **Figure** (Martian Mono 600, 1.05rem; question number 800 at 1.9rem; score 2rem): every number, timer, score and percent, with tabular numerals.

### Named Rules
**The Typed Numbers Rule.** Any figure (count, score, timer, percent, question number) is set in Martian Mono with tabular numerals.
**The Printed Label Rule.** Archivo is uppercase and condensed and used for labels and buttons only, never for reading prose.

## Layout

A desk with a single centered sheet (max-width 1180px, 20px 16px desk padding). The sheet has 40px left padding that holds the timing-mark column (a 14px wide graphite dash pattern at left 12px). The print band spans the sheet top, 56px tall, with brand left and nav right. Content is a grid with 36px gaps, with page padding clamp(16px, 3vw, 36px) on the right.

Home is a two-column pick grid (1.65fr / 1fr): choices on the left, topic strength on the right, library as ruled rows below. Quiz is the question column plus a sticky 260px answer-key rail. Collapse points: 960px (single column, key rail becomes static and flows into a multi-column grid), 720px (desk padding removed, sheet goes edge to edge, band wraps, rows restack), 560px (nav text labels hidden, counts remain). Touch targets are at least 44px (buttons, band links, choice rows), with 40px for chips and small buttons.

Spacing rhythm in use: 4, 8, 12, 14, 16, 18, 28, 36px; separation comes from rules and whitespace, not boxes.

## Elevation & Depth

Hybrid and minimal: the desk-to-sheet step is the only layering. The sheet carries a paper shadow; nothing else floats except the exit dialog.

### Shadow Vocabulary
- **Sheet** (`box-shadow: 0 1px 0 rgba(255,255,255,.8) inset, 0 2px 3px rgba(60,40,20,.1), 0 18px 40px -12px rgba(60,40,20,.22)`): the paper lifted slightly from the desk.
- **Exit dialog** (`box-shadow: 0 18px 40px -12px rgba(0,0,0,.4)` over a 55% warm-dark scrim): confirmation dialog only.

### Named Rules
**The Flat Paper Rule.** Inside the sheet everything is flat and separated by ink-line rules. Press feedback is a 1px translate, not a shadow.

## Shapes

Squared printed-form geometry: one 2px radius (`--r`) on sheet, band, buttons, chips, tags, boxes, inputs and panels. The single circular element is the answer bubble (50%), which is the world's signature shape. Borders are 1.5px ink-line for boxed controls, 2px solid ink for the mode toggle and primary buttons, 2px ink-line for list tops, 1px ink-line between rows. Keys use a small ink diamond (rotated 8px square) as the flag mark.

## Components

### Buttons
- **Shape:** 2px corners, 44px minimum height (40px small), 2px border.
- **Primary:** vermilion fill, sheet text, 20px horizontal padding, uppercase condensed Archivo.
- **Hover / Focus:** hover darkens to Pressed Vermilion; active translates 1px; disabled drops to 45% opacity. Focus is the global 3px graphite outline with 2px offset (sheet-colored on the band).
- **Ghost:** transparent with ink text; hover fills with Ink Tint. **Danger:** graphite fill. **Flag-on:** graphite fill.

### Chips
- **Style:** sheet fill, 1.5px ink-line border, 40px high, Atkinson 600 at 0.85rem.
- **State:** hover darkens the border to ink; selected (`on`) is graphite fill with sheet text.

### Bubbles
Signature component. A 26px ring (12px small) in ink on sheet, holding a letter or number in Archivo. When selected, a graphite pencil-mark disc with a hand-drawn graphite texture scales in over 120ms in three steps (stepped, not eased) and the text flips to sheet. Correct rings turn green; wrong rings stay ink with the graphite mark kept.

### Choice and library rows
Ruled rows with a leading bubble, bold title, muted one-line note. Hover washes Ink Tint. The library row grid is name, meta, progress dots, action; on mobile it restacks and the action keeps a visible ink border.

### Navigation (print band)
Vermilion band, 56px, brand in condensed uppercase on the left, uppercase links on the right with a transparent 1.5px border that appears on hover and a sheet-colored count badge in mono. In quiz the band carries the timer (sheet chip, graphite when low) and progress.

### Answer-key rail
Sticky list of one row per question: number in mono, four small bubbles, flag diamond. The current row is graphite with sheet text.

### Explanation panel and result key
Explanation sits in an Ink Tint box with 1.5px ink-line border. Results show a grid of numbered cells with a mark: graphite check disc for correct, ink-filled for wrong, empty ring for blank.

## Do's and Don'ts

### Do:
- **Do** use Print Vermilion for every printed element and Pencil Graphite for every user-made mark.
- **Do** build lists as ruled rows with 1px to 2px ink-line dividers.
- **Do** set every number in Martian Mono with tabular numerals.
- **Do** express proportion (accuracy, progress) as filled bubbles, not bars.
- **Do** keep controls at least 44px high on touch (40px for chips).
- **Do** reuse the 2px radius and the circular bubble as the only two shapes.

### Don't:
- **Don't** stack cards or rebuild the pastel-card dashboard with glyph icons and progress bars that this world rejects.
- **Don't** use green anywhere but a correct answer in review.
- **Don't** add shadows inside the sheet or round corners beyond 2px.
- **Don't** set prose in Archivo or labels in Atkinson.
- **Don't** introduce a dark theme without a deliberate new decision: the world is paper and is light only.
