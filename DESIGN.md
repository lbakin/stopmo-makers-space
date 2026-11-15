# Design

The site is set like a printed workshop programme: a title page, a contents list, a column of text, and a calendar ruled like an exposure sheet. The people who use it make things by hand, frame by frame, and will notice anything that looks like a template. Check every change against this file.

The test for every decision: what would a well-made printed programme or catalogue do here? Leave out anything it wouldn't have.

Three rules carry the rest:

- Anything besides the content is distraction, not design.
- A visual difference must mean a difference in meaning.
- Ornament has to be earned. Each one needs a reason you can write down.

## The template look, and what this site does instead

| The default | Here |
| --- | --- |
| Centered hero, big headline, two buttons | A title page: the name, one line under it, the status line, then a short note and the contents |
| Badge or pill above the headline | Nothing above the headline |
| Three cards with icons; bento grids | One column, grouped with space, headings and 1px rules |
| Cards or quotes with a colored stripe on one edge | Plain indented text |
| Stat rows, numbered steps, logo walls, testimonials | One sentence with the true facts |
| Frosted glass, glows, gradients, gradient text | Flat page color |
| Pill toggles, chips, toggle switches | Words. The current choice is set in bold |
| Icon sets on buttons; emoji bullets; a hamburger menu | Text labels. The nav wraps onto a second line on phones |
| Mixed corner radii and shadows | Radius 0 everywhere except 2px on form controls. One shadow, kept for things that float, and nothing floats yet |
| Inter, Space Grotesk, a sans with one italic serif word | Vollkorn for everything |
| Small uppercase letter-spaced labels; all-caps headings | Sentence-case headings. Small caps for labels |
| Indigo, violet, purple to blue | One dark green accent, used on two things |
| Permanent dark mode with faint grey text; pure black on white | Off-white and off-black, both set by hand |
| Fade-ins, scroll animation, carousels | Nothing moves. Links change underline color in 150ms |
| "Discover", "Get started", triplets, em dashes everywhere | See VOICE.md |

## Typeface

Vollkorn 5.0, roman and italic, weights 400 to 900, for everything including buttons and form fields. It's a sturdy, slightly rough book face, closer to a printed shop programme than a magazine, and it has true small caps, old-style and lining figures, and tabular figures for the calendar.

- The files are served from the site, cut down to Latin with every OpenType feature kept (`src/fonts/`). Font services have stripped small caps and old-style figures from other faces. Check any replacement file for `smcp`, `c2sc`, `onum`, `lnum` and `tnum` before using it.
- The italic has no small caps. Small caps are used in roman only, and `font-synthesis: none` stops the browser faking them.
- No second family, no monospace, no icon font.

| Use | Size |
| --- | --- |
| Footer, captions, small print | 0.875rem |
| Navigation, form fields, buttons, the calendar, notes under list items | 1rem |
| Body text | 1.1875rem (19px) |
| Section headings | 1.5rem |
| Page titles; the site name on phones | 2.25rem |
| The site name on the home page | 3.25rem |

Six sizes, nothing outside them.

- Line height 1.5. The column is 30em, about 68 characters of Vollkorn.
- Paragraphs are separated by a 1.5em indent, not a gap. The first paragraph after a heading is flush.
- Text is ragged right, never justified. The paragraphs are short and the column narrows on phones.
- Old-style figures in running text, lining tabular figures in the calendar and the lists of dates.
- Headings are regular weight, sentence case, left-aligned, in the text color. Hierarchy comes from size and space.
- Emphasis from strongest to weakest: bold, italic, small caps. Never uppercase, never letter-spacing.
- Straight quotes typed by editors are curled when the page is built (`src/lib/text.ts`).

## Color

Five tokens per palette, each set by hand. Dark follows the device unless the reader picks one in the footer. `?colors=dark` or `?colors=light` in the address shows a version without saving the choice.

