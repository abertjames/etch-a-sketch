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
                //redirects mousedown event to a handler depending on user settings
                eventHandler(e,nodeID)

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

//resets page back to initial conditions
const resetButton = document.querySelector('.reset');
resetButton.addEventListener("click", reset);
function reset (){

    paintStatus = true;
    fillStatus = false;
    rainbowStatus = false;
    eraserStatus = false;
    streamStatus = false;
    shaderStatus = false;
    lightenerStatus = false;

    n = 16;
    slider.value = n;
    output.textContent = n;
    genGrid(n)
}

//rainbow toggle
let rainbowStatus = false;
const rainbow = document.querySelector('.rainbow');
rainbow.addEventListener("click", drawRainbow);
function drawRainbow (){
    if (rainbowStatus == false) {
        rainbowStatus = true;

        paintStatus = false;
        fillStatus = false;
        eraserStatus = false;
        streamStatus = false;
        shaderStatus = false;
        lightenerStatus = false;
    } else if (rainowStatus == true) {
        rainbowStatus = false;

        paintStatus = true;
        fillStatus = false;
        eraserStatus = false;
        streamStatus = false;
        shaderStatus = false;
        lightenerStatus = false;
    }
}

//eraser toggle
let eraserStatus = false;
const eraser = document.querySelector('.eraser');
eraser.addEventListener("click", erase);
function erase (){

    if (eraserStatus == false) {
        eraserStatus = true;

        paintStatus = false;
        fillStatus = false;
        rainbowStatus = false;
        streamStatus = false;
        shaderStatus = false;
        lightenerStatus = false;
    } else if (eraserStatus == true) {
        eraserStatus = false;

        paintStatus = true;
        fillStatus = false;
        rainbowStatus = false;
        streamStatus = false;
        shaderStatus = false;
        lightenerStatus = false;
    }
}

//open color pallet and allow for color choice
const colorPallet = document.querySelector('.color-pallet');
colorPallet.addEventListener("click", openColorPallet);
function openColorPallet (){
   
}

//stream toggle
let streamStatus = false;
const stream = document.querySelector('.stream');
stream.addEventListener("click", drawStream);
function drawStream (){
    if (streamStatus == false) {
        streamStatus = true;

        paintStatus = false;
        fillStatus = false;
        rainbowStatus = false;
        eraserStatus = false;
        shaderStatus = false;
        lightenerStatus = false;
     
    } else if (streamStatus == true) {
        streamStatus = false;

        paintStatus = true;
        fillStatus = false;
        rainbowStatus = false;
        eraserStatus = false;
        shaderStatus = false;
        lightenerStatus = false;
    }
}

//shader toggle
let shaderStatus = false;
const shader = document.querySelector('.shader');
shader.addEventListener("click", shade);
function shade (){
    if (shaderStatus == false) {
        shaderStatus = true;

        paintStatus = false;
        fillStatus = false;
        rainbowStatus = false;
        eraserStatus = false;
        streamStatus = false;
        lightenerStatus = false;
    } else if (shaderStatus == true) {
        shaderStatus = false;

        paintStatus = true;
        fillStatus = false;
        rainbowStatus = false;
        eraserStatus = false;
        streamStatus = false;
        lightenerStatus = false;
    }
}

//lightener toggle
let lightenerStatus = false;
const lightener = document.querySelector('.lightener');
lightener.addEventListener("click", lighten);
function lighten (){
    if (lightenerStatus == false) {
        lightenerStatus = true;

        paintStatus = false;
        fillStatus = false;
        rainbowStatus = false;
        eraserStatus = false;
        streamStatus = false;
        shaderStatus = false;
    } else if (lightenerStatus == true) {
        lightenerStatus = false;

        paintStatus = true;
        fillStatus = false;
        rainbowStatus = false;
        eraserStatus = false;
        streamStatus = false;
        shaderStatus = false;
    }
}

//fill status button toggle
const fillButton = document.querySelector('.fill-in');
fillButton.addEventListener("click", fill);
let fillStatus = false;
function fill () {
    if (fillStatus == false){
        fillStatus = true;
        paintStatus = false;
        rainbowStatus = false;
        eraserStatus = false;
        streamStatus = false;
        shaderStatus = false;
        lightenerStatus = false;
    
    } else if (fillStatus == true) {
        fillStatus = false;
        paintStatus = true;
        rainbowStatus = false;
        eraserStatus = false;
        streamStatus = false;
        shaderStatus = false;
        lightenerStatus = false;
    }
}

let testStatus = false;
const test = document.querySelector('.test');
test.addEventListener("click", function(e){
    console.log(e)
    buttonHandler(e)
});

let buttonList=[];
buttonList = Array.from(document.querySelectorAll("button"))
function buttonHandler (e) {

    e.currentTarget.classList.add("on")

    // let unPressed = buttonList.slice(buttonList.indexOf(e.currentTarget))
    // console.log(e)
    // console.log(e.currentTarget)
    // console.log(e.currentTarget.classList)



    // if (e.currentTarget.classList.contains("on")) {
    //     e.currentTarget.classList.remove("on")
    //     e.currentTarget.classList.add('off')
    // } else if (e.currentTarget.className == "off") {
    //     e.currentTarget.classList.remove("off")
    //     e.currentTarget.classList.add('on')
    // }
    
    // unPressed.forEach(element => {
    //     if (element.classList.includes("on")){
    //         element.classList.remove("on")
    //         element.classList.add('off')
    //     } 
    // })
    
}

function buttonCaller (e) {
    //checks the status of the clicked button just before being clicked
    let currentStatus;
    if (e.currentTarget.classList.contains("off")){
        currentStatus = true
    } else if (e.currentTarget.classList.contains("on")){
        currentStatus = false
    }

    if (rainbowStatus == true) {
        drawRainbow()
    } else if (eraserStatus == true) {
        erase()
    } else if (streamStatus == true) {
        drawStream()
    } else if (shaderStatus) {
        shade()
    } else if (lightenerStatus == true) {
        lighten()
    } else if (fillStatus == true) {
        fill()
    } else if (testStatus == true) {
        test()
    }

    if (currentStatus == true) {
        e.currentTarget.classList.remove("on")
        e.currentTarget.classList.add("off")
        
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

        //this check prevents fill being activated on an already colored cell 
        if (document.getElementById(nodeID).classList.length != 1) {
            return
        } else {
            newCells = [nodeID];
            getProximal(newCells);
        }

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
    checkProximal(proximalCells,cellsToColor);

}


//this function will check whether the cells in proximalCells are already colored, 
//out of bounds, or already in the list of cells
let cellsToColor = [];
function checkProximal (proximalCells,cellsToColor) {

    //resets newCells for each run
    newCells = [];

    for (i=0 ; i < proximalCells.length ; i++) {
        
        //check to see if cell is out of bounds
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
            newCells.push(proximalCells[i].id);
        }
    }

    //as long as new cells were added it will keep running 
    if (newCells === undefined || newCells.length == 0) {
        fillCells(cellsToColor)
    } else {
        getProximal(newCells);
    }
}

function fillCells(cellsToColor) {
    cellsToColor.forEach(element => {
        element.classList.add('black-paint');
    });
}

//generates a random color for rainbow mode 
function randomColor() {
    let color = `hsl(${Math.random() * 360}, 100%, 50%)`;

  }