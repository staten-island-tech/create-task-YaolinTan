console.log("Hello World");
import { players } from "./array";

let shotsMade = 0;

while (shotsMade < 10) {
  const randomNumber = Math.floor(Math.random() * 100) + 1;
  console.log(randomNumber);
  console.log(player[`${randomNumber}`]);
  shotsMade++;
}
