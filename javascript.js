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

                mouseDown();

                //get's the specific ID of the cell which was clicked over
                let nodeID = e.path[0].id;

                paint(nodeID);
                getProximal(e);

                // console.log(e);
                // console.log(e.target.parentElement.children)
                // console.log(e.path[0].id)
                // console.log(e.target)
                // console.log(Array.from(e.target.parentElement.children).indexOf(e.target))
                // let cell_list = document.querySelectorAll('.cell');
                // console.log(cell_list);

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

const button = document.querySelector('.my-button');
button.addEventListener("click", reset);

function reset (){
    n = 16;
    slider.value = n;
    output.textContent = n;
    genGrid(n)
}

// toggle status of mousedown so that the user can only draw while holding click
let downStatus = false;
function mouseDown () {
    downStatus = true;
}
function mouseUp () {
    downStatus = false;
}

function paint (nodeID) {
    const div = document.getElementById(`${nodeID}`);
    div.classList.add("black-paint")
}

//check up, down, left, right positions of selected cell
function getProximal (e) {

    //gets the i and j positions of the clicked cell
    nodeID = e.path[0].id;
    let nodeID_i = nodeID.slice(0,nodeID.indexOf('-'));
    let nodeID_j = nodeID.slice(nodeID.indexOf('-')+1);

    //gets the cell locations of the four cells surrounding the clicked node
    let nodeUp = document.getElementById(`${nodeID_i}-${+nodeID_j+1}`);
    let nodeDown = document.getElementById(`${nodeID_i}-${+nodeID_j-1}`);
    let nodeRight = document.getElementById(`${+nodeID_i+1}-${nodeID_j}`);
    let nodeLeft = document.getElementById(`${+nodeID_i-1}-${nodeID_j}`);

    console.log(nodeUp, nodeDown, nodeRight, nodeLeft)
}