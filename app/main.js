console.log("Hello World");
import { players } from "./array";

const DOMselectors = {
  button: document.querySelectorAll(".button"),
  button1: document.querySelector(".button1"),
  button2: document.querySelector(".button2"),
  button3: document.querySelector(".button3"),
};

let deficit = 2;
let shotCount = 0;
let i = 1;
const contextContainer = document.querySelector(".contextRow");
const picContainer = document.querySelector(".pic");

async function startGame() {
  while (deficit > -1) {
    if (deficit === 0) {
      deficit += 2;
      i += 1;
      shotCount -= shotCount;
      console.log("Deficit:", deficit);
    }
    const playerContainer = document.querySelector(".player");
    const consoleContainer = document.querySelector(".console");
    playerContainer.innerHTML = "";
    const randomNumber = Math.floor(Math.random() * 99);
    let player = players[randomNumber];
    console.log(player.name);
    let three = player.threePt;
    console.log("3pt%", three);
    let two = player.twoPt;
    console.log("2pt%:", two);
    let one = player.freeThrow;
    console.log("ft%:", one);
    insertPlayer(player, playerContainer);
    const shotTaken = Math.random() * 1;
    console.log("Chance of shot taken:", shotTaken);

    const { shotSelected, points } = await waitForClick(three, two, one);
    results(shotTaken, points, shotSelected);
    insertConsole(
      deficit,
      player,
      consoleContainer,
      contextContainer,
      picContainer
    );
    shotCount++;
    console.log("Shot Count:", shotCount);
    console.log("Deficit:", deficit);
    if (shotCount < 2) {
    }
    if (deficit > 0 && shotCount === 2) {
      console.log("Shot Count:", shotCount);
      contextContainer.innerHTML = "";
      contextContainer.insertAdjacentHTML(
        "beforeend",
        `<div class="context card"><h2>Time runs out and your team loses</h2></div>`
      );
      return "Lose";
    }
    if (deficit === 0 && shotCount === 2) {
      console.log("Shot Count:", shotCount);
      contextContainer.innerHTML = "";
      contextContainer.insertAdjacentHTML(
        "beforeend",
        `<div class="context card"><h2>Time runs out and your team goes into OT${i}, you get the ball again at the end of the clock, down 2...</h2></div>`
      );
    }
  }
}

startGame();

function waitForClick(three, two, one) {
  return new Promise((resolve) => {
    const buttons = [
      DOMselectors.button1,
      DOMselectors.button2,
      DOMselectors.button3,
    ];

    buttons.forEach((button) => {
      button.addEventListener(
        "click",
        (event) => {
          event.preventDefault();
          let shotSelected, points;

          if (button === DOMselectors.button1) {
            shotSelected = one * one;
            points = 2;
            console.log("2ft%:", shotSelected);
          } else if (button === DOMselectors.button2) {
            shotSelected = two;
            points = 2;
          } else if (button === DOMselectors.button3) {
            shotSelected = three;
            points = 3;
          }

          resolve({ shotSelected, points });
        },
        { once: true }
      );
    });
  });
}

function results(shotTaken, points, shotSelected) {
  if (shotTaken <= shotSelected) {
    console.log(shotSelected);
    deficit -= points;
    console.log("Splash");
  } else {
    console.log(shotSelected);
    console.log("Clank");
  }
}

function insertPlayer(player, playerContainer) {
  playerContainer.insertAdjacentHTML(
    "beforeend",
    `
    <div></div>
      <h2>${player.name}</h2>
      <div class="text">
      <h3>Three Point Percentage:</h3>
      <p>${player.threePt}</p>
      </div>
      <div class="text">
      <h3>Two Point Percentage:</h3>
      <p>${player.twoPt}</p>
      </div>
      <div class="text">
      <h3>Free throw Percentage:</h3>
      <p>${player.freeThrow}</p>
      </div>
    `
  );
}

function insertConsole(
  deficit,
  player,
  consoleContainer,
  contextContainer,
  picContainer
) {
  if (deficit === 2) {
    contextContainer.innerHTML = "";
    contextContainer.insertAdjacentHTML(
      "beforeend",
      `
       <div class="context card"><h2>Rebound Bosh, back out to the perimeter</h2></div>
      `
    );
    picContainer.innerHTML = "";
    picContainer.insertAdjacentHTML(
      "beforeend",
      `
      <img src="https://th.bing.com/th/id/OIP.1Xjux_QDz-ucvl1c2zb0_gAAAA?rs=1&pid=ImgDetMain" alt="Rebound Bosh">
      `
    );
  }

  if (deficit === 0) {
    contextContainer.innerHTML = "";
    contextContainer.insertAdjacentHTML(
      "beforeend",
      `
      <div class="context card"><h2>Time runs out and it ends in a tie, now you're in the last possession of OT ${i} with the ball in your hands again. Pick the shot you take carefully as it could decide the outcome of the game </h2></div>
    `
    );
  }
  if (deficit < 0) {
    consoleContainer.insertAdjacentHTML(
      "beforeend",
      `
    <h2>*Buzzer sounds* Is this the dagger... Bang! Bang! Game! Series! ${player.name} seals the game </h2>
    `
    );
    return "splash";
  }
}
