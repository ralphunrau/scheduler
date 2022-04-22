import { useState } from "react";

function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  function transition(newMode, replace = false) {
    if (replace) {
      setMode(newMode);
    } else {
      setMode(newMode);
      history.push(newMode);
    }
  }

  function back() {
    if (history.length > 0) {
      history.pop();
      setMode(history[history.length - 1]);
    }
  }

  return {
    mode,
    transition,
    back
  }
}

export default useVisualMode;