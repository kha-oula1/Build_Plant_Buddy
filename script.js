const drain_amount = 1;
const drain_interval = 900;
const water_cooldown = 10000;

let water_level = 100;
let water_on_cooldown = false;
let cooldown_timer = null;

const bars = Array.from({ length: 10 }, (_, i) =>
  document.getElementById(`bar-${i + 1}`)
);

const percentage_el = document.getElementById("percentage");
const mood_tag = document.getElementById("mood");
const plant_icon = document.getElementById("plant");
const care_reminder = document.getElementById("message");
const water_btn = document.getElementById("water-btn");
const water_timer_el = water_btn.querySelector(".timer");
const restart_btn = document.getElementById("restart-btn");

function updateUI() {
  percentage_el.textContent = `${water_level}%`;

  bars.forEach((bar, i) => {
    const threshold = i * 10;
    const filled = water_level > threshold;

    bar.style.background = filled ? "#8FC98A" : "#C2E0B8";
    bar.style.color = filled ? "#8FC98A" : "#C2E0B8";
  });

  if (water_level > 74) {
    plant_icon.src = "assets/leafy-stem-plant/leafy-stem-thriving.gif";
    mood_tag.textContent = "Thriving";
    care_reminder.textContent = "- All good here, just vibing -";
    restart_btn.style.display = "none";
    water_btn.style.display = "flex";
  } else if (water_level > 39) {
    plant_icon.src = "assets/leafy-stem-plant/leafy-stem-okay.gif";
    mood_tag.textContent = "Okay";
    care_reminder.textContent = "- Doing fine, no worries -";
    restart_btn.style.display = "none";
    water_btn.style.display = "flex";
  } else if (water_level > 0) {
    plant_icon.src = "assets/leafy-stem-plant/leafy-stem-thirsty.gif";
    mood_tag.textContent = "Thirsty";
    care_reminder.textContent = "- Feeling a little dry over here... -";
    restart_btn.style.display = "none";
    water_btn.style.display = "flex";
  } else {
    plant_icon.src = "assets/leafy-stem-plant/leafy-stem-wilted.gif";
    mood_tag.textContent = "Wilted";
    care_reminder.textContent = "- Your plant has wilted -";
    restart_btn.style.display = "flex";
    water_btn.style.display = "none";
  }
}

setInterval(() => {
  if (water_level > 0) {
    water_level = Math.max(0, water_level - drain_amount);
    updateUI();
  }
}, drain_interval);

water_btn.addEventListener("click", () => {
  if (water_on_cooldown) return;

  water_level = Math.min(100, water_level + 25);
  updateUI();

  water_on_cooldown = true;
  water_btn.disabled = true;
  water_btn.style.opacity = 0.5;

  let remaining = water_cooldown / 1000;
  water_timer_el.textContent = `${remaining}s`;

  cooldown_timer = setInterval(() => {
    remaining -= 1;

    if (remaining <= 0) {
      clearInterval(cooldown_timer);
      water_on_cooldown = false;
      water_btn.disabled = false;
      water_btn.style.opacity = 1;
      water_timer_el.textContent = "READY";
    } else {
      water_timer_el.textContent = `${remaining}s`;
    }
  }, 1000);
});

restart_btn.addEventListener("click", () => {
  water_level = 100;
  water_on_cooldown = false;

  water_btn.disabled = false;
  water_btn.style.opacity = 1;
  water_timer_el.textContent = "READY";

  clearInterval(cooldown_timer);
  updateUI();
});
updateUI();