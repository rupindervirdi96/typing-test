import React, { useEffect, useState } from "react";

function Input({ words, runCheck, currentIndex, setWordCount }) {
  const [text, setText] = useState();

  useEffect(() => {
    runCheck();
  }, [text, runCheck]);

  const checkWord = (e) => {
    e.preventDefault();
    setText("");
    setWordCount(currentIndex + 1);
  };

  return (
    <div>
      <form action="" onSubmit={(e) => checkWord(e)}>
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </form>
    </div>
  );
}

export default Input;
