# Gridfire Development Plan

## 1. Core Game Concept

### Main Gameplay Idea

**Gridfire** is a top-down tactical strategy and deduction game about a counter-battery artillery duel on a large grid-based battlefield. The player commands a single artillery battery and must locate, suppress, and destroy an enemy battery that begins hidden somewhere on the map.

The game is not about fast reflexes or realistic artillery operation. It is about reading incomplete information, forming hypotheses, making controlled guesses, and correcting over time. Each enemy shot produces clues. Each player shot produces feedback. The player gradually turns uncertainty into a shrinking search area.

The core experience is:

1. The enemy fires from an unknown location.
2. The player receives imperfect clues from sound, flash, radar, craters, drones, radio intercepts, and recon units.
3. The player marks likely enemy areas on a tactical grid.
4. The player chooses a bearing, range, shell type, and fire pattern.
5. The shot lands, creating visible impact markers and spotter feedback.
6. The player adjusts based on the result.
7. The enemy either fires again, relocates, deploys decoys, or is destroyed.

The intended game feel is closer to a tactical puzzle, naval plotting game, or board-game deduction challenge than an action artillery simulator.

### Player Fantasy

The player fantasy is being the calm commander inside a dark command tent or mobile operations room, building a picture of the battlefield from scraps of information. The player is not a frontline soldier aiming a weapon directly. They are the analyst-commander who interprets reports, plots possible locations, and authorizes fire missions.

The fantasy pillars are:

- **Command from uncertainty:** The player rarely knows the exact answer, but can make increasingly smart decisions.
- **Professional calm:** The UI, audio, and pacing should make the player feel like they are managing a tense but controlled operation.
- **Mental victory:** Winning should feel like solving a hard tactical riddle.
- **Measured force:** Each shell matters. The player succeeds by thinking before firing.
- **Counterplay:** The enemy is not passive. It fires, hides, moves, deceives, and adapts.

### Tone and Pacing

The tone should be tense, restrained, technical, and atmospheric. The game should avoid heroic bombast. It should feel like a command-center thriller built around maps, signals, pings, muffled explosions, and terse radio reports.

Pacing should be deliberate:

- Missions last 8 to 25 minutes in normal play.
- The player has time to inspect clues and make decisions.
- Pressure comes from enemy salvos, limited ammo, mission timers, damaged friendly assets, and relocation windows.
- The game can include optional time pressure, but the core campaign should allow thoughtful play.

The ideal rhythm is:

- Quiet analysis.
- Sudden enemy fire.
- New information.
- Focused planning.
- The anticipation of the player's salvo.
- Impact feedback.
- A revised hypothesis.

### Why The Gameplay Is Satisfying

Gridfire is satisfying because it gives the player a visible process of improving from ignorance to precision.

The game rewards:

- Pattern recognition.
- Spatial reasoning.
- Hypothesis testing.
- Smart risk-taking.
- Efficient use of limited resources.
- Learning how each clue type behaves.

The player experiences small victories constantly:

- "The enemy cannot be in the north sector anymore."
- "The sound delay and radar arc overlap here."
- "My last shot was short and right, so I need a longer range and left correction."
- "The enemy moved, but the relocation road network limits where they could have gone."
- "The drone glimpse confirms the decoy is fake."

The main satisfaction loop is not hitting the target instantly. It is watching a cloud of possibilities collapse into one decisive grid coordinate.

## 2. Gameplay Loop

### Full Gameplay Cycle

#### Step 1: Enemy Battery Fires

At intervals determined by mission difficulty and enemy doctrine, the enemy battery fires at friendly objectives. These may include:

- The player's battery position.
- Forward observation posts.
- Radar stations.
- Supply depots.
- Civilian evacuation corridors in story missions.
- Time-limited defensive objectives.

Each enemy fire mission creates a signature. The signature is the source of clues.

Enemy shots should be visible or audible even when the source is hidden:

- Distant muzzle flash glow.
- Sound wave delay.
- Incoming shell audio.
- Impact craters.
- Radar contact.
- Radio activity.
- Reports from units near the enemy.

#### Step 2: Player Receives Clues

After the enemy fires, the command interface updates with one or more clue reports. A clue never says "the enemy is exactly here" unless the player has earned late-game precision through upgrades or strong tactical setup.

Instead, clues produce:

- Direction arcs.
- Distance bands.
- Probability heat zones.
- Candidate grid sectors.
- Suspected movement routes.
- Confidence ratings.
- Contradictory or noisy data at higher difficulties.

Example:

> Sound team estimates origin between west-northwest and northwest. Delay suggests medium-long distance. Confidence: 63 percent.

The player can pin clues to the map as overlays.

#### Step 3: Player Estimates Enemy Location

The player combines clues manually or with optional UI assistance. The map should support:

- Drawing temporary arcs.
- Dropping suspicion markers.
- Highlighting coordinate regions.
- Comparing old and new reports.
- Tagging zones as "possible", "unlikely", or "cleared".

The player may also spend resources to gather more clues:

- Launch drone.
- Request radar sweep.
- Send recon report.
- Analyze crater pattern.
- Listen for radio intercept.

These actions cost time, battery power, command points, drone fuel, or mission score.

#### Step 4: Player Fires Artillery

The player chooses a fire mission:

- Bearing or target coordinate.
- Range or target distance.
- Shell type.
- Number of rounds.
- Spread pattern.
- Optional correction from previous impact.

For approachability, the game can allow two input modes:

- **Coordinate mode:** Click a grid cell or enter grid coordinate.
- **Manual mode:** Enter bearing and range from the player battery.

Manual mode should be more expressive and satisfying for advanced players. Coordinate mode should be available for accessibility and tutorial clarity.

#### Step 5: Spotter Gives Correction Feedback

After shell travel time, impacts appear on the map if visible. If not visible, the player receives indirect spotter feedback.

Feedback examples:

- "Impact observed short, left."
- "No visual. Sound suggests overshoot."
- "Dust column near suspected tree line."
- "Secondary explosion detected."
- "Enemy radio traffic increased after impact."
- "No effect. Target likely outside blast zone."

Feedback should be mechanically useful but imperfect. It should help the player adjust rather than solve the puzzle automatically.

#### Step 6: Player Adjusts Fire

The player updates their estimate:

- Increase range if shot was short.
- Decrease range if shot overshot.
- Shift left or right if lateral correction is reported.
- Account for wind drift and shell spread.
- Decide whether to fire again quickly or wait for better clues.

The game should make correction feel tactile:

- Last shot markers remain visible.
- The UI can show a ghosted corrected impact zone.
- Players can drag a fire mission from previous impact toward a revised target.

#### Step 7: Enemy Relocates Or Is Destroyed

If the player lands enough damage near the enemy:

- The enemy battery is destroyed.
- The enemy battery is suppressed and fires slower.
- The enemy battery relocates under pressure.
- A decoy is revealed.
- Ammunition trucks or radar support units are damaged.

If the enemy survives, it may:

- Fire again from the same location.
- Move to a prepared alternate position.
- Stop firing to reduce detection.
- Deploy smoke or false radio traffic.
- Send a decoy flash or dummy battery.

The loop continues until win or loss.

### Win And Loss Conditions

Possible win conditions:

- Destroy the enemy battery.
- Force the enemy to retreat.
- Survive until friendly evacuation completes.
- Protect a key objective for a mission duration.
- Identify the battery without exceeding collateral limits.

Possible loss conditions:

- Player battery destroyed.
- Mission objective destroyed.
- Ammo depleted.
- Timer expires.
- Too many civilian or protected cells hit in story missions.
- Enemy escapes after repeated relocation.

## 3. Tactical Clue System

### Design Goals

The clue system is the heart of Gridfire. It should:

- Narrow enemy location without giving exact answers.
- Produce overlapping information that rewards synthesis.
- Be fictionalized, readable, and game-safe.
- Let players improve through practice.
- Support difficulty scaling through noise, delay, and partial data.

Every clue should have:

- **Source:** Where the clue came from.
- **Shape:** How it appears on the map.
- **Accuracy:** How reliable it is.
- **Delay:** How long after enemy fire it arrives.
- **Counterplay:** How terrain, weather, enemy behavior, or upgrades affect it.

### Clue Type: Sound Delay

**Concept:** A sound team hears the enemy firing after seeing or detecting the impact. The delay suggests approximate distance, but not exact position.

**Map Representation:**

- A distance band around the listening post or player battery.
- The band may be thick because the estimate is uncertain.
- Higher-quality audio gear narrows the band.

**How It Helps:**

