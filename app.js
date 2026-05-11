const BATTERY_POSITION = { x: 1, y: 11 };
const COUNTERFIRE_WINDOW_MS = 10000;

const shellLabels = {
  he: "high explosive",
  smoke: "smoke",
  illumination: "illumination",
};

const windDirections = [
  { name: "north", bearing: 0, dx: 0, dy: -1 },
  { name: "northeast", bearing: 45, dx: 1, dy: -1 },
  { name: "east", bearing: 90, dx: 1, dy: 0 },
  { name: "southeast", bearing: 135, dx: 1, dy: 1 },
  { name: "south", bearing: 180, dx: 0, dy: 1 },
  { name: "southwest", bearing: 225, dx: -1, dy: 1 },
  { name: "west", bearing: 270, dx: -1, dy: 0 },
  { name: "northwest", bearing: 315, dx: -1, dy: -1 },
];

const terrainNames = ["open ground", "forest cover", "ridge line", "road junction", "urban edge"];

const state = {
  objectiveHealth: 100,
  ammo: { he: 18, smoke: 4, illumination: 4 },
  enemy: null,
  enemyHp: 4,
  enemySuppressedUntil: 0,
  enemyRelocated: false,
  wind: null,
  gameOver: false,
  busy: false,
  activeTimers: [],
  countdownInterval: null,
  countdownDeadline: 0,
  countdownLabel: "Ready",
  clueMemory: [],
  shotCount: 0,
};

const elements = {
  chatLog: document.querySelector("#chatLog"),
  commandForm: document.querySelector("#commandForm"),
  commandInput: document.querySelector("#commandInput"),
  sendButton: document.querySelector("#sendButton"),
  newGameButton: document.querySelector("#newGameButton"),
  objectiveValue: document.querySelector("#objectiveValue"),
  ammoHe: document.querySelector("#ammoHe"),
  ammoSmoke: document.querySelector("#ammoSmoke"),
  ammoIllumination: document.querySelector("#ammoIllumination"),
  windValue: document.querySelector("#windValue"),
  enemyStatusValue: document.querySelector("#enemyStatusValue"),
  timerValue: document.querySelector("#timerValue"),
};

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomFloat(min, max) {
  return Math.random() * (max - min) + min;
}

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function distance(a, b) {
  return Math.hypot(a.x - b.x, a.y - b.y);
}

function normalizeBearing(value) {
  return ((value % 360) + 360) % 360;
}

function bearingFromTo(origin, target) {
  const dx = target.x - origin.x;
  const dy = target.y - origin.y;
  const radians = Math.atan2(dx, -dy);
  return normalizeBearing((radians * 180) / Math.PI);
}

function bearingText(value) {
  return `${String(Math.round(normalizeBearing(value))).padStart(3, "0")} deg`;
}

function rangeText(value) {
  return `${value.toFixed(1)} km`;
}

function positionReport(position, origin = BATTERY_POSITION) {
  return `${bearingText(bearingFromTo(origin, position))}, ${rangeText(distance(origin, position))}`;
}

function bearingRangeToPosition(bearing, rangeKm) {
  const radians = (normalizeBearing(bearing) * Math.PI) / 180;

  return {
    x: BATTERY_POSITION.x + Math.sin(radians) * rangeKm,
    y: BATTERY_POSITION.y - Math.cos(radians) * rangeKm,
  };
}

function chooseWind() {
  const direction = windDirections[randomInt(0, windDirections.length - 1)];
  const strength = randomInt(0, 2);
  const label = strength === 0 ? "calm" : strength === 1 ? "light" : "moderate";
  return { ...direction, strength, label };
}

function chooseEnemyPosition() {
  const candidates = [
    { x: 1.6, y: 1.4, terrain: "forest cover" },
    { x: 2.8, y: 3.1, terrain: "ridge line" },
    { x: 8.4, y: 1.3, terrain: "urban edge" },
    { x: 10.2, y: 4.2, terrain: "road junction" },
    { x: 9.0, y: 8.4, terrain: "forest cover" },
    { x: 11.0, y: 9.8, terrain: "open ground" },
    { x: 7.3, y: 9.2, terrain: "ridge line" },
    { x: 3.4, y: 2.2, terrain: "forest cover" },
  ];

  return { ...candidates[randomInt(0, candidates.length - 1)] };
}

