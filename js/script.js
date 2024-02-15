const memoryGame = document.querySelector('.memory-game');
const buttonElement = document.getElementById('play-again');
const cardImages = [
  'bojack.webp',
  'diane.jpg',
  'hollyhock.jpg',
  'peanutbutter.webp',
  'princess.webp',
  'sarah.jpg',
  'todd.jpeg',
  'vincent.jpg'
];

// tamaño del tablero
const BOARD_SIZE = 4;
const TOTAL_CARDS = BOARD_SIZE * BOARD_SIZE;

// array para almacenar las cartas del juego
let cards = [];

// variables para controlar las cartas volteadas y las coincidencias
let flippedCards = [];
let matchedCards = [];

// función para mezclar las cartas
const shuffleCards = () => {
  let currentIndex = cards.length,
    temporaryValue,
    randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = cards[currentIndex];
    cards[currentIndex] = cards[randomIndex];
    cards[randomIndex] = temporaryValue;
  }
  // reordenar las cartas en el tablero
  memoryGame.innerHTML = '';
  cards.forEach(card => memoryGame.appendChild(card));
};

// función para crear las cartas del juego
const createCards = () => {
  for (let i = 0; i < TOTAL_CARDS; i++) {
    const cardContainer = document.createElement('div');
    cardContainer.classList.add('card-container');
    const card = document.createElement('div');
    card.classList.add('card');
    card.dataset.index = i;
    card.style.backgroundImage = `url('./images/logo.jpg')`; // girar la carta con el logo
    cardContainer.appendChild(card); // añadir la carta al contenedor
    cards.push(cardContainer); // añadir el contenedor al array de cartas

    // agregar evento de clic a cada carta para girarla
    card.addEventListener('click', () => flipCard(card));
  }
};

// función para girar una carta
const flipCard = card => {
  const index = card.dataset.index;
  if (
    flippedCards.includes(index) ||
    matchedCards.includes(index) ||
    flippedCards.length === 2
  )
    return;
  // girar la carta para mostrar su imagen
  card.classList.add('flipping'); // animación
  setTimeout(() => {
    card.style.backgroundImage = `url('images/${
      cardImages[index % (TOTAL_CARDS / 2)]
    }')`;
    card.classList.remove('flipping');
  }, 250);
  flippedCards.push(index);
  // verificar si hay dos cartas giradas
  if (flippedCards.length === 2) {
    // comparar las cartas giradas
    if (
      cardImages[flippedCards[0] % (TOTAL_CARDS / 2)] ===
      cardImages[flippedCards[1] % (TOTAL_CARDS / 2)]
    ) {
      // si las cartas coinciden, marcarlas
      matchedCards.push(flippedCards[0], flippedCards[1]);
      // reiniciar el array de cartas giradas
      flippedCards = [];
      // verificar si todas las cartas coinciden
      if (matchedCards.length === TOTAL_CARDS) {
        setTimeout(() => {
          alert('¡Felicidades, has ganado!');
        }, 500);
      }
    } else {
      //si las cartas no coinciden, girarlas otra vez
      setTimeout(() => {
        flippedCards.forEach(flippedIndex => {
          const flippedCard = document.querySelector(
            `[data-index="${flippedIndex}"]`
          );
          flippedCard.classList.add('flipping');
          setTimeout(() => {
            flippedCard.style.backgroundImage = `url('./images/logo.jpg')`;
            flippedCard.classList.remove('flipping');
          }, 250);
        });
        flippedCards = [];
      }, 1000);
    }
  }
};

// función para colocar las cartas en el tablero
const placeCards = () => {
  shuffleCards(); // mezclar las cartas al inicio del juego
};

const resetGame = () => {
  flippedCards = [];
  matchedCards = [];
  // mezclar las cartas otra vez
  shuffleCards();

  // girar todas las cartas con animación
  cards.forEach(cardContainer => {
    const card = cardContainer.querySelector('.card');
    card.classList.add('flipped');
    // cambiar el fondo a la imagen del logo
    card.style.backgroundImage = `url('./images/logo.jpg')`;
  });
  setTimeout(() => {
    cards.forEach(cardContainer => {
      const card = cardContainer.querySelector('.card');
      card.classList.remove('flipped');
    });
  }, 500);
};

// iniciar el juego al cargar la página
createCards();
placeCards();

// reiniciar el juego
buttonElement.addEventListener('click', resetGame);
