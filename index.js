/*****************************************************************************
 * Challenge 2: Review the provided code. The provided code includes:
 * -> Statements that import data from games.js
 * -> A function that deletes all child elements from a parent element in the DOM
 */

// import the JSON data about the crowd funded games from the games.js file
import GAMES_DATA from "./games.js";

// create a list of objects to store the data about the games using JSON.parse
const GAMES_JSON = JSON.parse(GAMES_DATA);

// remove all child elements from a parent element in the DOM
function deleteChildElements(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}

/*****************************************************************************
 * Challenge 3: Add data about each game as a card to the games-container
 * Skills used: DOM manipulation, for loops, template literals, functions
 */

// grab the element with the id games-container
const gamesContainer = document.getElementById("games-container");

// create a function that adds all data from the games array to the page
function addGamesToPage(games) {
  // loop over each item in the data
  for (let game of games) {
    // create a new div element, which will become the game card
    let card = document.createElement("div");

    // add the class game-card to the list
    card.classList.add("game-card");

    // set the inner HTML using a template literal to display some info
    // about each game
    // TIP: if your images are not displaying, make sure there is space
    // between the end of the src attribute and the end of the tag ("/>")
    card.innerHTML = `<h3> ${game.name} </h3>
                        <img src='${game.img}' class='game-img'/>
                        <p> ${game.description} </p>
                        `;

    // append the game to the games-container
    gamesContainer.appendChild(card);
  }
}

// call the function we just defined using the correct variable
// later, we'll call this function using a different list of games
addGamesToPage(GAMES_JSON);

/*************************************************************************************
 * Challenge 4: Create the summary statistics at the top of the page displaying the
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: arrow functions, reduce, template literals
 */

// grab the contributions card element
const contributionsCard = document.getElementById("num-contributions");

// use reduce() to count the number of total contributions by summing the backers
let total_contributions = GAMES_JSON.reduce((acc, game) => {
  return acc + game.backers;
}, 0);
// set the inner HTML using a template literal and toLocaleString to get a number with commas

contributionsCard.innerHTML = ` <p> ${total_contributions.toLocaleString(
  "en-US"
)} </p> `;

// grab the amount raised card, then use reduce() to find the total amount raised
const raisedCard = document.getElementById("total-raised");

let total_raised = GAMES_JSON.reduce((acc, game) => {
  return acc + game.pledged;
}, 0);

// set inner HTML using template literal
raisedCard.innerHTML = ` <p> $${total_raised.toLocaleString("en-US")} </p> `;

// grab number of games card and set its inner HTML
const gamesCard = document.getElementById("num-games");
let total_games = GAMES_JSON.reduce((acc, game) => {
  return acc + 1;
}, 0);
gamesCard.innerHTML = ` <p> ${total_games} </p>`;

/*************************************************************************************
 * Challenge 5: Add functions to filter the funded and unfunded games
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: functions, filter
 */

// show only games that do not yet have enough funding

function filterUnfundedOnly() {
  deleteChildElements(gamesContainer);

  // use filter() to get a list of games that have not yet met their goal
  let listUnfunded = GAMES_JSON.filter((game) => {
    return game.pledged < game.goal;
  });

  // use the function we previously created to add the unfunded games to the DOM
  addGamesToPage(listUnfunded);
}

// show only games that are fully funded
function filterFundedOnly() {
  deleteChildElements(gamesContainer);

  // use filter() to get a list of games that have met or exceeded their goal
  let funded = GAMES_JSON.filter((game) => {
    return game.pledged > game.goal;
  });
  // use the function we previously created to add unfunded games to the DOM
  addGamesToPage(funded);
}

// show all games
function showAllGames() {
  deleteChildElements(gamesContainer);

  // add all games from the JSON data to the DOM
  addGamesToPage(GAMES_JSON);
}

function filterSearch() {
  deleteChildElements(gamesContainer);
  let input = document.getElementById("search");
  input = input.value.toLowerCase();
  let filtered = GAMES_JSON.filter((game) => {
    return (
      game.name.toLowerCase().includes(input) ||
      game.description.toLowerCase().includes(input)
    );
  });
  addGamesToPage(filtered);
}

// select each button in the "Our Games" section
const unfundedBtn = document.getElementById("unfunded-btn");
const fundedBtn = document.getElementById("funded-btn");
const allBtn = document.getElementById("all-btn");
const searchBar = document.getElementById("search");

// add event listeners with the correct functions to each button
unfundedBtn.addEventListener("click", filterUnfundedOnly);
fundedBtn.addEventListener("click", filterFundedOnly);
allBtn.addEventListener("click", showAllGames);
searchBar.addEventListener("keyup", filterSearch);

/*************************************************************************************
 * Challenge 6: Add more information at the top of the page about the company.
 * Skills used: template literals, ternary operator
 */

// grab the description container
const descriptionContainer = document.getElementById("description-container");

// use filter or reduce to count the number of unfunded games
let listUnfunded = GAMES_JSON.filter((game) => {
  return game.pledged < game.goal;
});

let numUnfunded = listUnfunded.length;

// create a string that explains the number of unfunded games using the ternary operator
const displayStr = `A total of $800,000 has been raised for 11 games. Currently ${
  numUnfunded == 1 ? "1 game remains" : numUnfunded + " games remain"
} unfunded. Please consider donating!`;
// create a new DOM element containing the template string and append it to the description container
let donations = document.createElement("div");
donations.innerHTML = `<p> ${displayStr} </p>`;
descriptionContainer.appendChild(donations);
/************************************************************************************
 * Challenge 7: Select & display the top 2 games
 * Skills used: spread operator, destructuring, template literals, sort
 */

const firstGameContainer = document.getElementById("first-game");
const secondGameContainer = document.getElementById("second-game");

const sortedGames = GAMES_JSON.sort((item1, item2) => {
  return item2.pledged - item1.pledged;
});

// use destructuring and the spread operator to grab the first and second games
let [topGame, secondBest, ...others] = sortedGames;
// create a new element to hold the name of the top pledge game, then append it to the correct element
let topGameName = document.createElement("div");
topGameName.innerHTML = `<p> ${topGame.name} </p>`;
firstGameContainer.append(topGameName);

// do the same for the runner up item
let secondGameName = document.createElement("div");
secondGameName.innerHTML = `<p> ${secondBest.name} </p>`;
secondGameContainer.append(secondGameName);
