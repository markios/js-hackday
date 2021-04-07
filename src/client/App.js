import { useEffect } from 'react';
import logo from './logo.svg';
import './App.css';

import { playTrack } from "./util/songs";

function App() {
  

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
