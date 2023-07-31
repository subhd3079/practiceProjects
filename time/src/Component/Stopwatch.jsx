import { useEffect, useRef, useState } from "react";

const Stopwatch = () => {
  const [minute, setMinute] = useState(0);
  const [second, setSecond] = useState(0);
  const [milisecond, setMilisecond] = useState(0);
  const intervalRef = useRef(null);

  // strting the interval, straing the milisecond
  const startInterval = () => {
    if (intervalRef.current !== null) return;
    intervalRef.current = setInterval(() => {
      setMilisecond((preMilisecond) => preMilisecond + 1);
    }, 10);
  };

  // increasing the second
  useEffect(() => {
    if (milisecond === 100) {
      setSecond((preSecond) => preSecond + 1);
      setMilisecond(0);
    }
  }, [milisecond]);

  // increasing the minute
  useEffect(() => {
    if (second !== 0 && second % 60 === 0) {
      setMinute((preMinute) => preMinute + 1);
    }
  }, [second]);

  // click on start butotn
  const handleStart = () => {
    startInterval();
  };

  // click on stop button
  const handleStop = () => {
    clearInterval(intervalRef.current);
    intervalRef.current = null;
  };

  // click on reset button
  const handleReset = () => {
    handleStop();
    setMilisecond(0);
    setSecond(0);
    setMinute(0);
  };

  return (
    <div className="stopwatch">
      <div>
        <span>{minute} : </span>
        <span>{second} : </span>
        <span>{milisecond}</span>
      </div>
      <div className="button-sec">
        <button onClick={handleStart}>Start</button>
        <button onClick={handleStop}>Stop</button>
        <button onClick={handleReset}>Reset</button>
      </div>
    </div>
  );
};

export { Stopwatch };
