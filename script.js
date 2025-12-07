const MAXGRID_PIXEL = 800;
const MAXGRID_REM = MAXGRID_PIXEL/parseFloat(getComputedStyle(document.documentElement).fontSize)
document.documentElement.style.setProperty("--container-grid-size", `${MAXGRID_REM}rem`);
// Create a function that takes two numbers x and y which decides the size of each grid square.
function createGrid(x, y) {
    //the function first clears out the prior grid.
    const container = document.querySelector("#container");
    container.replaceChildren();
    // The funciton divides MAXGRID_REM(our container's max size which at the moment should be 800px) by those x and y, and then sets two variables to that result.
    //Then those variables get used to set the custom properties of our grid div's height and width in a css class.
    document.documentElement.style.setProperty("--grid-div-width", `${MAXGRID_REM/x}rem`)
    document.documentElement.style.setProperty("--grid-div-height", `${MAXGRID_REM/y}rem`)
    //The function then has a sub function which makes a div, gives it the class of our grid divs, attatches two event listner to the div, and then appends it to the container.
    function createDiv() {
        const div = document.createElement("div");
        div.classList.add("grid-div");
        
        //The event listener will be waiting for mouseenter.  Upon doing so it will set the background color that either the user decides or the computer decides randomly
         div.addEventListener("mouseenter", (event) =>{
            if (!clickActivate) {event.target.style.backgroundColor = setBackgroundColor();}
            
        })
        div.addEventListener("click", (event) =>{
            if (clickActivate) {event.target.style.backgroundColor = setBackgroundColor();}
            
        })
        container.appendChild(div);
        //this function simply checks which color button the user selected, then returns a hsl() value based off of that button.  Or randomly if random is selected.
        function setBackgroundColor() {
            const REDHUE = 0;
            const BLUEHUE = 228;
            const GREENHUE = 134;
            const PURPLEHUE = 273;
            const YELLOWHUE = 64;
            const BASESATURATION = 80;
            const BASELIGHTNESS = 50;
            let hue = 0;
            let saturation = 0;
            let lightness = 0;
            switch (hoverColor) {
                case "red":
                    hue = REDHUE;
                    saturation = BASESATURATION;
                    lightness = BASELIGHTNESS;
                    break;
                case "blue":
                    hue =  BLUEHUE;
                    saturation = BASESATURATION;
                    lightness = BASELIGHTNESS;
                    break;
                case "green":
                    hue =  GREENHUE;
                    saturation = BASESATURATION;
                    lightness = BASELIGHTNESS;
                    break;
                case "purple":
                    hue =  PURPLEHUE;
                    saturation = BASESATURATION;
                    lightness = BASELIGHTNESS;
                    break;
                case "yellow":
                    hue =  YELLOWHUE;
                    saturation = BASESATURATION;
                    lightness = BASELIGHTNESS;
                    break;
                case "white":
                    hue = 100;
                    saturation = 0;
                    lightness = 100;
                    break;
                case "black":
                    hue = 0;
                    saturation = 0;
                    lightness = 0;
                    break;
                case "random":
                    hue = Math.floor(Math.random() * 360);
                    saturation = Math.floor(Math.random() * 100);
                    lightness = Math.floor(Math.random() * 100);
                    break;
            }
            //darkenToggle makes each successive color change become 10% darker than the last one, and resets if it reaches 100% darkness. 
            if (darkenToggle) {
                lightness = lightness - lightness*darkenAmount;
                darkenAmount += 0.1;
            }
            if (darkenAmount >= 1) {
                darkenAmount = 0;
            }
            return `hsl(${hue},${saturation}%, ${lightness}%)`;
        }
    }
    //A for i loop will be called and will repeat this function x*y times to complete the grid.
    for (i=0; i<(x*y); i++) {
        createDiv();
    }
}

//rowInput and columnInput are decided set to 16 to give a potential fallback
let rowInput = 16;
let columnInput = 16;
const newGridBtn = document.querySelector("#resize");
newGridBtn.addEventListener("click", (event) => {
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

let hoverColor = "random"
const colorSelectors = document.querySelector(".color-selectors")
colorSelectors.addEventListener("click", (event) => {
    for (child of colorSelectors.children) {
        child.classList.remove("activated-border");
    }
    //This is really lazy and should be fixed but I am hungry
    if (event.target != colorSelectors) {
        event.target.classList.add("activated-border");
    }
    const ID = event.target.id
    switch (ID) {
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
//part of the challenge was to make an option where the div hovered over, will get darker each time it gets triggered.  I made this an optional toggle.
let darkenToggle = false;
let darkenAmount = 0;
document.querySelector("#darken-toggle").addEventListener("click", () => {
    darkenToggle = !darkenToggle;
    document.querySelector("#darken-toggle").classList.toggle("activated-border");
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


let lastRowInput = 0;
let lastColumnInput = 0;
document.querySelector("#reset").addEventListener("click", () => {
    if (lastColumnInput && lastRowInput) {
        createGrid(lastRowInput,lastColumnInput);
    } else {
        createGrid(rowInput, columnInput)
    }
})

let borderToggle = true;
document.querySelector("#borders").addEventListener("click", () => {
    borderToggle = !borderToggle
    if (borderToggle) {
        document.documentElement.style.setProperty("--grid-div-border", "hsl(0,0%,0%,0.164) 1px solid")
    }
    else {
        document.documentElement.style.setProperty("--grid-div-border", "none")
    }
})


let clickActivate = false;
const clickHover = document.querySelector("#click-hover");
clickHover.addEventListener("click", () => {
    clickActivate = !clickActivate;
    if (clickActivate) {
        clickHover.textContent = "Hover";
    } else {
        clickHover.textContent = "Click";
    }
})

//This gets a random color for both the random colot background and the random text.  It makes the random text 50 points lighter or darker depending on the value.
//This seperate function was needed to avoid complication with the darken toggle.
//It is run every second and a half.
function getRandomBackgroundColor() {
    const hue = Math.floor(Math.random() * 360);
    const saturation = Math.floor(Math.random() * 100);
    const lightness = Math.floor(Math.random() * 100);
    document.documentElement.style.setProperty("--random-background-color",`hsl(${hue},${saturation}%, ${lightness}%`);
    document.documentElement.style.setProperty("--random-frontground-color",`hsl(${hue},${saturation}%, ${(lightness + 50) % 100}%`);
}
setInterval(getRandomBackgroundColor,1500);


createGrid(16, 16);