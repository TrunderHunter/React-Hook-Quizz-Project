import React, { useState, useEffect } from "react";

const CountdownTimer = ({ initialMinutes = 1, handleFinish }) => {
  const [hours, setHours] = useState(Math.floor(initialMinutes / 60));
  const [minutes, setMinutes] = useState(initialMinutes % 60);
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      } else {
        if (minutes === 0 && hours === 0) {
          clearInterval(timer);
          handleFinish();
        } else {
          if (minutes === 0) {
            setHours(hours - 1);
            setMinutes(59);
            setSeconds(59);
          } else {
            setMinutes(minutes - 1);
            setSeconds(59);
          }
        }
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [hours, minutes, seconds]);

  return (
    <div className="timer">
      <span>
        {String(hours).padStart(2, "0")}:{String(minutes).padStart(2, "0")}:
        {String(seconds).padStart(2, "0")}
      </span>
    </div>
  );
};

export default CountdownTimer;
