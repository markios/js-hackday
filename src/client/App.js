import { useEffect } from 'react';
import { io } from "socket.io-client"
import logo from './logo.svg';
import './App.css';

import { playTrack } from "./util/songs";

const App = () => {
  useEffect(() => {
    const socket = io('http://localhost:3000');
    socket.on("game/state", data => console.log(data));
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p onClick={() => playTrack("975918478", 10)}>
          Click to play
        </p>
      </header>
    </div>
  );
}

export default App;
