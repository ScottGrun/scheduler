import { useState } from 'react';

const useVisualMode = (initalMode) => {
  //const [mode, setMode] = useState(initalMode);
  const [history, setHistory] = useState([initalMode]);

  function transition(newMode, replaceCheck) {
    if (replaceCheck) {
      // setMode(newMode);
      // history[history.length - 1] = newMode;
      setHistory(([_, ...history]) => [newMode, ...history]);
    } else {
      // setMode(newMode);
      // setHistory([...history, newMode]);
      setHistory((history) => [newMode, ...history]);
    }
  }

  function back() {
    if (history.length > 1) {
      // history.pop();
      // setMode(history[history.length - 1]);
      setHistory(([_, ...history]) => history);
    }
  }

  return { mode: history[0], transition, back };
};

export default useVisualMode;
