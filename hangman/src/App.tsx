import React, { useState } from 'react';
import WordList from './wordList.json';
import { HangmanWord } from './HangmanWord';
import { Keyboard } from './Keyboard';
import { HangmanDrawing } from './HangmanDrawing';
function App() {
  const [wordToGuess, setWordToGuess] = useState(()=>{
    return WordList[Math.floor(Math.random() * WordList.length)]
  })
  const [guessedLetters, setGuessedLetters] = useState<string[]>([])
  console.log(wordToGuess)
  return (
    <div
      style={{
        maxWidth: "800px",
        display: "flex",
        flexDirection : "column",
        gap : "2rem",
        margin : "0 auto",
        alignItems : "center"

    }}
    >
      <div style={{fontSize : "2rem", alignItems : "center"}}> win or Loose
      </div>
      <HangmanDrawing/>
      <HangmanWord/>
      <Keyboard/>
      </div>
  );
}

export default App;
