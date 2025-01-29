import { useState } from "react";
import "../src/Char.css";

function Char(props) {
  const { char, isCorrect } = props;

  return <span className={`char ${isCorrect}`}>{char}</span>;
}

export default Char;
