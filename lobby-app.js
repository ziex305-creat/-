import { SUPABASE_ANON_KEY, SUPABASE_URL } from "./supabase-config.js";

const elements = {
  lobby: document.querySelector("#lobby-screen"),
  modes: document.querySelector("#mode-screen"),
  online: document.querySelector("#online-screen"),
  local: document.querySelector("#local-screen"),
  localGame: document.querySelector("#local-game-screen"),
  host: document.querySelector("#host-screen"),
  join: document.querySelector("#join-screen"),
  room: document.querySelector("#room-screen"),
  hostForm: document.querySelector("#host-form"),
  hostName: document.querySelector("#host-name"),
  hostRoundLimit: document.querySelector("#host-round-limit"),
  hostStatus: document.querySelector("#host-status"),
  joinForm: document.querySelector("#join-form"),
  guestName: document.querySelector("#guest-name"),
  roomCode: document.querySelector("#room-code"),
  joinStatus: document.querySelector("#join-status"),
  roomCodeDisplay: document.querySelector("#room-code-display"),
  roomShareCard: document.querySelector("#room-share-card"),
  roomQr: document.querySelector("#room-qr"),
  qrError: document.querySelector("#qr-error"),
  memberList: document.querySelector("#member-list"),
  memberCount: document.querySelector("#member-count"),
  roomMessage: document.querySelector("#room-message"),
  roomStatus: document.querySelector("#room-status"),
  actionButton: document.querySelector("#room-action-button"),
  leaveButton: document.querySelector("#leave-room-button"),
  roundCard: document.querySelector("#round-card"),
  roundLabel: document.querySelector("#room-round-label"),
  roundCategory: document.querySelector("#round-category"),
  roundTurn: document.querySelector("#round-turn"),
  roundPrompt: document.querySelector("#round-prompt"),
  helpDialog: document.querySelector("#help-dialog"),
  settingsDialog: document.querySelector("#settings-dialog"),
  settingsStatus: document.querySelector("#settings-status"),
  backgroundMusic: document.querySelector("#background-music"),
  musicPlayButton: document.querySelector("#music-play-button"),
  musicEnabled: document.querySelector("#music-enabled"),
  musicVolume: document.querySelector("#music-volume"),
  musicVolumeValue: document.querySelector("#music-volume-value"),
  localPlayerForm: document.querySelector("#local-player-form"),
  localPlayerName: document.querySelector("#local-player-name"),
  localPlayerList: document.querySelector("#local-player-list"),
  localPlayerHint: document.querySelector("#local-player-hint"),
  localStartButton: document.querySelector("#local-start-button"),
  localRoundLimit: document.querySelector("#local-round-limit"),
  localStatus: document.querySelector("#local-status"),
  localRoundLabel: document.querySelector("#local-round-label"),
  localRoundCategory: document.querySelector("#local-round-category"),
  localRoundTurn: document.querySelector("#local-round-turn"),
  localRoundPrompt: document.querySelector("#local-round-prompt"),
  localShowAnswerButton: document.querySelector("#local-show-answer-button"),
  localRoundAnswer: document.querySelector("#local-round-answer"),
  localGameStatus: document.querySelector("#local-game-status"),
  localNextButton: document.querySelector("#local-next-button"),
  localRestartButton: document.querySelector("#local-restart-button"),
  roomShowAnswerButton: document.querySelector("#room-show-answer-button"),
  roomRoundAnswer: document.querySelector("#room-round-answer"),
  teamsSetup: document.querySelector("#teams-setup-screen"),
  teamPlayerForm: document.querySelector("#team-player-form"),
  teamPlayerName: document.querySelector("#team-player-name"),
  teamOnePlayers: document.querySelector("#team-one-players"),
  teamTwoPlayers: document.querySelector("#team-two-players"),
  teamOneCount: document.querySelector("#team-one-count"),
  teamTwoCount: document.querySelector("#team-two-count"),
  teamRoundLimit: document.querySelector("#team-round-limit"),
  teamSetupHint: document.querySelector("#team-setup-hint"),
  teamStartButton: document.querySelector("#team-start-button"),
  teamSetupStatus: document.querySelector("#team-setup-status"),
  teamsGame: document.querySelector("#teams-game-screen"),
  teamRoundLabel: document.querySelector("#team-round-label"),
  teamOneScore: document.querySelector("#team-one-score"),
  teamTwoScore: document.querySelector("#team-two-score"),
  teamTurnLabel: document.querySelector("#team-turn-label"),
  teamRoundPrompt: document.querySelector("#team-round-prompt"),
  teamWheel: document.querySelector("#team-wheel"),
  teamWheelResult: document.querySelector("#team-wheel-result"),
  teamSpinButton: document.querySelector("#team-spin-button"),
  teamShowAnswerButton: document.querySelector("#team-show-answer-button"),
  teamAnswer: document.querySelector("#team-answer"),
  teamGameStatus: document.querySelector("#team-game-status"),
  teamRetryCardButton: document.querySelector("#team-retry-card-button"),
  teamRoundActions: document.querySelector("#team-round-actions"),
  teamCorrectButton: document.querySelector("#team-correct-button"),
  teamSkipButton: document.querySelector("#team-skip-button"),
  teamMatchResult: document.querySelector("#team-match-result"),
  teamWinnerTitle: document.querySelector("#team-winner-title"),
  teamWinnerMessage: document.querySelector("#team-winner-message"),
  teamDrawChallengeButton: document.querySelector("#team-draw-challenge-button"),
  teamPenaltyPrompt: document.querySelector("#team-penalty-prompt"),
  teamRedrawChallengeButton: document.querySelector("#team-redraw-challenge-button"),
  teamRestartButton: document.querySelector("#team-restart-button"),
};

const ROOM_ALPHABET = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
const CATEGORY_LABELS = {
  "سؤال عام": "أسئلة عامة",
  معلومات: "معلومات عامة",
  ضحك: "اساله مضحكه",
  تخمين: "تخمين أفلام وأغاني",
  صراحة: "صراحة",
  تفكير: "تفكير وخداع",
  تحدي: "تحديات",
  تصويت: "تصويت",
};
const TEAM_WHEEL_SEGMENTS = [
  { category: "سؤال عام", label: "سؤال عام", color: "#7e4c2b" },
  { category: "معلومات", label: "معلومات", color: "#a56a32" },
  { category: "ضحك", label: "ضحك", color: "#775b37" },
  { category: "تخمين", label: "تخمين", color: "#8f5b3a" },
  { category: "صراحة", label: "صراحة", color: "#694331" },
  { category: "تفكير", label: "تفكير", color: "#76513d" },
  { category: "تحدي", label: "تحدي", color: "#60402f" },
];
const TEAM_WHEEL_SPIN_DURATION = 4200;
const localPlayers = [];
const teamPlayers = [];
let supabase;
let room;
let localCategory = "سؤال عام";
let localRoundNumber = 0;
let localRoundLimit = 5;
let localSeenCardIds = new Set();
let localCurrentCardCategory;
let localCurrentAnswer;
let teamRoundNumber = 0;
let teamRoundLimit = 5;
let teamScores = [0, 0];
let teamSeenCardIds = new Map();
let teamTurnLocked = false;
let teamMatchWinner;
let teamWheelRotation = 0;
let teamRoundCategory;
let teamCurrentAnswer;
let hostReturnScreen;
let joinReturnScreen;
let presenceSynced = false;
let presenceWaiters = [];
let musicGestureHandled = false;
const preferences = { theme: "dark", musicEnabled: true, musicVolume: 0.35 };

