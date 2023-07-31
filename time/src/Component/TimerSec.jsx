const TimerSec = ({ hour, minute, second, getInputBox }) => {
  return (
    <div className="timer-sec" onClick={getInputBox}>
      <span>{hour} : </span>
      <span>{minute} : </span>
      <span>{second}</span>
    </div>
  );
};

export { TimerSec };
