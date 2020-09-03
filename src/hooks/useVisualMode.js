import React, { useState } from 'react';

const useVisualMode = (initalMode) => {
  const [mode, setMode] = useState(initalMode);
  const [history, setHistory] = useState([initalMode]);

  function transition(newMode, replaceCheck) {
    
    if (replaceCheck) {
      setMode(newMode);
      history[history.length - 1] = newMode;
    } else {
      setMode(newMode);
      setHistory([...history, newMode]);
    }
  }

  function back() {
    if (history.length > 1) {
      history.pop();
      setMode(history[history.length - 1]);
    }
  }

  return { mode, transition, back };
};

export default useVisualMode;
