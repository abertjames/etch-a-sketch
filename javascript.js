const gridContainer = document.querySelector("#gridContainer");

function genGrid (n) {

    gridContainer.innerHTML = ""; 

    for (let i = 0; i<n; i++) {

        const rowContainer = document.createElement('div');
        rowContainer.classList.add('row');

        for (let j = 0; j<n; j++ ) {
            const div = document.createElement('div');
            div.setAttribute('id', `cell-${i}-${j}`);   
            div.classList.add('cell');
            div.addEventListener("mousedown", function(e) {
                mouseDown();
                let nodeID = e.path[0].id;
                paint(nodeID);
            });
            div.addEventListener("mouseup", mouseUp);

            // div.addEventListener("click", function (e){
            //     mouseDown();
            //     let nodeID  = e.path[0].id;
            //     paint(nodeID);
            //     mouseUp();
            // });
            div.addEventListener("mouseover", function (e) {
                let nodeID  = e.path[0].id;
                paint(nodeID);
            });

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
button.addEventListener("click", reset);

function reset (){
    n = 16;
    slider.value = n;
    output.textContent = n;
    genGrid(n)
}

let downStatus = false;

function mouseDown () {
    downStatus = true;
}
function mouseUp () {
    downStatus = false;
}

function paint (nodeID) {
    if (downStatus == true) {
        const div = document.getElementById(`${nodeID}`);
        div.classList.add("black-paint")
    }
}