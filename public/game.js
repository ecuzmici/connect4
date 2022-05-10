// var WebSocket = require("ws");
// var url = "ws://localhost:3000";
// var webSocket = new WebSocket(url);


// webSocket.onopen = function (event){
    
// };

// webSocket.onmessage = function (msg) {
//     // if (msg == "RED"){
//     //     startGame(true);
//     // } else if (msg == "BLUE") {
//     //     startGame(false);
//     // }
    
//     // console.log(event);
//     // columnId = event.data;
//     // placeDisc(columnId);
    
// };

//let columnId;
//gameBoard representing the gameboard, 0 => no disc, 1=> red disc, -1 => blue disc
let gameBoard = [
    [0,0,0,0,0,0,0], //[0], top row
    [0,0,0,0,0,0,0], //[1]
    [0,0,0,0,0,0,0], //[2]
    [0,0,0,0,0,0,0], //[3]
    [0,0,0,0,0,0,0], //[4]
    [0,0,0,0,0,0,0]  //[5], bottom row
//   0 1 2 3 4 5 6
]

//let redPlayerTurn = true; //red player goes first

let game = function(gameID){
    this.playerRed = null;
    this.playerBlue = null;
    this.id = gameID;
    this.gameState = "0 JOINED";
    this.turnRed = true;
}

let sounds;
let redPlayerTurn = true;

function sound() {
    this.sound = document.createElement("audio");
    this.sound.src = "sounds/button.mp3";
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
    this.sound.style.display = "none";
    document.body.appendChild(this.sound);
    this.play = function(){
      this.sound.play();
    }
    this.stop = function(){
      this.sound.pause();
    }
  }

function startGame() {
    //console.log(window.screen.width);
    
    if (window.screen.width > 1920 || window.screen.width < 1600){
        alert("This game works best in 1920x1080 resolution. \nYou might notice some graphical irregularities.");
    }
    
    let doc = document.getElementsByClassName("endTitleBlue")[0];
    doc.style.opacity = 0;
    doc.style.transition = "opacity 1s";
    
    doc = document.getElementsByClassName("endTitleRed")[0];
    doc.style.opacity = 0;
    doc.style.transition = "opacity 1s";

    document.getElementById("notClick").style.pointerEvents = "none";
    createBoard();
    
}

function createBoard() {
    for (let i = 0; i < 7; i++) {
        let div = document.createElement("div"); //creating 6 divs in the 'gameScreen'
        div.style.width = "14.13%";
        div.id = "column" + i;
        div.style.height = "16.666666667%";
        div.style.textAlign = "center";
        div.style.cssFloat = "left";

        div.setAttribute("onclick", "placeDisc(this.id)");
        //console.log("after onclick");
        div.style.borderRight = "1px dotted white";

        if (i === 6)div.style.borderRight = "0px dotted white";

        
        //adding to gameScreen
        document.getElementsByClassName("gameScreen")[0].appendChild(div);

        //adding 6 images for each of the 7 divs
        for (let j = 0; j < 6; j++) {
            let elem = document.createElement("img");
            elem.setAttribute("src", "images/red ball.png");
            elem.setAttribute("width", "70%");
            elem.setAttribute("height", "70%");
            elem.setAttribute("margin-bottom", "1%");
            elem.style.opacity = "0.0";

            document.getElementById("column" + i).appendChild(elem);
        }
    }
}

// function sendId(id){
//     webSocket.send(id);
// }


function placeDisc(id){
    //console.log("reached");
    changeTurn(redPlayerTurn);
    let doc = document.getElementById(id); //get the whole column
    let column = id.substring(6,7); //get only the number of the div/column for HTML
    column = parseInt(column);
    let row = 5 - countInColumn(column); //returns row in which disc can be placed. 5 - func; because of order of rows in gameBoard[][]
    let cell = doc.childNodes[row]; //specific row/cell where to place in HTML
    cell.style.transition = "opacity 0.5s";
    
    if (row < 0){
        alert("Unable to place disc there, please choose another column.");
        return;
    }
    
    if (redPlayerTurn){
        cell.style.opacity = "1";
        redPlayerTurn = false;
        gameBoard[row][column] = 1;
    } else {
        cell.style.opacity = "1";
        cell.setAttribute("src", "images/blue ball.png");
        gameBoard[row][column] = -1;
        redPlayerTurn = true;
    }
    sounds = new sound();
    sounds.play();
    let draw = checkDraw();

    if (draw) endGame(2);

    if (!redPlayerTurn){ //if red player just moved
        let win = checkWinRed();
        if (win) {
            endGame(redPlayerTurn);
        }
    }

    if (redPlayerTurn){ //if blue player just moved
        let win = checkWinBlue();
        if (win) {
            endGame(redPlayerTurn);
        }
    }


}

