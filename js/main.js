let domControl = {
  submitForm: document.getElementById("grid-form"),
  submitButton: document.getElementById("submit-button"),
  hoverColor: document.getElementById("hover-color").value,
  bgColor: document.getElementById("bg-color").value,
  gridWrapper: document.querySelector(".grid-wrapper"),
  grid: document.querySelector("grid"),
  gridItem: document.querySelector(".grid__item")
};

// GRID
class Grid {
  constructor(gridSize) {
    this.gridSize = gridSize;
    this.createGrid();
    this.displayGrid();
    this.getClusterItemLength();
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
          `value:${gridCol.value}, visited:${gridCol.visited}` //val: , Visit:${gridCol.visited}
        );
        li.appendChild(txtNode);
        ul.appendChild(li);

        // *********** APPLY STYLESHEET: ul(className=gird) and li(className=gird__item) ****************/
        let content = {
          width: 50
        };
        let styleUl = {
          width: `${content.width}rem`
        };
        let addStyleUl = ul.style;
        for (let style in styleUl) {
          addStyleUl[style] = styleUl[style];
        }
        let styleLi = {
          width: `${Math.floor(content.width / this.gridSize)}rem`,
          minHeight: `${Math.floor(content.width / this.gridSize)}rem`,
          background: gridCol.value == 1 ? "red" : "white"
        };
        let addStyleLi = li.style;

        for (let style in styleLi) {
          addStyleLi[style] = styleLi[style];
        }
      });
    });
    domControl.gridWrapper.appendChild(ul);
  }

  getClusterItemLength() {
    const grid = this.grid;
    console.log(grid);
    let totNumOfCluster = 0;
    let totNumOfClusterItem = 0;
    let arrIndxValOne = []; // Array that contains all the array of index of 1 connected  (vertically and horizontally)

    let arrayOfCluster = []; // Contains the array of cluster

    let filterGrid = function(row, col, indxValOne = []) {
      let gridItem = grid[row][col];
      if (gridItem.value == 1 && gridItem.visited == false) {
        gridItem.visited = true;

        //Index of present 1 in the grid(matrix)
        indxValOne.push([row, col]);

        arrIndxValOne.push(indxValOne);

        // Filter the array of index of one
        // Array of cluster of connected one
        for (let i = 0; i < arrIndxValOne.length; i++) {
          if (arrayOfCluster.includes(arrIndxValOne[i]) == false) {
            arrayOfCluster.push(arrIndxValOne[i]);
          }
        }

        //*** VISIT GRID ITEM HORIZONTALLY AND VERTICALLY CONNECTED *******/
        if (row < grid.length - 1) {
          filterGrid(row + 1, col, indxValOne);
        }
        if (col < grid[row].length - 1) {
          filterGrid(row, col + 1, indxValOne);
        }
        if (row > 0) {
          filterGrid(row - 1, col, indxValOne);
        }
        if (col > 0) {
          filterGrid(row, col - 1, indxValOne);
        }
      }
    };

    // Loop through grid
    // Pass the index of grid as the argument for filterGrid()
    for (let row = 0; row < grid.length; row++) {
      for (let col = 0; col < grid[row].length; col++) {
        if (grid[row][col].value == 1) {
          totNumOfClusterItem++;
          filterGrid(row, col);
        }
      }
    }

    // Total number of cluster
    totNumOfCluster = arrayOfCluster.length;
    // Total number of items(square item) in the grid
    console.log(`total number of cluster:${totNumOfCluster}`);
    console.log(
      `toal number of cluster items in the grid:${totNumOfClusterItem}`
    );
    // Get the details of each item of the cluster, like: item Index, number of items in the cluster, index of cluster
    let getClusterItemProperties = [];
    arrayOfCluster.forEach((cluster, indx) => {
      cluster.forEach(clusterItem => {
        getClusterItemProperties.push({
          itemIndx: clusterItem[0] * this.gridSize + clusterItem[1], // Index of each element in the cluster based on the grid (dispaly in browser)
          noOfItem: cluster.length, // Total number of the item in the cluster
          indxParentCluster: indx // Index of cluster
        });
      });
    });
    console.log(getClusterItemProperties);
  }
}
// Default grid size
window.onload = () => {
  new Grid(5);
};

//Default no of grid Size in input field
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
