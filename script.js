const IMAGE_BASE =
  "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/";

const WORKOUTS = {
  A: {
    label: "Treino A",
    title: "Peito + Ombros",
    accent: "#db5a49",
    description: "Peito, deltoides e manguito",
    exercises: [
      exercise("Rotação externa (manguito)", "2", "20", "Aquecimento", "External_Rotation_with_Band"),
      exercise("Supino inclinado articulado", "4", "6-10", "0 kg", "Leverage_Incline_Chest_Press"),
      exercise("Supino reto sentado", "4", "8-12", "0 kg", "Machine_Bench_Press"),
      exercise("Crucifixo máquina", "3", "10-15", "0 kg", "Butterfly"),
      exercise("Desenvolvimento com barra", "2", "8-12", "0 kg", "Standing_Military_Press"),
      exercise("Elevação lateral", "5", "12-20", "0 kg", "Side_Lateral_Raise"),
      exercise("Crucifixo inverso máquina", "3", "12-20", "0 kg", "Reverse_Machine_Flyes"),
    ],
  },
  B: {
    label: "Treino B",
    title: "Costas + Abdômen",
    accent: "#2672b9",
    description: "Puxadas, remadas e core",
    exercises: [
      exercise("Puxada alta pegada supinada", "4", "8-12", "0 kg", "Close-Grip_Front_Lat_Pulldown"),
      exercise("Remada articulada", "4", "8-12", "0 kg", "Leverage_High_Row"),
      exercise("Remada cavalinho", "3", "8-12", "0 kg", "T-Bar_Row_with_Handle"),
      exercise("Pulldown com braços estendidos", "3", "12-15", "0 kg", "Straight-Arm_Pulldown"),
      exercise("Trapézio máquina", "3", "10-15", "0 kg", "Calf-Machine_Shoulder_Shrug"),
      exercise("Abdômen canivete", "3", "15-20", "Peso corporal", "Jackknife_Sit-Up"),
    ],
  },
  C: {
    label: "Treino C",
    title: "Pernas",
    accent: "#ce8b21",
    description: "Quadríceps, posterior e panturrilha",
    exercises: [
      exercise("Agachamento Smith", "4", "6-10", "0 kg", "Smith_Machine_Squat"),
      exercise("Hack Machine", "3", "8-12", "0 kg", "Hack_Squat"),
      exercise("Leg Press", "2", "10-15", "0 kg", "Leg_Press"),
      exercise("Stiff com barra ou halteres", "4", "8-12", "0 kg", "Romanian_Deadlift"),
      exercise("Mesa flexora", "4", "10-15", "0 kg", "Lying_Leg_Curls"),
      exercise("Cadeira extensora", "2", "12-15", "0 kg", "Leg_Extensions"),
      exercise("Panturrilha no Leg Press", "5", "12-20", "0 kg", "Calf_Press"),
    ],
  },
  D: {
    label: "Treino D",
    title: "Braços + Abdômen",
    accent: "#1f8a5b",
    description: "Bíceps, tríceps, antebraço e core",
    exercises: [
      exercise("Rosca direta barra", "4", "8-12", "0 kg", "Barbell_Curl", "Bíceps"),
      exercise("Rosca inclinada com halteres", "3", "10-15", "0 kg", "Alternate_Incline_Dumbbell_Curl", "Bíceps"),
      exercise("Rosca martelo", "3", "10-15", "0 kg", "Alternate_Hammer_Curl", "Bíceps"),
      exercise("Tríceps francês", "4", "8-12", "0 kg", "Seated_Triceps_Press", "Tríceps"),
      exercise("Tríceps testa", "3", "8-12", "0 kg", "Lying_Triceps_Press", "Tríceps"),
      exercise("Tríceps corda", "3", "12-15", "0 kg", "Triceps_Pushdown_-_Rope_Attachment", "Tríceps"),
      exercise("Flexão de punho", "3", "15-20", "0 kg", "Seated_Palm-Up_Barbell_Wrist_Curl", "Antebraço"),
      exercise("Elevação de pernas", "3", "12-20", "Peso corporal", "Flat_Bench_Lying_Leg_Raise", "Abdômen"),
      exercise("Prancha", "3", "Próximo da falha técnica", "Peso corporal", "Plank", "Abdômen"),
    ],
  },
};

