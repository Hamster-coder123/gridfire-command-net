const MAX_RADAR_RANGE_KM = 80;
const MAX_TRACKS = 5;

const AIRCRAFT_TYPES = [
  {
    name: "MiG-29 Fulcrum",
    signature: "sharp fighter return; unstable bearing; intermittent high-speed closure",
    radarCode: "F29",
    hp: 3,
    speedKmMin: [13, 18],
    altitude: [4500, 10500],
    startRange: [56, 78],
    maneuver: 0.22,
    radarSize: 0.62,
    heat: 0.9,
    lowAltitude: 0.1,
    blipRadius: 2.3,
    threat: 22,
  },
  {
    name: "Su-24 Fencer",
    signature: "large strike-aircraft return; steady track; medium-altitude ingress",
    radarCode: "S24",
    hp: 4,
    speedKmMin: [10, 14],
    altitude: [2500, 7600],
    startRange: [52, 74],
    maneuver: 0.12,
    radarSize: 0.82,
    heat: 0.74,
    lowAltitude: 0.18,
    blipRadius: 3.1,
    threat: 30,
  },
  {
    name: "Tu-22M Backfire",
    signature: "very large bomber return; stable bearing; high-altitude long-range track",
    radarCode: "B22",
    hp: 5,
    speedKmMin: [12, 17],
    altitude: [7800, 12000],
    startRange: [64, 80],
    maneuver: 0.06,
    radarSize: 1,
    heat: 0.85,
    lowAltitude: 0,
    blipRadius: 3.8,
    threat: 42,
  },
  {
    name: "Shahed-type UAV",
    signature: "small weak echo; slow propeller contact; low-altitude approach",
    radarCode: "UAV",
    hp: 2,
    speedKmMin: [2.6, 3.6],
    altitude: [500, 1800],
    startRange: [28, 54],
    maneuver: 0.05,
    radarSize: 0.18,
    heat: 0.42,
    lowAltitude: 0.42,
    blipRadius: 1.7,
    threat: 16,
  },
  {
    name: "Cruise Missile",
    signature: "thin terrain-following return; low altitude; fast closing track",
    radarCode: "CM",
    hp: 2,
    speedKmMin: [11, 15],
    altitude: [60, 420],
    startRange: [30, 58],
    maneuver: 0.18,
    radarSize: 0.22,
    heat: 0.55,
    lowAltitude: 0.5,
    blipRadius: 1.5,
    threat: 38,
  },
  {
    name: "Il-76 Candid",
    signature: "huge slow transport return; bright radar echo; low maneuver",
    radarCode: "IL76",
    hp: 5,
    speedKmMin: [8, 11],
    altitude: [5200, 9800],
    startRange: [60, 80],
    maneuver: 0.03,
    radarSize: 1,
    heat: 0.68,
    lowAltitude: 0.03,
    blipRadius: 4.1,
    threat: 24,
  },
];

const WEAPONS = {
  ir: {
    label: "IR missile",
    ammoLabel: "IR",
    maxRange: 18,
    minRange: 1.5,
    basePk: 0.76,
    flightBase: 2.1,
    flightPerKm: 0.24,
    damage: 2,
  },
  arh: {
    label: "ARH missile",
    ammoLabel: "ARH",
    maxRange: 58,
    minRange: 4,
    basePk: 0.82,
    flightBase: 3.8,
    flightPerKm: 0.33,
    damage: 2,
  },
  sarh: {
    label: "SARH missile",
    ammoLabel: "SARH",
    maxRange: 48,
    minRange: 3,
    basePk: 0.78,
    flightBase: 3.2,
    flightPerKm: 0.31,
    damage: 2,
  },
  gun: {
    label: "gun burst",
    ammoLabel: "Gun",
    maxRange: 6,
    minRange: 0.4,
    basePk: 0.56,
    flightBase: 1.0,
    flightPerKm: 0.18,
    damage: 1,
  },
};

const state = {
  siteHealth: 100,
  ammo: { ir: 4, arh: 4, sarh: 4, gun: 10 },
  tracks: [],
  nextTrackNumber: 1,
  busy: false,
  gameOver: false,
  activeTimers: [],
  countdownInterval: null,
  countdownDeadline: 0,
  countdownLabel: "Ready",
  contactInterval: null,
  spawnInterval: null,
};

