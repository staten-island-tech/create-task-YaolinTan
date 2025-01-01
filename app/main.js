console.log("Hello World");
import { players } from "./array";

let shotsMade = 0;

while (shotsMade < 10) {
  const randomNumber = Math.floor(Math.random() * 100) + 1;
  let three = players[`${randomNumber}`].threePt;
  let two = players[`${randomNumber}`].twoPt;
  let one = players[`${randomNumber}`].freeThrow;

  shotsMade++;
}
