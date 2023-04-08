import React, { useRef } from "react";

function Letter({ letter, isCorrect }) {
  const currentLetterRef = useRef();
  return <span ref={currentLetterRef}>{letter}</span>;
}

export default Letter;
