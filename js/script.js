const ROUND_SECONDS = 60;

const DIFFICULTY_LABELS = {
  facil: "Fácil",
  medio: "Média",
  dificil: "Difícil",
};

const TEAM_COLORS = [
  { name: "Azul", hex: "#276fc2" },
  { name: "Vermelha", hex: "#d9544d" },
  { name: "Verde", hex: "#2f7d42" },
  { name: "Amarela", hex: "#c88319" },
  { name: "Roxa", hex: "#7a55c7" },
];

const WORD_BANK = [
  {
    category: "Animais",
    words: {
      facil: ["Cachorro", "Gato", "Macaco", "Elefante", "Leão", "Pato", "Cavalo", "Sapo", "Peixe", "Coelho"],
      medio: ["Girafa", "Canguru", "Tartaruga", "Jacaré", "Coruja", "Pinguim", "Golfinho", "Camaleão", "Tamanduá", "Arara"],
      dificil: ["Ornitorrinco", "Suricato", "Narval", "Dragão-de-komodo", "Axolote", "Lêmure", "Peixe-boi", "Quati", "Morsa", "Capivara"],
    },
  },
  {
    category: "Objetos",
    words: {
      facil: ["Celular", "Cadeira", "Óculos", "Chave", "Caneta", "Guarda-chuva", "Livro", "Bola", "Relógio", "Mochila"],
      medio: ["Liquidificador", "Aspirador", "Escada", "Violão", "Martelo", "Controle remoto", "Travesseiro", "Lanterna", "Capacete", "Tesoura"],
      dificil: ["Estetoscópio", "Bússola", "Binóculo", "Extintor", "Gramofone", "Ampulheta", "Megafone", "Saca-rolhas", "Drone", "Microscópio"],
    },
  },
  {
    category: "Profissões",
    words: {
      facil: ["Médico", "Professor", "Bombeiro", "Dentista", "Cozinheiro", "Policial", "Pintor", "Cantor", "Motorista", "Garçom"],
      medio: ["Fotógrafo", "Jardineiro", "Padeiro", "Mecânico", "Cabeleireiro", "Arquiteto", "Carteiro", "Repórter", "Veterinário", "Dançarino"],
      dificil: ["Astronauta", "Maestro", "Arqueólogo", "Sommelier", "Dublador", "Piloto de avião", "Ilusionista", "Oceanógrafo", "Joalheiro", "Perito criminal"],
    },
  },
  {
    category: "Ações (verbos)",
    words: {
      facil: ["Correr", "Dormir", "Comer", "Dançar", "Nadar", "Pular", "Chorar", "Rir", "Cantar", "Escovar os dentes"],
      medio: ["Malhar", "Cozinhar", "Pescar", "Fotografar", "Costurar", "Surfar", "Meditar", "Dirigir", "Regar plantas", "Fazer compras"],
      dificil: ["Hipnotizar", "Esquiar", "Equilibrar pratos", "Desfilar", "Fazer malabarismo", "Mergulhar", "Maquiar", "Consertar encanamento", "Tocar bateria", "Escalar"],
    },
  },
  {
    category: "Esportes",
    words: {
      facil: ["Futebol", "Vôlei", "Basquete", "Tênis", "Natação", "Boxe", "Corrida", "Ciclismo", "Judô", "Skate"],
      medio: ["Golfe", "Handebol", "Surfe", "Ginástica", "Beisebol", "Badminton", "Rugby", "Boliche", "Esgrima", "Arco e flecha"],
      dificil: ["Polo aquático", "Curling", "Críquete", "Salto com vara", "Hóquei no gelo", "Pentatlo", "Remo", "Escalada esportiva", "Taekwondo", "Lançamento de disco"],
    },
  },
  {
    category: "Comidas e bebidas",
    words: {
      facil: ["Pizza", "Sorvete", "Hambúrguer", "Café", "Bolo", "Banana", "Suco", "Chocolate", "Pipoca", "Macarrão"],
      medio: ["Sushi", "Tapioca", "Feijoada", "Lasanha", "Panqueca", "Churrasco", "Coxinha", "Milk-shake", "Acarajé", "Brigadeiro"],
      dificil: ["Fondue", "Ratatouille", "Ceviche", "Quiche", "Risoto", "Croissant", "Guacamole", "Paella", "Yakissoba", "Petit gâteau"],
    },
  },
  {
    category: "Lugares",
    words: {
      facil: ["Praia", "Escola", "Cinema", "Mercado", "Parque", "Hospital", "Igreja", "Aeroporto", "Padaria", "Museu"],
      medio: ["Biblioteca", "Estádio", "Fazenda", "Teatro", "Shopping", "Cachoeira", "Academia", "Restaurante", "Zoológico", "Posto de gasolina"],
      dificil: ["Observatório", "Embaixada", "Submarino", "Castelo", "Laboratório", "Farol", "Vinícola", "Templo", "Estúdio de gravação", "Estação espacial"],
    },
  },
];

