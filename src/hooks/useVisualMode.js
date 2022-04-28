import { useState } from "react";

function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  //SHOWS A NEW PROCESS WHEN USER ADDS, DELETES, SAVES
  function transition(newMode, replace = false) {
    if (replace) {
      setHistory(prev => prev.slice(0, -1));
      setHistory(prev => [...prev, newMode]);
    } else {
      setHistory(prev => [...prev, newMode]);
    }
    setMode(newMode);
  };

  //RETURNS THE USER TO THE PREVIOUSLY VIEWED PROCESS
  function back() {
    if (history.length > 0) {
      setHistory(history.slice(0, -1));
      setMode(history[history.length - 2]);
    }
  };

  return {
    mode,
    transition,
    back
  };
}

export default useVisualMode;