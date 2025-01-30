import { useEffect, useRef, useState } from "react";
import "./App.css";
import Char from "./Char";
import { paragraphs } from "./data";

function App() {
  const [textList, setTextList] = useState(paragraphs);
  const [textArray, setTextArray] = useState([]);
  const [charCounter, setCharCounter] = useState(0);
  const [changeParagraph, setChangeParagraph] = useState(0);

  const [timeLeft, setTimeLeft] = useState(60);
  const timerRef = useRef(null); // Use a ref to store the timer ID

  const startTimer = () => {
    // Prevent starting the timer multiple times
    if (timerRef.current) return; // If the timer is already running, do nothing

    timerRef.current = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 0) {
          clearInterval(timerRef.current);
          timerRef.current = null; // Reset the timer reference after clearing
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);
  };

  useEffect(() => {
    const initialTextArray = textList[changeParagraph]
      ?.split("")
      ?.map((element, key) => ({
        id: key,
        key: element,
        isCorrect: "neutral",
        ascii: element.charCodeAt(0),
      }));
    setTextArray(initialTextArray);
  }, [changeParagraph]);

  const resetGame = () => {};

  useEffect(() => {
    const handleKeyUp = (e) => {
      startTimer();
      // ASCII key mappings:
      // 8: Backspace
      // 16: Shift
      // 17: Ctrl
      // 18: Alt
      // 20: Caps Lock
      // 32: Space
      // 48-57: Numbers 0-9
      // 65-90: Letters A-Z
      // 186: "Semicolon"
      // 187: "Equal sign"
      // 188: "Comma"
      // 189: "Dash"
      // 190: "Period"
      // 191: "Forward slash"
      // 192: "Back tick"
      // 219: "Open bracket"
      // 220: "Back slash"
      // 221: "Close bracket"
      // 222: "Single quote"
      // "Backspace", "Shift", "Ctrl", "Alt", Caps Lock
      const allowedASCII = [
        17, 18, 20, 32, 44, 46, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 65, 66,
        67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84,
        85, 86, 87, 88, 89, 90, 97, 98, 99, 100, 101, 102, 103, 104, 105, 106,
        107, 108, 109, 110, 111, 112, 113, 114, 115, 116, 117, 118, 119, 120,
        121, 122, 186, 187, 188, 189, 190, 191, 192, 219, 220, 221, 222,
      ];
      const allowedKeys = ["Semicolon", "Comma", "Dash", "Period"];

      if (
        (e.key.length === 1 || allowedKeys.includes(e.key)) &&
        allowedASCII.includes(e.key.charCodeAt(0))
      ) {
        setCharCounter((prev) => prev + 1);
        if (
          e.key.charCodeAt(0) === textArray[charCounter]?.ascii &&
          textArray[charCounter]
        ) {
          const newTextArray = [...textArray];
          newTextArray[charCounter].isCorrect = "correct";
          setTextArray(newTextArray);
        } else if (textArray[charCounter]) {
          const newTextArray = [...textArray];
          newTextArray[charCounter].isCorrect = "incorrect";
          setTextArray(newTextArray);
        }
      }
      if (e.key === "Backspace" && textArray[charCounter - 1]) {
        const newTextArray = [...textArray];
        newTextArray[charCounter - 1].isCorrect = "neutral";
        setTextArray(newTextArray);
        setCharCounter((prev) => prev !== 0 && prev - 1);
      }
    };

    window.addEventListener("keyup", handleKeyUp);
    return () => window.removeEventListener("keyup", handleKeyUp);
  }, [textArray, charCounter]);

  return (
    <div className="App">
      <div className="text-display">
        <span>start typing...</span>
        <div>
          {textArray.map((char, key) => (
            <Char isCorrect={char.isCorrect} char={char.key} key={key} />
          ))}
        </div>
      </div>
      <div className="panel">
        <button
          onClick={() => {
            setChangeParagraph(Math.floor(Math.random() * 5));
            clearInterval(timerRef.current);
            timerRef.current = null;
            setTimeLeft(60);
          }}
        >
          Change
        </button>
        <span className="time-left">{timeLeft}</span>
      </div>
    </div>
  );
}

export default App;
