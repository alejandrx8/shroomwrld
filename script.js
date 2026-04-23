const garden = document.getElementById("garden");
const canvas = document.getElementById("connections");
const ctx = canvas.getContext("2d");

const countEl = document.getElementById("count");
const collectedEl = document.getElementById("collected");
const unlock = document.getElementById("unlock");
const fact = document.getElementById("fact");
const frog = document.getElementById("frog");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let mushrooms = [];
let count = 0;
let collected = 0;

const facts = [
  "Mushrooms form underground networks (mycelium)",
  "Some mushrooms glow in the dark",
  "Fungi can communicate with trees",
  "You have elite mushroom taste"
];

function drawConnections() {
  ctx.clearRect(0,0,canvas.width,canvas.height);

  for (let i = 0; i < mushrooms.length; i++) {
    for (let j = i + 1; j < mushrooms.length; j++) {
      let dx = mushrooms[i].x - mushrooms[j].x;
      let dy = mushrooms[i].y - mushrooms[j].y;
      let dist = Math.sqrt(dx*dx + dy*dy);

      if (dist < 150) {
        ctx.strokeStyle = "rgba(255,100,255,0.2)";
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(mushrooms[i].x, mushrooms[i].y);
        ctx.lineTo(mushrooms[j].x, mushrooms[j].y);
        ctx.stroke();
      }
    }
  }
}

garden.addEventListener("click", (e) => {
  const mush = document.createElement("div");
  mush.className = "mushroom";

  let size = 15 + Math.random() * 20;
  mush.style.width = size + "px";
  mush.style.height = size + "px";

  let colors = ["#ff4fd8","#7a00ff","#00e5ff","#ff9cfb"];
  let color = colors[Math.floor(Math.random()*colors.length)];

  mush.style.background = `radial-gradient(circle, ${color}, black)`;
  mush.style.boxShadow = `0 0 20px ${color}, 0 0 40px ${color}`;

  mush.style.left = e.clientX + "px";
  mush.style.top = e.clientY + "px";

  garden.appendChild(mush);

  mushrooms.push({x: e.clientX, y: e.clientY, el: mush});

  count++;
  countEl.textContent = count;

  fact.textContent = facts[Math.floor(Math.random()*facts.length)];

  mush.addEventListener("click", (ev) => {
    ev.stopPropagation();
    collected++;
    collectedEl.textContent = collected;
  });

  drawConnections();

  if (count >= 12) {
    unlock.classList.remove("hidden");
  }
});

/* FROG MOVEMENT */
setInterval(() => {
  if (mushrooms.length === 0) return;

  let target = mushrooms[Math.floor(Math.random()*mushrooms.length)];

  frog.style.left = target.x + "px";
  frog.style.top = target.y + "px";
}, 1500);

/* PARTICLES */
for (let i = 0; i < 40; i++) {
  let p = document.createElement("div");
  p.className = "particle";
  p.style.left = Math.random()*100 + "vw";
  p.style.top = Math.random()*100 + "vh";
  p.style.animationDuration = (4 + Math.random()*4) + "s";
  document.body.appendChild(p);
}