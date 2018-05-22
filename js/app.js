/*
 * Create a list that holds all of your cards
 */
// const cardSymbols = ['fa fa-diamond', 'fa fa-paper-plane-o', 'fa fa-anchor', 'fa fa-bolt', 'fa fa-cube', 'fa fa-leaf', 'fa fa-bicycle', 'fa fa-bomb', 'fa fa-diamond', 'fa fa-paper-plane-o', 'fa fa-anchor', 'fa fa-bolt', 'fa fa-cube', 'fa fa-leaf', 'fa fa-bicycle', 'fa fa-bomb']
let card = document.getElementsByClassName('card')
let cards = [...card]
let deck = document.querySelector('.deck')
let movesNumber = document.querySelector('.moves')
let matchedCardNum = 0
let matchedCards = []
let openCardsList = []
let moves = 0
const timer = document.querySelector('.timer')
let watch = new stopWatch(timer);
let shuffledCards = shuffle(cards)
let initialClick = 0
const restartButton = document.querySelector('.restart')


// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

// FUNCTIONS

// Reset game when window refreshes/loads
window.onload = newGame()

// Change html of cards to shuffled deck
function rearrangeCards(cards) {
  for (let i = 0; i < shuffledCards.length; i++) {
    deck.appendChild(shuffledCards[i]);
    shuffledCards[i].classList.remove('open', 'show', 'match');
  }
};

// Reset game to begin fresh
function newGame(cards) {
  rearrangeCards();
  moves = 0;
  matchedCards = [];
  matchedCardNum = 0;
  openCardsList = [];
  document.querySelector('.one').innerHTML = '<i class="fa fa-star"></i>';
  document.querySelector('.two').innerHTML = '<i class="fa fa-star"></i>';
  document.querySelector('.three').innerHTML = '<i class="fa fa-star"></i>';
  if (watch.isOn) {
    watch.stop();
  }
  watch.reset();
};

// Things that happen when a card is clicked on
function cardClicked(event) {
  openCardsList.push(this);
  this.classList.add('open', 'show');
  if (openCardsList.length === 2 && openCardsList[0].innerHTML === openCardsList[1].innerHTML) {
    match();
  }
  if (openCardsList.length === 2 && openCardsList[0].innerHTML != openCardsList[1].innerHTML) {
    noMatch();
  }
  if (!watch.isOn) {
    watch.start();
  }
};

// Matching cards function
function match() {
    matchedCards.push(openCardsList[0]);
    matchedCards.push(openCardsList[1]);
    openCardsList[0].classList.add('match');
    openCardsList[1].classList.add('match');
    openCardsList[0].classList.remove('open', 'show');
    openCardsList[1].classList.remove('open', 'show');
    openCardsList = [];
};

// No-match function
function noMatch() {
    openCardsList[0].classList.remove('open', 'show');
    openCardsList[1].classList.remove('open', 'show');
    openCardsList = [];
};

// Timer/stopwatch function
function stopWatch(elem) {
  let time = 0;
  let interval;
  let offset;

  function update() {
    if (watch.isOn) {
      time += delta();
    }
    let formattedTime = timeFormatter(time);
    elem.textContent = formattedTime;
  };

  function delta() {
    let now = Date.now();
    let timePassed = now - offset;
    offset = now;
    return timePassed;
  };

  function timeFormatter(timeInMilliseconds) {
    let time = new Date(timeInMilliseconds);
    let minutes = time.getMinutes().toString();
    let seconds = time.getSeconds().toString();
    let milliseconds = time.getMilliseconds().toString();

    if (minutes.length < 2) {
      minutes = '0' + minutes;
    }
    if (seconds.length < 2) {
      seconds = '0' + seconds;
    }
    while (milliseconds.length < 3) {
      milliseconds = '0' + milliseconds;
    }

    return minutes + ':' + seconds + '.' + milliseconds;
  };

  this.isOn = false;

  this.start = function() {
    if (!this.isOn) {
      interval = setInterval(update, 10);
      offset = Date.now();
      this.isOn = true;
    }
  };

  this.stop = function() {
    if (this.isOn) {
      clearInterval(interval);
      interval = null;
      this.isOn = false;
    }
  };

  this.reset = function() {
    time = 0;
    update();
  };
};


// EVENT LISTENERS
restartButton.addEventListener('click', function() {
  shuffle(cards)
  newGame();
});

for (let shuffledCard of shuffledCards) {
  shuffledCard.addEventListener('click', cardClicked);
};