function changeTurn(redTurn){
    let doc;
    if (redTurn){
        doc = document.getElementById("rightTurn");
        doc.style.opacity = 1;
        doc = document.getElementById("leftTurn");
        doc.style.opacity = 0;
    } else {
        doc = document.getElementById("leftTurn");
        doc.style.opacity = 1;
        doc = document.getElementById("rightTurn");
        doc.style.opacity = 0;
    }
}

function checkDraw(){
    for (let col = 0; col < 7; col++){
        if (gameBoard[0][col] === 0){
            return false;
        }
    }
    //console.log("returned true for draw");
    return true;
}

function checkWinRed(){
    //checking for vertical win
    for (let col = 0; col < 7; col++){
        for (let i = 0; i < 3; i++){
            let sum = 0;
            for (let j = 0; j < 4; j++){
                sum += gameBoard[i+j][col];
                if (sum === 4) return true;
            }
        }
    }

    //checking for horizontal win
    for (let row = 0; row < 6; row++){
        for (let i = 0; i < 4; i++){
            let sum = 0;
            for (let j = 0; j < 4; j++){
                sum += gameBoard[row][i+j];
                if (sum === 4) return true;
            }
        }
    }

    //checking for diagonal win top-bottom left-right
    for (let col = 0; col < 4; col++){
        for (let row = 0; row < 3; row++){
            let sum = 0;
            for (let i = 0; i < 4; i++){ //increment to get the diagonal
                sum += gameBoard[row+i][col+i];
                if (sum === 4) return true;
            }
        }
    }

    //checking for diagonal win top-bottom right-left
    for (let col = 6; col > 2; col--){
        for (let row = 0; row < 3; row++){
            let sum = 0;
            for (let i = 0; i < 4; i++){ //increment to get the diagonal
                sum += gameBoard[row+i][col-i];
                if (sum === 4) return true;
            }
        }
    }
}


function checkWinBlue(){
    //checking for vertical win
    for (let col = 0; col < 7; col++){
        for (let i = 0; i < 3; i++){
            let sum = 0;
            for (let j = 0; j < 4; j++){
                sum += gameBoard[i+j][col];
                if (sum === -4) return true;
            }
        }
    }

    //checking for horizontal win
    for (let row = 0; row < 6; row++){
        for (let i = 0; i < 4; i++){
            let sum = 0;
            for (let j = 0; j < 4; j++){
                sum += gameBoard[row][i+j];
                if (sum === -4) return true;
            }
        }
    }

    //checking for diagonal win top-bottom left-right
    for (let col = 0; col < 4; col++){
        for (let row = 0; row < 3; row++){
            let sum = 0;
            for (let i = 0; i < 4; i++){ //increment to get the diagonal
                sum += gameBoard[row+i][col+i];
                if (sum === -4) return true;
            }
        }
    }

    //checking for diagonal win top-bottom right-left
    for (let col = 6; col > 2; col--){
        for (let row = 0; row < 3; row++){
            let sum = 0;
            for (let i = 0; i < 4; i++){ //increment to get the diagonal
                sum += gameBoard[row+i][col-i];
                if (sum === -4) return true;
            }
        }
    }
}

function countInColumn(col, gameboard){
    let sum = 0;
    for (let i = 0; i < 6; i++){
        sum += (gameBoard[i][col] * gameBoard[i][col]); //multiplying to only get positive values
    }

    return sum;
}

function endGame(redTurn){
    let doc = document.getElementsByClassName("gameScreen")[0];
    doc.style.opacity = 0;
    doc.style.pointerEvents = "none";
    document.getElementById("notClick").style.pointerEvents = "auto";

    if (redTurn === 2){ //draw
        //console.log("entered in endGame");
        document.getElementsByClassName("endTitleDraw")[0].style.opacity = 1;
    } else if (redTurn){ //blue won
        document.getElementsByClassName("endTitleBlue")[0].style.opacity = 1;
    } else { //red won
        document.getElementsByClassName("endTitleRed")[0].style.opacity = 1;
    }

    document.getElementById("leftTurn").style.opacity = 0;
    document.getElementById("rightTurn").style.opacity = 0;

    clearInterval(timer);
    
}

function showStats(){
    let doc = document.getElementsByClassName("stats")[0];
    for (let i = 0; i < 3; i++){
        //console.log(doc.children);
        doc.children[i].style.transition = "opacity 1s";
    }
    //console.log(window.getComputedStyle(doc.children[0]));
    let temp = window.getComputedStyle(doc.children[0]).getPropertyValue("opacity");
    temp = parseInt(temp);
    if (temp === 1) {
        for (let i = 0; i < 3; i++){
            doc.children[i].style.opacity = 0;
        }
    } else { 
        for (let i = 0; i < 3; i++){
            doc.children[i].style.opacity = 1;
        }
    }
}

function showHowTo(){
    let doc = document.getElementsByClassName("howto")[0];
    doc.style.transition = "opacity 1s";

    let temp = parseInt(window.getComputedStyle(doc).getPropertyValue("opacity"));

    if (temp === 1) 
        doc.style.opacity = 0;
    else
        doc.style.opacity = 1;
}