- Eliminates enemies too close or too far away.
- Combines strongly with flash direction.
- Useful early clue because it does not require direct line of sight.

**Fictionalized Mechanic:**

The game converts sound delay into a simple range category:

- 1 pulse: nearby.
- 2 pulses: medium.
- 3 pulses: far.
- 4 pulses: extreme.

The player does not calculate real sound speed. The UI simply shows a ring band such as "estimated origin 18 to 24 grid units from Sound Post Alpha."

**Difficulty Variants:**

- Easy: clean distance band.
- Normal: band has +/- 3 to 5 grid uncertainty.
- Hard: echoes from hills or urban areas create two possible bands.

### Clue Type: Flash Direction

**Concept:** Observers see a muzzle flash glow or launch flare from a general direction.

**Map Representation:**

- A cone or arc extending from an observation post.
- The cone gets wider at long distance.
- Forests, hills, and weather can reduce confidence.

**How It Helps:**

- Gives a directional constraint.
- Combines with sound delay to produce a wedge-shaped search area.
- Helps catch enemies firing from exposed ridgelines.

**Fictionalized Mechanic:**

Flash direction is expressed as compass sectors, not precise angular measurements:

- North.
- Northeast.
- East.
- Southeast.
- South.
- Southwest.
- West.
- Northwest.

Upgraded observers can report half-sectors:

- North-northeast.
- East-southeast.
- West-northwest.

The map draws this as a cone. The player thinks spatially without doing real calculations.

### Clue Type: Radar Estimate

**Concept:** Counter-battery radar catches a brief trajectory trace and estimates a likely origin region.

**Map Representation:**

- A translucent oval, arc, or probability blob.
- A confidence value.
- A "radar shadow" where hills or weather reduce accuracy.

**How It Helps:**

- Provides the most direct early-game clue.
- Can be wrong if the enemy uses decoys, low-signature firing, or terrain masking.
- Encourages the player to protect radar assets.

**Fictionalized Mechanic:**

Radar does not model real projectile tracking. It rolls against an abstract detection profile:

```
Radar Quality + Enemy Signature - Terrain Masking - Weather Noise = Estimate Quality
```

Estimate quality determines the radius of the radar blob:

- Excellent: 3 to 4 grid radius.
- Good: 5 to 7 grid radius.
- Poor: 8 to 12 grid radius.
- Fragmentary: only a broad arc.

### Clue Type: Crater Angle

**Concept:** After enemy shells impact, crater shape suggests the rough direction from which shells arrived.

**Map Representation:**

- Small arrows at impact craters.
- A reverse-direction cone from the crater location.
- Multiple crater arrows can be averaged into a better clue.

**How It Helps:**

- Useful when the enemy hits visible areas.
- Encourages the player to inspect the battlefield after incoming fire.
- Can confirm or challenge radar reports.

**Fictionalized Mechanic:**

Each crater produces a simple incoming direction:

- "Came from west."
- "Came from northwest."
- "Came from south-southwest."

The player can click "Analyze Craters" to convert several craters into a map cone. This costs time or command focus.

**Design Note:**

Keep this abstract. Do not ask players to measure crater geometry. The command staff reports a simplified interpretation.

### Clue Type: Drone Observation

**Concept:** A recon drone can scan a region and reveal signs of enemy activity.

**Map Representation:**

- A moving scan circle.
- Temporary visibility over fog of war.
- Icons for heat, tracks, smoke, vehicle movement, or decoys.

**How It Helps:**

- Lets players verify a suspected area.
- Can identify decoys.
- Can reveal relocation paths after the enemy moves.

**Fictionalized Mechanic:**

Drones do not show the exact battery immediately unless close and uncontested. They reveal indicators:

- Fresh tracks.
- Recently disturbed ground.
- Muzzle smoke residue.
- Heat patch.
- Vehicle convoy moving through trees.
- Empty firing position.

Drone scans should be powerful but limited by:

- Battery life.
- Cooldown.
- Weather.
- Enemy electronic warfare.
- Anti-drone threat zones.

### Clue Type: Radio Intercepts

**Concept:** Signal teams catch fragments of enemy communication.

**Map Representation:**

- Text reports with sector references.
- Possible communication origin circles.
- Highlighted roads, towns, or terrain names.

**How It Helps:**

- Adds narrative flavor.
- Gives indirect hints that require interpretation.
- Can reveal enemy intent rather than exact location.

**Example Reports:**

- "Intercept mentions crossing near Red Bridge."
- "Enemy logistics callsign active in Sector D."
- "Repeated traffic near Hill 204 relay."
- "Battery commander requests smoke screen before displacement."

**Fictionalized Mechanic:**

Radio intercepts are generated from tagged map features. If the enemy is near a named forest, river crossing, road junction, or town, reports may reference that feature with some uncertainty.

### Clue Type: Recon Reports

**Concept:** Friendly scouts, local observers, or forward units provide human reports.

**Map Representation:**

- Report pins.
- Sighting cones.
- Confidence labels.
- Time stamps.

**How It Helps:**

- Provides qualitative information.
- Can be late, vague, or partially wrong.
- Helps make the battlefield feel alive.

**Example Reports:**

- "Heavy vehicles heard east of Pine Ridge."
- "Dust trail moving north along Farm Road."
- "No activity at suspected position."
- "False gun flashes seen near old quarry."

**Fictionalized Mechanic:**

Recon reports are generated by proximity, visibility, and mission scripting. They should never require real reconnaissance concepts. They are puzzle hints.

### Clue Layering

The player should be able to overlay multiple clue shapes:

- Sound distance band.
- Flash cone.
- Radar blob.
- Crater reverse cone.
- Drone scan zone.
- Recon pin.

The likely target zone is where several clues overlap. The UI can offer optional "candidate zone" highlighting, but players should still feel responsible for the judgment call.

### Clue Confidence

Each clue has a confidence rating:

- High: likely accurate.
- Medium: useful but noisy.
- Low: broad or possibly misleading.
- Suspect: may be decoy-influenced.

Confidence should be visible through:

- Opacity.
- Line thickness.
- Text labels.
- Icon state.

## 4. Simplified Math / Estimation Mechanics

### Design Principle

Gridfire should use math that feels tactical but remains accessible. The game should avoid realistic firing tables, real ballistic formulas, and real operational procedures. Instead, it should use fictionalized board-game math built around grid units, compass sectors, and correction tokens.

The player should think:

- "Farther."
- "A little left."
- "The wind pushes impacts east."
- "This shell type spreads more."
- "The enemy is probably within this overlap."

They should not need:

- Trigonometry.
- Real-world weapon data.
- Military terminology beyond readable flavor.
- Complex unit conversion.

### Coordinate System

The battlefield is a rectangular or square grid. Recommended baseline:

- Small map: 32 x 32 cells.
- Standard map: 48 x 48 cells.
- Large map: 64 x 64 cells.

Each cell is an abstract tactical tile. It does not correspond to a real distance. This keeps the design game-safe and easier to balance.

Coordinates use letter-number notation:

- Columns: A to AZ depending on map size.
- Rows: 01 to 64.
- Example: `K-17`, `AB-42`.

### Direction Estimation

Direction is handled through compass sectors.

Basic sectors:

- N, NE, E, SE, S, SW, W, NW.

Advanced sectors:

- NNE, ENE, ESE, SSE, SSW, WSW, WNW, NNW.

The game can show a bearing dial, but the player does not need precise degrees. If using manual input, the dial can snap to 16 sectors.

Direction error is calculated in sectors:

```
Input Sector + Crew Error + Wind Drift + Shell Spread = Final Impact Direction Offset
```

Example:

- Player selects NW.
- Crew error shifts impact one sector toward WNW.
- Wind pushes impact one cell east.
- Final impact lands slightly right of intended line.

### Distance Estimation

Distance is measured in grid units from the player's battery or from a selected origin point.

The UI can show:

- Range rings every 5 cells.
- Hover distance from player battery.
- Estimated distance bands from clues.

Sound delay and radar estimates produce broad distance bands:

- Close: 5 to 12 cells.
- Medium: 13 to 24 cells.
- Far: 25 to 38 cells.
- Extreme: 39+ cells.

These values can change by map size.

### Range Correction

After a shot, the spotter reports range error using simple categories:

- Very short.
- Short.
- On range.
- Long.
- Very long.

Each category maps to a suggested adjustment:

- Very short: add 6 to 10 range units.
- Short: add 2 to 5 range units.
- On range: no major range adjustment.
- Long: subtract 2 to 5 range units.
- Very long: subtract 6 to 10 range units.

The exact recommendation depends on crew quality, visibility, and spotter confidence.

