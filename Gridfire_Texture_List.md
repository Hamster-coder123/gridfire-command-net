# Gridfire Basic Texture List And Generation Prompts

This document lists the core texture assets needed to give **Gridfire** a high-quality tactical map look while keeping the scope realistic for a solo or small-team indie project.

The recommended visual direction is a **top-down tactical command-map style**: readable terrain textures, restrained realism, darkened overlays, crisp grid lines, and subtle military interface effects. Textures should be tileable where possible, top-down, and not overly busy.

## General Texture Prompt Rules

Use these constraints in most prompts:

- Top-down orthographic view.
- Seamless tileable texture when used for terrain.
- No visible units, people, vehicles, weapons, text, UI, logos, or symbols.
- Clear readability at small scale.
- Muted realistic colors suitable for a dark tactical map.
- Slightly stylized realism, not photorealistic clutter.
- Game texture, 2D strategy map asset.

Recommended texture sizes:

- Terrain tiles: 1024 x 1024 source, downscale to 512 x 512 or 256 x 256 in-game.
- Decals: 512 x 512 or 1024 x 1024 with transparency.
- UI textures: 512 x 512 or scalable shader/noise textures.
- Large overlays: 2048 x 2048 if used as masks or backgrounds.

## 1. Open Ground / Dry Field

**Use:** Default battlefield terrain, plains, empty fields, low-cover areas.

**Prompt:**

> Seamless tileable top-down texture of dry open battlefield ground, muted tan and olive soil, sparse dead grass, subtle dirt variation, low contrast, readable for a tactical strategy map, slightly stylized realism, no objects, no buildings, no people, no vehicles, no text, orthographic 2D game texture.

**Notes:**

- This should be the baseline tile.
- Keep it visually quiet so overlays remain readable.

## 2. Grassland / Green Field

**Use:** Softer open terrain, rural map variety, less damaged areas.

**Prompt:**

> Seamless tileable top-down texture of muted green grassland with subtle patchy vegetation, light soil showing through, natural irregular color variation, tactical map readability, slightly stylized realistic 2D game terrain, orthographic view, no flowers, no rocks, no objects, no text.

**Notes:**

- Avoid saturated green.
- Should contrast gently with forest tiles.

## 3. Mud / Wet Ground

**Use:** Rain missions, rough terrain, shell-damaged zones, low mobility areas.

**Prompt:**

> Seamless tileable top-down texture of muddy battlefield ground, dark wet soil, shallow puddle stains, soft tire-like smears without distinct vehicle tracks, low contrast, gritty but readable, tactical strategy game terrain, orthographic 2D texture, no objects, no footprints, no text.

**Notes:**

- Useful as both base terrain and crater blend layer.

## 4. Forest Floor

**Use:** Base under tree canopy, concealed areas, forest tiles.

**Prompt:**

> Seamless tileable top-down forest floor texture, dark earth, pine needles, scattered leaves, small roots, muted brown and deep green palette, subtle natural detail, readable at small scale, stylized realistic tactical map terrain, no tree trunks as large objects, no animals, no people, no text.

**Notes:**

- Tree canopy sprites can sit above this.
- Keep it darker than open ground.

## 5. Forest Canopy Cluster

**Use:** Top-down tree mass overlay for forest tiles.

**Prompt:**

> Top-down orthographic cluster of dense military map forest canopy, mixed conifer and broadleaf treetops, muted dark green, compact readable silhouette, transparent background, stylized realistic 2D game asset, no ground visible outside canopy, no buildings, no people, no text.

**Notes:**

- Generate several variants.
- Use transparent PNG cutouts if possible.

## 6. Hill / Rocky Elevation

**Use:** Hills, ridges, radar shadows, observation terrain.

**Prompt:**

> Seamless tileable top-down rocky hill terrain texture, muted gray-brown stone, dry grass patches, subtle contour-like shading, tactical strategy map readability, slightly stylized realism, orthographic 2D game texture, no cliffs, no buildings, no objects, no text.

**Notes:**

- Pair with separate contour-line overlay or elevation shading.

## 7. Ridge Edge / Slope Blend

**Use:** Visual transition between flat ground and hills.

**Prompt:**

> Top-down orthographic terrain transition texture from flat dry ground to rocky elevated slope, muted earth and gray stone, soft natural blending edge, readable tactical map style, 2D strategy game asset, no objects, no people, no buildings, no text.

**Notes:**

- Create north/south/east/west variants or rotate carefully.

## 8. River Water

**Use:** Rivers, crossings, map segmentation.

**Prompt:**

> Seamless top-down river water texture for a tactical strategy map, dark muted blue-green water, subtle current streaks, low contrast, slightly stylized realism, orthographic 2D game texture, no waves, no boats, no reflections of objects, no text.

**Notes:**

