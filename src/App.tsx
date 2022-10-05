import React, { useState } from 'react';
import './App.scss';

const colourRange = 256 ** 3;
function getRandomColour() {
  const colour = Math.floor(Math.random() * colourRange);
  return `#${colour.toString(16).padStart(6, '0')}`;
}

function App() {
  const [colours, setColours] = useState(new Array(3).fill('').map(() => getRandomColour()));
  const [correctColour, setCorrectColour] = useState(colours[Math.floor(Math.random() * 3)]);
  const [guessedCorrect, setGuessedCorrect] = useState<boolean | null>(null);

  function reset() {
    const newColours = new Array(3).fill('').map(() => getRandomColour());
    setColours(newColours);
    setCorrectColour(newColours[Math.floor(Math.random() * 3)]);
  }

  function guess(colour: string) {
    if (colour === correctColour) {
      setGuessedCorrect(true);
      reset();
    } else {
      setGuessedCorrect(false);
    }
  }

  let guessStateDisplay = null;
  if (guessedCorrect !== null) {
    if (guessedCorrect) {
      guessStateDisplay = <div style={{ color: 'green' }}>You are Correct!</div>;
    } else {
      guessStateDisplay = <div style={{ color: 'red' }}>You are Colourblind!</div>;
    }
  }

  return (
    <div className="App">
      <div className="colour-panel" style={{ background: correctColour }} />
      {
        colours.map((colour) => (
          <button key={colour} type="button" onClick={() => { guess(colour); }}>
            {colour}
          </button>
        ))
      }
      {
        guessStateDisplay
      }
    </div>
  );
}

export default App;
