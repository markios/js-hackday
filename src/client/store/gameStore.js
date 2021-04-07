import {
  createContext,
  useReducer,
  useEffect
} from 'react';
// import { io } from "socket.io-client"

const initialState = { wibble: 'one' };
const store = createContext(initialState);
const { Provider } = store;

const StateProvider = ( { children } ) => {
  useEffect(() => {
    // const socket = io();
    // socket.on("game/state", (data) => console.log(data));
  }, []);

  const [state, dispatch] = useReducer((state, action) => {
    switch(action.type) {
      case 'test':
        return {
          ...state,
          one: action.payload
        };
      default:
        throw new Error();
    };
  }, initialState);

  const onSubmitUser = (name, colour) => { 
    console.log('user logging in');
    dispatch({
      type: 'test',
      payload: colour
    });
  };

  return <Provider value={{ state, dispatch, onSubmitUser }}>{children}</Provider>;
};

export { store, StateProvider }