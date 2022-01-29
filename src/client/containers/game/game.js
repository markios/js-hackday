import { useContext, useEffect } from "react";
import { Switch, Route, useParams, useHistory } from "react-router-dom";
import { store } from "../../store/gameStore";
import UserForm from "../../components/userForm/userForm";
import Game from "../../components/Game";

const GameContainer = ({ match }) => {
  let { id } = useParams();
  const history = useHistory();
  const { setGameId, state, onRegisterUser, onReady, onAnswer } =
    useContext(store);
  const { target, game, currentUser } = state;

  useEffect(() => {
    setGameId(id);
  }, []);

  useEffect(() => {
    if (target && currentUser === null) {
      history.push(`/game/${id}/user`);
    }
  }, [target]);

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
        {!game && <div>Loading game {target}</div>}
        {game && (
          <Game
            game={state.game}
            currentUser={currentUser}
            onReady={onReady}
            onAnswer={onAnswer}
          />
        )}
      </Route>
    </Switch>
  );
};

export default GameContainer;