function message(sender, text, tone = "") {
  const entry = document.createElement("article");
  entry.className = `message ${tone}`.trim();

  const label = document.createElement("span");
  label.className = "sender";
  label.textContent = sender;

  const body = document.createElement("span");
  body.textContent = text;

  entry.append(label, body);
  elements.chatLog.appendChild(entry);
  elements.chatLog.scrollTop = elements.chatLog.scrollHeight;
}

function setTimer(callback, delay) {
  const id = window.setTimeout(() => {
    state.activeTimers = state.activeTimers.filter((timerId) => timerId !== id);
    callback();
  }, delay);

  state.activeTimers.push(id);
  return id;
}

function clearTimers() {
  for (const id of state.activeTimers) {
    window.clearTimeout(id);
  }

  state.activeTimers = [];
  clearCountdown();
}

function clearCountdown() {
  if (state.countdownInterval) {
    window.clearInterval(state.countdownInterval);
  }

  state.countdownInterval = null;
  state.countdownDeadline = 0;
  state.countdownLabel = "Ready";
  updateCountdownDisplay();
}

function updateCountdownDisplay() {
  if (!elements.timerValue) return;

  if (!state.countdownDeadline) {
    elements.timerValue.textContent = state.countdownLabel;
    return;
  }

  const remaining = Math.max(0, state.countdownDeadline - Date.now());
  elements.timerValue.textContent = `${state.countdownLabel} ${(remaining / 1000).toFixed(1)}s`;

  if (remaining <= 0 && state.countdownInterval) {
    window.clearInterval(state.countdownInterval);
    state.countdownInterval = null;
    state.countdownDeadline = 0;
    state.countdownLabel = "Resolving";
    elements.timerValue.textContent = "Resolving";
  }
}

function startCountdown(label, durationMs) {
  if (state.countdownInterval) {
    window.clearInterval(state.countdownInterval);
  }

  state.countdownLabel = label;
  state.countdownDeadline = Date.now() + durationMs;
  updateCountdownDisplay();
  state.countdownInterval = window.setInterval(updateCountdownDisplay, 100);
}

function renderStatus() {
  elements.objectiveValue.textContent = `${state.objectiveHealth}%`;
  elements.ammoHe.textContent = String(state.ammo.he);
  elements.ammoSmoke.textContent = String(state.ammo.smoke);
  elements.ammoIllumination.textContent = String(state.ammo.illumination);
  elements.windValue.textContent = `${state.wind.name}, ${state.wind.label}`;
  elements.enemyStatusValue.textContent =
    state.enemyHp <= 0 ? "Destroyed" : state.gameOver ? "Resolved" : "Unlocated";
  elements.sendButton.disabled = state.gameOver;
  updateCountdownDisplay();
}

function rangeBand(origin, target) {
  const d = distance(origin, target);

  if (d < 4.5) return "inside 4.5 km";
  if (d < 7.5) return "between 4.5 and 7.5 km";
  if (d < 10) return "between 7.5 and 10 km";
  return "beyond 10 km";
}

function addClue(text) {
  state.clueMemory.unshift(text);
  state.clueMemory = state.clueMemory.slice(0, 8);
}

function generateEnemyClues() {
  const trueBearing = bearingFromTo(BATTERY_POSITION, state.enemy);
  const flashBearing = normalizeBearing(trueBearing + randomInt(-10, 10));
  const radarBearing = normalizeBearing(trueBearing + randomInt(-8, 8));
  const radarRange = clamp(distance(BATTERY_POSITION, state.enemy) + randomFloat(-0.8, 0.8), 1, 14);
  const radioFeature = state.enemy.terrain || terrainNames[randomInt(0, terrainNames.length - 1)];

  const clues = [
    `Flash team reports a muzzle signature near bearing ${bearingText(flashBearing)}.`,
    `Sound ranging places the firing point ${rangeBand(BATTERY_POSITION, state.enemy)} from our battery.`,
    `Counter-battery radar estimates origin near bearing ${bearingText(radarBearing)}, range ${rangeText(radarRange)}. Confidence low.`,
    `Radio intercept mentions movement near ${radioFeature}. Traffic is brief and partially masked.`,
  ];

  for (const clue of clues) {
    addClue(clue);
    message("Intelligence", clue);
  }
}

