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

Counter-battery page:

```text
fire 045 8.5 he
fire 070 6 smoke
fire 315 9 illum
scan
status
help
```

Fire missions use bearing in degrees and range in kilometers. Intelligence reports provide approximate bearings, ranges, and correction calls.

Shell flight uses a simplified indirect-fire time table. The browser wait matches the reported time of flight. Enemy return fire starts after your splash and uses a similar shell flight duration.

The status bar includes a live countdown to splash and, after impact, to enemy counterfire.

Anti-air page:

```text
tracks
track T1
fire T1 ir
fire T1 arh
fire T1 sarh
fire T1 gun
status
help
```

The anti-air scenario includes a small radar scope showing bearing, range rings, and the active air contact blip.
Contacts are specific aircraft classes with unique radar signatures. Additional tracks appear periodically. IR, ARH, SARH, and gun hit chances are randomized and affected by aircraft type, range envelope, altitude, speed, maneuverability, heat signature, and radar signature.
Multiple missiles can be in flight at once. The radar scope displays in-flight missiles with separate icons and the status timer counts down to the next missile splash.

## Deploy

This is a plain static site. Deploy the repository root with any static host, including GitHub Pages, Netlify, Vercel, Cloudflare Pages, or itch.io HTML hosting.
