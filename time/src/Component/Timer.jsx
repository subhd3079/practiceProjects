import { TimerSec } from "./TimerSec";
import { InputSec } from "./InputSec";
import { useEffect, useRef, useState } from "react";

const Timer = () => {
  const [hour, setHour] = useState(0);
  const [minute, setMinute] = useState(0);
  const [second, setSecond] = useState(0);
  const [hide, setHide] = useState(true);
  const intervalRef = useRef(null);

  const getHour = (event) => {
    if (event.target.value === "") setHour(0);
    else setHour(event.target.value);
  };

  const getMinute = (event) => {
    if (event.target.value === "") setMinute(0);
    else setMinute(event.target.value);
  };

  const getSecond = (event) => {
    if (event.target.value === "") setSecond(0);
    else setSecond(event.target.value);
  };

  const handleStart = () => {
    if (second === 0 && minute === 0 && hour === 0) return;

    if ((minute > 0 || hour > 0) && second === 0) {
      setSecond(59);
      setMinute((preMinute) => preMinute - 1);
    }

    if (intervalRef.current !== null) return;
    intervalRef.current = setInterval(() => {
      setSecond((preSecond) => preSecond - 1);
    }, 1000);

    setHide(true);
  };

  const handleStop = () => {
    clearInterval(intervalRef.current);
    intervalRef.current = null;
  };

  const handleReset = () => {
    handleStop();
    setSecond(0);
    setMinute(0);
    setHour(0);
  };

  useEffect(() => {
    if (second === 0 && minute === 0 && hour === 0) return;

    if (minute === 0 && hour > 0) setMinute(60);

    if (second === 0 && minute > 0) {
      setMinute((preMinute) => preMinute - 1);
      setSecond(59);
    } else if (minute === 0 && hour === 0) {
      setSecond(0);
      handleStop();
    }
  }, [second]);

  useEffect(() => {
    if (second === 0 && minute === 0 && hour === 0) return;

    if (minute === 0 && hour > 0) {
      setHour((preHour) => preHour - 1);
      setMinute(59);
    }
  }, [minute]);

  const getInputBox = () => {
    setHide(false);
  };

  return (
    <div className="timer">
      {hide ? (
        <TimerSec
          hour={hour}
          minute={minute}
          second={second}
          getInputBox={getInputBox}
        />
      ) : (
        <InputSec
          getHour={getHour}
          getMinute={getMinute}
          getSecond={getSecond}
        />
      )}

      <div>
        <button onClick={handleStart}>Start</button>
        <button onClick={handleStop}>Stop</button>
        <button onClick={handleReset}>Reset</button>
      </div>
    </div>
  );
};

export { Timer };