function showScreen(screen) {
  document.querySelectorAll(".screen").forEach((item) => item.classList.add("hidden"));
  screen.classList.remove("hidden");
}

function applyTheme() {
  document.documentElement.dataset.theme = preferences.theme;
  const themeColor = document.querySelector('meta[name="theme-color"]');
  if (themeColor) themeColor.content = preferences.theme === "light" ? "#f5efe5" : "#17120e";
  document.querySelectorAll('input[name="theme"]').forEach((input) => {
    input.checked = input.value === preferences.theme;
  });
}

function renderMusicSettings() {
  elements.musicEnabled.checked = preferences.musicEnabled;
  elements.musicVolume.value = String(Math.round(preferences.musicVolume * 100));
  elements.musicVolumeValue.textContent = `${new Intl.NumberFormat("ar-EG").format(Math.round(preferences.musicVolume * 100))}٪`;
  elements.musicPlayButton.textContent = preferences.musicEnabled ? "Ⅱ إيقاف الموسيقى" : "▶ تشغيل الموسيقى";
}

function savePreferences() {
  try {
    localStorage.setItem("qahwa-game-preferences", JSON.stringify(preferences));
  } catch (error) {
    setFormStatus(elements.settingsStatus, `اتحفظت الإعدادات للجلسة دي بس: ${error.message}`, "error");
  }
}

function loadPreferences() {
  try {
    const saved = localStorage.getItem("qahwa-game-preferences");
    if (saved) {
      const parsed = JSON.parse(saved);
      if (parsed.theme === "dark" || parsed.theme === "light") preferences.theme = parsed.theme;
      if (typeof parsed.musicEnabled === "boolean") preferences.musicEnabled = parsed.musicEnabled;
      if (Number.isFinite(parsed.musicVolume)) {
        preferences.musicVolume = Math.min(1, Math.max(0, parsed.musicVolume));
      }
    }
  } catch (error) {
    setFormStatus(elements.settingsStatus, `مقدرناش نقرأ الإعدادات المحفوظة: ${error.message}`, "error");
  }

  applyTheme();
  renderMusicSettings();
  if (preferences.musicEnabled) {
    setFormStatus(elements.settingsStatus, "موسيقى قهوة بلدي هتبدأ مع أول تفاعل. تقدر توقفها أو تغيّر صوتها من الإعدادات.", "info");
  }
  elements.backgroundMusic.volume = preferences.musicVolume;
}

async function startBackgroundMusic() {
  if (!preferences.musicEnabled) return;
  try {
    await elements.backgroundMusic.play();
    setFormStatus(elements.settingsStatus, "موسيقى القعدة شغالة.", "success");
  } catch (error) {
    setFormStatus(elements.settingsStatus, `تعذر تشغيل الموسيقى: ${error.message}`, "error");
  }
}

function updateMusicPlayback() {
  if (preferences.musicEnabled) {
    if (musicGestureHandled) startBackgroundMusic();
  } else {
    elements.backgroundMusic.pause();
    setFormStatus(elements.settingsStatus, "الموسيقى متوقفة.", "info");
  }
}

function setFormStatus(element, message, state = "info") {
  element.textContent = message;
  element.dataset.state = state;
}

function renderTeamWheel() {
  const segmentSize = 100 / TEAM_WHEEL_SEGMENTS.length;
  const colors = TEAM_WHEEL_SEGMENTS
    .map((segment, index) => `${segment.color} ${index * segmentSize}% ${(index + 1) * segmentSize}%`)
    .join(", ");
  elements.teamWheel.style.background = `conic-gradient(${colors})`;
  elements.teamWheel.replaceChildren();

  TEAM_WHEEL_SEGMENTS.forEach((segment, index) => {
    const label = document.createElement("span");
    const angle = (index + 0.5) * ((Math.PI * 2) / TEAM_WHEEL_SEGMENTS.length);
    label.className = "team-wheel-label";
    label.textContent = segment.label;
    label.style.left = `${50 + Math.sin(angle) * 32}%`;
    label.style.top = `${50 - Math.cos(angle) * 32}%`;
    elements.teamWheel.append(label);
  });
  setTeamWheelLabelCounterRotation(teamWheelRotation);
}

function setTeamWheelLabelCounterRotation(rotation) {
  elements.teamWheel.querySelectorAll(".team-wheel-label").forEach((label) => {
    label.style.setProperty("--label-counter-angle", `${-rotation}deg`);
  });
}

function makeId() {
  if (crypto.randomUUID) return crypto.randomUUID();
  const bytes = crypto.getRandomValues(new Uint8Array(16));
  return [...bytes].map((byte) => byte.toString(16).padStart(2, "0")).join("");
}

function makeRoomCode() {
  const bytes = crypto.getRandomValues(new Uint8Array(6));
  return [...bytes].map((byte) => ROOM_ALPHABET[byte % ROOM_ALPHABET.length]).join("");
}

function normalizeName(name) {
  return name.trim().replace(/\s+/g, " ").slice(0, 24);
}

function categoryLabel(category) {
  return CATEGORY_LABELS[category] || category;
}

function answerLabel(category) {
  return category === "معلومات" ? "الإجابة الصحيحة" : "إجابة مقترحة";
}

function pickRandomUnseenCard(cards, seenCardIds) {
  let available = cards.filter((card) => !seenCardIds.has(card.id));
  if (!available.length) {
    const lastCardId = [...seenCardIds][seenCardIds.size - 1];
    seenCardIds.clear();
    available = cards.length > 1
      ? cards.filter((card) => card.id !== lastCardId)
      : cards;
  }

  const card = available[Math.floor(Math.random() * available.length)];
  seenCardIds.add(card.id);
  return card;
}

function revealCardAnswer(category, answer, answerElement, button) {
  if (!answer) return;
  answerElement.textContent = `${answerLabel(category)}: ${answer}`;
  answerElement.classList.remove("hidden");
  button.classList.add("hidden");
}

