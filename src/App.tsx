import React from 'react';
import './App.css';
import PuzzleCam from './components/PuzzleCam/PuzzleCam';
import IntroPage from './pages/IntroPage/IntroPage';
import SolvedPage from './pages/SolvedPage/SolvedPage';

function App() {
  return (
    <div className="App">
        <h2 id="title"> Jigsaw Genius</h2>
        <PuzzleCam cameraHeight={360} cameraWidth={360} buttonText={"submit"} title={"The title"} buttonHandler={() => console.log("log")}/>
    </div>
  );
}

export default App;
