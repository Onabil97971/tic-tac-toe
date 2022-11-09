const playerConfigOverlay = document.getElementById("config-overlay");
const backdrop = document.getElementById("backdrop");
const form = document.querySelector("form");

const editPlayer1Btn = document.getElementById("edit-player-1-btn");
const editPlayer2Btn = document.getElementById("edit-player-2-btn");
const cancelConfigBtn = document.getElementById("cancel-config-btn");

editPlayer1Btn.addEventListener("click", openPlayerConfig);
editPlayer2Btn.addEventListener("click", openPlayerConfig);

cancelConfigBtn.addEventListener("click", cancelPlayerConfig);
backdrop.addEventListener("click", cancelPlayerConfig);

form.addEventListener("submit", savePlayerConfig);
