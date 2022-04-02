const button = document.querySelector('.my-button');
const board = document.querySelector(".board");
button.addEventListener("click", handleClick);
function handleClick() {
  board.innerHTML = '';
  for (let i = 0; i < 9; i++) {
    board.innerHTML +='<div class="square"></div>';
  }
  board.style.setProperty("--grid-size", 3);
}