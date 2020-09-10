import { useState } from 'react';

const useVisualMode = (initalMode) => {
  const [history, setHistory] = useState([initalMode]);

  function transition(newMode, replaceCheck) {
    if (replaceCheck) {
      setHistory(([_, ...history]) => [newMode, ...history]);
    } else {
      setHistory((history) => [newMode, ...history]);
    }
  }

  function back() {
    if (history.length > 1) {
      setHistory(([_, ...history]) => history);
    }
  }

  return { mode: history[0], transition, back };
};

export default useVisualMode;