const refs = {
  setupScreen: document.querySelector("#setupScreen"),
  gameScreen: document.querySelector("#gameScreen"),
  setupForm: document.querySelector("#setupForm"),
  teamSetupList: document.querySelector("#teamSetupList"),
  teamCountPreview: document.querySelector("#teamCountPreview"),
  teamNamesToggle: document.querySelector("#teamNamesToggle"),
  roundsInput: document.querySelector("#roundsInput"),
  backToSetupButton: document.querySelector("#backToSetupButton"),
  resetGameButton: document.querySelector("#resetGameButton"),
  scoreStrip: document.querySelector("#scoreStrip"),
  roundIndicator: document.querySelector("#roundIndicator"),
  turnTitle: document.querySelector("#turnTitle"),
  promptArea: document.querySelector("#promptArea"),
  categoryLabel: document.querySelector("#categoryLabel"),
  difficultyLabel: document.querySelector("#difficultyLabel"),
  wordText: document.querySelector("#wordText"),
  timerDisplay: document.querySelector("#timerDisplay"),
  startTimerButton: document.querySelector("#startTimerButton"),
  finishTurnButton: document.querySelector("#finishTurnButton"),
  scoringPanel: document.querySelector("#scoringPanel"),
  scoringTitle: document.querySelector("#scoringTitle"),
  awardPointButton: document.querySelector("#awardPointButton"),
  noPointButton: document.querySelector("#noPointButton"),
  nextWordButton: document.querySelector("#nextWordButton"),
  endPanel: document.querySelector("#endPanel"),
  rankingList: document.querySelector("#rankingList"),
  playAgainButton: document.querySelector("#playAgainButton"),
  newGameButton: document.querySelector("#newGameButton"),
};

const nameDrafts = TEAM_COLORS.map(() => "");

let game = null;

refs.setupForm.addEventListener("submit", startGame);
refs.teamNamesToggle.addEventListener("change", renderTeamSetup);
refs.backToSetupButton.addEventListener("click", showSetup);
refs.resetGameButton.addEventListener("click", restartCurrentGame);
refs.startTimerButton.addEventListener("click", startTimer);
refs.finishTurnButton.addEventListener("click", () => finishTurn("Acerto finalizado"));
refs.awardPointButton.addEventListener("click", () => scoreTurn(true));
refs.noPointButton.addEventListener("click", () => scoreTurn(false));
refs.nextWordButton.addEventListener("click", goToNextTurn);
refs.playAgainButton.addEventListener("click", restartCurrentGame);
refs.newGameButton.addEventListener("click", showSetup);

document.querySelectorAll('input[name="teamCount"]').forEach((input) => {
  input.addEventListener("change", renderTeamSetup);
});

renderTeamSetup();

function startGame(event) {
  event.preventDefault();
  const teamCount = Number(getCheckedValue("teamCount"));
  const difficulty = getCheckedValue("difficulty");
  const rounds = clamp(Number(refs.roundsInput.value) || 5, 1, 20);
  const useNames = refs.teamNamesToggle.checked;

  refs.roundsInput.value = rounds;

  const teams = TEAM_COLORS.slice(0, teamCount).map((color, index) => {
    const customName = nameDrafts[index].trim();

    return {
      id: `team-${index}`,
      colorName: color.name,
      name: useNames && customName ? customName : color.name,
      color: color.hex,
      score: 0,
    };
  });

  game = {
    config: { teamCount, difficulty, rounds, useNames },
    teams,
    turnNumber: 1,
    totalTurns: teamCount * rounds,
    remaining: ROUND_SECONDS,
    timerId: null,
    phase: "ready",
    currentPrompt: null,
    usedPrompts: new Set(),
    scoredThisTurn: false,
  };

  refs.setupScreen.classList.add("is-hidden");
  refs.gameScreen.classList.remove("is-hidden");
  refs.endPanel.classList.add("is-hidden");
  refs.promptArea.classList.remove("is-hidden");

  drawTurn();
}

