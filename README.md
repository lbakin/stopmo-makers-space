# St Johns Stop Motion

The website for a stop motion makers space in St Johns, Portland. Next.js 16 for the site, Sanity for the content, Netlify for hosting.

Editors change the site at `/edit`. How to do that is in [docs/editing.md](docs/editing.md). The design rules are in [DESIGN.md](DESIGN.md) and the rules for words are in [VOICE.md](VOICE.md).

## Running it

Node 22.12 or newer.

```sh
npm install
npm run dev
```

The site is at http://localhost:3000. Until a Sanity project is connected it shows the sample content in `src/content/sample.ts`, and `/edit` says how to connect one.

Forms only send on Netlify. Locally they act as if they sent and print what they would have sent to the browser console.

## Connecting Sanity

1. Log in and make a project, or use one made at [sanity.io/manage](https://www.sanity.io/manage):

   ```sh
   npx sanity login
   npx sanity projects create "St Johns Stop Motion" --dataset production --dataset-visibility public
   ```

2. Copy `.env.example` to `.env.local` and fill in `NEXT_PUBLIC_SANITY_PROJECT_ID`.

3. Let the browser talk to Sanity from the local site:

   ```sh
   npx sanity cors add http://localhost:3000 --credentials
   ```

4. Copy the sample content into the dataset. This only adds documents that are missing, so it never overwrites edits.

   ```sh
   npm run seed
   ```

5. Restart `npm run dev` and open http://localhost:3000/edit.

To let someone else edit, invite them under Members at sanity.io/manage. The Editor role is enough.

## Deploying on Netlify

`netlify.toml` has the build settings. Netlify finds the Next.js app on its own.

1. Add the site from the GitHub repo.
2. Under Site configuration, Environment variables, add `NEXT_PUBLIC_SANITY_PROJECT_ID`, `NEXT_PUBLIC_SANITY_DATASET` and `SANITY_REVALIDATE_SECRET` (any long random string). Add `SITE_URL` once there's a domain.
3. Under Forms, choose Enable form detection, then deploy again. Netlify reads the three forms in `public/__forms.html`. Under Forms, Form notifications, send new submissions to the space's email.
4. Add the Netlify address to Sanity's CORS list: `npx sanity cors add https://<site>.netlify.app --credentials`, and the real domain later.
5. Optional, so a publish shows up straight away rather than within a minute: at sanity.io/manage, under API, Webhooks, add one with
   - URL `https://<site>/api/revalidate`
   - Dataset `production`, trigger on create, update and delete
   - HTTP method POST, secret the same string as `SANITY_REVALIDATE_SECRET`

## Where things are

| What | Where |
| --- | --- |
| Colors, type sizes, spacing | `src/styles/tokens.css` |
| All other styles | `src/styles/globals.css` |
| The typefaces (OFL) | `src/fonts/`, licenses in `src/fonts/licenses/`, loaded in `src/app/layout.tsx` |
| The looks being tried on this branch | `src/styles/looks/`, described in `LOOKS.md` |
| The list of pages and their addresses | `src/lib/pages.ts` |
| Pages | `src/app/(site)/` |
| Reading content, from Sanity or the sample | `src/lib/content.ts` |
| Sample content | `src/content/sample.ts` |
| CMS fields and the Studio sidebar | `src/sanity/` and `sanity.config.ts` |
| Form definitions Netlify reads | `public/__forms.html` |

A field added to a form in `src/app/(site)` has to be added to the same form in `public/__forms.html`, or Netlify drops it.

The font files are Vollkorn 5.0 from [the Vollkorn repository](https://github.com/FAlthausen/Vollkorn-Typeface), cut down to Latin with every OpenType feature kept. Copies from font services have been known to lose the small caps and old-style figures the site uses.

## Checks

```sh
npm run typecheck
npm run lint
npm run build
```
