import Die from "./components/Die";
import { useEffect, useRef, useState } from "react";
import Confetti from "react-confetti";

export default function App() {
  const [diceValues, setDiceValues] = useState(() => generateDiceValues());

  let gameWon =
    diceValues.every((x) => x.isHeld) &&
    diceValues.every((x) => x.value === diceValues[0].value)
      ? true
      : false;

  function rollDice() {
    if (gameWon) {
      setDiceValues(generateDiceValues());
      return;
    }

    setDiceValues((oldDiceValues) => {
      return oldDiceValues.map((x) => {
        return x.isHeld ? x : { ...x, value: Math.ceil(Math.random() * 6) };
      });
    });
  }

  function generateDiceValues() {
    let arr = [];
    for (var i = 0; i < 10; i++) {
      var temp = {
        isHeld: false,
        value: Math.ceil(Math.random() * 6),

        key: i,
        id: i,
      };
      arr.push(temp);
    }
    return arr;
  }

  function hold(id) {
    setDiceValues((x) => {
      return x.map((y) => (y.id === id ? { ...y, isHeld: !y.isHeld } : y));
    });
  }

  const dieElement = diceValues.map((x) => (
    <Die value={x.value} key={x.key} isHeld={x.isHeld} hold={hold} id={x.key} />
  ));

  const buttonRef = useRef(null);

  useEffect(() => {
    if (gameWon) {
      buttonRef.current.focus();
    }
  }, [gameWon]);

  return (
    <main>
      {gameWon && <Confetti />}
      <h1 className="title">Tenzies</h1>
      <p className="instructions">
        Roll until all dice are the same. Click each die to freeze it at its
        current value between rolls.
      </p>
      <div id="container">{dieElement}</div>
      <button ref={buttonRef} className="roll" onClick={rollDice}>
        {gameWon ? "NEW GAME" : "ROLL"}
      </button>
    </main>
  );
}
