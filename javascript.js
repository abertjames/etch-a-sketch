// const button = document.querySelector('.my-button');
const board = document.querySelector(".board");
// button.addEventListener("click", handleClick);

function genBoard (n) {
    board.innerHTML='';
    for (let i = 0; i<n**2; i++) {
        board.innerHTML +='<div class="square"></div>';
    }
    board.style.setProperty("--grid-size", n);
}
genBoard()

// function handleClick(n) {
//   board.innerHTML = '';
//   for (let i = 0; i < n**2; i++) {
//     board.innerHTML +='<div class="square"></div>';
//   }
//   board.style.setProperty("--grid-size", n);
// }

let slider = document.getElementById("myRange");
let output = document.getElementById("para");
output.textContent = slider.value;


slider.oninput = function() {
    output.textContent = slider.value;
    let n = slider.value;
    genBoard(n)
}

// var n=4;//take grid column value as you want

// for(var i = 0; i < n; i++) {
//     document.body.innerHTML+='<div class="row">';

//     for(j = 0; j < n; j++) {
//         document.body.innerHTML+='<div class="gridsquare">' + (i*5+j+1) + '</div>';
//     }

//     document.body.innerHTML+='</div>';