### Left / Right Adjustment

Lateral error is reported as:

- Far left.
- Left.
- Centered.
- Right.
- Far right.

This maps to grid adjustment:

- Far left: shift 4 to 7 cells right.
- Left: shift 1 to 3 cells right.
- Centered: maintain line.
- Right: shift 1 to 3 cells left.
- Far right: shift 4 to 7 cells left.

The UI can visualize this with a correction cross:

```
       LONG
LEFT   HIT   RIGHT
       SHORT
```

The player does not need to calculate vectors. They can drag the next fire mission marker in the indicated direction.

### Wind Drift

Wind is an abstract map modifier that shifts shells after firing.

Wind has:

- Direction.
- Strength.
- Stability.

Strength values:

- Calm: 0 cells.
- Light: 1 cell drift.
- Moderate: 2 cells drift.
- Strong: 3 to 4 cells drift.
- Gusting: random 1 to 4 cells drift.

The UI displays wind as an arrow in the command panel. The predicted impact marker should show the expected drift if the player has basic fire-control gear. Higher difficulty can hide the exact drift and only show wind category.

### Shell Spread

Shell spread represents inherent uncertainty and prevents firing from being too deterministic.

Each shot has an impact scatter radius:

- Elite crew: 1 to 2 cells.
- Standard crew: 2 to 3 cells.
- Damaged or rushed crew: 4 to 5 cells.
- Suppressive barrage: larger intentional spread.

Spread is visualized as an impact ellipse or circle before firing. The exact impact is random inside the area, weighted toward the center.

### Accuracy Formula

A simple game-oriented accuracy model:

```
Final Scatter Radius =
Base Shell Spread
+ Crew Stress
+ Weather Penalty
+ Target Range Penalty
+ Damage Penalty
- Fire Control Upgrade
- Previous Correction Bonus
```

Example:

- Base shell spread: 2.
- Crew stress: +1.
- Weather: +1.
- Range: +1.
- Fire control upgrade: -1.
- Previous correction: -1.
- Final scatter radius: 3 cells.

This is readable, tunable, and easy to expose in UI.

### Correction Memory

If the player fires multiple shots at a nearby point without moving the battery, they gain a correction bonus. This encourages iterative bracketing.

Correction states:

- Unregistered: no bonus.
- Bracketed: player has one useful impact report, -1 scatter.
- Dialed In: player has two consistent corrections, -2 scatter.
- Lost Registration: enemy relocated or player changed fire direction too much.

### Hit And Damage Resolution

Enemy batteries occupy an abstract hidden footprint:

- Main gun cell.
- Support cells.
- Ammo cell.
- Decoy cells in some missions.

Damage is based on distance from impact:

- Direct hit: heavy damage.
- 1 cell away: strong damage.
- 2 cells away: light damage.
- 3+ cells away: suppression only for high explosive.

The player may not see exact damage unless they have observation. Feedback can be indirect:

- Secondary explosion.
- Reduced enemy fire rate.
- Radio panic.
- Smoke plume.
- Drone confirms damage.

## 5. Artillery Firing System

### Design Goals

The firing system should feel deliberate, weighty, and readable. It should support both puzzle solving and tactical tradeoffs.

Key goals:

- Every shot matters.
- Firing creates information, not only damage.
- Shell types have meaningful use cases.
- Inputs are simple enough for new players.
- Advanced players can make precise manual adjustments.

### Bearing Input

Two supported input styles are recommended:

#### Coordinate Targeting

The player clicks a grid cell or enters a coordinate. This is best for accessibility, tutorials, and controller support.

Input flow:

1. Click "Fire Mission."
2. Select shell type.
3. Click target cell.
4. Choose number of rounds.
5. Confirm.

#### Bearing And Range Targeting

The player selects a bearing sector and range value from the battery position. This reinforces the artillery-command fantasy.

Input flow:

1. Set bearing on compass dial.
2. Set range using slider, stepper, or typed value.
3. Preview predicted impact zone.
4. Confirm fire.

The game can allow both modes at any time.

### Range Input

Range is an integer grid value:

- Minimum range: 4 cells.
- Maximum range: depends on battery upgrade and map size.
- Standard early battery: 32 cells.
- Upgraded battery: 48+ cells.

The UI shows:

- Min and max range rings.
- Current selected range.
- Predicted impact zone.
- Out-of-range warning.

### Shell Travel Simulation

Shells should have travel time to create anticipation and tactical delay.

Travel time can be abstract:

```
Travel Time = Base Time + Range / Speed Factor
```

Example:

- Base time: 1.5 seconds.
- Range factor: 0.08 seconds per grid cell.
- Range 30 shot: 3.9 seconds total.

This is not realistic. It exists to support pacing and feedback.

Visuals:

- Faint arc line or launch pulse.
- Incoming whistle near impact.
- Delayed explosion.
- Impact marker appears after detonation.

### Accuracy Mechanics

Accuracy is affected by:

- Crew quality.
- Battery damage.
- Range.
- Weather.
- Wind.
- Shell type.
- Firing too quickly.
- Correction history.
- Fire-control upgrades.

The player should see an approximate impact zone before confirming. On higher difficulty, the preview can be less exact.

### Reload Timing

Reload is a strategic pacing tool.

Suggested baseline:

- Single shot: 8 seconds reload.
- Two-round salvo: 14 seconds.
- Four-round barrage: 24 seconds.
- Heavy shell: +25 percent reload.
- Trained crew upgrade: -15 percent reload.
- Suppressed/damaged battery: +30 percent reload.

Reload should pressure the player without making the game feel twitchy.

### Ammunition Limits

Ammo limits create decision-making. Recommended mission ammo:

- High explosive: 20 to 40 rounds.
- Smoke: 4 to 10 rounds.
- Illumination: 3 to 8 rounds.
- Cluster or area shell: 2 to 6 rounds if included.

Ammo should vary by mission. Campaign upgrades can increase supply, but scarcity should remain part of the identity.

### Fire Mission Types

#### Single Round

Purpose:

- Test a hypothesis.
- Generate correction feedback.
- Conserve ammo.

Pros:

- Low cost.
- Fast reload.
- Good for bracketing.

Cons:

- Low damage.
- Less likely to destroy target quickly.

#### Adjusted Pair

Purpose:

- Fire two rounds with slight spread.
- Good after one correction.

Pros:

- Better hit chance.
- Still controlled.

Cons:

- Moderate ammo cost.

#### Concentrated Salvo

Purpose:

- Attack a high-confidence target.

Pros:

- High damage.
- Strong suppression.

Cons:

- Long reload.
- Large ammo cost.
- Reveals player battery more strongly to enemy.

#### Search Pattern

Purpose:

- Cover a suspected area with spaced rounds.

Pros:

- Useful against uncertain targets.
- Can reveal secondary explosions or movement.

Cons:

- Inefficient if search area is too large.

### Shell Types

#### High Explosive

Role:

- Primary damage shell.
- Destroys batteries, decoys, ammo trucks, radar equipment, and cover.

Mechanics:

- Medium blast radius.
- Strong damage at center.
- Creates craters for later visual reference.
- Can trigger secondary explosions.

Best Use:

- When the player has medium or high confidence in target location.

#### Smoke

Role:

- Obscures enemy observation.
- Protects friendly assets.
- Blocks drone or flash detection in a region.
- Can bait enemy relocation.

Mechanics:

- Creates a smoke cloud lasting 30 to 60 seconds.
- Reduces detection and accuracy through the cloud.
- May also obscure player's own clues.

Best Use:

- Defensive missions.
- Covering damaged radar or observer posts.
- Forcing enemy AI into a less accurate firing mode.

#### Illumination

Role:

- Reveals hidden areas at night or in bad visibility.
- Improves flash detection and drone confirmation.

Mechanics:

- Lights a radius for a short duration.
- Reveals recent movement tracks.
- Increases confidence of recon reports.
- May reveal decoys as decoys.

Best Use:

- Night missions.
- Dense terrain.
- Before a high-value salvo.

#### Cluster Shell (Optional Fictionalized)

Role:

- Wide-area suppression and anti-decoy search shell.

Design Caution:

This should be fictionalized and framed as an abstract game area-effect munition. If the team wants to avoid sensitive associations, rename it to **Scatter Charge**, **Burst Pattern Shell**, or **Area Saturation Shell**.

Mechanics:

- Large impact pattern.
- Low direct damage per sub-impact.
- High chance to reveal hidden units.
- Strong suppression.
- Limited ammo.

Best Use:

- Large uncertain target zones.
- Preventing relocation.
- Clearing decoy fields.

Recommended MVP:

- Cut this from the first version.

## 6. Enemy AI

### Design Goals

Enemy AI should feel clever but understandable. The player should be able to learn enemy behavior and exploit it, while still facing uncertainty.

The AI should not need complex simulation. It needs a small set of readable tactical states.

### Enemy States

Recommended state machine:

1. **Hidden:** Enemy has not fired recently and is hard to detect.
2. **Preparing:** Enemy is selecting a target and loading.
3. **Firing:** Enemy fires, producing clues.
4. **Exposed:** Enemy detection signature remains elevated briefly after firing.
5. **Assessing:** Enemy evaluates danger based on nearby impacts.
6. **Relocating:** Enemy moves to another hidden position.
7. **Suppressed:** Enemy fires slower and less accurately due to near hits.
8. **Destroyed:** Mission success or partial success.

### Firing Patterns

Enemy doctrines should determine behavior.

#### Cautious Battery

- Fires single rounds.
- Relocates after one or two shots.
- Lower damage output.
- Harder to pin down.

#### Aggressive Battery

- Fires salvos.
- Stays in position longer.
- High damage output.
- Easier to detect.

#### Deceptive Battery

- Uses decoy flashes.
- Sends false radio traffic.
- Relocates through covered routes.
- May fire from near decoy positions.

#### Siege Battery

- Slow reload.
- Long range.
- High damage.
- Rarely relocates unless heavily threatened.

#### Raider Battery

- Shorter range.
- Fast relocation.
- Attacks exposed support units.
- Appears in smaller maps or campaign side missions.

### Relocation After Firing

Relocation should be predictable enough to reason about.

Enemy may relocate when:

- It has fired a doctrine-specific number of times.
- A player shell lands within danger radius.
- Drone scans nearby.
- Radar confidence against it becomes high.
- A mission script triggers movement.

Movement rules:

- Enemy chooses from prepared alternate positions.
- Movement follows roads faster than rough terrain.
- Forests and urban areas conceal movement.
- Rivers restrict routes to bridges or crossings.
- Relocation takes time, creating a window where clues can track movement.

The player should receive indirect signs:

- Dust trail.
- Radio intercept.
- Drone glimpse.
- Sound report from scout.
- Old position found empty.

### Accuracy Scaling

Enemy accuracy should scale by difficulty and mission phase.

Inputs:

- Enemy doctrine.
- Range to target.
- Terrain visibility.
- Player countermeasures.
- Suppression.
- Weather.
- Story difficulty.

Easy difficulty:

- Enemy fires less often.
- Enemy near misses provide more clue opportunities.
- Enemy stays in place longer.

Normal difficulty:

- Enemy relocates sensibly.
- Enemy accuracy improves over repeated shots.
- Clues have moderate uncertainty.

Hard difficulty:

- Enemy uses decoys and false signatures.
- Enemy reacts quickly to near misses.
- Clues can be delayed or noisy.

### Decoy Batteries

Decoys create false positives.

Types:

- Dummy flash emitter.
- Radio decoy.
- Heat decoy.
- Old firing position.
- Empty vehicle park.

Decoys should be counterable:

- Drone close scan reveals no gun signature.
- Radar may classify signature as weak.
- Recon reports mention lack of tracks.
- HE hit produces no secondary explosion.

Design rule:

Decoys should waste attention, not feel unfair. A careful player should have ways to identify them.

### Aggression Levels

Enemy aggression affects:

- Fire rate.
- Salvo size.
- Willingness to remain exposed.
- Target priority.
- Relocation threshold.

Aggression can change dynamically:

- Enemy becomes cautious after near hit.
- Enemy becomes aggressive if player radar is destroyed.
- Enemy rushes shots when mission timer is nearly complete.

### Difficulty Scaling

Difficulty should alter several knobs gently, not one punishing number.

Possible knobs:

- Clue uncertainty.
- Enemy relocation frequency.
- Enemy fire rate.
- Ammo scarcity.
- Weather severity.
- Decoy density.
- Objective vulnerability.
- Player upgrade availability.

The game should avoid making hard mode simply "less information." Better hard mode means more information to interpret under more pressure.

## 7. Battlefield Design

### Grid-Based Tactical Map

The battlefield is the main play surface. It should be readable at a glance and support detailed inspection.

Recommended map sizes:

- Tutorial: 24 x 24.
- Standard: 48 x 48.
- Large: 64 x 64.
- Endless: scalable chunks or 64 x 64 with generated objectives.

Each tile stores:

- Terrain type.
- Elevation category.
- Visibility modifier.
- Movement cost.
- Detection modifier.
- Cover value.
- Feature tag if any.
- Fog state.
- Recent event markers.

### Terrain Types

#### Open Ground

Gameplay role:

- Easy to scan.
- Low concealment.
- Fast movement.
- Vulnerable to observation.

Effect:

- Radar and drone estimates improve.
- Relocating enemies are easier to spot.
- Artillery effects are straightforward.

#### Forests

Gameplay role:

- Concealment.
- Ambush and decoy placement.
- Slower movement.

Effect:

- Reduces drone and flash detection.
- Increases enemy concealment.
- Can cause sound reports to be less precise.
- Fire or repeated HE impacts may temporarily reduce concealment.

#### Hills

Gameplay role:

- Observation advantage.
- Radar masking.
- Line-of-sight blockers.

Effect:

- Observers on hills get better flash direction.
- Hills can create radar shadows behind them.
- Enemy on reverse slope is harder to detect.
- Impacts on hills may have altered scatter or visibility.

#### Rivers

Gameplay role:

- Movement constraint.
- Strategic route planning.
- Natural map segmentation.

Effect:

- Relocation usually requires bridges or ford tiles.
- Radio intercepts and recon reports can reference crossings.
- Destroyed bridge events can trap or redirect enemy movement in some missions.

#### Urban Areas

Gameplay role:

- Dense concealment.
- Collateral risk.
- Strong signal clutter.

Effect:

- Radar less reliable.
- Sound echoes can create false distance bands.
- Drone identification is harder.
- Some missions penalize firing into protected urban cells.

#### Roads

Gameplay role:

- Relocation routes.
- Recon clue anchors.

Effect:

- Enemy moves faster along roads.
- Dust trails are more likely.
- Road junctions become likely alternate positions.

#### Marsh / Rough Ground

Gameplay role:

- Movement slowdown.
- Low-value but tactically useful terrain.

Effect:

- Enemy less likely to relocate through it.
- Sound clues may be normal.
- Drone tracks may be easier to see.

### Fog Of War

Fog of war should have several states:

- **Unknown:** Never observed.
- **Known Terrain:** Terrain mapped, no current visibility.
- **Recently Observed:** Possible stale information.
- **Currently Visible:** Active drone, recon, radar, or observer coverage.
- **Suspected Enemy:** Player or system-marked probability.

The player should always know the terrain layout in most missions, but not enemy location. Some campaign missions can include partially unknown maps.

### Visibility Systems

Visibility comes from:

- Player battery sight radius, usually limited.
- Observation posts.
- Drones.
- Illumination shells.
- Radar coverage.
- Recon events.

Visibility affects:

- Whether impacts are seen directly.
- Whether spotter reports are precise.
- Whether enemy relocation is detected.
- Whether decoys are identified.

### Terrain And Detection

Terrain should modify clue quality rather than produce hard invisibility too often.

Example modifiers:

- Forest: flash confidence -20 percent, drone ID -15 percent.
- Hill observer: flash confidence +20 percent.
- Urban: sound confidence -15 percent, radio intercept chance +10 percent.
- Open ground: drone detection +20 percent.
- Rain: radar confidence -10 percent, sound confidence -20 percent.

Keep numbers visible in tooltips for advanced players, but do not force new players to study them.

## 8. UI / UX Design

### Design Goals

The UI should feel like a tactical command interface: functional, dark, precise, and immersive. It should make complex spatial reasoning approachable.

Main goals:

- Give the player confidence in what they can do next.
- Make clues visually comparable.
- Keep controls fast once learned.
- Avoid clutter despite many overlays.
- Communicate uncertainty clearly.

### Screen Layout

Recommended desktop layout:

- Center: tactical map.
- Left panel: clue stack and overlays.
- Right panel: fire mission controls.
- Bottom panel: timeline, ammo, reload, and mission status.
- Top bar: objective, timer, weather, enemy activity state.

Recommended smaller-screen layout:

- Center: map.
- Collapsible side panels.
- Bottom tab bar for Clues, Fire, Intel, Ammo.
- Large touch-friendly confirm controls.

### Tactical Map

Map features:

- Grid coordinates.
- Zoom and pan.
- Terrain icons or tile shading.
- Range rings.
- Clue overlays.
- Impact markers.
- Player annotations.
- Enemy suspected zones.
- Fog of war.

Interaction:

- Hover tile shows coordinate and terrain.
- Click to place marker.
- Right-click or modifier click to mark "unlikely."
- Drag from battery to set bearing and range.
- Toggle overlays individually.

### Coordinate Grid

Grid should be readable but not overpowering.

Options:

- Major grid lines every 5 cells.
- Minor grid lines faint.
- Column and row labels fixed at edges.
- Coordinate tooltip on hover.
- Search box for coordinate entry.

### Radar Display

Radar should be a compact UI module, not a separate full game screen.

Features:

- Sweep animation.
- Detection status.
- Coverage arc.
- Noise level.
- Last contact timestamp.
- Estimated origin blob when triggered.

Radar states:

- Ready.
- Sweeping.
- Contact.
- Jammed.
- Damaged.
- Cooldown.

### Shell Impact Markers

Impact markers are critical for learning.

Marker types:

- Player impact.
- Enemy impact.
- Unknown impact.
- Secondary explosion.
- Smoke cloud.
- Illumination radius.

Each marker should show:

- Time since impact.
- Shell type.
- Fire mission ID.
- Spotter feedback if available.

Old markers fade but remain reviewable through a timeline.

### Spotter Report Panel

This panel translates combat events into useful language.

Report format:

- Time stamp.
- Source.
- Message.
- Confidence.
- Optional map pin button.

Examples:

- `[02:14] Spotter Alpha: Impact short and left of suspected position. Confidence medium.`
- `[02:42] Radar: Brief trace. Origin likely inside Sector F7-F9. Confidence low.`
- `[03:05] Drone: Fresh tracks leaving tree line to the north.`

Reports should be concise and scannable.

### Ammo Indicators

Ammo display should show:

- Shell type icons.
- Remaining rounds.
- Reload state.
- Selected fire mission cost.
- Resupply unavailable or incoming if mission supports it.

Low ammo warnings should be subtle but clear.

### Fire Mission Controls

Controls:

- Shell type selector.
- Mode toggle: coordinate / bearing-range.
- Bearing dial or compass selector.
- Range slider / input.
- Rounds selector.
- Pattern selector.
- Confirm fire button.
- Cancel / clear mission button.

The predicted impact zone should update instantly as inputs change.

### Mission Timer

Timer can represent different mission pressures:

- Time until enemy escape.
- Time until evacuation complete.
- Time until friendly radar is repaired.
- Time until storm reduces visibility.
- Survival time in endless mode.

The timer should be integrated with objective text.

### Style

Visual style:

- Dark command center background.
- Radar green and cyan accents.
- Amber warnings.
- Red enemy events.
- White or pale gray primary text.
- Thin lines.
- Soft scanline or CRT bloom as optional setting.

Accessibility:

- Colorblind-safe overlay patterns.
- Adjustable UI scale.
- Disable CRT effects.
- Pause or slow-time option in campaign.
- Keyboard shortcuts for all core actions.
- Clear text labels for icons.

### UX Principles

- Never hide why a shot landed where it did.
- Always preserve the last few clues and impacts.
- Make uncertainty visible, not mysterious.
- Let players annotate freely.
- Confirm costly salvos.
- Keep tutorials interactive and mission-based.

## 9. Visual Style

### Visual Identity

Gridfire should look like a tactical map come alive: top-down terrain, glowing overlays, measured explosions, and sparse military interface elements.

The art style should be achievable for a solo developer:

- Stylized top-down tiles.
- Minimal unit icons.
- Strong UI overlays.
- Particle effects for impact.
- Limited animation.
- High readability.

### Top-Down Map Style

Recommended map look:

- Muted terrain colors.
- Thin grid overlay.
- Subtle elevation shading.
- Iconographic forests, roads, rivers, and urban blocks.
- Named features for recon reports.

Avoid:

- Overly realistic satellite imagery.
- Highly detailed units that are hard to read.
- Visual clutter that hides clue overlays.

### Shell Explosions

Explosions should be readable and satisfying:

- Brief bright flash.
- Expanding shock ring.
- Dust plume.
- Crater decal.
- Smoke column.
- Screen shake only if subtle.

Different shell types should have distinct effects:

- HE: bright flash and dark crater.
- Smoke: expanding thick cloud.
- Illumination: descending glow and light radius.
- Scatter/cluster: multiple small flashes in a pattern.

### Smoke Effects

Smoke should:

- Obscure map tiles beneath it.
- Drift slightly with wind.
- Fade over time.
- Affect detection overlays.

Use layered translucent sprites or shader particles. Keep performance simple.

### Radar Sweeps

Radar visuals:

- Rotating sweep line.
- Blips with quick fade.
- Glitch/noise during poor conditions.
- Contact blobs projected onto main map.

The radar display should feel alive without becoming distracting.

### Grid Overlays

Overlay types:

- Range rings.
- Direction cones.
- Distance bands.
- Probability heat maps.
- Fog-of-war masks.
- Player annotations.

The player should be able to toggle overlays individually and adjust opacity.

### Tactical Markers

Markers should be simple and iconic:

- Suspected battery.
- Cleared area.
- Decoy.
- Drone scan.
- Recon sighting.
- Last known enemy position.
- Friendly asset.
- Protected area.

Use shape as well as color so the UI remains readable for colorblind players.

### Minimalist Military Aesthetic

The game should avoid fetishizing weaponry. The aesthetic is command, deduction, and signal analysis.

Inspirations:

- Naval plotting boards.
- Cold command-room displays.
- CRT radar scopes.
- Board-game operational maps.
- Modern minimalist strategy UI.

## 10. Audio Design

### Audio Goals

Audio should reinforce uncertainty, distance, and command-center atmosphere. The player should hear the battlefield without feeling like they are in a loud action game.

### Incoming Shell Sounds

Incoming shells should create tension:

- Distant whine.
- Growing pressure.
- Muffled impact if far away.
- Sharp impact if near friendly assets.

Near misses can briefly distort UI audio or trigger operator callouts.

### Distant Artillery Booms

Enemy fire should have directional and distance flavor:

- Low distant thump.
- Slight delay before impact depending on gameplay timing.
- Different tone for heavy batteries.

This supports the sound delay clue fantasy without requiring realistic audio behavior.

### Radio Chatter

Radio chatter should be sparse and functional.

Use:

- Short report confirmations.
- Static bursts.
- Calm spotter voices.
- Urgent but controlled warnings.

Avoid:

- Constant chatter.
- Long voice lines that block gameplay.
- Overly dramatic combat barks.

### Radar Pings

Radar pings:

- Soft pulse during sweep.
- Sharper ping on contact.
- Distorted ping when jammed.
- Low warning tone on radar damage.

### Ambient Battlefield Atmosphere

Ambient layers:

- Low wind.
- Distant rumble.
- Occasional radio static.
- Rain on command post during weather missions.
- Electrical hum of command equipment.

Atmosphere should leave space for important cues.

### Explosion Effects

Explosion sounds should vary by:

- Distance.
- Shell type.
- Terrain.
- Whether a secondary explosion occurred.

Secondary explosions should be distinct and rewarding because they imply a likely hit.

## 11. Progression System

### Campaign Mode

Campaign should teach systems gradually and introduce new tactical problems.

Structure:

- 20 to 30 missions for full release.
- 6 to 8 missions for early access or demo.
- Mission map with branching optional objectives.
- Persistent battery upgrades.
- Light narrative through briefings and reports.

Campaign arcs:

1. Basic counter-battery training.
2. Forest and hill concealment.
3. Radar interference.
4. Enemy relocation doctrines.
5. Decoys and false signals.
6. Multi-battery operations.
7. Night and weather missions.
8. Final high-pressure duel.

### Mission Progression

Each mission should introduce or combine mechanics:

- Mission 1: Fire at known target, learn range and bearing.
- Mission 2: Use sound and flash clues.
- Mission 3: Use radar estimate.
- Mission 4: Enemy relocates after firing.
- Mission 5: Terrain affects clue quality.
- Mission 6: Drone confirms suspected target.
- Mission 7: Decoys appear.
- Mission 8: Limited ammo and protected zones.

### Increasing Difficulty

Difficulty should increase through richer puzzles:

- Larger maps.
- More terrain obstruction.
- Less reliable clues.
- Multiple possible enemy positions.
- Relocating enemies.
- Decoys.
- Weather.
- Limited resources.
- Multiple objectives.

Avoid increasing difficulty only by making the enemy more accurate.