const STORE_KEY = "meuTreinoAppV1";
const state = loadState();
let mediaTimer;

const startScreen = document.querySelector("#startScreen");
const workoutScreen = document.querySelector("#workoutScreen");
const workoutChoices = document.querySelector("#workoutChoices");
const exerciseList = document.querySelector("#exerciseList");
const workoutLabel = document.querySelector("#workoutLabel");
const workoutTitle = document.querySelector("#workoutTitle");
const progressText = document.querySelector("#progressText");
const progressPercent = document.querySelector("#progressPercent");
const progressBar = document.querySelector("#progressBar");

document.querySelector("#todayLabel").textContent = new Intl.DateTimeFormat("pt-BR", {
  weekday: "long",
  day: "2-digit",
  month: "long",
}).format(new Date());

document.querySelector("#backButton").addEventListener("click", showStart);
document.querySelector("#resetButton").addEventListener("click", resetCurrentWorkout);

renderHome();

function exercise(name, sets, reps, weight, mediaId, group = "") {
  return { name, sets, reps, weight, mediaId, group };
}

function loadState() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORE_KEY));
    return {
      currentWorkout: saved?.currentWorkout || "",
      completed: saved?.completed || {},
      weights: saved?.weights || {},
    };
  } catch {
    return { currentWorkout: "", completed: {}, weights: {} };
  }
}

function saveState() {
  localStorage.setItem(STORE_KEY, JSON.stringify(state));
}

function renderHome() {
  workoutChoices.innerHTML = Object.entries(WORKOUTS)
    .map(([id, workout]) => {
      const total = workout.exercises.length;
      const completed = countCompleted(id);
      const percent = total ? Math.round((completed / total) * 100) : 0;

      return `
        <button class="workout-card" type="button" style="--accent: ${workout.accent}" data-workout="${id}">
          <span class="workout-letter">${id}</span>
          <span>
            <h2>${workout.title}</h2>
            <p>${workout.description}</p>
          </span>
          <span class="workout-meta">
            <span>${completed}/${total} concluídos</span>
            <span class="mini-progress" aria-hidden="true">
              <span style="--value: ${percent}%"></span>
            </span>
          </span>
        </button>
      `;
    })
    .join("");

  workoutChoices.querySelectorAll("[data-workout]").forEach((button) => {
    button.addEventListener("click", () => showWorkout(button.dataset.workout));
  });
}

function showStart() {
  state.currentWorkout = "";
  saveState();
  startScreen.classList.add("screen-active");
  workoutScreen.classList.remove("screen-active");
  renderHome();
  stopMediaLoop();
}

function showWorkout(workoutId) {
  state.currentWorkout = workoutId;
  saveState();
  startScreen.classList.remove("screen-active");
  workoutScreen.classList.add("screen-active");
  renderWorkout(workoutId);
}

