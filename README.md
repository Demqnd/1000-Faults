# 1000 Rules

A responsive, searchable game-night rulebook built with React and Vite. Everything runs in the browser; no backend, database, or account setup is needed.

## Run locally

Open this folder in VS Code, then run in its terminal:

```sh
npm install
npm run dev
```

Open the local URL printed in the terminal. Changes to the source files appear automatically.

If Windows PowerShell blocks `npm.ps1`, use `npm.cmd` in place of `npm` (for example, `npm.cmd run dev`).

## Add your rules

Edit `src/data/rules.js`. Each entry has a unique number, rule text, and optional search keywords:

```js
{
  id: 22,
  text: 'You must knock on the table before asking a question.',
  keywords: ['knock on wood', 'knocking', 'wooden', 'ask', 'questions', 'asking questions'],
},
```

The rulebook contains the 188 supplied rules, numbered #001?#188 in their original order. Every rule has related search keywords. Add new entries starting at #189; the count updates automatically. General game instructions are stored in `gameInstructions` in the same file and shown on the About page.

Search is case-insensitive and checks rule text and keywords. Every word in a query must match. Numeric searches (like `22`, `022`, or `#022`) find an exact rule number. Add synonyms to `keywords` to make more related searches work; this is keyword search, not AI search.

Edit `src/App.css` for page layout and `src/index.css` for global colors and fonts. Edit `src/App.jsx` for page copy and components.

## Build and publish

```sh
npm run lint
npm run build
```

The production website is generated in `dist`. You can host those static files with a static website host. For a Git-based deployment, use `npm run build` as the build command and `dist` as the output folder. No environment variables or server are required. Run `npm run preview` to check the production build locally.

Rule changes require a new build/deployment; there is no in-browser editing or shared database in this version.

## AdSense

The account script for `ca-pub-8738741825905481` is included once in `index.html`. `public/ads.txt` is published at `/ads.txt`.

The right sidebar reserves a 300px-wide ad area on screens at least 1100px wide. It is hidden on smaller screens to keep the rules readable.

The sidebar uses the **Davison** display ad unit (`9323645576`), configured as `SIDEBAR_AD_SLOT` in `src/AdSidebar.jsx`. It requests an ad once the sidebar is visible and has a measurable width. Full-width expansion is disabled to keep the ad inside the right column. To change ad units later, replace that slot ID with the new unit's `data-ad-slot` value.

Keep **Auto ads off** in your AdSense account if you want ads only in this manually placed sidebar. The account script can also run Auto ads if you enable them in Google, and those placements are controlled by Google rather than this layout.

After committing and deploying, check that `/ads.txt` is reachable and finish the site approval and privacy/consent setup in AdSense. Adding the code does not guarantee approval or that an ad will be served. Live ad delivery has not been verified locally.
