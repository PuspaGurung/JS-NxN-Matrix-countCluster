let domControl = {
  submitForm: document.getElementById("grid-form"),
  submitButton: document.getElementById("submit-button"),
  hoverColor: document.getElementById("hover-color").value,
  bgColor: document.getElementById("bg-color").value,
  gridWrapper: document.querySelector(".grid-wrapper")
};

// GRID
class Grid {
  constructor(gridSize) {
    this.gridSize = gridSize;
    this.createGrid();
    this.displayGrid();
  }
  createGrid() {
    let arrRow = [];
    for (let row = 0; row < this.gridSize; row++) {
      let arrCol = [];
      for (let col = 0; col < this.gridSize; col++) {
        arrCol.push({
          value: Math.round(Math.random()),
          visited: false
        });
      }
      arrRow.push(arrCol);
    }
    this.grid = arrRow;
    console.log(this.grid);
  }
  displayGrid() {
    let ul = document.createElement("ul");
    ul.classList.add("grid");
    this.grid.forEach(gridRow => {
      gridRow.forEach(gridCol => {
        let li = document.createElement("li");
        li.classList.add("grid__item");
        let txtNode = document.createTextNode(
          `Val:${gridCol.value}, Visit:${gridCol.visited}`
        );
        li.appendChild(txtNode);
        ul.appendChild(li);
      });
    });
    domControl.gridWrapper.appendChild(ul);
  }
}

// Default grid size
let grid = new Grid(5);

//Default grid size in Input field
document.getElementById("gridSize").defaultValue = 5;

// Change grid size
function applyGridSize(size) {
  let errorElement = document.getElementById("error-message");
  errorElement.style.color = "red";
  let errorMessage = [];

  let gridSize = document.getElementById(size).value;
  // Check grid size :: grid size shuld be between 5 and 10
  gridSize == ""
    ? errorMessage.push("Grid size input field should not be empty")
    : gridSize > 10 || gridSize < 5
    ? errorMessage.push("Grid size should be between 5 and 10")
    : new Grid(gridSize);

  // If  grid size is not between 5 and 10 then dispaly error message
  errorMessage.length > 0
    ? (errorElement.innerText = errorMessage.join(", "))
    : (errorElement.innerText = " ");
}
