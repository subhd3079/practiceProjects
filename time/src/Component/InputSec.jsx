const InputSec = ({ getSecond, getMinute, getHour }) => {
  return (
    <div className="input-sec">
      <input type="number" name="hour" onChange={getHour} />
      <input type="number" name="minute" onChange={getMinute} />
      <input type="number" name="second" onChange={getSecond} />
    </div>
  );
};

export { InputSec };