function renderLocalPlayers() {
  elements.localPlayerList.replaceChildren();
  localPlayers.forEach((player, index) => {
    const item = document.createElement("li");
    item.className = "player-roster-row";
    const avatar = document.createElement("span");
    avatar.className = `player-avatar player-avatar-${index % 5}`;
    avatar.setAttribute("aria-hidden", "true");
    avatar.textContent = Array.from(player)[0];
    const name = document.createElement("span");
    name.className = "player-name-text";
    name.textContent = player;
    const removeButton = document.createElement("button");
    removeButton.type = "button";
    removeButton.textContent = "×";
    removeButton.setAttribute("aria-label", `حذف ${player}`);
    removeButton.addEventListener("click", () => {
      localPlayers.splice(index, 1);
      renderLocalPlayers();
    });
    item.append(avatar, name, removeButton);
    elements.localPlayerList.append(item);
  });

  const ready = localPlayers.length >= 2;
  elements.localPlayerHint.textContent = ready
    ? `${new Intl.NumberFormat("ar-EG").format(localPlayers.length)} لاعبين جاهزين للعب.`
    : "ضيفوا لاعبين على الأقل عشان تبدأ اللعبة.";
  elements.localStartButton.disabled = !ready || !supabase;
}

function addLocalPlayer(name) {
  const normalizedName = normalizeName(name);
  if (!normalizedName) return;
  if (localPlayers.some((player) => player.localeCompare(normalizedName, "ar", { sensitivity: "base" }) === 0)) {
    elements.localPlayerHint.textContent = "انت هتشتغلنا يعم الاسم ده  مكتوب قبل كده.";
    elements.localPlayerName.focus();
    return;
  }
  localPlayers.push(normalizedName);
  renderLocalPlayers();
}

function renderTeamPlayers() {
  const rosters = [elements.teamOnePlayers, elements.teamTwoPlayers];
  const counts = [elements.teamOneCount, elements.teamTwoCount];

  rosters.forEach((roster, teamIndex) => {
    roster.replaceChildren();
    const players = teamPlayers.filter((player) => player.team === teamIndex);
    counts[teamIndex].textContent = new Intl.NumberFormat("ar-EG").format(players.length);
    players.forEach((player) => {
      const item = document.createElement("li");
      const name = document.createElement("span");
      name.textContent = player.name;
      const moveButton = document.createElement("button");
      moveButton.type = "button";
      moveButton.textContent = teamIndex === 0 ? "انقل للفريق الثاني" : "انقل للفريق الأول";
      moveButton.addEventListener("click", () => {
        player.team = 1 - teamIndex;
        renderTeamPlayers();
      });
      const removeButton = document.createElement("button");
      removeButton.type = "button";
      removeButton.textContent = "×";
      removeButton.setAttribute("aria-label", `حذف ${player.name}`);
      removeButton.addEventListener("click", () => {
        teamPlayers.splice(teamPlayers.indexOf(player), 1);
        renderTeamPlayers();
      });
      item.append(name, moveButton, removeButton);
      roster.append(item);
    });
  });

  const firstTeamReady = teamPlayers.some((player) => player.team === 0);
  const secondTeamReady = teamPlayers.some((player) => player.team === 1);
  elements.teamSetupHint.textContent = firstTeamReady && secondTeamReady
    ? `${new Intl.NumberFormat("ar-EG").format(teamPlayers.length)} الناس جاهزه يعم انجز اختار عدد الجولات.`
    : "ضيفوا لاعبًا واحدًا على الأقل لكل فريق.";
  elements.teamStartButton.disabled = !firstTeamReady || !secondTeamReady || !supabase;
}

function addTeamPlayer(name, team) {
  const normalizedName = normalizeName(name);
  if (!normalizedName) return;
  if (teamPlayers.some((player) => player.name.localeCompare(normalizedName, "ar", { sensitivity: "base" }) === 0)) {
    setFormStatus(elements.teamSetupStatus, "انت هتشتغلنا يعم الاسم ده  مكتوب قبل كده.", "error");
    return;
  }
  teamPlayers.push({ name: normalizedName, team });
  setFormStatus(elements.teamSetupStatus, "", "info");
  renderTeamPlayers();
}

async function getRandomTeamCard(category) {
  const { data, error } = await supabase
    .from("challenge_cards")
    .select("id, category, content, answer")
    .eq("category", category)
    .eq("is_active", true)
    .limit(1000);
  if (error) throw error;
  if (!data?.length) throw new Error(`مفيش بطاقات متاحة في فئة «${category}».`);
  let seenCardIds = teamSeenCardIds.get(category);
  if (!seenCardIds) {
    seenCardIds = new Set();
    teamSeenCardIds.set(category, seenCardIds);
  }
  return pickRandomUnseenCard(data, seenCardIds);
}

function prepareTeamRound() {
  teamTurnLocked = false;
  teamRoundCategory = undefined;
  teamCurrentAnswer = undefined;
  elements.teamRetryCardButton.classList.add("hidden");
  elements.teamShowAnswerButton.classList.add("hidden");
  elements.teamAnswer.classList.add("hidden");
  elements.teamAnswer.textContent = "";
  elements.teamRoundPrompt.textContent = "";
  elements.teamWheelResult.textContent = "   لفو العجله عشان نعرف السوال ايه";
  elements.teamSpinButton.disabled = false;
  elements.teamSpinButton.classList.remove("hidden");
  elements.teamCorrectButton.disabled = true;
  elements.teamSkipButton.disabled = true;
  elements.teamRoundLabel.textContent = `الجولة ${new Intl.NumberFormat("ar-EG").format(teamRoundNumber + 1)} من ${new Intl.NumberFormat("ar-EG").format(teamRoundLimit)}`;
  elements.teamTurnLabel.textContent = `الدور على الفريق ${teamRoundNumber % 2 === 0 ? "الأول" : "الثاني"}`;
  setFormStatus(elements.teamGameStatus, "", "info");
}

async function drawTeamRoundCard() {
  teamTurnLocked = true;
  elements.teamRetryCardButton.classList.add("hidden");
  elements.teamRoundPrompt.textContent = "بنختار سوال الجولة...";
  setFormStatus(elements.teamGameStatus, "", "info");
  try {
    const card = await getRandomTeamCard(teamRoundCategory);
    teamCurrentAnswer = card.answer;
    elements.teamRoundPrompt.textContent = card.content;
    if (card.answer) {
      elements.teamShowAnswerButton.classList.remove("hidden");
    }
    teamTurnLocked = false;
    elements.teamCorrectButton.disabled = false;
    elements.teamSkipButton.disabled = false;
  } catch (error) {
    elements.teamRetryCardButton.classList.remove("hidden");
    const isDatabaseMigrationNeeded = error.message?.includes("answer")
      || (teamRoundCategory === "معلومات" && error.message?.includes("مفيش بطاقات"));
    setFormStatus(
      elements.teamGameStatus,
      isDatabaseMigrationNeeded
        ? " حدث غط و شغالين عله متخفش ."
        : `معرفناش نجيب سوال الجولة: ${error.message}`,
      "error",
    );
  }
}

