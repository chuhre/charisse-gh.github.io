
//target all elements to save to constants
const page1btn = document.querySelector("#page1btn");
const page2btn = document.querySelector("#page2btn");
const page3btn = document.querySelector("#page3btn");
var allpages = document.querySelectorAll(".page");

//select all subtopic pages
function hideall() { //function to hide all pages
    for (let onepage of allpages) { //go through all subtopic pages
        onepage.style.display = "none"; //hide it
    }
}

function show(pgno) { //function to show selected page no
    hideall();
    //select the page based on the parameter passed in
    let onepage = document.querySelector("#page" + pgno);
    onepage.style.display = "block"; //show the page
}



/*Listen for clicks on the buttons, assign anonymous
eventhandler functions to call show function*/
page1btn.addEventListener("click", function () {
    show(1);
});
page2btn.addEventListener("click", function () {
    show(2);
});
page3btn.addEventListener("click", function () {
    show(3);
});

hideall();




/*JS for hamMenu */
const hamBtn = document.querySelector("#hamIcon");
const menuItemsList = document.querySelector("nav ul");
hamBtn.addEventListener("click", toggleMenus);
function toggleMenus() { /*open and close menu*/
    //if menuItemsList dont have the class "menuShow", add it, else remove it
    menuItemsList.classList.toggle("menuShow");
    //if menu is showing (has the class “menuShow”)
    if (menuItemsList.classList.contains("menuShow")) {
        hamBtn.innerHTML = "Close Menu"; //change button text to chose menu
    } else { //if menu NOT showing
        hamBtn.innerHTML = "Open Menu"; //change button text open menu
    }
}

















// === CARD GAME === 
const flipAudio = new Audio("audio/cardflip.mp3");
var errors = 0;
var matches = 0;
var gameMode = 'classic';
var timeLeft = 60;
var gameTimer = null;


var cardList = [
    "poppy-baddie-on-bass",
    "gigi-lil-lead",
    "frankie-sick-beats",
    "poppy-business",
    "gigi-brain-stormer",
    "frankie-the-boss",
    "poppy-cutie",
    "gigi-pop-star",
    "frankie-diva",
    "gigi-singer"
];


var cardSet;
var board = [];
var rows = 4;
var columns = 5;
var card1Selected;
var card2Selected;
var gameStarted = false;



window.onload = function () {
    setupEventListeners();
};


// === EVENT LISTENERS ===
function setupEventListeners() {
    // Form submission for game mode selection (Form Data)
    document.addEventListener('submit', handleFormSubmit);

    // Event delegation - single listener on board for all card clicks
    document.getElementById('board').addEventListener('click', handleCardClick);

    // Reset button
    document.getElementById('resetBtn').addEventListener('click', resetGame);
}


// === FORM DATA HANDLING ===
// game mode selection
function handleFormSubmit(e) {
    if (e.target.id === 'gameForm') {
        e.preventDefault();

        // Process form data using FormData API
        const formData = new FormData(e.target);
        gameMode = formData.get('gameMode');

        // Show timer for timed mode
        if (gameMode === 'timed') {
            document.getElementById('timerDisplay').style.display = 'block';
            startTimer();
        } else {
            document.getElementById('timerDisplay').style.display = 'none';
        }

        startGame();
    }
}

// === EVENT DELEGATION ===
// This function handles clicks on the game board
function handleCardClick(e) {
    // Check if clicked element is a card
    if (e.target.classList.contains('card') && gameStarted) {
        selectCard.call(e.target);
    }
}



// === GAME LOGIC ===
// This function shuffles the card list and creates a set of cards
function shuffleCards() {
    cardSet = cardList.concat(cardList); // Two of each card
    console.log(cardSet);

    // Shuffle algorithm
    for (let i = 0; i < cardSet.length; i++) {
        let j = Math.floor(Math.random() * cardSet.length);
        let temp = cardSet[i];
        cardSet[i] = cardSet[j];
        cardSet[j] = temp;
    }
    console.log(cardSet);
}


// === GAME START ===
// This function initializes the game state and starts the game
function startGame() {
    // Reset game state
    errors = 0;
    matches = 0;
    timeLeft = 60;
    board = [];
    card1Selected = null;
    card2Selected = null;
    gameStarted = true;

    // Update display
    document.getElementById("errors").innerText = errors;
    document.getElementById("matches").innerText = matches;
    document.getElementById("timer").innerText = timeLeft;

    // Clear board
    document.getElementById("board").innerHTML = "";

    // Shuffle and create board
    shuffleCards();
    createBoard();

    // Show cards for 1 second then hide
    setTimeout(hideCards, 1000);
}


