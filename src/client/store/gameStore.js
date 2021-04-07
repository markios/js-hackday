import {
  createContext,
  useEffect,
  useReducer,
  useState,
} from 'react';
import { get } from '../util/localStorage';
import { io } from "socket.io-client";
import { v4 as uuid } from 'uuid';

const initialState = { game: null, currentUser: null, recentGames: get() };
const store = createContext(initialState);
const { Provider } = store;

const StateProvider = ( { children } ) => {
  /* Application State */
  const [state, dispatch] = useReducer((state, action) => {
    switch(action.type) {
      case 'TARGET': {
        const user = state.recentGames?.[action.payload] ?? null;
        return {
          ...state,
          target: action.payload,
          currentUser: user
        };
      }
      case 'USER': {
        return {
          ...state,
          currentUser: action.payload
        };
      }
      case 'GAME_STATE': {
        return {
          ...state,
          game: action.payload
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
        dispatch({
          type: 'GAME_STATE',
          payload: game
        });
        
        /* Update local storage */
      });
    }
  }, [socket]);

  useEffect(() => {
    if (socket && state.currentUser && !state.game) {
      socket.emit('game/join', {
        id: state.target,
        user: state.currentUser
      });
    }
  }, [state]);
  
  /* Handlers */

  const setGameId = (id) => {
    dispatch({
      type: 'TARGET',
      payload: id
    });
  };

  const onRegisterUser = (name, avatar) => { 
    // subscribe to socket
    dispatch({
      type: 'USER',
      payload: {
        id: uuid(),
        name,
        avatar
      }
    });
  };

  const onReady = () => {
    socket.emit('game/ready', {
      userId: state.currentUser.id,
      id: state.game.id
    });
  };

  const onAnswer = (answerId) => {
    socket.emit('game/answer', {
      userId: state.currentUser.id,
      id: state.game.id,
      answerId
    });
  };

  return <Provider value={{
    state,
    dispatch,
    onRegisterUser,
    onReady,
    onAnswer,
    setGameId,
  }}>{children}</Provider>;
};

export { store, StateProvider }