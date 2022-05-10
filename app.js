var express = require("express");
var http = require("http");
var path = require("path");
var webSocket = require("ws");

var port = process.argv[2];
var app = express();

//var Game = require("./public/game.js");
//var stats = require("./public/javascripts/statTracker.js");

//var messages = require("./public/javascripts/messages");

app.use(express.static(__dirname + "/public"));

var server = http.createServer(app);

app.get("/", function(req, res){
    res.sendFile(path.join(__dirname + '/public/splash.html'));
});

wss = new webSocket.Server({
    server
});

var websockets = {};

//var currentGame = new Game(stats.gamesInitialized++);
//var connectionID = 0; //each websocket receives a unique ID

// wss.on('connection', function connection(ws){
//     let con = ws;
//     con.id = connectionID++;
//     let playerType = currentGame.addPlayer(con); //con is either 0 or 1, so red or blue
//     websockets[con.id] = currentGame;
//     console.log(
//         "Player %s placed in game %s as %s",
//         con.id,
//         currentGame.id,
//         playerType
//     );
    
//     //inform client about assigned color
//     con.send(playerType == "RED" ? messages.S_PLAYER_A : messages.S_PLAYER_B);

//     if (currentGame.hasTwoConnectedPlayers()) {
//         currentGame = new Game(stats.gamesInitialized++);
//     }

//     con.on("message", function incoming(message){
//         // console.log("THE MESSAGE SENT " + message);
//         // console.log("THE WEBSOCKET " + websockets[con.id]);
//         // console.log(websockets[con.id].gameState);
//         let gameObj = websockets[con.id];
//         let isPlayerRed = gameObj.playerRed == con ? true:false;

//         if (isPlayerRed){
//             con.send(message);

//         } else {
//             //placeDisc(message, isPlayerRed);
//             //gameObj.changeTurn(isPlayerRed);
            
//             //if(gameObj.checkWinBlue()){
//                 //gameObj.setStatus("BLUE");
//                 //gameObj.endGame(isPlayerRed);
//             //}
//         }

//         //if (gameObj.checkDraw()){
//             //gameObj.endGame(2);
//         //}
//     });
// });


server.listen(port, () => console.log('Server running.'));





