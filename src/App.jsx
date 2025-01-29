import { useEffect, useState } from "react";
import "./App.css";
import Char from "./Char";

function App() {
  const [textList, setTextList] = useState([
    "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequuntur iusto unde culpa, quaerat assumenda cumque ducimus illo dolorem repudiandae eos quisquam qui praesentium corporis quam, cupiditate doloribus non est debitis quos aliquam, delectus natus. Ullam iure fugit eaque, aliquam earum neque? Totam ipsum est aliquam. Assumenda nisi, minima est consequatur odit nihil dolorem et doloremque expedita tenetur quam architecto aperiam?",
  ]);
  const [textArray, setTextArray] = useState([]);
  const [charCounter, setCharCounter] = useState(0);

  useEffect(() => {
    const initialTextArray = textList[0].split("").map((element, key) => ({
      id: key,
      key: element,
      isCorrect: "neutral",
      ascii: element.charCodeAt(0),
    }));
    setTextArray(initialTextArray);
  }, []);

  useEffect(() => {
    const handleKeyUp = (e) => {
      console.log(textArray);
      // ASCII key mappings:
      // 8: Backspace
      // 16: Shift
      // 17: Ctrl
      // 18: Alt
      // 20: Caps Lock
      // 32: Space
      // 48-57: Numbers 0-9
      // 65-90: Letters A-Z
      // 186: Semicolon
      // 187: Equal sign
      // 188: Comma
      // 189: Dash
      // 190: Period
      // 191: Forward slash
      // 192: Back tick
      // 219: Open bracket
      // 220: Back slash
      // 221: Close bracket
      // 222: Single quote
      // "Backspace", "Shift", "Ctrl", "Alt", Caps Lock
      const allowedASCII = [
        17, 18, 20, 32, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 65, 66, 67, 68,
        69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86,
        87, 88, 89, 90, 97, 98, 99, 100, 101, 102, 103, 104, 105, 106, 107, 108,
        109, 110, 111, 112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122,
        186, 187, 188, 189, 190, 191, 192, 219, 220, 221, 222,
      ];

      if (e.key.length === 1 && allowedASCII.includes(e.key.charCodeAt(0))) {
        console.log(e.key.charCodeAt(0));
        console.log(e.key);
        setCharCounter((prev) => prev + 1);
        if (e.key.charCodeAt(0) === textArray[charCounter]?.ascii) {
          if (textArray[charCounter]) {
            const newTextArray = [...textArray];
            newTextArray[charCounter].isCorrect = "correct";
            setTextArray(newTextArray);
          }
        } else {
          if (textArray[charCounter]) {
            const newTextArray = [...textArray];
            newTextArray[charCounter].isCorrect = "incorrect";
            setTextArray(newTextArray);
          }
        }
      }
      if (e.key === "Backspace") {
        if (textArray[charCounter - 1]) {
          const newTextArray = [...textArray];
          newTextArray[charCounter - 1].isCorrect = "neutral";
          setTextArray(newTextArray);
        }
        setCharCounter((prev) => prev !== 0 && prev - 1);
      }
    };

    window.addEventListener("keyup", handleKeyUp);
    return () => window.removeEventListener("keyup", handleKeyUp);
  }, [textArray, charCounter]);

  return (
    <div className="App">
      <div className="text-display">
        {textArray.map((char, key) => (
          <Char isCorrect={char.isCorrect} char={char.key} key={key} />
        ))}
      </div>
    </div>
  );
}

export default App;
