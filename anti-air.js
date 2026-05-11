const MAX_RADAR_RANGE_KM = 80;
const COUNTERMEASURE_WINDOW_MS = 10000;

const state = {
  siteHealth: 100,
  ammo: { missile: 6, gun: 10 },
  contact: null,
  contactHp: 3,
  busy: false,
  gameOver: false,
  activeTimers: [],
  countdownInterval: null,
  countdownDeadline: 0,
  countdownLabel: "Ready",
  contactInterval: null,
};

const elements = {
  chatLog: document.querySelector("#chatLog"),
  commandForm: document.querySelector("#commandForm"),
  commandInput: document.querySelector("#commandInput"),
  sendButton: document.querySelector("#sendButton"),
  newGameButton: document.querySelector("#newGameButton"),
  siteValue: document.querySelector("#siteValue"),
  missileValue: document.querySelector("#missileValue"),
  gunValue: document.querySelector("#gunValue"),
  bearingValue: document.querySelector("#bearingValue"),
  rangeValue: document.querySelector("#rangeValue"),
  altitudeValue: document.querySelector("#altitudeValue"),
  timerValue: document.querySelector("#timerValue"),
  radarReadout: document.querySelector("#radarReadout"),
  blipGroup: document.querySelector("#blipGroup"),
  contactBlip: document.querySelector("#contactBlip"),
  contactLabel: document.querySelector("#contactLabel"),
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

function createContact() {
  return {
    bearing: randomInt(15, 345),
    range: randomFloat(54, 76),
    altitude: randomInt(3600, 9200),
    speed: randomFloat(0.34, 0.52),
    type: Math.random() > 0.5 ? "fast mover" : "low-observable track",
  };
}

function renderRadar() {
  const contact = state.contact;

  if (!contact || state.gameOver) {
    elements.blipGroup.style.display = "none";
    elements.radarReadout.textContent = "No active track.";
    return;
  }

  elements.blipGroup.style.display = "";
  const radius = clamp(contact.range / MAX_RADAR_RANGE_KM, 0, 1) * 45;
  const radians = (normalizeBearing(contact.bearing) * Math.PI) / 180;
  const x = 50 + Math.sin(radians) * radius;
  const y = 50 - Math.cos(radians) * radius;

  elements.contactBlip.setAttribute("cx", String(x));
  elements.contactBlip.setAttribute("cy", String(y));
  elements.contactLabel.setAttribute("x", String(clamp(x + 4, 8, 78)));
  elements.contactLabel.setAttribute("y", String(clamp(y - 2, 8, 94)));
  elements.contactLabel.textContent = "BLIP";
  elements.radarReadout.textContent = `TRACK: ${bearingText(contact.bearing)} / ${rangeText(contact.range)} / ${altitudeText(contact.altitude)}`;
}

function renderStatus() {
  const contact = state.contact;
  elements.siteValue.textContent = `${state.siteHealth}%`;
  elements.missileValue.textContent = String(state.ammo.missile);
  elements.gunValue.textContent = String(state.ammo.gun);
  elements.bearingValue.textContent = contact ? bearingText(contact.bearing) : "---";
  elements.rangeValue.textContent = contact ? rangeText(contact.range) : "---";
  elements.altitudeValue.textContent = contact ? altitudeText(contact.altitude) : "---";
  elements.sendButton.disabled = state.gameOver;
  updateCountdownDisplay();
  renderRadar();
}

function updateContact() {
  if (state.gameOver || !state.contact) return;

  state.contact.range = Math.max(0, state.contact.range - state.contact.speed);
  state.contact.bearing = normalizeBearing(state.contact.bearing + randomFloat(-0.35, 0.35));
  state.contact.altitude = clamp(state.contact.altitude + randomFloat(-35, 25), 700, 11000);

  if (state.contact.range <= 0) {
    state.siteHealth = clamp(state.siteHealth - randomInt(28, 40), 0, 100);
    message("Impact Warning", `Hostile aircraft reached release point. Site takes damage. Integrity now ${state.siteHealth}%.`, "danger");

    if (state.siteHealth <= 0) {
      endGame(false);
      return;
    }

    message("Operations", "New radar acquisition pending.", "pending");
    state.contact = createContact();
    state.contactHp = 3;
  }

  renderStatus();
}

function missileFlightTime(rangeKm) {
  const seconds = 3.5 + rangeKm * 0.42;
  return Math.round(seconds * 1000);
}

function gunBurstTime(rangeKm) {
  const seconds = 1.1 + rangeKm * 0.18;
  return Math.round(seconds * 1000);
}

function resolveIntercept(fireBearing, fireRange, weapon) {
  if (!state.contact || state.gameOver) return;

  const bearingError = Math.abs(angularDifference(fireBearing, state.contact.bearing));
  const rangeError = Math.abs(fireRange - state.contact.range);
  const altitudeFactor = state.contact.altitude > 7500 && weapon === "gun" ? 1.8 : 1;
  const score = bearingError / 5 + rangeError * altitudeFactor;
  const hitChance = weapon === "missile" ? clamp(0.92 - score * 0.11, 0.08, 0.92) : clamp(0.72 - score * 0.14, 0.04, 0.72);

  if (Math.random() < hitChance) {
    const damage = weapon === "missile" ? 2 : 1;
    state.contactHp -= damage;
    message(
      "Fire Control",
      state.contactHp <= 0
        ? "Track broken after intercept. Hostile aircraft destroyed."
        : "Burst observed near track. Contact damaged but still inbound.",
      state.contactHp <= 0 ? "success" : "warning",
    );
  } else {
    const rangeCall = fireRange < state.contact.range ? "short" : "long";
    const bearingCall = angularDifference(fireBearing, state.contact.bearing) < 0 ? "left" : "right";
    message("Fire Control", `No intercept. Correction: ${bearingCall}, ${rangeCall}. Track still inbound.`, "warning");
  }

  if (state.contactHp <= 0) {
    endGame(true);
    return;
  }

  state.busy = false;
  clearCountdown();
  renderStatus();
  elements.commandInput.focus();
}

function fireWeapon(bearing, rangeKm, weapon) {
  if (state.busy) {
    message("Operations", "Engagement already active. Wait for intercept result.", "warning");
    return;
  }

  if (state.ammo[weapon] <= 0) {
    message("Operations", `${weapon} ammunition depleted.`, "warning");
    return;
  }

  state.busy = true;
  state.ammo[weapon] -= 1;
  const flightTime = weapon === "missile" ? missileFlightTime(rangeKm) : gunBurstTime(rangeKm);

  message(
    "Weapons",
    `${weapon === "missile" ? "Missile" : "Gun burst"} away. Bearing ${bearingText(bearing)}, range ${rangeText(rangeKm)}. Time to intercept ${(flightTime / 1000).toFixed(1)}s.`,
    "player",
  );

  startCountdown("Intercept", flightTime);
  renderStatus();
  setTimer(() => resolveIntercept(bearing, rangeKm, weapon), flightTime);
}

function showTrack() {
  if (!state.contact) {
    message("Radar", "No active track.");
    return;
  }

  message(
    "Radar",
    [
      `Track classified as ${state.contact.type}.`,
      `Bearing ${bearingText(state.contact.bearing)}.`,
      `Range ${rangeText(state.contact.range)}.`,
      `Altitude ${altitudeText(state.contact.altitude)}.`,
      `Closing speed ${(state.contact.speed * 60).toFixed(1)} km/min.`,
    ].join("\n"),
  );
}

function showStatus() {
  message(
    "Operations",
    [
      `Protected site integrity: ${state.siteHealth}%.`,
      `Ammunition: missiles ${state.ammo.missile}, gun bursts ${state.ammo.gun}.`,
      state.contact
        ? `Active track: ${bearingText(state.contact.bearing)}, ${rangeText(state.contact.range)}, ${altitudeText(state.contact.altitude)}.`
        : "Active track: none.",
    ].join("\n"),
  );
}

function showHelp() {
  message(
    "Operations",
    [
      "Commands:",
      "track - read the current radar track.",
      "status - show site condition and ammunition.",
      "fire 045 32 missile - launch missile at bearing 045 deg, range 32 km.",
      "fire 050 4 gun - fire gun burst at bearing 050 deg, range 4 km.",
      "help - show this command list.",
      "",
      "Use the radar scope and track reports to fire near the current bearing and range. Missiles are best at long range; gun bursts are last-ditch close defense.",
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

  if (command === "track" || command === "radar") {
    showTrack();
    return;
  }

  if (command === "status") {
    showStatus();
    return;
  }

  const parts = command.split(/\s+/);
  if (parts[0] === "fire") {
    const bearing = Number.parseFloat(parts[1]);
    const rangeKm = Number.parseFloat(parts[2]);
    const weapon = parts[3] || "missile";

    if (!Number.isFinite(bearing) || bearing < 0 || bearing >= 360) {
      message("Operations", "Invalid bearing. Use degrees from 000 to 359, for example: fire 045 32 missile.", "warning");
      return;
    }

    if (!Number.isFinite(rangeKm) || rangeKm < 1 || rangeKm > MAX_RADAR_RANGE_KM) {
      message("Operations", "Invalid range. Use kilometers from 1.0 to 80.0.", "warning");
      return;
    }

    if (weapon !== "missile" && weapon !== "gun") {
      message("Operations", "Unknown weapon. Use missile or gun.", "warning");
      return;
    }

    fireWeapon(bearing, rangeKm, weapon);
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

  if (victory) {
    message("Engagement Complete", "Hostile aircraft destroyed. Air defense site remains operational.", "success");
  } else {
    message("Engagement Failed", "Protected site has been neutralized.", "danger");
  }

  renderStatus();
}

function resetGame() {
  clearTimers();
  if (state.contactInterval) {
    window.clearInterval(state.contactInterval);
  }

  state.siteHealth = 100;
  state.ammo = { missile: 6, gun: 10 };
  state.contact = createContact();
  state.contactHp = 3;
  state.busy = false;
  state.gameOver = false;
  elements.chatLog.innerHTML = "";
  elements.commandInput.value = "";

  message("Operations", "Air defense section online. Hostile radar contact acquired.");
  showTrack();
  message("Operations", "Type help for engagement commands.");
  renderStatus();

  state.contactInterval = window.setInterval(updateContact, 1000);
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
