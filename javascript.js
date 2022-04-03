const gridContainer = document.querySelector("#gridContainer");

function genGrid (n) {
    gridContainer.innerHTML = ""; 

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



let slider = document.getElementById("myRange");
let output = document.getElementById("para");
output.textContent = slider.value;

let n = slider.value;
genGrid(n)
slider.oninput = function() {
    output.textContent = slider.value;
    n = slider.value;
    genGrid(n)
}


const button = document.querySelector('.my-button');
button.addEventListener("click", getInput);


function getInput (){
    let n = prompt("How many?");
    genGrid(n)
}