### Unlockable Upgrades

Upgrade categories:

#### Fire Control

- Smaller predicted scatter.
- Better correction memory.
- Faster coordinate entry.
- Improved impact prediction UI.

#### Radar Systems

- Shorter cooldown.
- Narrower estimate blobs.
- Better performance in rain.
- Decoy classification chance.

#### Recon Drones

- Longer battery.
- Larger scan radius.
- Faster travel.
- Better track detection.
- Night optics.

#### Crew Training

- Faster reload.
- Reduced stress penalty.
- Better salvo consistency.
- Faster shell type switching.

#### Ammunition Support

- More mission ammo.
- Unlock smoke.
- Unlock illumination.
- Unlock area shell if included.

#### Intelligence

- More frequent radio intercepts.
- Better mission briefing hints.
- Enemy doctrine preview.

### Upgrade Philosophy

Upgrades should not remove the deduction game. They should:

- Reduce frustration.
- Expand options.
- Improve confidence.
- Let advanced missions ask harder questions.

Do not let upgrades reveal exact enemy positions too often.

## 12. Game Modes

### Campaign

The main structured mode. It introduces mechanics, tells a light story, and gives long-term progression.

Features:

- Mission briefings.
- Persistent upgrades.
- Optional objectives.
- Scoring.
- Difficulty selection.
- Replayable missions with better rank.

### Endless Survival

The player survives against waves of enemy batteries.

Rules:

- Enemy batteries spawn hidden.
- Each destroyed battery adds score and escalates difficulty.
- Ammo resupply arrives periodically.
- Friendly assets degrade over time.
- Weather and terrain events rotate.

Goal:

- Last as long as possible.
- Compete on leaderboards if supported.

### Puzzle Scenarios

Handcrafted deduction challenges with limited ammo and fixed clues.

Examples:

- "Destroy the enemy with three shells."
- "Identify which of four signals is the real battery."
- "Use crater reports only."
- "Find the enemy before it relocates in two turns."

This mode is ideal for demos and streamers because it produces compact "aha" moments.

### Multiplayer Artillery Duel

Optional future mode. Two players hide and fire against each other on the same grid.

Core concept:

- Each player controls a hidden battery.
- Firing reveals clues.
- Players can relocate, deploy decoys, and scan.
- Victory by destroying opponent or completing objective.

Design challenges:

- Turn-based or simultaneous resolution may be better than real time.
- Needs strong anti-stalemate rules.
- Requires networking and matchmaking.

Recommendation:

- Do not build for MVP.
- Prototype locally after the single-player systems feel strong.

### Timed Challenge Mode

Short missions with time pressure.

Rules:

- Enemy fires at escalating intervals.
- Player must destroy it before timer expires.
- Score based on time, ammo used, and objective damage.

This mode suits players who master the slower campaign and want sharper pressure.

## 13. Technical Architecture

### Engine Options

Gridfire can be built successfully in Godot, Unity, or JavaScript/HTML5. The best choice depends on developer skill, target platform, and desired production complexity.

### Godot

**Advantages:**

- Excellent for 2D games.
- Lightweight and fast iteration.
- Strong scene system.
- Easy UI creation with Control nodes.
- Free and open source.
- Good export options for desktop.
- GDScript is approachable for solo developers.

**Disadvantages:**

- Smaller asset ecosystem than Unity.
- Some advanced UI polish may require custom work.
- Console support is less straightforward.

**Fit For Gridfire:**

Very strong. Godot is likely the best solo-developer choice for a 2D tactical map game with heavy UI and moderate effects.

### Unity

**Advantages:**

- Mature engine with large ecosystem.
- Strong tooling and asset store.
- Good cross-platform support.
- Robust UI options if using UI Toolkit or uGUI carefully.
- Good for future multiplayer plugins or Steam integration.

**Disadvantages:**

- More overhead than needed for a 2D tactics game.
- Project complexity can grow quickly.
- Licensing and package churn may be concerns.
- UI architecture can become messy without discipline.

**Fit For Gridfire:**

Good for a small team already comfortable with Unity, especially if Steam release, effects, or multiplayer are priorities.

### JavaScript / HTML5

**Advantages:**

- Fast to prototype.
- Easy web demo distribution.
- Strong UI with HTML/CSS.
- Canvas or WebGL can handle the map.
- No install barrier for players.

**Disadvantages:**

- Desktop packaging requires Electron, Tauri, or similar.
- Large tactical canvas plus UI needs careful architecture.
- Audio and save behavior vary by browser.
- Steam release is possible but more work.

**Fit For Gridfire:**

Excellent for prototyping and playable web demos. For a commercial Steam game, it can still work, but Godot may be cleaner.

### Recommended Engine

Best overall recommendation:

**Godot 4.x**

Reason:

- The game is 2D, grid-based, UI-heavy, and indie-scoped.
- Godot allows fast iteration without excessive engine overhead.
- It can handle tilemaps, shaders, particles, audio, save data, and desktop exports cleanly.

### Rendering Approach

Recommended Godot rendering stack:

- TileMapLayer or custom tile grid for terrain.
- Separate overlay layers for fog, clues, range rings, and markers.
- CanvasItem shaders for radar sweep, scanlines, and heat maps.
- GPU particles or animated sprites for explosions and smoke.
- UI built with Control nodes.

Layer order:

1. Background.
2. Terrain tiles.
3. Roads/rivers/features.
4. Fog of war.
5. Clue overlays.
6. Tactical markers.
7. Projectile trails and impacts.
8. UI panels.
9. Tooltips and modals.

### UI Framework

In Godot:

- Use Control nodes for panels.
- Use custom draw functions for map overlays.
- Use theme resources for consistent colors and fonts.
- Build reusable components:
  - ClueCard.
  - AmmoCounter.
  - FireMissionPanel.
  - RadarWidget.
  - ReportLogEntry.
  - CoordinateTooltip.

### Data Structures

Core data classes/resources:

#### MapData

Stores:

- Width and height.
- Tile array.
- Named features.
- Spawn zones.
- Objective zones.
- Weather profile.

#### TileData

Stores:

- Terrain type.
- Elevation.
- Concealment.
- Movement cost.
- Detection modifiers.
- Fog state.
- Protected flag.

#### BatteryState

Stores:

- Position.
- Health.
- Suppression.
- Reload timer.
- Ammo inventory.
- Detection signature.
- Correction memory.

#### EnemyDoctrine

Stores:

- Fire interval.
- Salvo size.
- Relocation threshold.
- Aggression.
- Decoy use.
- Accuracy profile.
- Preferred terrain.

#### Clue

Stores:

- Type.
- Source position.
- Shape.
- Confidence.
- Timestamp.
- Expiry.
- Related event ID.
- Display style.

#### FireMission

Stores:

- Origin.
- Target coordinate or bearing/range.
- Shell type.
- Round count.
- Pattern.
- Predicted scatter.
- Launch time.
- Impact times.

#### Report

Stores:

- Timestamp.
- Source.
- Text.
- Confidence.
- Linked map marker.

### Projectile Simulation

Keep projectile simulation abstract:

1. Player confirms fire mission.
2. System calculates intended target.
3. System applies drift, spread, crew error, and correction bonuses.
4. Each round receives final impact cell.
5. Visual projectile timing starts.
6. Impact resolves damage and clues.
7. Report system generates feedback.

No real ballistic simulation is needed.

### Save System

Save data:

- Campaign progress.
- Unlocked upgrades.
- Mission ranks.
- Settings.
- Tutorial completion.
- Optional endless high scores.

For Godot:

- Use JSON or ConfigFile for settings.
- Use Resource serialization or JSON for campaign state.
- Keep save schema versioned.

Example save structure:

```
{
  "version": 1,
  "campaign": {
    "completed_missions": ["m01", "m02"],
    "upgrades": ["radar_i", "crew_reload_i"],
    "currency": 6
  },
  "settings": {
    "ui_scale": 1.0,
    "crt_effects": true,
    "colorblind_mode": false
  }
}
```

### Map Generation

Use authored maps for campaign. Use procedural generation for endless and challenge modes.

Procedural generation steps:

1. Generate height/elevation noise.
2. Place rivers along low paths.
3. Place roads connecting map edges and settlements.
4. Place forests by region clusters.
5. Place urban or objective zones.
6. Tag named features.
7. Choose enemy spawn zones with concealment and valid range.
8. Place alternate relocation positions.
9. Validate line-of-play constraints.

Validation rules:

- Enemy must have at least two valid firing positions.
- Player must have enough clue sources to solve the map.
- Protected zones should not cover all likely fire corridors.
- Relocation routes should be understandable.

