import { useContext, useEffect } from 'react';
import {
  Switch,
  Route,
  useParams,
  useHistory
} from "react-router-dom";
import { store } from '../../store/gameStore';
import UserForm from '../../components/userForm/userForm';

const Game = ({ match }) => {
  let { id } = useParams();
  const history = useHistory();
  const {
    setGameId,
    state,
    onRegisterUser
  } = useContext(store);
  const { game, currentUser } = state;
  
  useEffect(() => {
    setGameId(id);
  }, []);

  useEffect(() => {
    if (game && currentUser === null) {
      history.push(`/game/${id}/user`);
    }
  }, [game]);

  const onUserSubmitted = (...args) => {
    onRegisterUser(...args);
    history.push(`/game/${id}`);
  };

  return (
    <Switch>
      <Route path={`${match.path}/user`}>
        <UserForm onSubmit={onUserSubmitted} />
      </Route>
      <Route path={`${match.path}`}>
        <h1>Game {id}</h1>
      </Route>
    </Switch>
  );
};

export default Game;