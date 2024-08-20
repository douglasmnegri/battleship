const joinBattle = document.querySelector(".join-battle");
const gameInterface = document.querySelector(".game-interface");
const hudInteface = document.getElementById("hud-interface");
const menu = document.querySelector(".menu");
const playersName = document.getElementById("name");

function getPlayerName() {
  joinBattle.addEventListener("click", (e) => {
    e.preventDefault();
    gameInterface.style.visibility = "visible";
    hudInteface.style.visibility = "visible";
    menu.style.visibility = "hidden";
    console.log(playersName.value);
  });
}

getPlayerName();