- Keep the water dark so cyan UI overlays remain readable.

## 9. Riverbank / Shoreline

**Use:** River edges and terrain transitions.

**Prompt:**

> Top-down orthographic riverbank transition texture, muddy shore blending into grass and dirt, muted natural colors, soft irregular edge, tactical map readability, stylized realistic 2D game asset, no plants as distinct objects, no people, no buildings, no text.

**Notes:**

- Needs multiple edge/corner variants for good tiling.

## 10. Dirt Road

**Use:** Relocation routes, recon clues, path networks.

**Prompt:**

> Seamless top-down dirt road texture, compacted earth with subtle tire-worn center, dusty muted brown, soft irregular edges, tactical strategy map style, readable 2D game terrain, orthographic view, no vehicles, no footprints, no signs, no text.

**Notes:**

- Create straight, curve, T-junction, crossroad, and end-cap variants.

## 11. Paved Road

**Use:** Urban outskirts, major roads, fast relocation paths.

**Prompt:**

> Top-down paved road texture for a tactical strategy map, worn dark asphalt, subtle cracks and dust, faded edges, muted low-contrast color, orthographic 2D game asset, no lane markings, no vehicles, no road signs, no text.

**Notes:**

- Avoid modern lane markings unless the setting needs them.

## 12. Urban Block Ground

**Use:** Towns, villages, protected zones, signal clutter areas.

**Prompt:**

> Seamless top-down urban ground texture for a tactical map, muted concrete, rooftops implied as simple blocky shapes, dusty courtyards, subtle rubble, low-detail readable strategy game style, orthographic 2D texture, no readable signs, no people, no vehicles, no text.

**Notes:**

- For better results, separate "urban ground" from "building roof" assets.

## 13. Building Roof Variants

**Use:** Urban tile overlays and tactical obstacles.

**Prompt:**

> Top-down orthographic small building roof asset, muted gray and dark red worn roof materials, simple rectangular military map readable shape, subtle grime and damage, transparent background, stylized realistic 2D strategy game asset, no people, no vehicles, no text, no logos.

**Notes:**

- Generate 8 to 12 small roof variants.
- Keep silhouettes simple.

## 14. Rubble / Destroyed Urban Ground

**Use:** Damaged towns, artillery impact aftermath, mission storytelling.

**Prompt:**

> Seamless tileable top-down rubble texture, broken concrete, dust, small debris, muted gray-brown palette, readable tactical map terrain, slightly stylized realism, orthographic 2D game texture, no recognizable objects, no people, no vehicles, no text.

**Notes:**

- Use sparingly so the map does not become visually noisy.

## 15. Crater Decal

**Use:** Shell impact markers and persistent battlefield damage.

**Prompt:**

> Top-down artillery impact crater decal, circular dark scorched earth with raised dusty rim, subtle radial blast marks, transparent background, high-quality 2D game decal, tactical map readable, no shell fragments, no people, no vehicles, no text.

**Notes:**

- Create small, medium, and large variants.
- Use alpha blending.

## 16. Fresh Explosion Scorch

**Use:** Temporary impact mark before crater settles.

**Prompt:**

> Top-down explosion scorch decal, irregular blackened soil and gray ash, faint radial dust pattern, transparent background, stylized realistic 2D tactical game effect, readable at small scale, no flames, no debris objects, no text.

**Notes:**

- Can fade into crater decals after a few seconds.

## 17. Smoke Puff / Smoke Cloud

**Use:** Smoke shells, explosions, obscured terrain.

**Prompt:**

> Top-down soft smoke cloud sprite, gray and off-white layered smoke, semi-transparent edges, tactical strategy game effect, high-quality 2D particle sprite, isolated on transparent background, no fire, no objects, no text.

**Notes:**

- Generate several puffs and combine them in particles.
- Make separate dark smoke for HE impacts.

## 18. Dust Cloud

**Use:** Shell impacts, moving enemy relocation clues, dry roads.

**Prompt:**

> Top-down dust cloud sprite, tan battlefield dust, soft semi-transparent edges, irregular natural shape, 2D strategy game effect, transparent background, no objects, no vehicles, no people, no text.

**Notes:**

- Useful for recon clues like "dust trail."

## 19. Illumination Glow

**Use:** Illumination shell light radius and night missions.

**Prompt:**

> Top-down circular illumination glow texture, soft pale green-white light falloff, transparent background, subtle tactical command-map style, 2D game overlay, no objects, no text, smooth radial gradient with slight atmospheric haze.

**Notes:**

- This can also be made procedurally with a shader.

## 20. Radar Sweep Overlay

**Use:** Radar panel and map scan effects.

**Prompt:**

> Transparent radar sweep texture, thin bright green scanning wedge with soft fading trail, circular tactical display style, subtle CRT glow, high-quality 2D UI overlay, no numbers, no letters, no icons, no text.

