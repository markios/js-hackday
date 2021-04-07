import { v4 as uuid } from 'uuid';
import Game from './containers/game/game';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import './App.css';

const App = () => {
  return (
    <div className="App">
      <header className="App-header"></header>
      <Router>
        <Switch>
          <Route path="/game/:id" component={Game} />
          <Route path="/">
            <Redirect
              to={{
                pathname: `/game/${uuid()}`
              }}
            />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