function calculateTravelTime(rangeKm) {
  const seconds = 6 + rangeKm * 2.35 + rangeKm * rangeKm * 0.055;
  return Math.round(seconds * 1000);
}

function scatterTarget(target, shell) {
  const scatterKm = shell === "he" ? 0.65 : 0.25;
  const windPushKm = shell === "smoke" ? (state.wind.strength + 1) * 0.35 : state.wind.strength * 0.25;

  return {
    x: target.x + randomFloat(-scatterKm, scatterKm) + state.wind.dx * windPushKm,
    y: target.y + randomFloat(-scatterKm, scatterKm) + state.wind.dy * windPushKm,
  };
}

function correctionText(impact) {
  const trueRange = distance(BATTERY_POSITION, state.enemy);
  const impactRange = distance(BATTERY_POSITION, impact);
  const rangeDelta = impactRange - trueRange;
  const trueBearing = bearingFromTo(BATTERY_POSITION, state.enemy);
  const impactBearing = bearingFromTo(BATTERY_POSITION, impact);
  let bearingDelta = normalizeBearing(impactBearing - trueBearing);

  if (bearingDelta > 180) bearingDelta -= 360;

  const rangeWord = Math.abs(rangeDelta) < 0.7 ? "range good" : rangeDelta < 0 ? "short" : "over";
  const lateralWord = Math.abs(bearingDelta) < 5 ? "line good" : bearingDelta > 0 ? "right" : "left";

  if (rangeWord === "range good" && lateralWord === "line good") {
    return "Spotter reports splash on the correct line. Battery may be within lethal radius.";
  }

  return `Spotter correction: ${rangeWord}, ${lateralWord}. Adjust by roughly ${rangeText(Math.abs(rangeDelta))} and ${Math.abs(Math.round(bearingDelta))} deg.`;
}

function resolveHeImpact(impact) {
  const d = distance(impact, state.enemy);
  let damage = 0;

  if (d < 0.55) damage = 2;
  else if (d < 1.25) damage = 1;

  if (damage > 0 && ["forest cover", "ridge line", "urban edge"].includes(state.enemy.terrain)) {
    if (Math.random() < 0.45) damage -= 1;
  }

  if (d < 1.8) {
    state.enemySuppressedUntil = Date.now() + 10000;
  }

  if (damage > 0) {
    state.enemyHp -= damage;
    message(
      "Observer",
      damage >= 2
        ? "Secondary detonations heard after impact. Major damage likely."
        : "Near-target burst. Enemy fire control appears disrupted.",
      "success",
    );
  } else if (d < 1.8) {
    message("Observer", "Close burst. Enemy activity reduced, but no confirmed kill.", "warning");
  } else {
    message("Observer", correctionText(impact));
  }

  if (state.enemyHp <= 0) {
    endGame(true);
  }
}

function resolveSmokeImpact(impact) {
  message(
    "Observer",
    `Smoke is building near ${positionReport(impact)}. Enemy next salvo should be less accurate.`,
    "warning",
  );
  state.enemySuppressedUntil = Date.now() + 6500;
}

function resolveIlluminationImpact(impact) {
  if (distance(impact, state.enemy) <= 1.8) {
    const clue = `Illumination catches movement and muzzle residue near ${positionReport(state.enemy)}.`;
    addClue(clue);
    message("Recon Drone", clue, "success");
  } else {
    message("Recon Drone", `Illumination over ${positionReport(impact)} reveals no active firing point.`);
  }
}