async function spinTeamWheel() {
  if (teamTurnLocked) return;
  teamTurnLocked = true;
  elements.teamSpinButton.disabled = true;
  elements.teamCorrectButton.disabled = true;
  elements.teamSkipButton.disabled = true;
  elements.teamRetryCardButton.classList.add("hidden");
  elements.teamShowAnswerButton.classList.add("hidden");
  elements.teamAnswer.classList.add("hidden");
  elements.teamRoundPrompt.textContent = "";
  setFormStatus(elements.teamGameStatus, "", "info");

  const selectedIndex = Math.floor(Math.random() * TEAM_WHEEL_SEGMENTS.length);
  const selectedSegment = TEAM_WHEEL_SEGMENTS[selectedIndex];
  const segmentAngle = 360 / TEAM_WHEEL_SEGMENTS.length;
  const selectedCenter = (selectedIndex + 0.5) * segmentAngle;
  const currentAngle = ((teamWheelRotation % 360) + 360) % 360;
  const alignment = (360 - selectedCenter - currentAngle + 360) % 360;
  teamWheelRotation += 360 * 5 + alignment;
  setTeamWheelLabelCounterRotation(teamWheelRotation);
  elements.teamWheel.style.transform = `rotate(${teamWheelRotation}deg)`;

  await new Promise((resolve) => setTimeout(resolve, TEAM_WHEEL_SPIN_DURATION + 150));
  teamRoundCategory = selectedSegment.category;
  elements.teamWheelResult.textContent = `اختارت العجلة: ${selectedSegment.label}`;
  await drawTeamRoundCard();
}

function updateTeamScoreboard() {
  elements.teamOneScore.textContent = new Intl.NumberFormat("ar-EG").format(teamScores[0]);
  elements.teamTwoScore.textContent = new Intl.NumberFormat("ar-EG").format(teamScores[1]);
}

function finishTeamMatch() {
  teamMatchWinner = teamScores[0] === teamScores[1]
    ? undefined
    : teamScores[0] > teamScores[1] ? 0 : 1;
  elements.teamRoundActions.classList.add("hidden");
  elements.teamMatchResult.classList.remove("hidden");
  elements.teamRestartButton.classList.remove("hidden");
  elements.teamPenaltyPrompt.textContent = "";
  elements.teamRedrawChallengeButton.classList.add("hidden");
  if (teamMatchWinner === undefined) {
    elements.teamWinnerTitle.textContent = "تعادل!";
    elements.teamWinnerMessage.textContent = "النقاط متساوية؛العبو اخر جوله تحدد مين هيقوم يعمل ضغط في نص الشارع يلا.";
    elements.teamDrawChallengeButton.classList.add("hidden");
  } else {
    elements.teamWinnerTitle.textContent = `الفريق ${teamMatchWinner === 0 ? "الأول" : "الثاني"} كسب!`;
    elements.teamWinnerMessage.textContent = "الفريق الفائز يختار تحديًا للفريق الخسران.";
    elements.teamDrawChallengeButton.classList.remove("hidden");
  }
}

async function advanceTeamRound(correct) {
  if (teamTurnLocked) return;
  teamTurnLocked = true;
  const currentTeam = teamRoundNumber % 2;
  if (correct) teamScores[currentTeam] += 1;
  teamRoundNumber += 1;
  updateTeamScoreboard();
  if (teamRoundNumber >= teamRoundLimit) {
    finishTeamMatch();
    return;
  }
  prepareTeamRound();
}

async function drawTeamPenaltyChallenge() {
  elements.teamDrawChallengeButton.disabled = true;
  elements.teamRedrawChallengeButton.disabled = true;
  setFormStatus(elements.teamGameStatus, "بنختار تحديًا...", "info");
  try {
    const card = await getRandomTeamCard("تحدي");
    const losingTeam = 1 - teamMatchWinner;
    elements.teamPenaltyPrompt.textContent = `تحدي الفريق ${losingTeam === 0 ? "الأول" : "الثاني"}: ${card.content}`;
    elements.teamRedrawChallengeButton.classList.remove("hidden");
    setFormStatus(elements.teamGameStatus, "", "info");
  } catch (error) {
    setFormStatus(elements.teamGameStatus,  `  امعرفناش نجيب تحديًا:الفريق الكسبان يختار تحدي لي الفريق الخسران علي ما اشوف المشكله  ${error.message}`, "error");
  } finally {
    elements.teamDrawChallengeButton.disabled = false;
    elements.teamRedrawChallengeButton.disabled = false;
  }
}

async function startTeamMatch() {
  teamRoundLimit = Number(elements.teamRoundLimit.value);
  teamRoundNumber = 0;
  teamScores = [0, 0];
  teamSeenCardIds = new Map();
  teamWheelRotation = 0;
  teamMatchWinner = undefined;
  elements.teamRoundActions.classList.remove("hidden");
  elements.teamMatchResult.classList.add("hidden");
  elements.teamRestartButton.classList.add("hidden");
  elements.teamDrawChallengeButton.classList.remove("hidden");
  elements.teamDrawChallengeButton.disabled = false;
  elements.teamRedrawChallengeButton.disabled = false;
  elements.teamWheel.style.transform = "rotate(0deg)";
  renderTeamWheel();
  updateTeamScoreboard();
  showScreen(elements.teamsGame);
  prepareTeamRound();
}

