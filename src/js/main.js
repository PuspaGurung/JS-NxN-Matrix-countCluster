import "./../scss/main.scss";

/** PROJECT DESCRIPTION 
 * 1. Matrix, count Number of items of the particular cluster when user click on it
 * 2. Display the grid or random number 1 and 0, on a web page using a colour to represent 1 s, and empty for  0 s
 * 3. When user click on a filled square, count the number of filled squares connected to this
      square, and all other filled squares connected to those squares.Write this number into the
      clicked square.Squares are connected if they are touching horizontally or vertically, NOT
      diagonal.Numbers in other coloured squares should be cleared when a new square is clicked
* 4. Clicking on a non - filled square should do nothing
* 5. While hovering over a filled square, temporarily change the colour of all connected squares
* 6. Allow the grid to be randomly generated with size NxN elements with 0 s and 1 s in
* 7. Add a colour picker to allow the user to change the background colours of the grid.
 **/

/**  ABBREVIATION IN THIS PROJECT
grid :: a network of lines that cross each other to form a series of squares of rectangles
cluster:: square connection Horizontally and Vertically
square:: grid item
**/


// GRID
class Grid {
  constructor(gridSize) {
    this.gridSize = gridSize;

    this.createGrid();
    this.displayGrid();
    this.getCluster();
    this.getClusterItemProperties();
    this.handleMouseEvent();
    this.handleBgColor();
  }
  // Create NxN matrix of random 1 and 0
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
  }

  // Display NxN matrix in the browser (grid format)
  displayGrid() {
    let ul = document.createElement("ul");
    ul.classList.add("grid");
    let gridWrapper = document.querySelector(".grid-wrapper");
    gridWrapper.appendChild(ul);
    this.grid.forEach(gridRow => {
      gridRow.forEach(gridCol => {
        let li = document.createElement("li");

        if (gridCol.value == 1) {
          li.classList.add("grid__filled");
        }
        let txtNode = document.createTextNode(gridCol.value);
        li.appendChild(txtNode);
        ul.appendChild(li);

        // APPLY STYLESHEET: ul(className=gird) and li
        // Default grid width: 40rem,
        // Grid width increasy by 8rem each time if uer increase the gridSize by 1
        let content = {
          width: 40 + (this.gridSize - 5) * 8
        };

        // Grid :: ul
        let styleUl = {
          width: `${content.width}rem`
        };
        let addStyleUl = ul.style;
        for (let style in styleUl) {
          addStyleUl[style] = styleUl[style];
        }

        let styleLi = {
          //Grid :: ul
          //Grid item :: li
          // Grid item width and item height is calcualte based on the grid width (ul.width)
          width: `${Math.floor(content.width / this.gridSize)}rem`,
          minHeight: `${Math.floor(content.width / this.gridSize)}rem`,
          background: gridCol.value == 1 ? "#e00201" : "white"
        };
        let addStyleLi = li.style;

        for (let style in styleLi) {
          addStyleLi[style] = styleLi[style];
        }
      });
    });
  }

  // Change the background color of cluster 
  handleBgColor() {
    let btnApplyColor = document.getElementById("change-grid-bg-color");
    btnApplyColor.addEventListener("change", e => {
      e.preventDefault();
      let bgColor = e.target.value;
      let getItemListDOM = document.querySelectorAll(".grid__filled");
      for (let item of getItemListDOM) {
        item.style.background = `${bgColor}`;
      }
    });
  }

  // Create the array of Cluster
  getCluster() {
    const grid = this.grid;
    let totNumOfCluster = 0;
    let totNumOfClusterItem = 0;
    let arrIndxValOne = []; // Array that contains all the array of index of 1 connected  (vertically or horizontally)
    let arrayOfCluster = []; // Contains the array of cluster

    let filterGrid = function (row, col, indxValOne = []) {
      let gridItem = grid[row][col];
      if (gridItem.value == 1 && gridItem.visited == false) {
        gridItem.visited = true;

        //Index of 1 in the grid
        indxValOne.push([row, col]);
        arrIndxValOne.push(indxValOne);

        // Filter the array of index of one
        // Array of cluster of connected one
        for (let i = 0; i < arrIndxValOne.length; i++) {
          if (arrayOfCluster.indexOf(arrIndxValOne[i]) == -1) {
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
    // array that contains only array of cluster
    this.arrayOfCluster = arrayOfCluster;
  }

  /** get cluster item (square box) properties ::
    index, number of items (square box) in the particular cluster, index of each cluster from the array of cluster **/
  getClusterItemProperties() {
    let getClusterItemProperties = [];
    //this.arrayOfCluster.forEach()
    [].forEach.call(this.arrayOfCluster, (cluster, indx) => {
      //cluste.forEach()
      [].forEach.call(cluster, (clusterItem) => {
        getClusterItemProperties.push({
          itemIndx: clusterItem[0] * this.gridSize + clusterItem[1], // Index of each element in the cluster based on the grid (dispaly in browser)
          noOfItem: cluster.length, // Total number of the item in the cluster
          indxParentCluster: indx // Index of cluster
        });
      });
    });
    this.getClusterItemProperties = getClusterItemProperties;
  }

  // MOUSE EVENTS: mouseOver and click 
  handleMouseEvent() {
    let clusterItem = this.getClusterItemProperties;
    let getAllGridDOM = document.querySelectorAll(".grid");
    let getNewGridDOM = getAllGridDOM[getAllGridDOM.length - 1];
    let getNewGridDOMchildElements = getNewGridDOM.children;

    // hide previous grid (show only latest grid at a time)
    if (getAllGridDOM.length > 1) {
      for (let i = 0; i < getAllGridDOM.length - 1; i++) {
        getAllGridDOM[i].style.display = "none";
      }
    }

    for (
      let element = 0; element < getNewGridDOMchildElements.length; element++
    ) {
      // get Index of each new grid elements
      let gridElement = getNewGridDOMchildElements;
      gridElement[element].index = element;
      gridElement[element].innerHTML = "";

      //Note: Indivudual cluster includes one unique class name in their item
      // Add unique class Name to all item of the particualr cluster
      clusterItem.forEach(item => {
        if (item.itemIndx == gridElement[element].index) {
          gridElement[element].classList.add(
            `grid--cluster${item.indxParentCluster}`
          );
        }
      });

      // Display the total number of cluster items when the user click on any item (filled dquare)of the cluster
      // Do nothing when user click on empty square
      gridElement[element].addEventListener("click", e => {
        let targetIndex = e.target.index;
        clusterItem.forEach(item => {
          if (item.itemIndx == targetIndex) {
            let clickMe = document.getElementsByClassName("clickMe");
            if (clickMe.length > 0) {
              clickMe[0].innerHTML = "";
              clickMe[0].className = clickMe[0].className.replace(
                "clickMe",
                ""
              );
            }
            gridElement[element].classList.add("clickMe");
            gridElement[element].innerHTML = item.noOfItem;
          }
        });
      });

      document
        .querySelector(".grid-wrapper")
        .addEventListener("mouseover", e => {
          let target = e.target;

          // Array that contain two className of targe hover element:: [grid__item, grid--cluster(cluster index)]
          let targetClassName = target.className;

          //Get second element of array targetClassName:: grid--cluster(cluster index)
          //Target cluster contains the same className in the element of that cluster
          let targetClusterItemUniqueClass = targetClassName.split(" ")[1];

          // Get all list of unique className of individual cluster item
          let getAllTargetClusterItemUniqueClass = document.querySelectorAll(
            `.${targetClusterItemUniqueClass}`
          );

          let getAllHoverMe = document.querySelectorAll(".hover-item");
          if (getAllHoverMe.length > 0) {
            //getAllHoverMe.forEach()
            [].forEach.call(getAllHoverMe, (hover) => {
              hover.className = hover.className.replace("hover-item", "");
            });
          }
          //getAllTargetClusterItemUniqueClass.forEach()
          [].forEach.call(getAllTargetClusterItemUniqueClass, (cls) => {
            cls.classList.add("hover-item");
          })
        });
    }
  }
}

//get screen width
let screenWidth = window.innerWidth ||
  document.documentElement.clientWidth ||
  document.body.clientWidth;

// Default grid size  

/** Default grid size based on screen width
 *  width <=500px
 * width >=500px 
 **/
window.onload = () => {
  (screenWidth > 500) ? new Grid(8) && (document.getElementById("grid-size").defaultValue = 8): new Grid(6) && (document.getElementById("grid-size").defaultValue = 6)
};

// ALLOw TO CHANGE GRID SIZE
document.getElementById("grid-size").addEventListener("change", e => {
  let gridSize = e.target.value;
  let errorElement = document.getElementById("error-message");
  let errorMessage = [];
  if (screenWidth <= 500) {
    //grid size shuld be between 4 and 6
    gridSize == "" ?
      errorMessage.push("Grid size input field should not be empty") :
      gridSize > 6 || gridSize < 3 ?
      errorMessage.push("Grid size should be between 3 and 6") :
      new Grid(gridSize);

    // If  grid size is less than 3 and greater than 6 then dispaly error message
    errorMessage.length > 0 ?
      (errorElement.innerText = errorMessage.join(", ")) :
      (errorElement.innerText = " ");
  } else {
    //grid size shuld be between 5 and 10
    gridSize == "" ?
      errorMessage.push("Grid size input field should not be empty") :
      gridSize > 10 || gridSize < 5 ?
      errorMessage.push("Grid size should be between 5 and 10") :
      new Grid(gridSize);

    // If  grid size is less than 5 and greater than 10 then dispaly error message
    errorMessage.length > 0 ?
      (errorElement.innerText = errorMessage.join(", ")) :
      (errorElement.innerText = " ");
  }

});