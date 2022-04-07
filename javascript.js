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
                // console.log(e)
                //redirects mousedown event to a handler depending on user settings
                eventHandler(e,nodeID)

            });
            div.addEventListener("mouseup", mouseUp);
            div.addEventListener("mouseover", function (e) {
                let nodeID  = e.path[0].id;
                //only allows the user to paint while holding down click
                if (downStatus == true && rainbowStatus == true) {
                    randomColor()
                    paint(nodeID,backgroundColor);
                } else if (downStatus == true) {
                    paint(nodeID,backgroundColor);
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

//resets page back to initial conditions
let backgroundColor = "black";
const resetButton = document.querySelector('#reset');
resetButton.addEventListener("click", reset);
resetButton.className = "off";
function reset (){

    resetButtons()
    backgroundColor = "black";
    n = 16;
    slider.value = n;
    output.textContent = n;
    genGrid(n)
}


//resets buttons to starting conditions
function resetButtons () {
    
    paintStatus = true;

    fillStatus = false;
    rainbowStatus = false;
    eraserStatus = false;
    streamStatus = false;
    shaderStatus = false;
    lightenerStatus = false;

    fillButton.className = "off";
    rainbowButton.className = "off";
    eraserButton.className = "off";
    streamButton.className = "off";
    shaderButton.className = "off";
    lightenerButton.className = "off";

    rainbowFillStatus = false;
    rainbowFillButton.className = "off";

    backgroundColor = "black";
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

        //this check prevents fill being activated on an already colored cell 
        if (document.getElementById(nodeID).classList.length != 1) {
            return
        } else {
            newCells = [nodeID];
            getProximal(newCells);
        }

    } else if (paintStatus == true) {
        mouseDown()
        paint(nodeID,backgroundColor)
    } else if (rainbowStatus == true) {
        mouseDown()
        paint(nodeID,backgroundColor)
    }
}

let paintStatus = true;
function paint (nodeID,backgroundColor) {
    const div = document.getElementById(`${nodeID}`);
    div.style.backgroundColor = backgroundColor;  

    // div.classList.add("black-paint")
}

let proximalCells=[];
let newCells = [];
//takes in an array of newCells ID's and finds all their proximal cells (up, down, left, right)
function getProximal (newCells) {

    //resets proximalCells for each run
    proximalCells = [];

    for (i=0; i<newCells.length; i++) {

        //find i and j components of each cell id
        let nodeID_i = newCells[i].slice(0,newCells[i].indexOf('-'));
        let nodeID_j = newCells[i].slice(newCells[i].indexOf('-')+1);

        //find the cells around newCells[i]
        let nodeUp = document.getElementById(`${nodeID_i}-${+nodeID_j+1}`);
        let nodeDown = document.getElementById(`${nodeID_i}-${+nodeID_j-1}`);
        let nodeRight = document.getElementById(`${+nodeID_i+1}-${nodeID_j}`);
        let nodeLeft = document.getElementById(`${+nodeID_i-1}-${nodeID_j}`);

        //append new nodes to proximalCells 
        proximalCells.push(nodeUp, nodeDown, nodeRight, nodeLeft)
    }

    //call checkProximal on all new proximal cells against old ones
    checkProximal(proximalCells,cellsToColor, backgroundColor);

}


//this function will check whether the cells in proximalCells are already colored, 
//out of bounds, or already in the list of cells
let cellsToColor = [];
function checkProximal (proximalCells,cellsToColor,backgroundColor) {

    //resets newCells for each run
    newCells = [];

    for (i=0 ; i < proximalCells.length ; i++) {
        
        //check to see if cell is out of bounds
        if (proximalCells[i] === null) {
            continue

        //check to see if cell already has color class on it
        
        } else if (proximalCells[i].style.backgroundColor == backgroundColor) {
            continue

        //check to see if cell is already logged in cellsToColor
        } else if (cellsToColor.includes(proximalCells[i]) == true ) {
            continue

        //adds all cells that pass the checks to the list to be colored
        } else {

            cellsToColor.push(proximalCells[i]);
            newCells.push(proximalCells[i].id);
        }
    }

    //as long as new cells were added it will keep running 
    if (newCells === undefined || newCells.length == 0) {
        fillCells(cellsToColor)
        cellsToColor.splice(0, cellsToColor.length)

    } else {
        getProximal(newCells);
    }
}

function fillCells(cellsToColor) {
    cellsToColor.forEach(element => {
        if (rainbowFillStatus == true) {
            element.style.backgroundColor = randomColor();
        } else {
            element.style.backgroundColor = backgroundColor;
        }
        backgroundColor = "black";
    });
}

//generates a random color for rainbow mode 
function randomColor() {
    return backgroundColor = `hsl(${Math.random() * 360}, 100%, 50%)`;
}


//rainbow toggle
let rainbowStatus = false;
const rainbowButton = document.querySelector('#rainbow');
rainbowButton.addEventListener("click", drawRainbow);
rainbowButton.className = "off";
function drawRainbow () {
    if (rainbowStatus == false){

        resetButtons()

        rainbowStatus = true;
        rainbowButton.className = "on";
        paintStatus = false;
        
    
    } else if (rainbowStatus == true) {
        resetButtons()
    }
}

//rainbow fill toggle
let rainbowFillStatus = false;
const rainbowFillButton = document.querySelector('#rainbow-fill');
rainbowFillButton.addEventListener("click", fillRainbow);
rainbowFillButton.className = "off";
function fillRainbow () {
    if (rainbowFillStatus == false){

        rainbowFillStatus = true;
        rainbowFillButton.className = "on";

        fillStatus = true;
        
    } else if (rainbowFillStatus == true) {
        rainbowFillStatus = false;
        rainbowFillButton.className = "off";

        fillStatus = false;
    }
}

//eraser toggle
let eraserStatus = false;
const eraserButton = document.querySelector('#eraser');
eraserButton.addEventListener("click", erase);
eraserButton.className = "off";
function erase () {
    if (eraserStatus == false){

        resetButtons()

        eraserStatus = true;
        eraserButton.className = "on";
        paintStatus = false;
    
    } else if (eraserStatus == true) {
        resetButtons()
    }
}

//open color pallet and allow for color choice
const colorPalletButton = document.querySelector('#color-pallet');
colorPalletButton.addEventListener("click", openColorPallet);
colorPalletButton.className = "off";
function openColorPallet (){
   
}

//stream toggle
let streamStatus = false;
const streamButton = document.querySelector('#stream');
streamButton.addEventListener("click", drawStream);
streamButton.className = "off";
function drawStream () {
    if (streamStatus == false){

        resetButtons()

        streamStatus = true;
        streamButton.className = "on";
        paintStatus = false;
    
    } else if (streamStatus == true) {
        resetButtons()
    }
}

//shader toggle
let shaderStatus = false;
const shaderButton = document.querySelector('#shader');
shaderButton.addEventListener("click", shade);
shaderButton.className = "off";
function shade () {
    if (shaderStatus == false){

        resetButtons()

        shaderStatus = true;
        shaderButton.className = "on";
        paintStatus = false;
    
    } else if (shaderStatus == true) {
        resetButtons()
    }
}

//lightener toggle
let lightenerStatus = false;
const lightenerButton = document.querySelector('#lightener');
lightenerButton.addEventListener("click", lighten);
lightenerButton.className = "off";
function lighten () {
    if (lightenerStatus == false){

        resetButtons()

        lightenerStatus = true;
        lightenerButton.className = "on";
        paintStatus = false;
    
    } else if (lightenerStatus == true) {
        resetButtons()
    }
}

//fill status button toggle
let fillStatus = false;
const fillButton = document.querySelector('#fill-in');
fillButton.addEventListener("click", fill);
fillButton.className = "off";
function fill () {
    if (fillStatus == false){

        resetButtons()

        fillStatus = true;
        fillButton.className = "on";
        paintStatus = false;
    
    } else if (fillStatus == true) {
        resetButtons()
    }
}