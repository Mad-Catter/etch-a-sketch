let rowInput = 16;
let columnInput = 16;
let lastRowInput = 0;
let lastColumnInput = 0;
let darkenToggle = false;
let darkenAmount = 0;
let hoverColor = "random"
const MAXGRID = 800;
document.documentElement.style.setProperty("--container-grid-size", `${MAXGRID}px`);
//Create a function called random color that when called will return a number from 0-255.
function getRandomColor() {
    const hue = Math.floor(Math.random() * 360);
    const saturation = Math.floor(Math.random() * 100);
    let lightness = Math.floor(Math.random() * 100);
    if (darkenToggle) {
        lightness = lightness - lightness*darkenAmount;
        darkenAmount += 0.1;
        console.log(darkenAmount)
    }
    if (darkenAmount >= 1) {
        darkenAmount = 0;
    }
    return `hsl(${hue},${saturation}%, ${lightness}%)`;
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
            event.target.style.backgroundColor = getRandomColor();
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
    rowInput = Math.floor(document.querySelector("#row-input").value);
    columnInput = Math.floor(document.querySelector("#column-input").value);
    if (rowInput > 100) {
        rowInput = 100;
    }
    if (columnInput > 100) {
        columnInput = 100;
    }
    if (rowInput && columnInput) {
        createGrid(rowInput,columnInput);
        lastRowInput = rowInput;
        lastColumnInput = columnInput;
    }
    resizeBox.classList.remove("open");
    cover.classList.remove("open");
})


document.querySelector(".color-selectors").addEventListener("click", (event) => {
    const ID = event.target.id
    console.log(ID)
    console.log(event.target)
    console.log(event.target.id)
    switch (ID) {
        case "darken-toggle":
            darkenToggle = !darkenToggle;
            break;
        case "red":
            hoverColor = "red";
            break;
        case "blue":
            hoverColor = "blue";
            break;
        case "green":
            hoverColor = "green";
            break;
        case "purple":
            hoverColor = "purple";
            break;
        case "yellow":
            hoverColor = "yellow";
            break;
        case "white":
            hoverColor = "white";
            break;
        case "black":
            hoverColor = "black";
            break;
        case "random":
            hoverColor = "random";
            break;
    }
    
})
//The resize button open and close.
const resizeBox = document.querySelector(".resize-box");
const cover = document.querySelector(".cover");
cover.addEventListener("click", () => {
    resizeBox.classList.remove("open");
    cover.classList.remove("open");
})
document.querySelector("#modal-toggle").addEventListener("click", () => {
    resizeBox.classList.toggle("open");
    cover.classList.toggle("open");
})


document.querySelector("#reset").addEventListener("click", () => {
    if (lastColumnInput && lastRowInput) {
        createGrid(lastRowInput,lastColumnInput);
    } else {
        createGrid(rowInput, columnInput)
    }
})

function getRandomBackgroundColor() {
    const hue = Math.floor(Math.random() * 360);
    const saturation = Math.floor(Math.random() * 100);
    const lightness = Math.floor(Math.random() * 100);
    document.documentElement.style.setProperty("--random-background-color",`hsl(${hue},${saturation}%, ${lightness}%`);
    document.documentElement.style.setProperty("--random-frontground-color",`hsl(${hue},${saturation}%, ${(lightness + 50) % 100}%`);
}
setInterval(getRandomBackgroundColor,1500);