function renderTeamSetup() {
  const teamCount = Number(getCheckedValue("teamCount"));
  const useNames = refs.teamNamesToggle.checked;
  refs.teamCountPreview.textContent = `${teamCount} ${teamCount === 1 ? "cor" : "cores"}`;
  refs.teamSetupList.replaceChildren();

  TEAM_COLORS.slice(0, teamCount).forEach((teamColor, index) => {
    const row = document.createElement("div");
    row.className = "team-setup-row";

    const chip = document.createElement("span");
    chip.className = "color-chip";
    chip.style.setProperty("--team-color", teamColor.hex);
    chip.setAttribute("aria-hidden", "true");

    const content = document.createElement("div");

    if (useNames) {
      const input = document.createElement("input");
      input.className = "team-name-input";
      input.type = "text";
      input.maxLength = 18;
      input.placeholder = teamColor.name;
      input.value = nameDrafts[index];
      input.setAttribute("aria-label", `Nome da equipe ${teamColor.name}`);
      input.addEventListener("input", () => {
        nameDrafts[index] = input.value;
      });
      content.append(input);
    } else {
      const name = document.createElement("div");
      name.className = "team-color-name";
      name.textContent = teamColor.name;
      content.append(name);
    }

    row.append(chip, content);
    refs.teamSetupList.append(row);
  });
}

function drawTurn() {
  stopTimer();
  game.phase = "ready";
  game.remaining = ROUND_SECONDS;
  game.scoredThisTurn = false;
  game.currentPrompt = drawPrompt(game.config.difficulty);

  refs.promptArea.classList.remove("is-hidden");
  refs.scoringPanel.classList.add("is-hidden");
  refs.endPanel.classList.add("is-hidden");
  refs.startTimerButton.disabled = false;
  refs.finishTurnButton.disabled = true;
  refs.awardPointButton.disabled = false;
  refs.noPointButton.disabled = false;
  refs.nextWordButton.disabled = true;
  refs.nextWordButton.textContent =
    game.turnNumber === game.totalTurns ? "Ver placar final" : "Sortear nova palavra";

  updateTurnHeader();
  updatePrompt();
  updateTimerDisplay();
  renderScores();
}

function drawPrompt(difficulty) {
  const allPrompts = WORD_BANK.flatMap((category) =>
    category.words[difficulty].map((word) => ({
      category: category.category,
      word,
      key: `${category.category}-${difficulty}-${word}`,
    })),
  );

  if (game.usedPrompts.size >= allPrompts.length) {
    game.usedPrompts.clear();
  }

  const available = allPrompts.filter((prompt) => !game.usedPrompts.has(prompt.key));
  const prompt = available[Math.floor(Math.random() * available.length)];
  game.usedPrompts.add(prompt.key);
  return prompt;
}

function startTimer() {
  if (!game || game.phase !== "ready") return;

  game.phase = "running";
  refs.startTimerButton.disabled = true;
  refs.finishTurnButton.disabled = false;

  game.timerId = window.setInterval(() => {
    game.remaining -= 1;
    updateTimerDisplay();

    if (game.remaining <= 0) {
      finishTurn("Tempo encerrado");
    }
  }, 1000);
}

function finishTurn(reason) {
  if (!game || game.phase === "scoring" || game.phase === "ended") return;

  stopTimer();
  game.phase = "scoring";
  refs.startTimerButton.disabled = true;
  refs.finishTurnButton.disabled = true;
  refs.scoringPanel.classList.remove("is-hidden");
  refs.scoringTitle.textContent = reason;

  const team = getCurrentTeam();
  refs.awardPointButton.textContent = `+1 para ${team.name}`;
  refs.noPointButton.textContent = "Nenhum ponto";
}

function scoreTurn(shouldAwardPoint) {
  if (!game || game.phase !== "scoring" || game.scoredThisTurn) return;

  if (shouldAwardPoint) {
    getCurrentTeam().score += 1;
  }

  game.scoredThisTurn = true;
  refs.awardPointButton.disabled = true;
  refs.noPointButton.disabled = true;
  refs.nextWordButton.disabled = false;
  renderScores();
}

