import { useEffect, useState } from "react";
import "./App.css";
import Input from "./Components/Input";
import Word from "./Components/Word.jsx";

function App() {
  const words = ["lorem", "ipsum", "tispum","lorem", "ipsum", "tispum","lorem", "ipsum", "tispum","lorem", "ipsum", "tispum","lorem", "ipsum", "tispum","lorem", "ipsum", "tispum","lorem", "ipsum", "tispum"];

  const [wordCount, setWordCount] = useState(0);

  // useEffect(()=>{
  //   console.log(wordCount);
  // }, [wordCount])

  const runCheck = () => {};

  return (
    <div className="container">
      <div className="words">
        {words?.map((word, i) => (
          <Word letters={word} index={i} wordCount={wordCount} />
        ))}
      </div>
      <Input
        words={words}
        runCheck={() => runCheck}
        setWordCount={setWordCount}
        currentIndex={wordCount}
      />
    </div>
  );
}

export default App;

/* 
1. enter a key match if it is a substring of original word. 
2. 
*/