function renderWorkout(workoutId) {
  const workout = WORKOUTS[workoutId];
  let lastGroup = "";

  workoutLabel.textContent = workout.label;
  workoutTitle.textContent = workout.title;
  exerciseList.innerHTML = workout.exercises
    .map((item, index) => {
      const key = exerciseKey(workoutId, index);
      const done = Boolean(state.completed[key]);
      const weight = state.weights[key] ?? item.weight;
      const groupHeader =
        item.group && item.group !== lastGroup ? `<h3 class="group-label">${item.group}</h3>` : "";

      if (item.group) {
        lastGroup = item.group;
      }

      return `
        ${groupHeader}
        <article class="exercise-card ${done ? "is-done" : ""}" data-key="${key}">
          ${renderMedia(item)}
          <div class="exercise-content">
            <div class="exercise-main">
              <div>
                <h3 class="exercise-title">${item.name}</h3>
              </div>
              <button class="done-button" type="button" data-toggle="${key}">
                ${done ? "Reabrir" : "Concluir"}
              </button>
            </div>

            <div class="metrics">
              <div class="metric">
                <span>Séries</span>
                <strong>${item.sets}</strong>
              </div>
              <div class="metric">
                <span>Repetições</span>
                <strong>${item.reps}</strong>
              </div>
            </div>

            <label class="weight-field">
              <span>Peso atual</span>
              <input type="text" value="${escapeAttr(weight)}" data-weight="${key}" />
            </label>
          </div>
        </article>
      `;
    })
    .join("");

  exerciseList.querySelectorAll("[data-toggle]").forEach((button) => {
    button.addEventListener("click", () => toggleDone(button.dataset.toggle));
  });

  exerciseList.querySelectorAll("[data-weight]").forEach((input) => {
    input.addEventListener("input", () => {
      state.weights[input.dataset.weight] = input.value;
      saveState();
    });
  });

  exerciseList.querySelectorAll(".exercise-image").forEach((image) => {
    image.addEventListener("error", () => {
      image.closest(".media-wrap")?.classList.add("media-error");
    });
  });

  updateProgress(workoutId);
  startMediaLoop();
}

function renderMedia(item) {
  const frameOne = imageUrl(item.mediaId, 0);
  const frameTwo = imageUrl(item.mediaId, 1);

  return `
    <div class="media-wrap">
      <img
        class="exercise-image"
        src="${frameOne}"
        data-frames="${frameOne}|${frameTwo}"
        data-frame-index="0"
        alt="Execução de ${escapeAttr(item.name)}"
        loading="lazy"
      />
      <span class="media-badge">loop</span>
    </div>
  `;
}

function imageUrl(mediaId, frame) {
  return encodeURI(`${IMAGE_BASE}${mediaId}/${frame}.jpg`);
}

function startMediaLoop() {
  stopMediaLoop();
  mediaTimer = window.setInterval(() => {
    document.querySelectorAll(".exercise-image[data-frames]").forEach((image) => {
      const frames = image.dataset.frames.split("|");
      const nextIndex = (Number(image.dataset.frameIndex) + 1) % frames.length;
      image.dataset.frameIndex = String(nextIndex);
      image.src = frames[nextIndex];
    });
  }, 850);
}

function stopMediaLoop() {
  if (mediaTimer) {
    window.clearInterval(mediaTimer);
    mediaTimer = undefined;
  }
}

function toggleDone(key) {
  const wasDone = Boolean(state.completed[key]);

  if (wasDone) {
    delete state.completed[key];
  } else {
    state.completed[key] = true;
  }

  saveState();
  renderWorkout(state.currentWorkout);

  if (!wasDone) {
    const next = document.querySelector(".exercise-card:not(.is-done)");
    next?.scrollIntoView({ block: "center", behavior: "smooth" });
  }
}

function resetCurrentWorkout() {
  if (!state.currentWorkout) return;

  WORKOUTS[state.currentWorkout].exercises.forEach((_, index) => {
    delete state.completed[exerciseKey(state.currentWorkout, index)];
  });

  saveState();
  renderWorkout(state.currentWorkout);
}

function countCompleted(workoutId) {
  return WORKOUTS[workoutId].exercises.filter((_, index) =>
    Boolean(state.completed[exerciseKey(workoutId, index)]),
  ).length;
}

function updateProgress(workoutId) {
  const total = WORKOUTS[workoutId].exercises.length;
  const completed = countCompleted(workoutId);
  const percent = total ? Math.round((completed / total) * 100) : 0;

  progressText.textContent = `${completed}/${total} concluídos`;
  progressPercent.textContent = `${percent}%`;
  progressBar.style.width = `${percent}%`;
}

function exerciseKey(workoutId, index) {
  return `${workoutId}-${index}`;
}

function escapeAttr(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll('"', "&quot;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}
