console.log("Hello World");

const url =
  "https://nba-stats4.p.rapidapi.com/per_game_regular_season/?per_page=50&page=1";
const options = {
  method: "GET",
  headers: {
    "x-rapidapi-key": "b547fab545msh1e011958ac061d1p1962dcjsn97b955f29017",
    "x-rapidapi-host": "nba-stats4.p.rapidapi.com",
  },
};

try {
  const response = await fetch(url, options);
  const result = await response.text();
  console.log(result);
} catch (error) {
  console.error(error);
}
