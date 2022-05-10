(function(exports) {
 
    exports.T_MOVE = "MOVE";
    exports.O_MOVE = {
    type: exports.MOVE,
    data: null
    };

    exports.O_GAME_ABORTED = {
    type: "GAME-ABORTED"
    };
    exports.S_GAME_ABORTED = JSON.stringify(exports.O_GAME_ABORTED);

    exports.T_PLAYER_TYPE = "PLAYER-TYPE";
    exports.O_PLAYER_A = {
      type: exports.T_PLAYER_TYPE,
      data: "RED"
    };
    exports.S_PLAYER_A = JSON.stringify(exports.O_PLAYER_A);
  
    /*
     * Server to client: set as player B
     */
    exports.O_PLAYER_B = {
      type: exports.T_PLAYER_TYPE,
      data: "BLUE"
    };
    exports.S_PLAYER_B = JSON.stringify(exports.O_PLAYER_B);
})(typeof exports === "undefined" ? (this.Messages = {}) : exports);