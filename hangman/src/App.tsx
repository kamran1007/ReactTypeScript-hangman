import React, { useCallback, useEffect, useState } from "react";
import WordList from "./wordList.json";
import { HangmanWord } from "./HangmanWord";
import { Keyboard } from "./Keyboard";
import { HangmanDrawing } from "./HangmanDrawing";
import { keyboard } from "@testing-library/user-event/dist/keyboard";
function App() {
  const [wordToGuess, setWordToGuess] = useState(() => {
    return WordList[Math.floor(Math.random() * WordList.length)];
  });
  const [guessedLetters, setGuessedLetters] = useState<string[]>([]);
  const incorrectLetter = guessedLetters.filter(
    (letter) => !wordToGuess.includes(letter)
  );
  const addGuessedLetter = useCallback(
    (letter: string) => {
      if (guessedLetters.includes(letter)) return;
      setGuessedLetters((currentLetter) => [...currentLetter, letter]);
    },
    [guessedLetters]
  );

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const key = e.key;
      if (!key.match(/^[a-z]$/)) return;
      e.preventDefault();
      addGuessedLetter(key);
    };
    document.addEventListener("keypress", handler);

    return () => {
      document.removeEventListener("keypress", handler);
    };
  }, [guessedLetters]);
  console.log(wordToGuess);
  return (
    <div
      style={{
        maxWidth: "800px",
        display: "flex",
        flexDirection: "column",
        gap: "2rem",
        margin: "0 auto",
        alignItems: "center",
      }}
    >
      <div style={{ fontSize: "2rem", alignItems: "center" }}>
        {" "}
        win or Loose
      </div>
      <HangmanDrawing numberOfGuesses={incorrectLetter.length} />
      <HangmanWord guessedLetters={guessedLetters} wordToGuess={wordToGuess} />
      <div style={{ alignSelf: "stretch" }}>
        <Keyboard />
      </div>
    </div>
  );
}

export default App;
