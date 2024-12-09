// Game logic for Lights Out

// Create the grid
const gridSize = 5;
const gridContainer = document.getElementById("grid");

// Generate the grid squares
function createGrid() {
    gridContainer.innerHTML = ""; // Clear any previous content
    for (let i = 0; i < gridSize * gridSize; i++) {
        const square = document.createElement("div");
        square.classList.add("square");
        square.addEventListener("click", () => toggleSquare(i));
        gridContainer.appendChild(square);
    }
}

// Toggle the state of a square and its neighbors
function toggleSquare(index) {
    const squares = document.querySelectorAll(".square");
    const neighborIndices = [
        index - gridSize, // Top
        index + gridSize, // Bottom
        index - 1,        // Left
        index + 1         // Right
    ];

    // Toggle the clicked square
    toggleState(squares[index]);

    // Toggle neighbors if valid index
    for (let neighborIndex of neighborIndices) {
        if (neighborIndex >= 0 && neighborIndex < gridSize * gridSize) {
            if (Math.abs(index % gridSize - neighborIndex % gridSize) <= 1) {
                toggleState(squares[neighborIndex]);
            }
        }
    }

    // Check if the game is won (all lights are off)
    checkWinCondition();
}

// Toggle the state of a square (on/off)
function toggleState(square) {
    square.classList.toggle("on");
}

// Check if all squares are "off"
function checkWinCondition() {
    const squares = document.querySelectorAll(".square");
    const allOff = Array.from(squares).every(square => !square.classList.contains("on"));
    if (allOff) {
        // Show the "You win!" alert when the game is won
        setTimeout(() => {
            window.alert("You win!"); // Pop-up on winning the game
        }, 100);
    }
}

// Initialize the game with all lights on
function initializeGame() {
    createGrid();
    const squares = document.querySelectorAll(".square");

    // Set all squares to "on" initially
    squares.forEach(square => {
        square.classList.add("on");
    });
}

// Start the game
initializeGame();
