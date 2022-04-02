const button = document.querySelector('.my-button');
const board = document.querySelector(".board");
button.addEventListener("click", handleClick);

function genBoard () {
    board.innerHTML='';
    for (let i = 0; i<16**2; i++) {
        board.innerHTML +='<div class="square"></div>';
    }
    board.style.setProperty("--grid-size", 16);
}
genBoard()

function handleClick() {
  board.innerHTML = '';
  for (let i = 0; i < 9; i++) {
    board.innerHTML +='<div class="square"></div>';
  }
  board.style.setProperty("--grid-size", 3);
}

// var n=4;//take grid column value as you want

// for(var i = 0; i < n; i++) {
//     document.body.innerHTML+='<div class="row">';

//     for(j = 0; j < n; j++) {
//         document.body.innerHTML+='<div class="gridsquare">' + (i*5+j+1) + '</div>';
//     }

//     document.body.innerHTML+='</div>';