var gameStatus = {
  since: Date.now() /* since we keep it simple and in-memory, keep track of when this object was created */,
  gamesInitialized: 0 /* number of games initialized */,
  totalUsers: 0 /* number of games aborted */,
  gamesCompleted: 0 /* number of games successfully completed */
};

//module.exports = gameStatus;