| Token | Light | Dark | On page, light | On page, dark |
| --- | --- | --- | --- | --- |
| page | #f6f4ee | #161614 | | |
| text | #1d1c19 | #e6e2d8 | 15.5:1 | 14.0:1 |
| secondary | #5b5850 | #a19c90 | 6.5:1 | 6.6:1 |
| rule | #d5d0c4 | #3a3833 | 1.4:1 | 1.6:1 |
| accent | #2b5a4b | #88bca7 | 7.2:1 | 8.5:1 |

- The accent is the green of the St Johns Bridge, darkened for text. It marks two things: the status line on the home page (what's true right now) and the keyboard focus ring. Nowhere else.
- Rules are decoration only, never the only way to tell two things apart. Form field borders use the secondary color, which passes 3:1.
- Links are underlined in the text color with the underline in secondary, and the underline darkens on hover.
- No color is decoration: no tinted panels, no colored section backgrounds.

## Surfaces and layout

All spacing comes from one scale: 0.25, 0.5, 1, 1.5, 2, 3, 4 and 6rem.

- One centered column, as wide as the measure. The space does the work boxes do elsewhere.
- The header is the site name in small caps and the six page links, on a plain strip with a 1px rule under it. Not sticky, not translucent.
- The footer is the line under the name, email and Instagram once they exist, what it's set in, when it last changed, and the color choice.
- Rules are 1px in the rule color. Where a month starts on the calendar the rule is in the text color, like the heavier line on an exposure sheet.
- Everything works at 360px wide and nothing scrolls sideways.

## The two ornaments

**The timing chart.** The section break between entries on the Workshops page and the Notice board is drawn as an animator's timing chart: a key at each end, the in-betweens found by halving, bunched toward the keys for an ease in and out (`src/components/Break.tsx`). Animators draw these to plan how a move spreads over frames. A section break marks a step in time, and the people reading this will recognize it.

**The exposure sheet.** The calendar is ruled like an X-sheet: a column of frames, small-caps weekday and day number down the left, a darker rule where each month starts.

Nothing else is ornament.

## Components

| Element | How it looks |
| --- | --- |
| Navigation | Text links. The current page is bold |
| Current choice among several | The word in bold, not underlined |
| Button | 1px border in secondary, 2px radius, no fill, Vollkorn at 1rem, at least 40px tall |
| Form field | Label above, 1px border in secondary, 2px radius, page color behind |
| Photo | A plain image with a caption under it. No frame, no rounded corners |
| Missing photo | A box with a 1px rule border and a cross through it, captioned with what goes there |
| Tap targets on touch screens | At least 40px tall, made with padding |

Banned outright: cards, bento grids, stripe-edged boxes, badges, pills, chips, toggle switches, icon sets, emoji, stat rows, numbered step lists, testimonials, logo walls, stock photos, generated images and illustrations.

## Motion and access

- Nothing moves except scrolling and the 150ms underline color change. Reduced motion turns that off too.
- Focus is always visible: a 2px outline in the accent, offset 2px.
- With JavaScript off the site still works and only the color choice disappears. Forms then post straight to `/__forms.html`. Netlify documents that path for JavaScript submissions only, so test a no-JavaScript submission on a deploy before relying on it.
- The skip link, "Skip to the page", is the first thing Tab reaches.

## Checklist for every change

1. Zoom to 25%. Can you tell which thing is the heading? Is there one strong element on the page?
2. Count the radii, shadows, type sizes and spacing values. Are they all on the lists above?
3. Search the diff for `uppercase`, `letter-spacing`, `backdrop-filter`, `gradient`, `border-left`, `box-shadow`, `card`, `badge`, `pill`, `icon` and `—`. Each hit needs a reason.
4. Count the defaults from the first table that appear. The answer should be zero.
5. Read every new string out loud. Would a person say it? Does it contain a fact?
6. Tab through the page. Turn on reduced motion. Switch to dark. Try it at 360px. Turn JavaScript off.
