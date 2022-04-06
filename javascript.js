const gridContainer = document.querySelector("#gridContainer");

function genGrid (n) {

    //resets the grid every time it is generated
    gridContainer.innerHTML = ""; 

    for (let i = 0; i<n; i++) {

        const rowContainer = document.createElement('div');
        rowContainer.classList.add('row');

        for (let j = 0; j<n; j++ ) {

            const div = document.createElement('div');

            //generates a unique ID for the cell so it can be referenced specifically
            div.setAttribute('id', `${i}-${j}`);   
            div.classList.add('cell');
            div.addEventListener("mousedown", function(e) {

                

                //get's the specific ID of the cell which was clicked over
                let nodeID = e.path[0].id;
                eventHandler(e,nodeID)

                // mouseDown();
                // getProximal(e);
                // paint(nodeID);
                

            });
            div.addEventListener("mouseup", mouseUp);
            div.addEventListener("mouseover", function (e) {
                let nodeID  = e.path[0].id;
                //only allows the user to paint while holding down click
                if (downStatus == true) {
                    paint(nodeID);
                }
            });

            rowContainer.appendChild(div);
        }
        gridContainer.appendChild(rowContainer);
    }
}

let slider = document.getElementById("myRange");
let output = document.getElementById("para");
output.textContent = slider.value;

//generates grid based on initial value of the slider defined in the HTML as 16
let n = slider.value;
genGrid(n)
//the oninput function allows for continuous generation 
//of the grid so you can see it update in real time
slider.oninput = () => {
    output.textContent = slider.value;
    n = slider.value;
    genGrid(n)
}

const resetButton = document.querySelector('.reset');
resetButton.addEventListener("click", reset);
function reset (){
    n = 16;
    slider.value = n;
    output.textContent = n;
    genGrid(n)
}

//fill status button toggle
const fillButton = document.querySelector('.fill-in');
fillButton.addEventListener("click", fill);
let fillStatus = false;
function fill () {
    if (fillStatus == false){
        //toggles fill on an paint off 
        fillStatus = true;
        paintStatus = false;

    } else if (fillStatus == true) {
        //toggles fill off and paint on
        fillStatus = false;
        paintStatus = true;
    }
}

// toggle status of mousedown so that the user can only draw while holding click
let downStatus = false;
function mouseDown () {
    downStatus = true;
}
function mouseUp () {
    downStatus = false;
}

//this function checks the status of the user input settings and calls the appropriate function
function eventHandler (e, nodeID) {
    if (fillStatus == true) {
        getProximal(e);
        paint(nodeID);
    } else if (paintStatus == true) {
        mouseDown()
        paint(nodeID)
    }
}

let paintStatus = true;
function paint (nodeID) {
    const div = document.getElementById(`${nodeID}`);
    div.classList.add("black-paint")
}

//check up, down, left, right positions of selected cell stored in proximalCells
let proximalCells=[];
function getProximal (e) {

    //gets the i and j positions of the clicked cell
    nodeID = e.path[0].id;
    let nodeID_i = nodeID.slice(0,nodeID.indexOf('-'));
    let nodeID_j = nodeID.slice(nodeID.indexOf('-')+1);

    //gets the cell id's of the four cells surrounding the clicked node
    let nodeUp = document.getElementById(`${nodeID_i}-${+nodeID_j+1}`);
    let nodeDown = document.getElementById(`${nodeID_i}-${+nodeID_j-1}`);
    let nodeRight = document.getElementById(`${+nodeID_i+1}-${nodeID_j}`);
    let nodeLeft = document.getElementById(`${+nodeID_i-1}-${nodeID_j}`);

    proximalCells = [nodeUp, nodeDown, nodeRight, nodeLeft]
    // return proximalCells
    checkProximal(proximalCells,cellsToColor);
}

//this function will check whether the cells in quadArray are already colored, 
//out of bounds, or already in the list of cells
let cellsToColor = [];
function checkProximal (proximalCells,cellsToColor) {
    
    cellsToColor = [];

    //this checks to see if the user clicked on a node which already has a class on it 
    //ie an edge or already colored cells.
    
    // if (proximalCells[0].classList.length != 1){ 
    //     return
    // }

    for (i=0 ; i < proximalCells.length ; i++) {
        
        //check to see if quadArray contains null or already colored elements
        if (proximalCells[i] === null) {
            continue

        //check to see if cell already has color class on it
        } else if (proximalCells[i].classList.length != 1) {
            continue

        //check to see if cell is already logged in cellsToColor
        } else if (cellsToColor.includes(proximalCells[i]) == true ) {
            continue

        //adds all cells that pass the checks to the list to be colored
        } else {
            cellsToColor.push(proximalCells[i]);
        }
    }
}