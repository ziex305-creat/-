import { SUPABASE_ANON_KEY, SUPABASE_URL } from "./supabase-config.js";

const elements = {
  addPlayerForm: document.querySelector("#add-player-form"),
  backButton: document.querySelector("#back-button"),
  connectionStatus: document.querySelector("#connection-status"),
  gameScreen: document.querySelector("#game-screen"),
  gameStatus: document.querySelector("#game-status"),
  nextButton: document.querySelector("#next-button"),
  playerHint: document.querySelector("#player-hint"),
  playerList: document.querySelector("#player-list"),
  playerName: document.querySelector("#player-name"),
  promptText: document.querySelector("#prompt-text"),
  roundLabel: document.querySelector("#round-label"),
  setupScreen: document.querySelector("#setup-screen"),
  startButton: document.querySelector("#start-button"),
  turnIndicator: document.querySelector("#turn-indicator"),
};

const players = [];
let supabase;
let selectedCategory = "سؤال";
let roundNumber = 0;
let lastCardId;

function setStatus(message, state = "info") {
  elements.connectionStatus.textContent = message;
  elements.connectionStatus.dataset.state = state;
  elements.gameStatus.textContent = message;
  elements.gameStatus.dataset.state = state;
}

function renderPlayers() {
  elements.playerList.replaceChildren();

  players.forEach((player, index) => {
    const item = document.createElement("li");
    item.className = "player-chip";

    const name = document.createElement("span");
    name.textContent = player;

    const removeButton = document.createElement("button");
    removeButton.type = "button";
    removeButton.textContent = "×";
    removeButton.setAttribute("aria-label", `حذف ${player}`);
    removeButton.addEventListener("click", () => {
      players.splice(index, 1);
      renderPlayers();
    });

    item.append(name, removeButton);
    elements.playerList.append(item);
  });

  const enoughPlayers = players.length >= 2;
  elements.playerHint.textContent = enoughPlayers
    ? `${players.length} لاعبين جاهزين للعب.`
    : "ضيفوا لاعبين على الأقل عشان تبدأ اللعبة.";
  elements.startButton.disabled = !enoughPlayers || !supabase;
}

function addPlayer(name) {
  const normalizedName = name.trim().replace(/\s+/g, " ");
  if (!normalizedName) return;

  if (players.some((player) => player.localeCompare(normalizedName, "ar", { sensitivity: "base" }) === 0)) {
    elements.playerHint.textContent = "الاسم ده مضاف بالفعل.";
    elements.playerName.focus();
    return;
  }

  players.push(normalizedName);
  renderPlayers();
}

function choosePlayer() {
  return players[Math.floor(Math.random() * players.length)];
}

function showCard(card) {
  roundNumber += 1;
  elements.roundLabel.textContent = `الجولة ${new Intl.NumberFormat("ar-EG").format(roundNumber)}`;
  elements.gameScreen.querySelector("#game-title").textContent = card.category;
  elements.turnIndicator.textContent = `الدور على ${choosePlayer()}`;
  elements.promptText.textContent = card.content;
}

async function drawCard() {
  elements.nextButton.disabled = true;
  setStatus("بنختارلكم سؤال...", "info");

  try {
    const { data, error } = await supabase
      .from("challenge_cards")
      .select("id, category, content")
      .eq("category", selectedCategory)
      .eq("is_active", true)
      .limit(100);

    if (error) throw error;
    if (!data?.length) {
      throw new Error(`مفيش محتوى متاح دلوقتي في فئة «${selectedCategory}».`);
    }

    const availableCards = data.length > 1 && lastCardId
      ? data.filter((card) => card.id !== lastCardId)
      : data;
    const card = availableCards[Math.floor(Math.random() * availableCards.length)];
    lastCardId = card.id;
    showCard(card);
    setStatus("اتسحب سؤال جديد من القعدة.", "success");
  } catch (error) {
    setStatus(`معرفناش نجيب السؤال: ${error.message}`, "error");
  } finally {
    elements.nextButton.disabled = false;
  }
}

elements.addPlayerForm.addEventListener("submit", (event) => {
  event.preventDefault();
  addPlayer(elements.playerName.value);
  elements.playerName.value = "";
  elements.playerName.focus();
});

document.querySelectorAll('input[name="category"]').forEach((input) => {
  input.addEventListener("change", () => {
    selectedCategory = input.value;
  });
});

elements.startButton.addEventListener("click", async () => {
  if (players.length < 2 || !supabase) return;
  elements.setupScreen.classList.add("hidden");
  elements.gameScreen.classList.remove("hidden");
  await drawCard();
});

elements.nextButton.addEventListener("click", drawCard);

elements.backButton.addEventListener("click", () => {
  elements.gameScreen.classList.add("hidden");
  elements.setupScreen.classList.remove("hidden");
});

async function connectSupabase() {
  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
    setStatus("اللعبة لسه مش متوصلة بـ Supabase. ضيف بيانات المشروع في supabase-config.js.", "error");
    renderPlayers();
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
    setStatus("متصلين بـ Supabase — القعدة جاهزة.", "success");
    renderPlayers();
  } catch (error) {
    setStatus(`تعذر الاتصال بـ Supabase: ${error.message}`, "error");
    renderPlayers();
  }
}

renderPlayers();
connectSupabase();
