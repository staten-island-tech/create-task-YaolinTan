console.log("Hello World");

import { BalldontlieAPI } from "@balldontlie/sdk";

const api = new BalldontlieAPI({
  apiKey: "4d7af431-d6a9-403d-a99e-571a637f0be6",
});
const stats = await api.nba.getSeasonAverages({
  season: 2023,
  player_id: 1996,
});

console.log(stats);