function enemyFire() {
  if (state.gameOver) return;

  state.busy = false;
  clearCountdown();
  const suppressed = Date.now() < state.enemySuppressedUntil;
  const damage = suppressed ? randomInt(4, 8) : randomInt(10, 16);
  state.objectiveHealth = clamp(state.objectiveHealth - damage, 0, 100);

  message(
    "Enemy Battery",
    `Enemy counterfire received after a random delay. Protected site takes ${damage}% damage.`,
    "danger",
  );
  generateEnemyClues();

  if (state.objectiveHealth <= 0) {
    endGame(false);
    return;
  }

  if (!state.enemyRelocated && state.shotCount >= 2 && Math.random() < 0.32) {
    relocateEnemy();
  }

  renderStatus();
  elements.commandInput.focus();
}

function scheduleEnemyResponse(travelTime) {
  const remainingWindow = Math.max(0, COUNTERFIRE_WINDOW_MS - travelTime);
  const enemyDelay =
    remainingWindow > 0 ? randomFloat(0, remainingWindow) : randomFloat(250, 750);
  const totalSeconds = ((travelTime + enemyDelay) / 1000).toFixed(1);
  const windowText =
    remainingWindow > 0
      ? `Remaining counterfire window after impact: ${(remainingWindow / 1000).toFixed(1)}s.`
      : "Shell flight exceeded the 10.0s counterfire window; response may arrive immediately after impact.";

  message(
    "Operations",
    `${windowText} Current estimate: response by T+${totalSeconds}s from launch.`,
    "pending",
  );

  setTimer(enemyFire, enemyDelay);
  startCountdown("Counterfire", enemyDelay);
}

function relocateEnemy() {
  const oldBearing = positionReport(state.enemy);
  const options = [
    { x: 10.4, y: 10.1, terrain: "road junction" },
    { x: 8.1, y: 8.2, terrain: "forest cover" },
    { x: 2.3, y: 2.1, terrain: "ridge line" },
    { x: 9.4, y: 3.2, terrain: "urban edge" },
    { x: 3.1, y: 9.3, terrain: "forest cover" },
  ].filter((site) => distance(site, state.enemy) > 3);

  state.enemy = { ...options[randomInt(0, options.length - 1)] };
  state.enemyRelocated = true;

  const clue = `Recon reports dust and engine noise leaving the previous estimate at ${oldBearing}. Battery likely displaced toward cover or road access.`;
  addClue(clue);
  message("Recon", clue, "warning");
}

function fireShell(target, shell, fireBearing, fireRange) {
  if (state.ammo[shell] <= 0) {
    message("Operations", `${shellLabels[shell]} ammunition depleted.`, "warning");
    return;
  }

  state.busy = true;
  state.shotCount += 1;
  state.ammo[shell] -= 1;
  renderStatus();

  const travelTime = calculateTravelTime(fireRange);
  const seconds = (travelTime / 1000).toFixed(1);

  message(
    "Fire Direction",
    `Fire mission accepted: ${shellLabels[shell]}, bearing ${bearingText(fireBearing)}, range ${rangeText(fireRange)}. Estimated time of flight ${seconds}s.`,
    "player",
  );

  startCountdown("Splash", travelTime);

  setTimer(() => {
    if (state.gameOver) return;

    const impact = scatterTarget(target, shell);
    message("Impact Report", `Splash observed near ${positionReport(impact)}.`);

    if (shell === "he") resolveHeImpact(impact);
    if (shell === "smoke") resolveSmokeImpact(impact);
    if (shell === "illumination") resolveIlluminationImpact(impact);

    if (!state.gameOver) {
      scheduleEnemyResponse(travelTime);
      renderStatus();
    }
  }, travelTime);
}

function showIntel() {
  if (state.clueMemory.length === 0) {
    message("Intelligence", "No firm reports yet. Fire a ranging round or wait for enemy contact.");
    return;
  }

  message("Intelligence", state.clueMemory.map((clue, index) => `${index + 1}. ${clue}`).join("\n"));
}

function showStatus() {
  message(
    "Operations",
    [
      `Protected site integrity: ${state.objectiveHealth}%.`,
      `Ammunition: HE ${state.ammo.he}, smoke ${state.ammo.smoke}, illumination ${state.ammo.illumination}.`,
      `Surface wind: ${state.wind.name}, ${state.wind.label}.`,
      `Enemy battery status: ${state.enemyHp <= 0 ? "destroyed" : "unlocated"}.`,
    ].join("\n"),
  );
}

