const cards = document.querySelectorAll('.memory-card');

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;

function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;

  this.classList.add('flip');

  if (!hasFlippedCard) {
    hasFlippedCard = true;
    firstCard = this;

    return;
  }

  secondCard = this;
  checkForMatch();
}

function checkEndGame() {
  const flippedCards = document.querySelectorAll(".flip")

  if (flippedCards.length == 12) {
    alert ("Parabéns! Você passou dessa fase, passe para a próxima etapa para mais aprendizados.")
    let nextButton = document.getElementById("buttonNext")
    nextButton.classList.remove("next")
  }
}

function checkForMatch() {
  let isMatch = firstCard.dataset.chemistry === secondCard.dataset.chemistry;

  isMatch ? disableCards() : unflipCards();

  setTimeout(() => {
    checkEndGame()
  }, 1000)
}

function disableCards() {
  firstCard.removeEventListener('click', flipCard);
  secondCard.removeEventListener('click', flipCard);
  firstCard.classList.add("done")
  secondCard.classList.add("done")

  resetBoard();
}

function unflipCards() {
  lockBoard = true;

  setTimeout(() => {
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');

    resetBoard();
  }, 1500);
}

function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

(function shuffle() {
  cards.forEach(card => {
    let randomPos = Math.floor(Math.random() * 12);
    card.style.order = randomPos;
  });
})();

cards.forEach(card => card.addEventListener('click', flipCard));