async function drawLocalCard() {
  if (localRoundNumber >= localRoundLimit) {
    finishLocalGame();
    return;
  }
  localCurrentAnswer = undefined;
  elements.localShowAnswerButton.classList.add("hidden");
  elements.localRoundAnswer.classList.add("hidden");
  elements.localRoundAnswer.textContent = "";
  elements.localNextButton.disabled = true;
  setFormStatus(elements.localGameStatus, "بنختارلكم سؤال...", "info");
  try {
    const { data, error } = await supabase
      .from("challenge_cards")
      .select("id, category, content, answer")
      .eq("category", localCategory)
      .eq("is_active", true)
      .limit(1000);
    if (error) throw error;
    if (!data?.length) throw new Error(`مفيش اساله متاح في فئة «${localCategory}».`);

    const card = pickRandomUnseenCard(data, localSeenCardIds);
    const player = localPlayers[Math.floor(Math.random() * localPlayers.length)];
    localRoundNumber += 1;
    elements.localRoundLabel.textContent = `الجولة ${new Intl.NumberFormat("ar-EG").format(localRoundNumber)} من ${new Intl.NumberFormat("ar-EG").format(localRoundLimit)}`;
    elements.localRoundCategory.textContent = categoryLabel(card.category);
    elements.localRoundTurn.textContent = `الدور على ${player}`;
    elements.localRoundPrompt.textContent = card.content;
    localCurrentCardCategory = card.category;
    localCurrentAnswer = card.answer;
    elements.localShowAnswerButton.textContent = `اكشفوا ${answerLabel(card.category)}`;
    elements.localShowAnswerButton.classList.toggle("hidden", !card.answer);
    setFormStatus(elements.localGameStatus, "", "info");
    elements.localNextButton.textContent = localRoundNumber >= localRoundLimit
      ? "إنهاء اللعبة"
      : "السؤال اللي بعده ←";
  } catch (error) {
    setFormStatus(elements.localGameStatus, `معرفناش نجيب السؤال: ${error.message}`, "error");
  } finally {
    elements.localNextButton.disabled = false;
  }
}

function finishLocalGame() {
  elements.localRoundLabel.textContent = "انتهت اللعبة";
  elements.localRoundTurn.textContent = "";
  elements.localNextButton.classList.add("hidden");
  elements.localRestartButton.classList.remove("hidden");
  setFormStatus(
    elements.localGameStatus,
    `خلصتوا ${new Intl.NumberFormat("ar-EG").format(localRoundLimit)} جولات. شكرًا على اللمة!`,
    "success",
  );
}

function startLocalGame() {
  if (localPlayers.length < 2 || !supabase) return;
  localRoundNumber = 0;
  localRoundLimit = Number(elements.localRoundLimit.value);
  localSeenCardIds = new Set();
  elements.localNextButton.classList.remove("hidden");
  elements.localRestartButton.classList.add("hidden");
  elements.localNextButton.textContent = "السؤال اللي بعده ←";
  showScreen(elements.localGame);
  drawLocalCard();
}

function getPresenceMembers(channel) {
  return Object.values(channel.presenceState())
    .flat()
    .filter((member) => typeof member.name === "string" && typeof member.playerId === "string");
}

function renderMembers() {
  if (!room) return;
  const members = room.members;
  elements.memberList.replaceChildren();
  elements.memberCount.textContent = new Intl.NumberFormat("ar-EG").format(members.length);

  members.forEach((member) => {
    const item = document.createElement("li");
    item.className = "member-item";
    const name = document.createElement("span");
    name.textContent = member.name;
    item.append(name);
    if (member.isHost) {
      const hostLabel = document.createElement("span");
      hostLabel.className = "host-label";
      hostLabel.textContent = " الي مجمع القعده";
      item.append(hostLabel);
    } else {
      const dot = document.createElement("span");
      dot.className = "member-dot";
      dot.setAttribute("aria-hidden", "true");
      item.append(dot);
    }
    elements.memberList.append(item);
  });

  if (!members.some((member) => member.playerId === room.hostId) && !room.closed) {
    elements.roomMessage.textContent = "صاحب القعده خرج.  اخرجو واعملو غرفها تاني بقا وابدأوا قعدة جديدة.";
    elements.roomStatus.dataset.state = "error";
  } else if (!room.state.started) {
    elements.roomMessage.textContent = room.isHost
      ? members.length < 2 ? "ابعتوا الكود لبقيت المة واللعب يبدأ لماالمه تكتمل." : "كلكم جاهزين؟ ابدأوا أول جولة!"
      : "مستنيين صاحب القعدة يبدأ اللعب...";
  }

  updateActionButton();
}

function renderRoomState() {
  if (!room) return;
  if (room.state.started && room.state.card) {
    elements.roundCard.classList.remove("hidden");
    elements.roundLabel.textContent = `الجولة ${new Intl.NumberFormat("ar-EG").format(room.state.roundNumber)} من ${new Intl.NumberFormat("ar-EG").format(room.state.roundLimit)}`;
    elements.roundCategory.textContent = categoryLabel(room.state.category);
    elements.roundTurn.textContent = `الدور على ${room.state.turnPlayerName}`;
    elements.roundPrompt.textContent = room.state.card.content;
    const answerRevealed = room.state.answerRevealed === true && Boolean(room.state.card.answer);
    elements.roomRoundAnswer.textContent = answerRevealed
      ? `${answerLabel(room.state.category)}: ${room.state.card.answer}`
      : "";
    elements.roomRoundAnswer.classList.toggle("hidden", !answerRevealed);
    elements.roomShowAnswerButton.textContent = `اكشفوا ${answerLabel(room.state.category)}`;
    elements.roomShowAnswerButton.classList.toggle(
      "hidden",
      !room.isHost || !room.state.card.answer || answerRevealed,
    );
    elements.roomMessage.textContent = room.state.finished
      ? "دي آخر جولة! بعد ما تخلصوا الإجابة تكون اللعبة خلصت."
      : "قولوا إجاباتكم بصراحة وخلي الضحك يكمل!";
  } else {
    elements.roundCard.classList.add("hidden");
    elements.roomShowAnswerButton.classList.add("hidden");
    elements.roomRoundAnswer.classList.add("hidden");
  }
  elements.roomShareCard.classList.toggle("hidden", !room.isHost || room.state.started);
  updateActionButton();
}

function updateActionButton() {
  if (!room) return;
  if (room.closed) {
    elements.actionButton.textContent = "رجوع للرئيسية";
    elements.actionButton.disabled = false;
  } else if (!room.isHost) {
    elements.actionButton.textContent = "مستنيين صاحب القعدة";
    elements.actionButton.disabled = true;
  } else if (room.state.finished) {
    elements.actionButton.textContent = "انتهت الجولات";
    elements.actionButton.disabled = true;
  } else if (room.state.started) {
    elements.actionButton.innerHTML = 'السؤال اللي بعده <span aria-hidden="true">←</span>';
    elements.actionButton.disabled = room.members.length < 2;
  } else {
    elements.actionButton.textContent = "ابدأوا اللعب";
    elements.actionButton.disabled = room.members.length < 2;
  }
}

async function broadcast(event, payload = {}) {
  const result = await room.channel.send({ type: "broadcast", event, payload });
  const status = typeof result === "string" ? result : result?.status;
  if (status !== "ok") {
    throw new Error(`فشل إرسال تحديث الغرفة (${status || "استجابة غير معروفة"}).`);
  }
}

