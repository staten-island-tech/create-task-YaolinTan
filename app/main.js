console.log("Hello World");

const fetchPlayer = async () => {
  const url = `https://cors-anywhere.herokuapp.com/https://api.balldontlie.io/v1/teams`;
  const options = {
    method: "GET",
    headers: {
      "x-rapidapi-key": "4d7af431-d6a9-403d-a99e-571a637f0be6",
      "x-rapidapi-host": "https://www.balldontlie.io/",
    },
  };

  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      console.error(
        `Failed to fetch data. Status: ${response.status}. Please try again later`
      );
      return null;
    }

    const data = await response.json();
    console.log(`Data for Teams:`, data);
    return data;
  } catch (error) {
    console.error(`Error fetching data. Please try again later`);
    return null;
  }
};

fetchPlayer();
