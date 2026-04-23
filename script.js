const garden = document.getElementById("garden");
const messageBox = document.getElementById("message");

const messages = [
  "You’re more interesting than any mushroom 🍄",
  "Fun fact: mushrooms can communicate underground",
  "You just grew something cool",
  "Lowkey, this is made for you",
  "You have elite taste in fungi"
];

let count = 0;

garden.addEventListener("click", (e) => {
  const mush = document.createElement("div");
  mush.className = "mushroom";

  mush.style.left = e.clientX + "px";
  mush.style.top = e.clientY + "px";

  mush.addEventListener("click", (event) => {
    event.stopPropagation();
    messageBox.textContent =
      messages[Math.floor(Math.random() * messages.length)];
  });

  garden.appendChild(mush);
  count++;

  if (count === 10) {
    messageBox.textContent = "You unlocked something… you’re kinda amazing";
  }
});