**Notes:**

- Can be replaced with a shader for better quality.

## 21. Radar Noise / CRT Grain

**Use:** UI atmosphere, radar display, jamming effects.

**Prompt:**

> Seamless monochrome CRT noise texture, subtle green-gray grain, faint horizontal scanline interference, low contrast, tactical radar screen overlay, tileable 2D UI texture, no text, no symbols, no icons.

**Notes:**

- Keep subtle.
- Add user setting to disable CRT effects.

## 22. Tactical Grid Line Texture

**Use:** Map overlay and coordinate grid.

**Prompt:**

> Transparent tactical grid overlay texture, thin cyan-green lines, major and minor grid divisions, subtle glow, dark command interface style, high readability, no numbers, no letters, no icons, no text.

**Notes:**

- Usually better generated in-engine for perfect scaling.
- Texture useful for mockups and screenshots.

## 23. Probability Heatmap Texture

**Use:** Suspected enemy zones and clue overlap visualization.

**Prompt:**

> Transparent tactical probability heatmap blob, soft irregular cyan-green glow fading at edges, command map overlay style, subtle noise texture, no hard symbols, no text, no icons, high-quality 2D UI asset.

**Notes:**

- Generate several blob shapes.
- Use additive or screen blending.

## 24. Direction Cone Overlay

**Use:** Flash direction, crater angle, recon sighting arcs.

**Prompt:**

> Transparent tactical direction cone overlay, thin cyan outline with soft translucent fill, subtle radar glow, clean military command map UI style, no text, no icons, no numbers, high-quality 2D game overlay.

**Notes:**

- Prefer procedural drawing in-engine.
- Texture can be used for early prototypes.

## 25. Distance Band Overlay

**Use:** Sound delay clue rings and range estimates.

**Prompt:**

> Transparent tactical distance band overlay, circular ring segment with soft green-cyan glow, faint noisy edge showing uncertainty, command radar map style, no symbols, no text, no numbers, 2D UI asset.

**Notes:**

- Procedural rings are more flexible.

## 26. Shell Trail / Firing Arc

**Use:** Shell travel feedback and fire mission preview.

**Prompt:**

> Transparent top-down artillery shell trail effect, thin glowing amber-white streak with fading smoke tail, stylized 2D tactical game effect, no projectile detail, no text, isolated on transparent background.

**Notes:**

- For a top-down command map, the trail can be symbolic rather than physical.

## 27. Explosion Flash Sprite

**Use:** HE detonation, secondary explosions.

**Prompt:**

> Top-down explosion flash sprite, bright orange-white center with radial dust ring, stylized realistic 2D game effect, transparent background, readable for tactical map, no debris objects, no people, no vehicles, no text.

**Notes:**

- Use as first frame of an animated impact effect.

## 28. Secondary Explosion Marker

**Use:** Feedback that target or ammo was hit.

**Prompt:**

> Top-down secondary explosion effect sprite, compact bright flash with dark smoke core and small ember sparks, transparent background, high-quality 2D tactical map effect, no objects, no people, no vehicles, no text.

**Notes:**

- Should look distinct from normal impacts.

## 29. Drone Scan Circle

**Use:** Drone observation radius.

**Prompt:**

> Transparent drone scan circle overlay, thin cyan circular border with subtle rotating scan texture, clean tactical UI style, faint digital noise, no icons, no letters, no numbers, no text, 2D game overlay.

**Notes:**

- Could also be procedural.

## 30. Vehicle Track Decal

**Use:** Recon clues and enemy relocation evidence.

**Prompt:**

> Top-down vehicle track decal on dirt, two faint parallel tread marks with disturbed soil, muted brown, transparent background, subtle tactical map clue asset, no vehicle, no footprints, no text, high-quality 2D game decal.

**Notes:**

- Generate straight and curved variants.
- Keep subtle enough to feel like a clue.

## 31. Muzzle Smoke Residue

**Use:** Drone/recon clue at old firing position.

**Prompt:**

> Top-down muzzle smoke residue decal, faint gray smoke stain and disturbed dry ground, small scorched patches, transparent background, subtle tactical reconnaissance clue asset, 2D strategy game style, no weapon, no people, no vehicles, no text.

**Notes:**

- Useful for confirming recently abandoned positions.

## 32. Decoy Position Ground

**Use:** False battery sites, dummy flash locations.

**Prompt:**

> Top-down disturbed ground patch suggesting a fake military position, shallow dug marks, scattered dark tarps as abstract shapes, muted earth colors, transparent background, tactical strategy game asset, no real weapons, no vehicles, no people, no flags, no text.

**Notes:**

- Keep it ambiguous so drone scans and reports matter.

## 33. Command UI Panel Background

**Use:** Side panels, report logs, fire controls.