function goToNextTurn() {
  if (!game || !game.scoredThisTurn) return;

  if (game.turnNumber >= game.totalTurns) {
    showEnd();
    return;
  }

  game.turnNumber += 1;
  drawTurn();
}

function showEnd() {
  stopTimer();
  game.phase = "ended";
  refs.promptArea.classList.add("is-hidden");
  refs.scoringPanel.classList.add("is-hidden");
  refs.endPanel.classList.remove("is-hidden");
  refs.roundIndicator.textContent = `${game.config.rounds} rodadas completas`;
  refs.turnTitle.textContent = "Placar final";
  renderScores();
  renderRanking();
}

function renderRanking() {
  const ranking = [...game.teams].sort((a, b) => b.score - a.score || a.name.localeCompare(b.name));
  refs.rankingList.replaceChildren();

  ranking.forEach((team, index) => {
    const row = document.createElement("div");
    row.className = "ranking-row";
    row.style.setProperty("--team-color", team.color);

    const position = document.createElement("span");
    position.className = "ranking-position";
    position.textContent = index + 1;

    const name = document.createElement("span");
    name.className = "ranking-name";
    name.textContent = team.name;

    const score = document.createElement("span");
    score.className = "ranking-score";
    score.textContent = `${team.score} ${team.score === 1 ? "ponto" : "pontos"}`;

    row.append(position, name, score);
    refs.rankingList.append(row);
  });
}

function restartCurrentGame() {
  if (!game) return;

  const { config } = game;
  const teams = game.teams.map((team) => ({ ...team, score: 0 }));

  game = {
    config,
    teams,
    turnNumber: 1,
    totalTurns: config.teamCount * config.rounds,
    remaining: ROUND_SECONDS,
    timerId: null,
    phase: "ready",
    currentPrompt: null,
    usedPrompts: new Set(),
    scoredThisTurn: false,
  };

  refs.endPanel.classList.add("is-hidden");
  refs.promptArea.classList.remove("is-hidden");
  drawTurn();
}

function showSetup() {
  stopTimer();
  refs.gameScreen.classList.add("is-hidden");
  refs.setupScreen.classList.remove("is-hidden");
}

function updateTurnHeader() {
  const currentRound = Math.ceil(game.turnNumber / game.config.teamCount);
  const team = getCurrentTeam();
  refs.roundIndicator.textContent = `Rodada ${currentRound} de ${game.config.rounds}`;
  refs.turnTitle.textContent = `Vez da equipe ${team.name}`;
}

function updatePrompt() {
  refs.categoryLabel.textContent = game.currentPrompt.category;
  refs.difficultyLabel.textContent = DIFFICULTY_LABELS[game.config.difficulty];
  refs.wordText.textContent = game.currentPrompt.word;
}

function updateTimerDisplay() {
  refs.timerDisplay.value = game.remaining;
  refs.timerDisplay.textContent = String(game.remaining).padStart(2, "0");
}

function renderScores() {
  refs.scoreStrip.replaceChildren();

  game.teams.forEach((team, index) => {
    const tile = document.createElement("article");
    tile.className = "score-tile";
    tile.style.setProperty("--team-color", team.color);

    if (index === getCurrentTeamIndex() && game.phase !== "ended") {
      tile.classList.add("is-active");
    }

    const marker = document.createElement("span");
    marker.className = "score-marker";
    marker.setAttribute("aria-hidden", "true");

    const name = document.createElement("span");
    name.className = "score-name";
    name.textContent = team.name;

    const score = document.createElement("span");
    score.className = "score-value";
    score.textContent = team.score;

    tile.append(marker, name, score);
    refs.scoreStrip.append(tile);
  });
}

function stopTimer() {
  if (game?.timerId) {
    window.clearInterval(game.timerId);
    game.timerId = null;
  }
}

function getCurrentTeam() {
  return game.teams[getCurrentTeamIndex()];
}

function getCurrentTeamIndex() {
  return (game.turnNumber - 1) % game.config.teamCount;
}

function getCheckedValue(name) {
  return document.querySelector(`input[name="${name}"]:checked`).value;
}

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}
