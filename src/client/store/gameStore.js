import {
  createContext,
  useEffect,
  useReducer,
  useState,
} from 'react';
import { get } from '../util/localStorage';
import { io } from "socket.io-client";

const initialState = { game: null, currentUser: null, recentGames: get() };
const store = createContext(initialState);
const { Provider } = store;

const StateProvider = ( { children } ) => {
  /* Application State */
  const [state, dispatch] = useReducer((state, action) => {
    switch(action.type) {
      case 'GAME_ID': {
        return {
          ...state,
          game: {
            ...state.game,
            id: action.payload,
          },
        };
      }
      case 'USER': {
        return {
          ...state,
          currentUser: action.payload
        };
      }
      default:
        throw new Error();
    };
  }, initialState);

  /* Socket */
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    setSocket(io());
  }, []);

  useEffect(() => {
    if (socket) {
      socket.on('game/state', (game) => {
        console.log(game);
      });
    }
  }, [socket]);

  useEffect(() => {
    if (socket && state.currentUser) {
      socket.emit('game/join', {
        id: state.game.id,
        user: state.currentUser
      });
    }
  }, [state]);
  
  const connectToServer = () => setSocket(io());
  
  /* Handlers */
  const setGameId = (id) => {
    dispatch({
      type: 'GAME_ID',
      payload: id
    });
  };

  const onRegisterUser = (name, avatar) => { 
    // subscribe to socket
    dispatch({
      type: 'USER',
      payload: { name, avatar }
    });
    // connect to the server
    connectToServer();
  };

  return <Provider value={{
    state,
    dispatch,
    onRegisterUser,
    setGameId,
  }}>{children}</Provider>;
};

export { store, StateProvider }