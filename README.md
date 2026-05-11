# Counter-Battery Command Net

A text-only browser prototype for **Gridfire**, a tactical counter-battery deduction game.

The current prototype runs as a static website with no build step.

## Play Locally

From this folder:

```bash
python -m http.server 5173 --bind 127.0.0.1
```

Then open:

```text
http://127.0.0.1:5173/
```

## Commands

```text
fire 045 8.5 he
fire 070 6 smoke
fire 315 9 illum
scan
status
help
```

Fire missions use bearing in degrees and range in kilometers. Intelligence reports provide approximate bearings, ranges, and correction calls.

## Deploy

This is a plain static site. Deploy the repository root with any static host, including GitHub Pages, Netlify, Vercel, Cloudflare Pages, or itch.io HTML hosting.