async function publishRoomState() {
  const state = {
    ...room.state,
    card: room.state.card ? { ...room.state.card } : null,
  };
  if (state.card && !state.answerRevealed) delete state.card.answer;
  await broadcast("room-state", state);
}

async function revealRoomAnswer() {
  if (!room?.isHost || !room.state.card?.answer || room.state.answerRevealed) return;
  room.state.answerRevealed = true;
  elements.actionButton.disabled = true;
  try {
    await publishRoomState();
    renderRoomState();
  } catch (error) {
    room.state.answerRevealed = false;
    elements.roomStatus.textContent = `تعذر كشف الإجابة لباقي اللاعبين: ${error.message}`;
    elements.roomStatus.dataset.state = "error";
  } finally {
    updateActionButton();
  }
}

function handlePresenceSync(channel) {
  presenceSynced = true;
  presenceWaiters.forEach((resolve) => resolve());
  presenceWaiters = [];
  if (!room || room.channel !== channel) return;

  room.members = getPresenceMembers(channel);
  renderMembers();
  if (room.isHost) publishRoomState().catch((error) => {
    elements.roomStatus.textContent = error.message;
    elements.roomStatus.dataset.state = "error";
  });
}

function configureChannel(channel) {
  channel
    .on("presence", { event: "sync" }, () => handlePresenceSync(channel))
    .on("broadcast", { event: "room-state" }, ({ payload }) => {
      if (!room || room.channel !== channel || room.isHost || !payload || typeof payload !== "object") return;
      room.state = payload;
      renderRoomState();
    })
    .on("broadcast", { event: "request-state" }, () => {
      if (room?.channel === channel && room.isHost) {
        publishRoomState().catch((error) => {
          elements.roomStatus.textContent = error.message;
          elements.roomStatus.dataset.state = "error";
        });
      }
    })
    .on("broadcast", { event: "room-closed" }, () => {
      if (!room || room.channel !== channel || room.isHost) return;
      room.closed = true;
      elements.roomMessage.textContent = "صاحب القعدة أنهى الغرفة.";
      elements.roomStatus.textContent = "الغرفة اتقفلت.";
      elements.roomStatus.dataset.state = "error";
      updateActionButton();
    });
}

function waitForPresenceSync() {
  if (presenceSynced) return Promise.resolve();
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => {
      presenceWaiters = presenceWaiters.filter((waiter) => waiter !== done);
      reject(new Error("انتهت مهلة الاتصال بالغرفة. جرّب تاني."));
    }, 5000);
    function done() {
      clearTimeout(timer);
      resolve();
    }
    presenceWaiters.push(done);
  });
}

function subscribe(channel) {
  return new Promise((resolve, reject) => {
    const timeout = setTimeout(() => reject(new Error(" ما ردش. اتأكد من اتصال الإنترنت وجرب تاني.")), 12000);
    channel.subscribe((status, error) => {
      if (status === "SUBSCRIBED") {
        clearTimeout(timeout);
        resolve();
      } else if (["CHANNEL_ERROR", "TIMED_OUT", "CLOSED"].includes(status)) {
        clearTimeout(timeout);
        reject(new Error(error?.message || `فشل الاتصال بالغرفة (${status}).`));
      }
    });
  });
}

async function removeChannel(channel) {
  await supabase.removeChannel(channel);
}

async function renderRoomQr(code) {
  elements.qrError.classList.add("hidden");
  elements.roomQr.hidden = false;
  const roomUrl = new URL(location.href);
  roomUrl.search = "";
  roomUrl.hash = "";
  roomUrl.searchParams.set("room", code);

  try {
    const qrModule = await import("https://esm.sh/qrcode@1.5.4");
    const toCanvas = qrModule.toCanvas || qrModule.default?.toCanvas;
    if (typeof toCanvas !== "function") throw new Error("مكتبة QR غير متاحة.");
    await toCanvas(elements.roomQr, roomUrl.toString(), {
      width: 144,
      margin: 1,
      color: { dark: "#17120e", light: "#ffffff" },
    });
  } catch (error) {
    elements.roomQr.hidden = true;
    elements.qrError.textContent = `تعذر تجهيز QR: ${error.message} — شاركوا كود الغرفة يدويًا.`;
    elements.qrError.classList.remove("hidden");
  }
}

function enterRoom({ code, name, isHost, channel, category = "سؤال عام", roundLimit = 5 }) {
  const playerId = makeId();
  room = {
    channel,
    code,
    hostId: isHost ? playerId : null,
    isHost,
    playerId,
    members: [],
    seenCardIds: new Map(),
    closed: false,
    state: { started: false, category, roundNumber: 0, roundLimit, finished: false, card: null },
  };

  elements.roomCodeDisplay.textContent = code;
  elements.roomShareCard.classList.toggle("hidden", !isHost);
  if (isHost) renderRoomQr(code);
  elements.roomMessage.textContent = "بنوصل صحابك...";
  elements.roomStatus.textContent = "متصلين بالغرفة.";
  elements.roomStatus.dataset.state = "success";
  elements.leaveButton.textContent = isHost ? "إنهاء الغرفة" : "مغادرة الغرفة";
  elements.actionButton.classList.remove("hidden");
  elements.roundCard.classList.add("hidden");
  showScreen(elements.room);

  return channel.track({ playerId, name, isHost });
}

async function createRoom(name, category, roundLimit) {
  if (!supabase) throw new Error("لسه مفيش اتصال بـ الغرفه.");
  setFormStatus(elements.hostStatus, "بنعمل غرفة جديدة...", "info");

  for (let attempt = 0; attempt < 3; attempt += 1) {
    presenceSynced = false;
    let channel;
    try {
      const code = makeRoomCode();
      channel = supabase.channel(`room:${code}`, {
        config: { presence: { key: makeId() }, broadcast: { self: false } },
      });
      configureChannel(channel);
      await subscribe(channel);
      await waitForPresenceSync();
      if (getPresenceMembers(channel).length > 0) {
        await removeChannel(channel);
        continue;
      }

      const trackResult = await enterRoom({ code, name, isHost: true, channel, category, roundLimit });
      if (trackResult?.status === "error") throw new Error("ما قدرناش نسجلك في الغرفة.");
      room.hostId = room.playerId;
      room.members = getPresenceMembers(channel);
      renderMembers();
      setFormStatus(elements.hostStatus, "", "info");
      return;
    } catch (error) {
      if (channel) await removeChannel(channel);
      room = null;
      showScreen(elements.host);
      throw error;
    }
  }

  throw new Error("ما قدرناش نلاقي كود غرفة فاضي. جرّب تاني.");
}