## 14. MVP Scope

### MVP Goal

The MVP should prove that the deduction-and-correction loop is fun before investing in campaign, upgrades, advanced AI, or polished visuals.

The MVP should answer:

- Is it satisfying to locate a hidden battery from clues?
- Is firing and correcting intuitive?
- Does uncertainty feel fair?
- Does the enemy create enough pressure?
- Can players understand why they won or lost?

### MVP Features

#### One Map

- 32 x 32 grid.
- 4 terrain types: open, forest, hill, road.
- Player battery fixed in one corner or edge.
- One friendly objective.
- One enemy spawn selected randomly from prepared locations.

#### One Enemy Battery

- Fires at objective every fixed interval.
- Remains in place for early tests.
- Later MVP version relocates once after near hit.

#### Simple Clue System

Start with three clue types:

- Flash direction cone.
- Sound distance band.
- Radar estimate blob.

These are enough to create overlapping deduction.

#### Basic Shell Correction

Implement:

- Coordinate targeting.
- High explosive shell.
- Single shot and two-round salvo.
- Scatter radius.
- Spotter feedback: short/long and left/right.
- Impact markers.

#### Win / Lose Conditions

Win:

- Destroy enemy battery within ammo and time limits.

Lose:

- Objective health reaches zero.
- Player runs out of HE ammo.

### What Should Be Built First

Build in this order:

1. Grid map rendering and coordinate selection.
2. Hidden enemy position and debug reveal toggle.
3. Player firing at selected coordinate.
4. Impact scatter and damage resolution.
5. Enemy firing timer and objective damage.
6. Three clue overlays generated by enemy fire.
7. Spotter correction report after player impact.
8. Basic win/loss flow.
9. Minimal UI polish.
10. One tutorial mission script.

Do not build upgrades, campaign, drone systems, decoys, procedural maps, or multiplayer until the core loop is proven.

### MVP Success Criteria

The MVP is successful if:

- A new player can understand the objective within 2 minutes.
- Players can make meaningful deductions from clue overlays.
- Most wins require 2 to 6 player shots, not random first-shot success.
- Players blame their interpretation, not the UI, when they miss.
- Replaying with a different hidden enemy position still feels interesting.

## 15. Development Roadmap

### Phase 1: Core Prototype

Goal:

Prove the basic duel loop.

Features:

- Core grid map.
- Coordinate system.
- Player battery.
- One enemy battery.
- Basic shell firing.
- Shell scatter.
- Impact markers.
- Damage model.
- Enemy targeting objective.
- Simple enemy fire timer.
- Objective health.
- Win/loss screens.
- Debug tools.

Deliverable:

- A graybox playable mission.

Recommended duration:

- Solo developer: 2 to 4 weeks.
- Small team: 1 to 2 weeks.

### Phase 2: Clues, Terrain, And UX

Goal:

Make the deduction loop real.

Features:

- Flash direction clue.
- Sound distance clue.
- Radar estimate clue.
- Clue overlay toggles.
- Terrain modifiers.
- Spotter report panel.
- Fire mission controls.
- Range rings.
- Basic tutorial prompts.
- First-pass visual style.

Deliverable:

- A playable vertical slice mission with real decision-making.

Recommended duration:

- Solo developer: 4 to 8 weeks.
- Small team: 3 to 5 weeks.

### Phase 3: AI Improvements, Campaign, Visual/Audio Polish

Goal:

Turn the prototype into a structured game.

Features:

- Enemy doctrine system.
- Relocation behavior.
- Decoy basics.
- Drone scan ability.
- Smoke and illumination shells.
- Campaign mission framework.
- 6 to 8 campaign missions.
- Upgrade system.
- Improved particles.
- Audio pass.
- Settings menu.
- Save system.

Deliverable:

- Demo or early access candidate.

Recommended duration:

- Solo developer: 3 to 6 months.
- Small team: 2 to 4 months.

### Phase 4: Advanced Systems And Release Polish

Goal:

Prepare a commercial-quality release.

Features:

- Full campaign.
- Endless survival.
- Puzzle scenarios.
- Procedural mission generation.
- Advanced enemy doctrines.
- Weather.
- More terrain types.
- Steam achievements.
- Leaderboards if desired.
- Controller support if feasible.
- Localization-ready text.
- Accessibility settings.
- Full audio mix.
- Steam page assets.
- Trailer capture tools.

Optional:

- Multiplayer artillery duel.
- Advanced electronic warfare.
- Satellite imagery events.

Deliverable:

- Steam release build.

Recommended duration:

- Solo developer: 6 to 12 months after vertical slice.
- Small team: 4 to 8 months after vertical slice.

## 16. Risk Analysis

### Hardest Systems To Build

#### Clue Legibility

The hardest design problem is making clues imperfect but fair. If clues are too accurate, the game becomes trivial. If they are too vague, the game feels random.

Mitigation:

- Start with only three clue types.
- Show confidence clearly.
- Let players overlay clues.
- Use tutorials that teach clue combinations.
- Record player shots and clue use during testing.

#### UI Complexity

Gridfire has many panels, overlays, markers, and reports. The UI can become overwhelming.

Mitigation:

- Build UI around the map, not around menus.
- Use collapsible panels.
- Give each clue type a distinct visual language.
- Provide overlay presets.
- Avoid adding advanced systems before the core UI is smooth.

#### Enemy Relocation Fairness

Relocation can feel unfair if the player almost solves the puzzle and the target disappears without warning.

Mitigation:

- Telegraph relocation behavior.
- Leave movement clues.
- Make relocation take time.
- Let near hits suppress movement.
- Use doctrine previews in briefings.

#### Procedural Mission Quality

Procedural maps can create unsolvable or boring scenarios.

Mitigation:

- Use authored maps for campaign.
- Add validation rules for generated maps.
- Build procedural generation only after core systems are stable.
- Use generated maps mainly for endless mode.

### Biggest Design Risks

#### The Game Becomes Too Slow

Deliberate pacing can become dull if there is not enough feedback.

Mitigation:

- Keep reports frequent but meaningful.
- Use strong audio and visual impact feedback.
- Add optional fast-forward between events.
- Use mission timers and enemy salvos to create pressure.

#### The Math Feels Like Homework

If estimation requires too many numbers, players may disengage.

Mitigation:

- Use compass sectors and grid units.
- Provide visual overlays.
- Use correction categories.
- Make manual precision optional.

#### Randomness Feels Punishing

Scatter and noisy clues can make players feel robbed.

Mitigation:

- Show predicted scatter before firing.
- Use correction memory to reduce randomness.
- Make high-confidence shots meaningfully reliable.
- Keep damage radius forgiving enough for good deductions.

#### The Theme Feels Too Dry

A command-map game can become sterile.

Mitigation:

- Use tense audio.
- Add named map features.
- Include short mission briefings.
- Use radio reports for atmosphere.
- Make visual effects satisfying.

### Balancing Concerns

Key balance variables:

- Enemy fire interval.
- Objective health.
- Ammo count.
- Shell damage radius.
- Clue uncertainty.
- Radar cooldown.
- Relocation threshold.
- Drone scan radius.
- Reload time.

Balance target:

- Tutorial missions: 80 to 90 percent win rate.
- Early campaign: 65 to 75 percent first-attempt win rate.
- Mid campaign: 45 to 60 percent first-attempt win rate.
- Hard optional missions: 25 to 40 percent first-attempt win rate.

### UI Complexity Concerns

Potential UI overload:

- Too many clue overlays.
- Too many report messages.
- Too many shell options.
- Too many map markers.

Mitigation:

- Introduce systems gradually.
- Use defaults.
- Auto-group similar reports.
- Let players filter reports by source.
- Limit MVP to one shell type and three clue types.

## 17. Replayability

### Randomized Enemy Positions

Even authored maps can randomize enemy start positions from curated lists. This preserves mission design while making replays fresh.

Each mission can define:

- 3 to 8 possible enemy starts.
- 2 to 5 alternate relocation positions.
- Decoy positions.
- Doctrine variants.

### Dynamic Terrain

Terrain can change through:

- Smoke clouds.
- Craters.
- Destroyed bridges.
- Burning forests in some missions.
- Temporary illumination.
- Radar shadow from weather.

Keep dynamic terrain limited and readable.

### Weather

Weather modifiers:

- Rain: worse sound and drone visibility.
- Wind: shell drift and smoke movement.
- Fog: reduced flash and drone detection.
- Night: illumination becomes important.
- Storm: radar noise and stronger drift.

Weather should create different deduction puzzles, not just penalties.

### Different Enemy Doctrines

