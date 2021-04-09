import { Server } from 'socket.io';
import Game from './Game.js';

export default (app) => {
  const io = new Server();
  const globalSocket = io.listen(app);

  const GAMES = {};
  const USERS = {};
  const USER_GAMES = new WeakMap();

  const getSocketsForGame = (game) => {
    const gameUsers = game.getUsers();
    
    return gameUsers.map(({ id }) => USERS[id]);
  };

  const broadcastGameState = (game) => {
    const sockets = getSocketsForGame(game);
    const gameState = game.getStateSnapshot();
    sockets.forEach((socket) => {
      socket.emit('game/state', gameState);
    });
  };

  const socketWrapper = (fnc) => (args = {}) => {
    fnc(args);
    const game = GAMES[args.id] ?? GAMES[USER_GAMES.get(socket).gameId];
    broadcastGameState(game);
  };

  globalSocket.sockets.on('connection', (socket) => {
    socket.on('game/join', socketWrapper(({ id, user }) => {
      console.log(`GAME JOIN ${user.id}`);
      if (!GAMES.hasOwnProperty(id)) {
        GAMES[id] = new Game(id);
      }

      const game = GAMES[id];
      game.addUser(user);
      USERS[user.id] = socket;
      USER_GAMES.set(socket, { 
        userId: user.id,
        gameId: id
      });
    }));

    socket.on('game/ready', socketWrapper(({ userId, id }) => {
      console.log(`GAME READY ${userId}`);
      const game = GAMES[id];
      game.addReady(userId);
    }));

    socket.on('game/answer', socketWrapper(({ userId, id, answerId }) => {
      console.log(`GAME ANSWER ${userId}`);
      const game = GAMES[id];
      game.addVote(userId, answerId);
    }));

    socket.on('disconnect', socketWrapper(() => {
      const { userId, gameId } = USER_GAMES.get(socket);
      GAMES[gameId].removeUser({ id: userId });
    }));
  });
}