async function joinRoom(code, name) {
  if (!supabase) throw new Error("لسه مفيش اتصال بـ الغرفه.");
  setFormStatus(elements.joinStatus, "بندور على القعدة...", "info");
  presenceSynced = false;

  const channel = supabase.channel(`room:${code}`, {
    config: { presence: { key: makeId() }, broadcast: { self: false } },
  });
  configureChannel(channel);

  try {
    await subscribe(channel);
    await waitForPresenceSync();
    const existingMembers = getPresenceMembers(channel);
    const host = existingMembers.find((member) => member.isHost);
    if (!host) throw new Error("مش لاقيين غرفة بالكود ده. اتأكد إن صاحبك لسه فاتحها.");

    room = {
      channel,
      code,
      hostId: host.playerId,
      isHost: false,
      playerId: makeId(),
      members: existingMembers,
      seenCardIds: new Map(),
      closed: false,
      state: { started: false, category: "سؤال عام", roundNumber: 0, roundLimit: 5, finished: false, card: null },
    };
    elements.roomCodeDisplay.textContent = code;
    elements.roomShareCard.classList.add("hidden");
    elements.roomMessage.textContent = "دخلت القعدة! مستنيين تحديث...";
    elements.roomStatus.textContent = "متصلين بالغرفة.";
    elements.roomStatus.dataset.state = "success";
    elements.leaveButton.textContent = "مغادرة الغرفة";
    elements.roundCard.classList.add("hidden");
    elements.actionButton.classList.remove("hidden");
    showScreen(elements.room);

    const trackResult = await channel.track({ playerId: room.playerId, name, isHost: false });
    if (trackResult?.status === "error") throw new Error("ما قدرناش نسجلك في الغرفة.");
    room.members = getPresenceMembers(channel);
    renderMembers();
    await broadcast("request-state");
  } catch (error) {
    await removeChannel(channel);
    room = null;
    showScreen(elements.join);
    throw error;
  }
}

async function drawNextRound() {
  if (!room?.isHost || room.members.length < 2 || room.state.finished) return;
  elements.actionButton.disabled = true;
  elements.roomStatus.textContent = "بنحضّر الجولة...";
  elements.roomStatus.dataset.state = "info";

  try {
    const { data, error } = await supabase
      .from("challenge_cards")
      .select("id, category, content, answer")
      .eq("category", room.state.category)
      .eq("is_active", true)
      .limit(1000);
    if (error) throw error;
    if (!data?.length) throw new Error(`مفيش محتوى متاح في فئة «${room.state.category}».`);

    let seenCardIds = room.seenCardIds.get(room.state.category);
    if (!seenCardIds) {
      seenCardIds = new Set();
      room.seenCardIds.set(room.state.category, seenCardIds);
    }
    const card = pickRandomUnseenCard(data, seenCardIds);
    const player = room.members[Math.floor(Math.random() * room.members.length)];
    room.state = {
      started: true,
      category: card.category,
      roundNumber: room.state.roundNumber + 1,
      roundLimit: room.state.roundLimit,
      finished: room.state.roundNumber + 1 >= room.state.roundLimit,
      card,
      answerRevealed: false,
      turnPlayerId: player.playerId,
      turnPlayerName: player.name,
    };
    renderRoomState();
    await publishRoomState();
    elements.roomStatus.textContent = "وصلت الجولة لكل اللي في الغرفة.";
    elements.roomStatus.dataset.state = "success";
  } catch (error) {
    elements.roomStatus.textContent = `معرفناش نجهز الجولة: ${error.message}`;
    elements.roomStatus.dataset.state = "error";
  } finally {
    updateActionButton();
  }
}

async function leaveRoom() {
  if (!room) return;
  const currentRoom = room;
  if (currentRoom.isHost && !currentRoom.closed) {
    try {
      await broadcast("room-closed");
    } catch (error) {
      elements.roomStatus.textContent = error.message;
      elements.roomStatus.dataset.state = "error";
    }
  }
  await removeChannel(currentRoom.channel);
  room = null;
  showScreen(elements.lobby);
}

document.querySelector("#create-room-button").addEventListener("click", () => showScreen(elements.modes));
document.querySelector("#show-join-button").addEventListener("click", () => {
  joinReturnScreen = elements.lobby;
  showScreen(elements.join);
});
document.querySelector("#mode-back-button").addEventListener("click", () => showScreen(elements.lobby));
document.querySelector("#single-mode-button").addEventListener("click", () => showScreen(elements.local));
document.querySelector("#room-mode-button").addEventListener("click", () => showScreen(elements.online));
document.querySelector("#teams-mode-button").addEventListener("click", () => showScreen(elements.teamsSetup));
document.querySelector("#online-back-button").addEventListener("click", () => showScreen(elements.modes));
document.querySelector("#online-create-button").addEventListener("click", () => {
  hostReturnScreen = elements.online;
  showScreen(elements.host);
});
document.querySelector("#online-join-button").addEventListener("click", () => {
  joinReturnScreen = elements.online;
  showScreen(elements.join);
});
document.querySelector("#local-back-button").addEventListener("click", () => showScreen(elements.modes));
document.querySelector("#local-game-back-button").addEventListener("click", () => showScreen(elements.local));
document.querySelector("#teams-setup-back-button").addEventListener("click", () => showScreen(elements.modes));
document.querySelector("#teams-game-back-button").addEventListener("click", () => showScreen(elements.teamsSetup));
elements.localPlayerForm.addEventListener("submit", (event) => {
  event.preventDefault();
  addLocalPlayer(elements.localPlayerName.value);
  elements.localPlayerName.value = "";
  elements.localPlayerName.focus();
});
elements.teamPlayerForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const selectedTeam = Number(elements.teamPlayerForm.querySelector('input[name="new-player-team"]:checked').value);
  addTeamPlayer(elements.teamPlayerName.value, selectedTeam);
  elements.teamPlayerName.value = "";
  elements.teamPlayerName.focus();
});
elements.teamRoundLimit.addEventListener("change", () => {
  teamRoundLimit = Number(elements.teamRoundLimit.value);
});
elements.teamStartButton.addEventListener("click", startTeamMatch);
elements.teamSpinButton.addEventListener("click", spinTeamWheel);
elements.teamShowAnswerButton.addEventListener("click", () => {
  revealCardAnswer(teamRoundCategory, teamCurrentAnswer, elements.teamAnswer, elements.teamShowAnswerButton);
});
elements.teamRetryCardButton.addEventListener("click", drawTeamRoundCard);
elements.teamCorrectButton.addEventListener("click", () => advanceTeamRound(true));
elements.teamSkipButton.addEventListener("click", () => advanceTeamRound(false));
elements.teamDrawChallengeButton.addEventListener("click", drawTeamPenaltyChallenge);
elements.teamRedrawChallengeButton.addEventListener("click", drawTeamPenaltyChallenge);
elements.teamRestartButton.addEventListener("click", startTeamMatch);
document.querySelectorAll('input[name="local-category"]').forEach((input) => {
  input.addEventListener("change", () => { localCategory = input.value; });
});
elements.localStartButton.addEventListener("click", startLocalGame);
elements.localShowAnswerButton.addEventListener("click", () => {
  revealCardAnswer(localCurrentCardCategory, localCurrentAnswer, elements.localRoundAnswer, elements.localShowAnswerButton);
});
elements.localNextButton.addEventListener("click", drawLocalCard);
elements.localRestartButton.addEventListener("click", startLocalGame);
elements.roomShowAnswerButton.addEventListener("click", () => {
  revealRoomAnswer();
});
document.querySelector("#host-back-button").addEventListener("click", () => showScreen(hostReturnScreen || elements.lobby));
document.querySelector("#join-back-button").addEventListener("click", () => showScreen(joinReturnScreen || elements.lobby));
document.querySelector("#how-to-play-button").addEventListener("click", () => elements.helpDialog.showModal());
document.querySelector("#open-settings-button").addEventListener("click", () => elements.settingsDialog.showModal());
document.querySelectorAll('input[name="theme"]').forEach((input) => {
  input.addEventListener("change", () => {
    if (input.checked) {
      preferences.theme = input.value;
      applyTheme();
      savePreferences();
      setFormStatus(elements.settingsStatus, `تم تفعيل الوضع ${preferences.theme === "dark" ? "الداكن" : "الفاتح"}.`, "success");
    }
  });
});
elements.musicEnabled.addEventListener("change", () => {
  preferences.musicEnabled = elements.musicEnabled.checked;
  if (preferences.musicEnabled) musicGestureHandled = true;
  renderMusicSettings();
  savePreferences();
  updateMusicPlayback();
});
elements.musicPlayButton.addEventListener("click", () => {
  preferences.musicEnabled = !preferences.musicEnabled;
  if (preferences.musicEnabled) musicGestureHandled = true;
  renderMusicSettings();
  savePreferences();
  updateMusicPlayback();
});
elements.musicVolume.addEventListener("input", () => {
  preferences.musicVolume = Number(elements.musicVolume.value) / 100;
  renderMusicSettings();
  elements.backgroundMusic.volume = preferences.musicVolume;
  savePreferences();
});

