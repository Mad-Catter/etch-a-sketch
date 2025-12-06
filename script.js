const MAXGRID = 800;
document.documentElement.style.setProperty("--container-grid-size", `${MAXGRID}px`);
//Create a function called random color that when called will return a number from 0-255.
function giveRandomColor() {
    return num = Math.floor(Math.random() * 255);
}
//Optional a second function that does the same thing but subtracts 10% * numberOfHovers.  (have numberOfHovers reset every time 10 squares.)

// Create a function that takes two numbers x and y
function createGrid(x, y) {
    const container = document.querySelector("#container");
    container.replaceChildren();
    // The funciton divides 960(our container's width and height) by those x and y, and then sets two variables to that result.
    //Then those variables get used to set the custom properties of our grid div's height and width in a css class.
    document.documentElement.style.setProperty("--grid-div-width", `${MAXGRID/x}px`)
    document.documentElement.style.setProperty("--grid-div-height", `${MAXGRID/y}px`)
    //The function then has a sub function which makes a div, gives it the class of our grid divs, attatches an event listner to the div, and then appends it to the container.
    function createDiv() {
        const div = document.createElement("div");
        div.classList.add("grid-div");
        //The event listener will be waiting for mouseenter.  Upon doing so it will set the background color of a div to rgb() with all three numbers being decided by randomColor
        div.addEventListener("mouseenter", (event) =>{
            event.target.style.backgroundColor = `rgb(${giveRandomColor()},${giveRandomColor()}, ${giveRandomColor()})`;
        })
        container.appendChild(div);
    }
    //A for i loop will be called and will repeat this function x*y times.
    for (i=0; i<(x*y); i++) {
        createDiv();
    }
}
createGrid(16, 16);

const newGridBtn = document.querySelector("#resize");
newGridBtn.addEventListener("click", (event) => {
    event.preventDefault();
    let rowInput = Math.floor(document.querySelector("#row-input").value);
    let columnInput = Math.floor(document.querySelector("#column-input").value);
    if (rowInput > 100) {
        rowInput = 100;
    }
    if (columnInput > 100) {
        columnInput = 100;
    }
    if (rowInput && columnInput) {
        createGrid(rowInput,columnInput);
    }
})