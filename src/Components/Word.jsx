import React, { useEffect, useRef, useState } from "react";
import Letter from "./Letter";

const Word = ({ letters, index, wordCount }) => {
  const [isCorrect, setIsCorrect] = useState(true);

  return (
    <span
      className="word"
      style={isCorrect ? { color: "green" } : { color: "red" }}
    >
      <div
        className="colorBg"
        style={
          isCorrect ? { backgroundColor: "gray" } : { backgroundColor: "red" }
        }
        hidden={wordCount !== index}
      ></div>
      {letters?.split("")?.map((letter) => {
        return <Letter isCorrect={isCorrect} letter={letter} />;
      })}
    </span>
  );
};

export default Word;