document.addEventListener("pointerdown", (event) => {
  if (!event.isTrusted || musicGestureHandled || !preferences.musicEnabled
    || (event.target instanceof Element && event.target.closest(".music-settings"))) return;
  musicGestureHandled = true;
  startBackgroundMusic();
}, true);
document.addEventListener("keydown", (event) => {
  if (!event.isTrusted || musicGestureHandled || !preferences.musicEnabled
    || (event.target instanceof Element && event.target.closest(".music-settings"))) return;
  musicGestureHandled = true;
  startBackgroundMusic();
}, true);
elements.leaveButton.addEventListener("click", leaveRoom);
elements.actionButton.addEventListener("click", () => {
  if (room?.closed) {
    leaveRoom();
  } else if (room?.isHost) {
    drawNextRound();
  }
});

document.querySelector("#copy-code-button").addEventListener("click", async (event) => {
  if (!room) return;
  try {
    await navigator.clipboard.writeText(room.code);
    event.currentTarget.textContent = "اتنسخ!";
    setTimeout(() => { event.currentTarget.textContent = "نسخ"; }, 1600);
  } catch (error) {
    elements.roomStatus.textContent = `تعذر نسخ الكود: ${error.message}`;
    elements.roomStatus.dataset.state = "error";
  }
});

elements.roomCode.addEventListener("input", () => {
  elements.roomCode.value = elements.roomCode.value.toUpperCase().replace(/[^A-Z0-9]/g, "").slice(0, 6);
});

elements.hostForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const name = normalizeName(elements.hostName.value);
  if (!name) return;
  const category = elements.hostForm.querySelector('input[name="category"]:checked').value;
  const roundLimit = Number(elements.hostRoundLimit.value);
  const button = elements.hostForm.querySelector('button[type="submit"]');
  button.disabled = true;
  try {
    await createRoom(name, category, roundLimit);
  } catch (error) {
    setFormStatus(elements.hostStatus, error.message, "error");
  } finally {
    button.disabled = false;
  }
});

elements.joinForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const name = normalizeName(elements.guestName.value);
  const code = elements.roomCode.value.trim().toUpperCase();
  if (!name || !/^[A-Z0-9]{6}$/.test(code)) {
    setFormStatus(elements.joinStatus, "اكتب اسمك وكود لمة من ٦ حروف أو أرقام.", "error");
    return;
  }

  const button = elements.joinForm.querySelector('button[type="submit"]');
  button.disabled = true;
  try {
    await joinRoom(code, name);
  } catch (error) {
    setFormStatus(elements.joinStatus, error.message, "error");
  } finally {
    button.disabled = false;
  }
});

async function connectSupabase() {
  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
    setFormStatus(elements.hostStatus, "ضيف بيانات Supabase في supabase-config.js.", "error");
    setFormStatus(elements.joinStatus, "ضيف بيانات Supabase في supabase-config.js.", "error");
    return;
  }

  try {
    const { createClient } = await import("https://esm.sh/@supabase/supabase-js@2");
    supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
    const { error } = await supabase
      .from("challenge_cards")
      .select("id", { head: true, count: "exact" })
      .eq("is_active", true);
    if (error) throw error;
    setFormStatus(elements.hostStatus, "متصلين بـ الانتر نت. اختاروا نمط اللعبة وابدأوا.", "success");
    setFormStatus(elements.joinStatus, "متصلين بـ الانتر نت. اكتب كود المه.", "success");
    setFormStatus(elements.localStatus, "متصلين بـ الانتر نت. ضيفوا بقيت الشله وابدأوا.", "success");
    renderLocalPlayers();
    renderTeamPlayers();
  } catch (error) {
    const message = `تعذر الاتصال: ${error.message}`;
    setFormStatus(elements.hostStatus, message, "error");
    setFormStatus(elements.joinStatus, message, "error");
    setFormStatus(elements.localStatus, message, "error");
    renderLocalPlayers();
    renderTeamPlayers();
  }
}

renderLocalPlayers();
renderTeamPlayers();
renderTeamWheel();
loadPreferences();
const invitedRoomCode = new URLSearchParams(location.search).get("room")?.toUpperCase();
if (invitedRoomCode && /^[A-Z0-9]{6}$/.test(invitedRoomCode)) {
  elements.roomCode.value = invitedRoomCode;
  joinReturnScreen = elements.lobby;
  showScreen(elements.join);
}
connectSupabase();