function showHelp() {
  message(
    "Operations",
    [
      "Commands:",
      "fire 045 8.5 he - fire high explosive on bearing 045 deg at 8.5 km.",
      "fire 070 6 smoke - lay smoke on bearing 070 deg at 6 km.",
      "fire 315 9 illum - fire illumination on bearing 315 deg at 9 km.",
      "scan - request the current intelligence summary.",
      "intel - same as scan.",
      "status - show protected site condition, ammunition, wind, and enemy status.",
      "help - show this command list.",
      "",
      "Time of flight uses a simplified indirect-fire table and the wait is real time.",
      "Use intelligence reports to estimate bearing and range. Spotters will report short/over and left/right corrections after impact.",
    ].join("\n"),
  );
}

function parseFireCommand(parts) {
  const bearing = Number.parseFloat(parts[1]);
  const rangeKm = Number.parseFloat(parts[2]);
  const shellAlias = parts[3] || "he";
  const shell = shellAlias === "illum" || shellAlias === "flare" ? "illumination" : shellAlias;

  if (!Number.isFinite(bearing) || bearing < 0 || bearing >= 360) {
    message("Operations", "Invalid bearing. Use degrees from 000 to 359, for example: fire 045 8.5 he.", "warning");
    return;
  }

  if (!Number.isFinite(rangeKm) || rangeKm < 1 || rangeKm > 14) {
    message("Operations", "Invalid range. Use kilometers from 1.0 to 14.0, for example: fire 045 8.5 he.", "warning");
    return;
  }

  if (!shellLabels[shell]) {
    message("Operations", "Unknown shell type. Use he, smoke, or illum.", "warning");
    return;
  }

  fireShell(bearingRangeToPosition(bearing, rangeKm), shell, bearing, rangeKm);
}

function parseCommand(rawCommand) {
  const raw = rawCommand.trim();
  const command = raw.toLowerCase();

  if (!raw) return;

  message("You", raw, "player");

  if (state.gameOver) {
    message("Operations", "Mission is over. Start a new mission to continue.", "warning");
    return;
  }

  if (command === "help" || command === "?") {
    showHelp();
    return;
  }

  if (command === "scan" || command === "intel") {
    showIntel();
    return;
  }

  if (command === "status") {
    showStatus();
    return;
  }

  const parts = command.split(/\s+/);

  if (parts[0] === "fire") {
    if (state.busy) {
      message(
        "Operations",
        "Fire mission exchange still active. Wait for impact and enemy response before firing again.",
        "warning",
      );
      return;
    }

    parseFireCommand(parts);
    return;
  }

  message("Operations", "Unknown command. Type help for options.", "warning");
}

function endGame(victory) {
  state.gameOver = true;
  state.busy = false;
  clearTimers();

  if (victory) {
    message("Mission Complete", "Enemy battery destroyed. Counter-battery mission successful.", "success");
  } else {
    message("Mission Failed", "The protected site has been neutralized.", "danger");
  }

  renderStatus();
}

function resetGame() {
  clearTimers();
  state.objectiveHealth = 100;
  state.ammo = { he: 18, smoke: 4, illumination: 4 };
  state.enemy = chooseEnemyPosition();
  state.enemyHp = 4;
  state.enemySuppressedUntil = 0;
  state.enemyRelocated = false;
  state.wind = chooseWind();
  state.gameOver = false;
  state.busy = false;
  state.clueMemory = [];
  state.shotCount = 0;
  elements.chatLog.innerHTML = "";
  elements.commandInput.value = "";

  message("Operations", "Mission started. Enemy battery is unlocated somewhere beyond the forward line.");
  message("Operations", "Type help for fire command format. Protect the site and destroy the enemy battery.");
  message("Intelligence", "Initial assessment: enemy likely operating from cover, a ridge line, a road junction, or an urban edge.");
  renderStatus();
  elements.commandInput.focus();
}

elements.commandForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const command = elements.commandInput.value;
  elements.commandInput.value = "";
  parseCommand(command);
});

elements.newGameButton.addEventListener("click", resetGame);

resetGame();
