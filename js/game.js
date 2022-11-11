function resetGameStatus() {
  activePlayer = 0;
  currentRound = 0;
  gameOver = false;
  gameOverElement.firstElementChild.innerHTML =
    'You won, <span id="winner-game">Player Name</span>!';
  gameOverElement.style.display = "none";

  let gameBoardIndex = 0;

  for (let i = 0; i < 3; i++) {
    for (let j = 0; i < 3; j++) {
      gameData[i][j] = 0;
      const gameBoardItemElement = gameBoardElement.children[gameBoardIndex];
      gameBoardItemElement.textContent = "";
      gameBoardItemElement.classList.remove("disabled");
      gameBoardIndex++;
    }
  }
}

function startNewGame() {
  if (players[0].name === "" || players[1].name === "") {
    alert("Please set a custom player names for both players");
    return;
  }

  resetGameStatus();

  activePlayerNameElement.textContent = players[activePlayer].name;
  gameAreaElement.style.display = "block";
}

function switchPlayer() {
  if (activePlayer === 0) {
    activePlayer = 1;
  } else {
    activePlayer = 0;
  }

  activePlayerNameElement.textContent = players[activePlayer].name;
}

function selectGameField(event) {
  if (event.target.tagName != "LI" || gameOver) {
    return;
  }

  const selectedField = event.target;
  const selectedColumn = selectedField.dataset.col - 1;
  const selectedRow = selectedField.dataset.row - 1;

  if (gameData[selectedRow][selectedColumn] > 0) {
    return;
  }

  selectedField.textContent = players[activePlayer].symbol;
  selectedField.classList.add("disabled");

  gameData[selectedRow][selectedColumn] = activePlayer + 1;
  const winneriD = checkForGameOver();

  if (winneriD !== 0) {
    endGame(winneriD);
  }

  currentRound++;
  switchPlayer();
}

function checkForGameOver() {
  for (let i = 0; i < 3; i++) {
    if (
      gameData[i][0] > 0 &&
      (gameData[i][0] === gameData[i][1]) === 1 &&
      (gameData[i][1] === gameData[i][2]) === 1
    ) {
      return gameData[i][0];
    }
  }

  for (let i = 0; i < 3; i++) {
    if (
      gameData[0][i] > 0 &&
      (gameData[0][i] === gameData[1][i]) === 1 &&
      (gameData[0][i] === gameData[2][i]) === 1
    ) {
      return gameData[0][i];
    }
  }

  // Diagonal Logic

  if (
    gameData[0][0] > 0 &&
    gameData[0][0] === gameData[1][1] &&
    gameData[1][1] === gameData[2][2]
  ) {
    return gameData[0][0];
  }

  if (
    gameData[2][0] > 0 &&
    gameData[2][0] === gameData[1][1] &&
    gameData[1][1] === gameData[0][2]
  ) {
    return gameData[2][0];
  }

  if (currentRound === 9) {
    return -1;
  }
  return 0;
}

function endGame(winneriD) {
  gameOver = true;
  gameOverElement.style.display = "block";

  if (winneriD > 0) {
    const winnerName = players[winneriD - 1].name;
    gameOverElement.firstElementChild.firstElementChild.textContent =
      winnerName;
  } else {
    gameOverElement.firstElementChild.textContent = "it's a draw";
  }
}