Replayability improves when the same map can host different enemy behavior:

- Cautious relocator.
- Aggressive siege battery.
- Deceptive decoy user.
- Mobile raider.
- Low-signature hidden battery.

Briefings can reveal partial doctrine information.

### Procedural Missions

Procedural mission templates:

- Destroy hidden battery.
- Protect convoy route.
- Survive siege.
- Find decoy among real threats.
- Night hunt with limited illumination.
- Radar outage scenario.
- Drone-only reconnaissance challenge.

Procedural generation should mix:

- Map layout.
- Weather.
- Enemy doctrine.
- Objective type.
- Ammo limits.
- Clue source availability.

### Scoring And Ranks

Score categories:

- Ammo efficiency.
- Objective protection.
- Time to destroy.
- Clue use.
- Collateral avoidance.
- No-damage bonus.

Ranks:

- C: Mission complete.
- B: Efficient completion.
- A: Strong tactical performance.
- S: Exceptional precision.

Scoring encourages mastery without blocking campaign progress.

## 18. Optional Advanced Features

### Counter-Battery Radar

Advanced radar could:

- Track multiple enemy shots.
- Improve with repeated enemy fire.
- Be vulnerable to jamming.
- Require placement or orientation.

Keep it abstract and visual.

### Drone Camera View

A secondary drone view could show a closer top-down or angled view of a small region.

Use cases:

- Confirm suspected positions.
- Identify decoys.
- Watch relocation routes.

Risk:

- Could become a separate game mode and increase scope.

Recommendation:

- Use a map-based drone scan first.
- Add camera view only if it strongly improves player excitement.

### Satellite Imagery

Satellite pass events:

- Occur on a timer.
- Reveal heat traces or vehicle tracks.
- Provide a snapshot, not live vision.

Good for late campaign and puzzle missions.

### Real-Time Weather

Weather could shift during missions:

- Wind direction changes.
- Rain intensifies.
- Fog rolls in.
- Storm disrupts radar.

Use sparingly. Too much changing information can overwhelm players.

### Logistics / Supply System

Logistics could add strategic depth:

- Limited ammo trucks.
- Resupply delay.
- Risky supply route objectives.
- Upgrade choices before missions.

Recommendation:

- Keep logistics as simple campaign upgrades unless the core game needs more long-term depth.

### Mobile Artillery Relocation

Allow the player's battery to relocate.

Benefits:

- Avoid enemy targeting.
- Change range geometry.
- Create deeper tactical choices.

Costs:

- Adds pathfinding.
- Adds UI complexity.
- Changes clue interpretation.

Recommendation:

- Add after single-position gameplay is excellent.

### Electronic Warfare

Abstract electronic warfare options:

- Jam enemy radar.
- Mask drone scan.
- Create false radio traffic.
- Reduce enemy accuracy.

Use as cooldown abilities, not complex simulation.

## 19. Marketing / Presentation

### Steam Page Concept

Steam short description:

> Command an artillery battery in a tense tactical deduction game. Read radar traces, sound reports, crater angles, and recon clues to locate a hidden enemy battery before it destroys your position.

Longer positioning:

**Gridfire** is a top-down counter-battery tactics game about finding what you cannot see. Study imperfect clues, plot likely enemy positions on a tactical grid, fire carefully measured salvos, and adjust your aim as the battlefield answers back.

### Trailer Ideas

Trailer structure:

1. Dark command map boots up.
2. Enemy shell lands near friendly objective.
3. Clue reports appear: sound, flash, radar.
4. Player overlays clue shapes and marks suspected zone.
5. Fire mission controls lock in.
6. Shells launch and travel.
7. Impacts land short and left.
8. Spotter reports correction.
9. Player adjusts.
10. Drone scan catches movement.
11. Final salvo triggers secondary explosion.
12. Logo and tagline.

Trailer should emphasize:

- Deduction.
- Tactical UI.
- Satisfying impacts.
- Enemy relocation.
- Replayable missions.

### Key Screenshots

Screenshot 1:

- Main tactical map with overlapping clue overlays.
- Shows the core deduction hook.

Screenshot 2:

- Fire mission panel with predicted impact zone.
- Shows player agency.

Screenshot 3:

- Shell impacts and spotter report.
- Shows feedback loop.

Screenshot 4:

- Drone scan revealing tracks near forest.
- Shows advanced intel.

Screenshot 5:

- Campaign map or mission select.
- Shows progression.

Screenshot 6:

- Night mission with illumination shell.
- Shows visual variety.

### Tagline Ideas

- "Find the gun before it finds you."
- "Every shot is a clue."
- "Read the battlefield. Correct your fire. End the duel."
- "A tactical deduction game of hidden batteries and measured salvos."
- "You cannot see the enemy. You can still solve them."

### Visual Branding

Brand elements:

- Dark background.
- Green/cyan radar line.
- White grid coordinates.
- Red enemy impact marker.
- Simple artillery shell silhouette or crosshair-grid symbol.

Logo concept:

- The word "Gridfire" in a condensed technical font.
- A glowing grid line crossing through the title.
- A small radar sweep or impact marker replacing the dot of an "i" if visually clean.

### Target Audience

Primary audiences:

- Tactical strategy players.
- Puzzle and deduction game fans.
- Wargame-curious players who want accessibility.
- Fans of games with maps, sensors, and indirect information.
- Players who enjoy Into the Breach-style readable tactics but want a slower deduction focus.

Secondary audiences:

- Military board game fans who want a lighter digital experience.
- Streamers who enjoy solving tactical puzzles.
- Solo strategy players looking for short replayable missions.

### Store Tags

Potential Steam tags:

- Strategy.
- Tactical.
- Puzzle.
- Turn-Based Tactics or Real-Time Tactics depending on final pacing.
- Wargame.
- Singleplayer.
- Simulation-light.
- Grid-Based Movement if movement becomes central.
- Atmospheric.
- Minimalist.

## 20. Final Recommendation

### Best Engine Choice

Use **Godot 4.x**.

It is the best fit for a solo or small-team indie version of Gridfire because:

- The game is primarily 2D.
- The map and UI are the main experience.
- Godot supports fast iteration.
- The project does not need heavy 3D or large-engine overhead.
- Exporting desktop builds for Steam is practical.
- GDScript is fast for gameplay experimentation.

Use Unity only if the team already has strong Unity experience or requires specific Unity ecosystem tools. Use JavaScript/HTML5 for early prototypes or a web demo, but not as the default commercial build unless the developer is strongest in web technology.

### Best Art Direction

Choose a **minimalist tactical command-map style**:

- Dark map.
- Muted terrain.
- Strong grid readability.
- Green/cyan radar accents.
- Amber and red alerts.
- Thin vector-like overlays.
- Stylized but satisfying impact effects.

This direction is:

- Achievable for a solo developer.
- Distinctive in screenshots.
- Readable during play.
- Well aligned with deduction mechanics.

Avoid expensive realistic art. The game's identity should come from information design and atmosphere.

### Best Scope For A Solo Developer

Best initial commercial scope:

- 10 to 15 campaign missions.
- 3 main clue systems at launch: sound, flash, radar.
- 2 advanced clue systems: drone and radio intercept.
- 3 shell types: HE, smoke, illumination.
- 4 enemy doctrines.
- 5 terrain types.
- Endless mode.
- Puzzle scenarios if time allows.

Cut multiplayer from the first release. It is tempting, but it can double the complexity.

### Best Order Of Implementation

Recommended order:

1. Build the grid map and coordinate targeting.
2. Implement player firing and impact feedback.
3. Add hidden enemy battery and win/loss conditions.
4. Add enemy firing and objective damage.
5. Add sound, flash, and radar clues.
6. Add spotter correction.
7. Test the core loop repeatedly.
8. Add terrain modifiers.
9. Add relocation.
10. Add mission framework.
11. Add UI polish and tutorials.
12. Add upgrades and campaign progression.
13. Add audio and visual polish.
14. Add extra modes.

### Recommended Cuts If Scope Grows Too Large

Cut first:

- Multiplayer.
- Player battery relocation.
- Satellite imagery.
- Advanced logistics.
- Complex procedural generation.
- Cluster/scatter shell.
- Full drone camera view.
- Electronic warfare.

Keep at all costs:

- Clue overlays.
- Firing and correction.
- Enemy hidden position.
- Impact feedback.
- Readable tactical UI.
- Strong tutorialization.

The heart of Gridfire is simple: the enemy fires, the map whispers clues, the player makes a judgment, and the next shell proves or disproves it. Every feature should strengthen that loop. Anything that distracts from it should wait.