**Prompt:**

> Dark military command center UI panel background texture, matte charcoal surface, subtle green CRT reflection, fine grain, low contrast, clean modern tactical interface style, seamless, no buttons, no icons, no text, no logos.

**Notes:**

- Use sparingly with flat UI colors.
- Do not let it reduce text readability.

## 34. Report Paper / Tactical Briefing Texture

**Use:** Mission briefings, recon report popups, campaign UI.

**Prompt:**

> Subtle dark tactical briefing paper texture, charcoal-gray worn map paper, faint fibers and creases, low contrast, clean military strategy game UI background, no writing, no symbols, no stains, no logos, no text.

**Notes:**

- Optional. A clean UI may not need it.

## 35. Map Edge Vignette / Fog Overlay

**Use:** Fog of war, unknown areas, atmospheric edge masking.

**Prompt:**

> Transparent dark fog of war overlay texture, soft irregular smoky edges, subtle blue-gray tactical map haze, high-quality 2D strategy game overlay, no objects, no text, no icons, no symbols.

**Notes:**

- Can be generated procedurally with noise masks.

## 36. Weather Rain Overlay

**Use:** Rain missions, detection penalties.

**Prompt:**

> Transparent top-down rain overlay texture for a tactical map, fine diagonal rain streaks, subtle dark blue-gray tone, low contrast, seamless 2D game effect, no splashes, no objects, no text.

**Notes:**

- Animated shader is better for final use.

## 37. Snow / Frost Ground

**Use:** Optional winter campaign maps.

**Prompt:**

> Seamless tileable top-down winter battlefield ground, thin snow over muted dirt and dead grass, subtle icy patches, low contrast, readable tactical map terrain, stylized realistic 2D game texture, no footprints, no objects, no text.

**Notes:**

- Optional for visual variety after core maps are complete.

## 38. Burned Ground

**Use:** Heavy bombardment zones, destroyed forests, aftermath.

**Prompt:**

> Seamless tileable top-down burned battlefield ground, blackened soil, ash gray patches, faint scorched vegetation, muted low-contrast palette, readable tactical strategy map terrain, 2D game texture, no flames, no objects, no people, no text.

**Notes:**

- Use after repeated HE impacts or scripted damaged zones.

## 39. Bridge Texture

**Use:** River crossings, tactical choke points.

**Prompt:**

> Top-down small military map bridge asset, simple worn concrete or steel bridge crossing, muted gray color, readable rectangular silhouette, transparent background, stylized realistic 2D strategy game asset, no vehicles, no people, no signs, no text.

**Notes:**

- Create horizontal and vertical variants.

## 40. Objective Marker Ground Pad

**Use:** Friendly radar station, supply depot, protected objective footprint.

**Prompt:**

> Top-down tactical objective ground pad, compact reinforced dirt and concrete clearing, muted gray-brown palette, subtle equipment pad shapes without visible weapons, transparent background, 2D strategy game asset, no people, no vehicles, no text, no logos.

**Notes:**

- Mark actual objective with UI icon separately.

## Minimum Texture Set For MVP

For the first playable high-quality prototype, create only these:

1. Open ground.
2. Forest floor.
3. Forest canopy cluster.
4. Hill / rocky elevation.
5. Dirt road.
6. River water.
7. Crater decal.
8. Explosion flash.
9. Smoke cloud.
10. Tactical grid overlay.
11. Direction cone overlay.
12. Distance band overlay.
13. Radar noise / CRT grain.
14. Command UI panel background.
15. Vehicle track decal.

This is enough to make one map look polished while supporting the core deduction loop.

## Texture Production Priority

### Priority A: Needed Immediately

- Open ground.
- Forest.
- Hill.
- Dirt road.
- Crater.
- Explosion.
- Smoke.
- Grid overlay.
- Basic UI panel.

### Priority B: Needed For Vertical Slice

- River and riverbank.
- Urban ground.
- Building roofs.
- Radar sweep.
- Probability heatmap.
- Drone scan circle.
- Vehicle tracks.
- Muzzle smoke residue.

### Priority C: Later Polish

- Weather overlays.
- Snow.
- Burned ground.
- Rubble.
- Bridge variants.
- Decoy ground patches.
- Briefing texture.
- Advanced fog overlays.

## Art Consistency Checklist

Before importing textures into the game, check:

- Does it remain readable at gameplay zoom?
- Does it tile without obvious seams?
- Does it leave clue overlays visible?
- Is the color palette muted enough for the command-map style?
- Does it avoid real-world text, insignia, logos, or explicit military markings?
- Does it work under a dark UI color grade?
- Does it look consistent beside the other terrain textures?

The best Gridfire textures should support deduction first and atmosphere second. If a texture looks impressive but hides markers, grid lines, or clue overlays, simplify it.
