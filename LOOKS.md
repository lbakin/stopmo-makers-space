# Looks

This branch tries four livelier looks on the same site. The pages, the words and the CMS are the same as on `main`. Each look is one stylesheet laid over the plain site, and plain is still the default.

## Trying them

Run the site and use the bar at the top of any page, or add `?look=` to an address:

- `?look=boil`
- `?look=lighttable`
- `?look=stripboard`
- `?look=cutout`
- `?look=plain`

The choice stays in that browser until another one is picked, so a link with `?look=stripboard` keeps that look on every page after it. With JavaScript off the site is plain and the bar doesn't show.

## Boil

Plasticine. When a puppet is re-sculpted or a drawing redone for every frame, no edge lands in the same place twice and the picture shivers. Animators call it boil. Here the site name, headings, rules, buttons and the crossed photo box boil: three versions of each edge, swapped eight times a second. Body text stays still so it can be read.

The colors are a box of modelling clay. The name on the home page is set letter by letter in different clays, each with a hard shadow under it for thickness, and the letters are re-sculpted one at a time rather than all on the same frame. The contents list has a ball of clay beside each page, and the calendar presses each day of the month into one. The footer is a slab of dark clay with a coil laid along its edge.

Set in Vollkorn, heavier than on plain.

## Light table

A sheet of animation paper on a lit table in a dark room, held in register at the top by an Acme peg bar (a round peg between two flat ones). Roughs are in blue pencil, clean lines in graphite, keys and notes in red, the way an animator works.

The page titles show faint copies either side, as the drawings before and after show through the paper. Pointing at a link flips through those copies in three steps. The masthead has a pencil test of the bouncing ball, the first exercise anyone animates, with every drawing showing through. Entries are numbered in the corner like drawings and circled in red like keys. The calendar is a printed exposure sheet with a frame number on every line. The crossed photo box becomes a field guide, the nested frames laid over a drawing to show what the camera takes in.

Set in Vollkorn.

## Stripboard

The production office. Everything is typed, as production paperwork still is. The masthead is the boxed header of a call sheet. Each page is a script page, three-hole punched with brass brads in the top and bottom holes. Workshops and notices are scenes, numbered in both margins with CUT TO: between them.

The calendar is a stripboard: a yellow strip for each workshop, a blue strip for each event and a black strip for each month. Full and cancelled are rubber-stamped in red, and so is "Opening soon." on the home page. The page you're on is marked with the highlighter actors use on their own lines, and every link gets the highlighter when pointed at. Notices are index cards pinned to the page, and the studio's equipment list is a checklist.

Set in Courier Prime.

## Cut-out

Colored paper, cut with scissors and pinned. Cut-out animation moves flat paper pieces jointed with pins, a few positions at a time.

The letters of the name are cut one by one from different papers, each a little crooked, and they jig in held positions when pointed at. The page links are scraps of paper. The masthead and footer are torn from black paper. Workshops and notices are pieces of paper hung from a brad in the corner, and each jumps about its brad in four held positions when pointed at. The contents list and each month of the calendar are pieces of paper too.

Set in Archivo, narrow and heavy for headings.

## What they all keep

- The same markup and content. Each look is `src/styles/looks/<name>.css`, with its colors and sizes at the top and every rule scoped to `:root[data-look="<name>"]`.
- Anything that moves does it in held steps, never a smooth tween, and all of it stops when the device asks for reduced motion. The bouncing ball then shows as a still drawing.
- Text is at least 4.5:1 against what's behind it, large headings at least 3:1. Focus is always visible, and nothing scrolls sideways at 360px.
- Each look keeps its own colors on a device set to dark mode. The color choice in the footer only applies to plain.

## What each one breaks from DESIGN.md

| Rule in DESIGN.md | Boil | Light table | Stripboard | Cut-out |
| --- | --- | --- | --- | --- |
| One typeface | Kept | Kept | Courier Prime | Archivo |
| Never uppercase | Kept | Kept | Headings and labels, as on scripts | Headings and labels, as on posters |
| One accent, used twice | Six clay colors | Blue and red pencil | Strip colors, stamp red, highlighter | Six papers |
| Nothing moves | Boils all the time | Pencil test; links on hover | Nothing moves | Pieces jump on hover |
| One shadow, floating panels only | Hard shadows for clay thickness | Light under the sheet | Index cards | Paper shadows |
| Radius 0, 2px on controls | Lumpy rounded clay | Red pencil rings | Stamps and brads | Brads |
| No cards | Kept | Kept | Index cards | Pieces of paper |

## Keeping one

To keep a look, move its tokens into `src/styles/tokens.css`, fold its rules into `globals.css`, update DESIGN.md, and remove the bar, the other looks and `src/lib/looks.ts`. Parts can also be lifted on their own. The stripboard calendar or the light table's field guide would sit well enough on the plain site.

## Not checked yet

- Safari and Firefox. These looks have only been checked in Chrome. Boil and the cut-out letters use SVG filters on page elements, which Safari has drawn differently in the past.
- Boil on a slow phone. It redraws about twenty elements eight times a second.
- A real screen reader. The name on the home page is split into letters for boil and cut-out, with the whole name kept for screen readers.

## Fonts

Courier Prime 3.018 and Archivo 2.001, both under the SIL Open Font License, from the [Google Fonts repository](https://github.com/google/fonts), cut down to Latin with every OpenType feature kept. Licenses are in `src/fonts/licenses/`. Neither is downloaded unless its look is on.
