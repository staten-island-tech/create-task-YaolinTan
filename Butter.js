const DOMSelectors = {
  mainOutput: document.getElementById("main-output-card"),
  generalForm: document.getElementById("formGeneral"),
  userFeeling: document.getElementById("q-user-feeling-input"),
  userAge: document.getElementById("q-user-ageGroup-input"),
  userSubmit: document.getElementById("q-user-submit"),
  historyButton: document.getElementById("history-button"),
  resetHistoryButton: document.getElementById("hide-history-button"),
};
const quoteHistory = [];
const quoteCurrent = [];

function retrieveFeelingQuote(category) {
  DOMSelectors.mainOutput.innerHTML = ""; //Gets rid of previous current quote
  $.ajax({
    method: "GET",
    url: "https://api.api-ninjas.com/v1/quotes?category=" + category,
    headers: { "X-Api-Key": "e83S07p6GaMOgL3Tbp4W7g==SzjBmXqoFLEGxuow" },
    contentType: "application/json",
    success: function (result) {
      console.log("Retrieved Quote:", result); //Check: Quote Retrieval
      const quoteObject = {
        author: result[0].author,
        quote: result[0].quote,
        category: category,
      };
      quoteHistory.push(quoteObject); //Quote added to long term storage (History)
      console.log("History of Quotes:", quoteHistory); //Check to see if in long term
      quoteCurrent.length = 0; //Empty quoteCurrent
      quoteCurrent.push(quoteObject); //Quote added to short term storage (Current Quote)
      // Display the quote on the page
      console.log("Current Quote:", quoteCurrent); //Check to see if current quote works
      for (let i = 0; i < quoteCurrent.length; i++) {
        const quote = quoteCurrent[i];
        createQuoteCard(quote);
      }
    },
    error: function ajaxError(jqXHR) {
      console.error("Error: ", jqXHR.responseText);
    },
  });
}

const createQuoteCard = function (quoteCurrent) {
  DOMSelectors.mainOutput.insertAdjacentHTML(
    "afterbegin",
    `<div class="created-card">
          <h2 class="created-card-quote"> "${quoteCurrent.quote}" </h2>
          <h2 class="created-card-author"> - ${quoteCurrent.author} </h2>
          <h2 class="created-card-category"> ${quoteCurrent.category} </h2>
      </div>
      `
  );
};

DOMSelectors.generalForm.addEventListener(
  "submit",
  function quoteInitiate(userSubmit) {
    userSubmit.preventDefault();
    const valueUserAge = encodeURIComponent(DOMSelectors.userAge.value); // Test for displaying user Age: young / old
    const valueUserFeeling = encodeURIComponent(DOMSelectors.userFeeling.value); // Test for displaying user feeling: one of the options
    let category = "";

    if (valueUserAge === "young") {
      console.log(
        "You still have a long life ahead of you) Look what is out there!"
      );
    } else {
      console.log(
        "Focus on furthering your friendships. Appreciate the small things in life."
      );
    }
    categorySet();
    function categorySet() {
      if (valueUserFeeling === "Happy") {
        category = "happiness";
      } else if (valueUserFeeling === "Sad") {
        category = "alone";
      } else if (valueUserFeeling === "Scared") {
        category = "fear";
      } else if (valueUserFeeling === "Bored") {
        category = "attitude";
      } else if (valueUserFeeling === "Angry") {
        category = "anger";
      }
    }
    retrieveFeelingQuote(category); //Based on category, a specific quote is retrieve
  }
);

DOMSelectors.historyButton.addEventListener("click", function () {
  displayHistory();
});
const displayHistory = function () {
  DOMSelectors.mainOutput.innerHTML = ""; // Clear previous quote
  for (let i = 0; i < quoteHistory.length; i++) {
    const quote = quoteHistory[i];
    createQuoteCard(quote);
  }
};

DOMSelectors.resetHistoryButton.addEventListener("click", function () {
  resetHistory();
});
const resetHistory = function () {
  DOMSelectors.mainOutput.innerHTML = ""; // Clear previous quote
  if (quoteCurrent.length > 0) {
    for (let i = 0; i < quoteCurrent.length; i++) {
      const quote = quoteCurrent[i];
      createQuoteCard(quote);
    }
  }
};
