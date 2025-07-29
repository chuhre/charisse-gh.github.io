//alert("hLLo");
// const btn0 = document.querySelector("btn0");
// btn0.addEventListener("click", SomethingHappen);

// function SomethingHappen() {
//     //btn0.style.display+"none"; //make it disappear

//     btn0.innerHTML = "OUCH"
//     btn0.computedStyleMap.color = "green";
//     btn0.computedStyleMap.background = "red";

//     const btn1 = document.querySelector("btn1");
//     btn1.addEventListener("click", 
//         function(){
//             btn1.style.width="100px";
//             btn1.style.height="100px";
//         }
//     );
// }



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









// ball
/*find references to all the buttons and ball */
// const leftBtn = document.querySelector("#leftBtn");
// const rightBtn = document.querySelector("#rightBtn");
// const upBtn = document.querySelector("#upBtn");
// const downBtn = document.querySelector("#downBtn");
// const resetBtn = document.querySelector("#resetBtn");
// const ball = document.querySelector("#ball");

// var ballX = ballY = 0; //assign initial position of ball



// // boundary constraint
// const MinX = 0;
// const MinY = 0;
// const MaxX = 450; // 500px container - 50px ball = 450px
// const MaxY = 250; // 300px container - 50px ball = 250px


// function ResetPos() {
//     ballX = ballY = 0; //reset to zero
//     ball.style.left = ballX + "px"; //set left property to ball x variable
//     ball.style.top = ballY + "px"; //set top property to ball x variable
//     ball.innerText = ballX + "," + ballY; //update ball text to show coordinate
// }

// function MovePos(leftInc, topInc) {
//     // calculate new position
//     var newX = ballX + leftInc;
//     var newY = ballY + topInc;

//     // check boundaries and fix if needed
//     if (newX < MinX) newX = MinX;
//     if (newX > MaxX) newX = MaxX;
//     if (newY < MinY) newY = MinY;
//     if (newY > MaxY) newY = MaxY;

//     // update ball position
//     ballX = newX;
//     ballY = newY;
//     ball.style.left = ballX + "px"; // set left css property to ball x variable
//     ball.style.top = ballY + "px"; // set top css property to ball y variable
//     ball.innerText = ballX + "," + ballY; // update ball text to show coordinate
// }

// function MoveLeft() {
//     var newX = ballX - 10; // decrement by 10
//     if (newX < MinX) newX = MinX; // don't go below MinX

//     ballX = newX;

//     ballY = ballY + 0; 
//     ball.style.left = ballX + "px"; //set left css property to ball x variable
//     ball.style.top = ballY + "px"; //set top css property to ball y variable
//     ball.innerText = ballX + "," + ballY; //update ball text to show coordinate
// }
// //eventlistener to activate MoveLeft (named callback function)
// leftBtn.addEventListener("click", MoveLeft); //no brackets after MoveLeft

// //eventListener to anonymous callback function (other way)
// rightBtn.addEventListener("click", function () {
//     MovePos(10, 0);
// });
// upBtn.addEventListener("click", function () {
//     MovePos(0, -10);
// });
// downBtn.addEventListener("click", function () {
//     MovePos(0, 10);
// });
// resetBtn.addEventListener("click", ResetPos);













// === CARD GAME ===

var errors = 0;
var cardList = [
    "Poppy Baddie on Bass",
    "Gigi Lil' Lead", 
    "Frankie Sick Beats",
    "Poppy Business",
    "Gigi Brain Stormer",
    "Frankie The Boss",
    "Poppy Cutie",
    "Gigi Pop Star",
    "Frankie Diva",
    "Gigi Singer"
]
var cardSet;
var board = [];
var rows = 4;
var columns = 5;
var card1Selected;
var card2Selected;

window.onload = function() {
    shuffleCards();
    startGame();
}

// Helper function to convert character names to CSS class names
function nameToClass(cardName) {
    return cardName.toLowerCase()
        .replace(/'/g, '') // remove apostrophes
        .replace(/\s+/g, '-'); // replace spaces with hyphens
}

function shuffleCards() {
    cardSet = cardList.concat(cardList); //two of each card
    console.log(cardSet);
    //shuffle
    for (let i = 0; i < cardSet.length; i++) {
        let j = Math.floor(Math.random() * cardSet.length); //get random index
        //swap
        let temp = cardSet[i];
        cardSet[i] = cardSet[j];
        cardSet[j] = temp;
    }
    console.log(cardSet);
}

function startGame() {
    //arrange the board 4x5
    for (let r = 0; r < rows; r++) {
        let row = [];
        for (let c = 0; c < columns; c++) {
            let cardType = cardSet.pop();
            row.push(cardType);
            
            // Create div instead of img
            let card = document.createElement("div");
            card.id = r.toString() + "-" + c.toString();
            card.classList.add("card");
            card.classList.add("card-back"); // Start with back showing
            card.dataset.cardType = cardType; // Store card type for later use
            card.addEventListener("click", selectCard);
            document.getElementById("board").append(card);
        }
        board.push(row);
    }
    console.log(board);
    setTimeout(hideCards, 1000);
}

function hideCards() {
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {
            let card = document.getElementById(r.toString() + "-" + c.toString());
            // Remove any card-type classes and ensure back is showing
            card.className = "card card-back";
        }
    }
}

function selectCard() {
    if (this.classList.contains("card-back")) {
        if (!card1Selected) {
            card1Selected = this;
            let coords = card1Selected.id.split("-");
            let r = parseInt(coords[0]);
            let c = parseInt(coords[1]);
            
            // Remove back class and add the actual card class
            card1Selected.classList.remove("card-back");
            card1Selected.classList.add("card-" + nameToClass(board[r][c]));
        }
        else if (!card2Selected && this != card1Selected) {
            card2Selected = this;
            let coords = card2Selected.id.split("-");
            let r = parseInt(coords[0]);
            let c = parseInt(coords[1]);
            
            // Remove back class and add the actual card class
            card2Selected.classList.remove("card-back");
            card2Selected.classList.add("card-" + nameToClass(board[r][c]));
            setTimeout(update, 1000);
        }
    }
}

function update() {
    // Check if cards match by comparing their original names
    let coords1 = card1Selected.id.split("-");
    let r1 = parseInt(coords1[0]);
    let c1 = parseInt(coords1[1]);
    
    let coords2 = card2Selected.id.split("-");
    let r2 = parseInt(coords2[0]);
    let c2 = parseInt(coords2[1]);
    
    if (board[r1][c1] !== board[r2][c2]) {
        // Flip both back
        card1Selected.className = "card card-back";
        card2Selected.className = "card card-back";
        errors += 1;
        document.getElementById("errors").innerText = errors;
    }
    // If they match, leave them face up
    
    card1Selected = null;
    card2Selected = null;
}