const gridContainer = document.querySelector("#gridContainer");

const div = document.createElement('div');
div.classList.add('cell');

function genGrid (n) {
    for (let i = 0; i<n; i++) {

        const rowContainer = document.createElement('div');
        rowContainer.classList.add('row');

        for (let j = 0; j<n; j++ ) {
            const div = document.createElement('div');
            div.classList.add('cell');
            rowContainer.appendChild(div);
        }
        gridContainer.appendChild(rowContainer);
    }
}
genGrid(16)


let slider = document.getElementById("myRange");
let output = document.getElementById("para");
output.textContent = slider.value;

let n = slider.value;
slider.oninput = function() {
    output.textContent = slider.value;
    n = slider.value;
    genBoard(n)
}






// // const button = document.querySelector('.my-button');
// const board = document.querySelector(".board");
// // button.addEventListener("click", handleClick);

// function genBoard (n) {
//     board.innerHTML='';
//     for (let i = 0; i<n**2; i++) {
//         board.innerHTML +='<div class="square"></div>';
//         document.createElement('div');
//     }
//     board.style.setProperty("--grid-size", n);
// }
// genBoard()

// // function handleClick(n) {
// //   board.innerHTML = '';
// //   for (let i = 0; i < n**2; i++) {
// //     board.innerHTML +='<div class="square"></div>';
// //   }
// //   board.style.setProperty("--grid-size", n);
// // }

// // var n=4;//take grid column value as you want

// // for(var i = 0; i < n; i++) {
// //     document.body.innerHTML+='<div class="row">';

// //     for(j = 0; j < n; j++) {
// //         document.body.innerHTML+='<div class="gridsquare">' + (i*5+j+1) + '</div>';
// //     }

// //     document.body.innerHTML+='</div>';