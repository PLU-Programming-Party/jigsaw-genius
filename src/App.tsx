import React from 'react';
import './App.css';
import PuzzleCam from './components/PuzzleCam/PuzzleCam';
import IntroPage from './pages/IntroPage/IntroPage';
import SolvedPage from './pages/SolvedPage/SolvedPage';

function App() {
  return (
    <div className="App">
        <h2 id="title"> Jigsaw Genius</h2>
        <SolvedPage backgroundImage='' puzzlePieceImage=''/>
    </div>
  );
}

export default App;
