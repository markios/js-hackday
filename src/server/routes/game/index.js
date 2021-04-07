import { Server } from 'socket.io';

export default (app) => {
  const io = new Server();
  const globalSocket = io.listen(app);

  globalSocket.sockets.on('connection', (socket) => {
    socket.emit('game/state', { gameId: 11 });
    socket.on('game/join', (user) => {
      // name: string, avatar: "#aabbcc", gameId: "default nanoid()
      // if game doesn't exist, create game (new game)
      // broadcast/user game/state to new user
      // socket.emit('game/state', { gameId: 11 });
    });

    socket.on('disconnect', (e) => {
      console.log('disconnected', e);
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