// === BOARD CREATION ===
// This function creates the game board with shuffled cards
function createBoard() {
    // Arrange the board 4x5
    for (let r = 0; r < rows; r++) {
        let row = [];
        for (let c = 0; c < columns; c++) {
            let cardType = cardSet.pop();
            row.push(cardType);

            // Create card element
            let card = document.createElement("div");
            card.id = r.toString() + "-" + c.toString();
            card.classList.add("card");
            card.classList.add("card-" + cardType); // Show card initially
            card.dataset.cardType = cardType;

            document.getElementById("board").append(card);
        }
        board.push(row);
    }
    console.log(board);
}

function hideCards() {
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {
            let card = document.getElementById(r.toString() + "-" + c.toString());
            card.className = "card card-back";
        }
    }
}


// === CARD SELECTION ===
// This function handles the selection of cards
function selectCard() {
    if (this.classList.contains("card-back")) {
        if (!card1Selected) {
            card1Selected = this;
            let coords = card1Selected.id.split("-");
            let r = parseInt(coords[0]);
            let c = parseInt(coords[1]);

            // Remove back class and add the actual card class
            card1Selected.classList.remove("card-back");
            card1Selected.classList.add("card-" + board[r][c]);

            // Card flip audio
            flipAudio.play();
        } else if (!card2Selected && this != card1Selected) {
            card2Selected = this;
            let coords = card2Selected.id.split("-");
            let r = parseInt(coords[0]);
            let c = parseInt(coords[1]);

            // Remove back class and add the actual card class
            card2Selected.classList.remove("card-back");
            card2Selected.classList.add("card-" + board[r][c]);

            flipAudio.play();
            setTimeout(update, 1000);
        }
    }
}

// === UPDATE FUNCTION ===
// This function checks if two selected cards match
function update() {
    // Check if cards match
    let coords1 = card1Selected.id.split("-");
    let r1 = parseInt(coords1[0]);
    let c1 = parseInt(coords1[1]);

    let coords2 = card2Selected.id.split("-");
    let r2 = parseInt(coords2[0]);
    let c2 = parseInt(coords2[1]);

    if (board[r1][c1] !== board[r2][c2]) {
        // No match - flip both back
        card1Selected.className = "card card-back";
        card2Selected.className = "card card-back";
        errors += 1;
        document.getElementById("errors").innerText = errors;
    } else {
        // Match found
        card1Selected.classList.add("matched");
        card2Selected.classList.add("matched");
        matches += 1;
        document.getElementById("matches").innerText = matches;

       // Check for win
        if (matches === 10) {
            gameStarted = false;
            if (gameTimer) clearInterval(gameTimer);

            // Show win message 
            setTimeout(function () {
                alert("You Win!");
            }, 500);
        }
    }

    card1Selected = null;
    card2Selected = null;
}


// === TIMER FUNCTIONS ===
// This function starts the countdown timer for the game
function startTimer() {
    
    // setInterval repeatedly runs the function inside every 1 sec
    gameTimer = setInterval(function () {
        
        // Decrease the time left by 1 second
        timeLeft--;
        // Update text on the page to show the new time left
        document.getElementById('timer').textContent = timeLeft;

        // Check if time has run out
        if (timeLeft <= 0) {

            clearInterval(gameTimer);
            gameStarted = false;

            // alert message game is over
            alert("Time's Up! You got " + matches + "/10 matches");
        }

    }, 1000);
}


function resetGame() {
    // Clear timer
    if (gameTimer) {
        clearInterval(gameTimer);
        gameTimer = null;
    }

    // Reset variables
    errors = 0;
    matches = 0;
    timeLeft = 60;
    card1Selected = null;
    card2Selected = null;
    board = [];
    gameStarted = false;

    // Update display
    document.getElementById("errors").innerText = errors;
    document.getElementById("matches").innerText = matches;
    document.getElementById("timer").innerText = timeLeft;

    // Clear board
    document.getElementById("board").innerHTML = "";

    // Hide timer display
    document.getElementById('timerDisplay').style.display = 'none';
}
