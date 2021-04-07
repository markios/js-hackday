import {
  Switch,
  Route,
  useParams
} from "react-router-dom";
import { StateProvider } from '../../store/gameStore';
import UserForm from '../../components/userForm/userForm';

const Game = ({ match }) => {
  let { id } = useParams();
  return (
    <StateProvider>
      <Switch>
        <Route path={`${match.path}/user`}>
          <UserForm />
        </Route>
        <Route path={`${match.path}`}>
          <h1>Game {id}</h1>
        </Route>
      </Switch>
    </StateProvider>
  );
};

export default Game;