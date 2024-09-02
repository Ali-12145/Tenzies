import React from "react";
import Die from "./Die";
import { nanoid } from "nanoid";
import Confetti from "react-confetti/dist/types/Confetti";
export default function App() {
    const [diceState, setDiceState] = React.useState(allNewDice());
    const [win, setWin] = React.useState(false)
    React.useEffect(() => {
        const value = diceState[0].value
        const isHeldTrue = diceState.every(dice => dice.isHeld)
        const sameValue = diceState.every(dice => dice.value === value)
        if (sameValue && isHeldTrue) {
            setWin(true)
            console.log("U won")
        }
    },[diceState])
    function allNewDice() {
        const diceArr = [];

        for (let i = 0; i < 10; i++) {
            diceArr.push({
                value: Math.ceil(Math.random() * 6),
                isHeld: false,
                id: nanoid(),
            });
        }
        return diceArr;
    }
    function holdDice(Id) {
        setDiceState(
            diceState.map((die) => {
                if (die.id === Id)
                    return {
                        ...die,
                        isHeld: !die.isHeld,
                    };
                else
                    return {
                        ...die,
                    };
            })
        );
    }
    function generateNewDie() {
        return {
            value: Math.ceil(Math.random() * 6),
            id: nanoid(),
            isHeld: false,
        };
    }

    function rollDice() {
        if (win) {
            setWin(false)
            setDiceState(allNewDice()) 
        } else {
            setDiceState((oldDice) =>
                oldDice.map((die) => {
                    return die.isHeld ? die : generateNewDie();
                })
            )
            
        }        
    }

    const diceElements = diceState.map((die) => (
        <Die
            key={die.id}
            value={die.value}
            isHeld={die.isHeld}
            holdDice={() => holdDice(die.id)}
        />
    ));
    return (
        <main>
            { win && <Confetti/>}
            <h1 className="title">Tenzies</h1>
            <p className="instructions">
                Roll until all dice are the same. Click each die to freeze it at its
                current value between rolls.
            </p>
            <div className="container">{diceElements}</div>
            <div>
                <button onClick={rollDice} className="roll-btn">
                    {win ?"Reset Game": "Roll"}
                </button>
            </div>
        </main>
    );
}
