import { Server } from 'socket.io';
import Game from './Game.js';

export default (app) => {
  const io = new Server();
  const globalSocket = io.listen(app);

  const GAMES = {};
  const USERS = {};

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

  globalSocket.sockets.on('connection', (socket) => {
    socket.on('game/join', ({ id, user }) => {
      console.log(`GAME JOIN ${user.id}`);
      if (!GAMES.hasOwnProperty(id)) {
        GAMES[id] = new Game(id);
      }

      const game = GAMES[id];
      game.addUser(user);
      USERS[user.id] = socket;

      // broadcast game state
      broadcastGameState(game);
    });

    socket.on('game/ready', ({ userId, id }) => {
      console.log(`GAME READY ${userId}`);
      const game = GAMES[id];
      game.addReady(userId);

      // broadcast game state
      broadcastGameState(game);
    });

    socket.on('game/answer', ({ userId, id, answerId }) => {
      console.log(`GAME ANSWER ${userId}`);
      const game = GAMES[id];
      game.addVote(userId, answerId);

      // broadcast game state
      broadcastGameState(game);
    });

    socket.on('disconnect', (e) => {
      // remove user
    });

    // socket.on('game/ready', () => {
    //   // game event
    //   // ready for game to start | answered question
    //   // update game & broadcast game state
    // });

    // socket.on('game/answer', (answer) => {
    //   // answer { id, } use weak map to find the stuff. 
    // });

    /* Game State
    // pending
    { id, title, status: 'pending', readyList: Array<UserReferences> }

    // state
    game: {
      id: string,
      title: string,
      pending: enumeration,
      users: Array<user> { id: string, name: string, avatar: string };
      readyList?: Array<UserReferences>,
      question?: {
        id: string;
        text: string;
        musicId: string;
        readyList: Array<UserReferences> { [user.id]: boolean; }
        answers: Array<answers> {id: string, text: string}
      },
      leaderboard: Array<{ userId: string, score: number }>
    },
    onReady: () => void,
    onAnswer: (answer.id) => void

    // started
    {
      id,
      title,
      status: 'started',
      question: {
        id: guid,
        text: '',
        musicId,
        readyList: readyList: Array<UserReferences>
        answers: Array<answers> {id, text}
      }
    }

    // finished
    {
      status: 'finished',
      leaderboard: [{ userId, score }]
    }

    */

  });
}