const elements = {
  chatLog: document.querySelector("#chatLog"),
  commandForm: document.querySelector("#commandForm"),
  commandInput: document.querySelector("#commandInput"),
  sendButton: document.querySelector("#sendButton"),
  newGameButton: document.querySelector("#newGameButton"),
  siteValue: document.querySelector("#siteValue"),
  irValue: document.querySelector("#irValue"),
  arhValue: document.querySelector("#arhValue"),
  sarhValue: document.querySelector("#sarhValue"),
  trackCountValue: document.querySelector("#trackCountValue"),
  priorityValue: document.querySelector("#priorityValue"),
  timerValue: document.querySelector("#timerValue"),
  radarReadout: document.querySelector("#radarReadout"),
  blipGroup: document.querySelector("#blipGroup"),
};

function randomFloat(min, max) {
  return Math.random() * (max - min) + min;
}

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function normalizeBearing(value) {
  return ((value % 360) + 360) % 360;
}

function bearingText(value) {
  return `${String(Math.round(normalizeBearing(value))).padStart(3, "0")} deg`;
}

function rangeText(value) {
  return `${value.toFixed(1)} km`;
}

function altitudeText(value) {
  return `${Math.round(value)} m`;
}

function angularDifference(a, b) {
  let diff = normalizeBearing(a - b);
  if (diff > 180) diff -= 360;
  return diff;
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

function createTrack() {
  const aircraft = AIRCRAFT_TYPES[randomInt(0, AIRCRAFT_TYPES.length - 1)];
  const id = `T${state.nextTrackNumber}`;
  state.nextTrackNumber += 1;

  return {
    id,
    aircraft,
    hp: aircraft.hp,
    bearing: randomInt(10, 350),
    range: randomFloat(aircraft.startRange[0], aircraft.startRange[1]),
    altitude: randomInt(aircraft.altitude[0], aircraft.altitude[1]),
    speedKmMin: randomFloat(aircraft.speedKmMin[0], aircraft.speedKmMin[1]),
    lastReportedRange: 0,
  };
}

function addTrack(announce = true) {
  if (state.tracks.length >= MAX_TRACKS || state.gameOver) return;

  const track = createTrack();
  state.tracks.push(track);

  if (announce) {
    message(
      "Radar",
      `${track.id} acquired: ${track.aircraft.name}. Signature: ${track.aircraft.signature}.`,
      "warning",
    );
  }

  renderStatus();
}

function scheduleNextSpawn() {
  if (state.spawnInterval) {
    window.clearTimeout(state.spawnInterval);
  }

  state.spawnInterval = window.setTimeout(() => {
    if (!state.gameOver) {
      addTrack(true);
      scheduleNextSpawn();
    }
  }, randomInt(14000, 26000));
}

function getPriorityTrack() {
  if (state.tracks.length === 0) return null;

  return [...state.tracks].sort((a, b) => {
    const aScore = a.aircraft.threat - a.range * 0.45;
    const bScore = b.aircraft.threat - b.range * 0.45;
    return bScore - aScore;
  })[0];
}

function findTrack(id) {
  return state.tracks.find((track) => track.id.toLowerCase() === id.toLowerCase());
}

function renderRadar() {
  elements.blipGroup.innerHTML = "";

  if (state.tracks.length === 0 || state.gameOver) {
    elements.radarReadout.textContent = "No active tracks.";
    return;
  }

  for (const track of state.tracks) {
    const radius = clamp(track.range / MAX_RADAR_RANGE_KM, 0, 1) * 45;
    const radians = (normalizeBearing(track.bearing) * Math.PI) / 180;
    const x = 50 + Math.sin(radians) * radius;
    const y = 50 - Math.cos(radians) * radius;
    const blip = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    const label = document.createElementNS("http://www.w3.org/2000/svg", "text");

    blip.setAttribute("class", "radar-blip");
    blip.setAttribute("cx", String(x));
    blip.setAttribute("cy", String(y));
    blip.setAttribute("r", String(track.aircraft.blipRadius));

    label.setAttribute("class", "radar-label");
    label.setAttribute("x", String(clamp(x + 4, 8, 78)));
    label.setAttribute("y", String(clamp(y - 2, 8, 94)));
    label.textContent = track.id;

    elements.blipGroup.append(blip, label);
  }

  const priority = getPriorityTrack();
  elements.radarReadout.textContent = priority
    ? `PRIORITY ${priority.id}: ${priority.aircraft.radarCode} / ${bearingText(priority.bearing)} / ${rangeText(priority.range)} / ${altitudeText(priority.altitude)}`
    : "No active tracks.";
}

function renderStatus() {
  const priority = getPriorityTrack();
  elements.siteValue.textContent = `${state.siteHealth}%`;
  elements.irValue.textContent = String(state.ammo.ir);
  elements.arhValue.textContent = String(state.ammo.arh);
  elements.sarhValue.textContent = String(state.ammo.sarh);
  elements.trackCountValue.textContent = String(state.tracks.length);
  elements.priorityValue.textContent = priority ? priority.id : "---";
  elements.sendButton.disabled = state.gameOver;
  updateCountdownDisplay();
  renderRadar();
}

function updateTracks() {
  if (state.gameOver) return;

  for (const track of [...state.tracks]) {
    const previousRange = track.range;
    track.range = Math.max(0, track.range - track.speedKmMin / 60);
    track.bearing = normalizeBearing(track.bearing + randomFloat(-0.28, 0.28) * (1 + track.aircraft.maneuver));
    track.altitude = clamp(track.altitude + randomFloat(-32, 24), track.aircraft.altitude[0], track.aircraft.altitude[1]);

    if (previousRange > 20 && track.range <= 20) {
      message("Radar", `${track.id} crossed 20 km. ${track.aircraft.name} now inside close defense zone.`, "danger");
    }

    if (track.range <= 0) {
      state.siteHealth = clamp(state.siteHealth - track.aircraft.threat, 0, 100);
      message(
        "Impact Warning",
        `${track.id} ${track.aircraft.name} reached release point. Site integrity now ${state.siteHealth}%.`,
        "danger",
      );
      state.tracks = state.tracks.filter((candidate) => candidate !== track);
    }
  }

  if (state.siteHealth <= 0) {
    endGame(false);
    return;
  }

  renderStatus();
}

function weaponFlightTime(rangeKm, weaponKey) {
  const weapon = WEAPONS[weaponKey];
  const seconds = weapon.flightBase + rangeKm * weapon.flightPerKm;
  return Math.round(seconds * 1000);
}

function rangeEnvelopePenalty(rangeKm, weaponKey) {
  const weapon = WEAPONS[weaponKey];

  if (rangeKm < weapon.minRange) return (weapon.minRange - rangeKm) * 0.2 + 0.18;
  if (rangeKm > weapon.maxRange) return (rangeKm - weapon.maxRange) * 0.05 + 0.22;

  if (weaponKey === "ir") {
    return rangeKm > 12 ? (rangeKm - 12) * 0.025 : 0;
  }

  if (weaponKey === "arh") {
    return rangeKm < 10 ? (10 - rangeKm) * 0.025 : rangeKm > 45 ? (rangeKm - 45) * 0.012 : 0;
  }

  if (weaponKey === "sarh") {
    return rangeKm < 8 ? (8 - rangeKm) * 0.02 : rangeKm > 38 ? (rangeKm - 38) * 0.016 : 0;
  }

  return rangeKm > 4 ? (rangeKm - 4) * 0.12 : 0;
}

function calculateHitChance(track, weaponKey) {
  const weapon = WEAPONS[weaponKey];
  const aircraft = track.aircraft;
  let chance = weapon.basePk;

  chance -= rangeEnvelopePenalty(track.range, weaponKey);
  chance -= aircraft.maneuver * 0.42;
  chance -= track.speedKmMin > 14 ? 0.08 : 0;

  if (weaponKey === "ir") {
    chance += aircraft.heat * 0.18;
    chance -= aircraft.lowAltitude * 0.12;
    chance -= track.range > 14 ? 0.12 : 0;
  } else if (weaponKey === "arh") {
    chance += aircraft.radarSize * 0.08;
    chance -= aircraft.lowAltitude * 0.18;
    chance -= aircraft.radarSize < 0.3 ? 0.1 : 0;
  } else if (weaponKey === "sarh") {
    chance += aircraft.radarSize * 0.16;
    chance -= aircraft.lowAltitude * 0.24;
    chance -= aircraft.maneuver * 0.12;
  } else if (weaponKey === "gun") {
    chance -= track.range > 4 ? 0.16 : 0;
    chance -= track.altitude > 3000 ? 0.22 : 0;
    chance += aircraft.radarSize < 0.3 ? 0.06 : 0;
  }

  return clamp(chance, weaponKey === "gun" ? 0.02 : 0.04, weaponKey === "gun" ? 0.72 : 0.9);
}

function solutionQuality(hitChance) {
  if (hitChance >= 0.75) return "high";
  if (hitChance >= 0.5) return "medium";
  if (hitChance >= 0.25) return "poor";
  return "marginal";
}

function resolveIntercept(trackId, weaponKey) {
  const track = findTrack(trackId);
  if (!track || state.gameOver) {
    message("Fire Control", `${trackId} lost before intercept. No result.`, "warning");
    state.busy = false;
    clearCountdown();
    renderStatus();
    return;
  }

  const hitChance = calculateHitChance(track, weaponKey);
  const weapon = WEAPONS[weaponKey];

  if (Math.random() < hitChance) {
    track.hp -= weapon.damage;
    message(
      "Fire Control",
      track.hp <= 0
        ? `${track.id} ${track.aircraft.name} destroyed. Track dropped from scope.`
        : `${track.id} ${track.aircraft.name} damaged. Track remains inbound.`,
      track.hp <= 0 ? "success" : "warning",
    );

    if (track.hp <= 0) {
      state.tracks = state.tracks.filter((candidate) => candidate !== track);
    }
  } else {
    message(
      "Fire Control",
      `${weapon.label} missed ${track.id}. Solution quality ${solutionQuality(hitChance)}. Track still inbound at ${rangeText(track.range)}.`,
      "warning",
    );
  }

  state.busy = false;
  clearCountdown();
  renderStatus();
  elements.commandInput.focus();
}

function fireWeapon(trackId, weaponKey) {
  const track = findTrack(trackId);

  if (state.busy) {
    message("Operations", "Engagement already active. Wait for intercept result.", "warning");
    return;
  }

  if (!track) {
    message("Operations", `No track ${trackId.toUpperCase()} on scope. Use tracks to list active contacts.`, "warning");
    return;
  }

  if (!WEAPONS[weaponKey]) {
    message("Operations", "Unknown weapon. Use ir, arh, sarh, or gun.", "warning");
    return;
  }

  if (state.ammo[weaponKey] <= 0) {
    message("Operations", `${WEAPONS[weaponKey].ammoLabel} ammunition depleted.`, "warning");
    return;
  }

  state.busy = true;
  state.ammo[weaponKey] -= 1;
  const flightTime = weaponFlightTime(track.range, weaponKey);
  const pk = calculateHitChance(track, weaponKey);

  message(
    "Weapons",
    `${WEAPONS[weaponKey].label} away on ${track.id}. ${track.aircraft.name}, bearing ${bearingText(track.bearing)}, range ${rangeText(track.range)}. Estimated Pk ${(pk * 100).toFixed(0)}%. Time to intercept ${(flightTime / 1000).toFixed(1)}s.`,
    "player",
  );

  startCountdown("Intercept", flightTime);
  renderStatus();
  setTimer(() => resolveIntercept(track.id, weaponKey), flightTime);
}

function formatTrack(track) {
  return [
    `${track.id}: ${track.aircraft.name}`,
    `Signature: ${track.aircraft.signature}`,
    `Bearing ${bearingText(track.bearing)} / Range ${rangeText(track.range)} / Altitude ${altitudeText(track.altitude)}`,
    `Speed ${track.speedKmMin.toFixed(1)} km/min / Radar code ${track.aircraft.radarCode}`,
  ].join("\n");
}

function showTracks() {
  if (state.tracks.length === 0) {
    message("Radar", "No active tracks.");
    return;
  }

  message("Radar", state.tracks.map(formatTrack).join("\n\n"));
}

function showTrack(trackId) {
  if (!trackId) {
    showTracks();
    return;
  }

  const track = findTrack(trackId);
  if (!track) {
    message("Radar", `No active track ${trackId.toUpperCase()}.`, "warning");
    return;
  }

  message("Radar", formatTrack(track));
}

function showStatus() {
  const priority = getPriorityTrack();
  message(
    "Operations",
    [
      `Protected site integrity: ${state.siteHealth}%.`,
      `Ammunition: IR ${state.ammo.ir}, ARH ${state.ammo.arh}, SARH ${state.ammo.sarh}, gun bursts ${state.ammo.gun}.`,
      `Active tracks: ${state.tracks.length}.`,
      priority ? `Priority track: ${priority.id} ${priority.aircraft.name}, ${rangeText(priority.range)}.` : "Priority track: none.",
    ].join("\n"),
  );
}

function showHelp() {
  message(
    "Operations",
    [
      "Commands:",
      "tracks - list all active radar tracks.",
      "track T1 - read one radar track.",
      "status - show site condition and ammunition.",
      "fire T1 ir - fire infrared missile at T1.",
      "fire T1 arh - fire active-radar missile at T1.",
      "fire T1 sarh - fire semi-active radar missile at T1.",
      "fire T1 gun - fire close-defense gun burst at T1.",
      "help - show this command list.",
      "",
      "IR favors hot, close aircraft. ARH is the most flexible radar-guided option. SARH favors bright radar returns but suffers against low terrain-following contacts.",
    ].join("\n"),
  );
}

function parseCommand(rawCommand) {
  const raw = rawCommand.trim();
  const command = raw.toLowerCase();
  if (!raw) return;

  message("You", raw, "player");

  if (state.gameOver) {
    message("Operations", "Engagement is over. Start a new contact to continue.", "warning");
    return;
  }

  if (command === "help" || command === "?") {
    showHelp();
    return;
  }

  if (command === "tracks" || command === "radar") {
    showTracks();
    return;
  }

  if (command.startsWith("track ")) {
    showTrack(command.split(/\s+/)[1]);
    return;
  }

  if (command === "track") {
    showTracks();
    return;
  }

  if (command === "status") {
    showStatus();
    return;
  }

  const parts = command.split(/\s+/);
  if (parts[0] === "fire") {
    const trackId = parts[1] || "";
    const weaponKey = parts[2] || "arh";
    fireWeapon(trackId, weaponKey);
    return;
  }

  message("Operations", "Unknown command. Type help for options.", "warning");
}

function endGame(victory) {
  state.gameOver = true;
  state.busy = false;
  clearTimers();

  if (state.contactInterval) {
    window.clearInterval(state.contactInterval);
    state.contactInterval = null;
  }

  if (state.spawnInterval) {
    window.clearTimeout(state.spawnInterval);
    state.spawnInterval = null;
  }

  if (victory) {
    message("Engagement Complete", "Radar scope clear. Air defense site remains operational.", "success");
  } else {
    message("Engagement Failed", "Protected site has been neutralized.", "danger");
  }

  renderStatus();
}

function resetGame() {
  clearTimers();
  if (state.contactInterval) window.clearInterval(state.contactInterval);
  if (state.spawnInterval) window.clearTimeout(state.spawnInterval);

  state.siteHealth = 100;
  state.ammo = { ir: 4, arh: 4, sarh: 4, gun: 10 };
  state.tracks = [];
  state.nextTrackNumber = 1;
  state.busy = false;
  state.gameOver = false;
  elements.chatLog.innerHTML = "";
  elements.commandInput.value = "";

  addTrack(false);
  addTrack(false);
  message("Operations", "Air defense section online. Multiple radar tracks possible during this watch.");
  showTracks();
  message("Operations", "Type help for engagement commands.");
  renderStatus();

  state.contactInterval = window.setInterval(updateTracks, 1000);
  scheduleNextSpawn();
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
