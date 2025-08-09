import React, { useState, useEffect } from "react";

const Timer = ({
  initialTime = { days: 3, hours: 23, minutes: 19, seconds: 56 },
  onTimerEnd = null,
  autoReset = false,
  resetTime = null,
  className = "",
}) => {
  const [timeLeft, setTimeLeft] = useState(initialTime);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        let { days, hours, minutes, seconds } = prev;

        if (seconds > 0) {
          seconds--;
        } else if (minutes > 0) {
          minutes--;
          seconds = 59;
        } else if (hours > 0) {
          hours--;
          minutes = 59;
          seconds = 59;
        } else if (days > 0) {
          days--;
          hours = 23;
          minutes = 59;
          seconds = 59;
        } else {
          // Timer reached 0
          if (onTimerEnd) {
            onTimerEnd();
          }

          //   if (autoReset) {
          //     return resetTime || initialTime;
          //   }

          return { days: 0, hours: 0, minutes: 0, seconds: 0 };
        }

        return { days, hours, minutes, seconds };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [initialTime, onTimerEnd, autoReset, resetTime]);

  const formatTime = (time) => time.toString().padStart(2, "0");

  return (
    <div className={`flex items-center gap-4 ${className}`}>
      <div className="text-center">
        <div className="text-xs text-gray-600 mb-1">Days</div>
        <div className="text-3xl font-bold">{formatTime(timeLeft.days)}</div>
      </div>
      <div className="text-[#DB4444] text-2xl font-bold">:</div>

      <div className="text-center">
        <div className="text-xs text-gray-600 mb-1">Hours</div>
        <div className="text-3xl font-bold">{formatTime(timeLeft.hours)}</div>
      </div>
      <div className="text-[#DB4444] text-2xl font-bold">:</div>
      <div className="text-center">
        <div className="text-xs text-gray-600 mb-1">Minutes</div>
        <div className="text-3xl font-bold">{formatTime(timeLeft.minutes)}</div>
      </div>
      <div className="text-[#DB4444] text-2xl font-bold">:</div>
      <div className="text-center">
        <div className="text-xs text-gray-600 mb-1">Seconds</div>
        <div className="text-3xl font-bold">{formatTime(timeLeft.seconds)}</div>
      </div>
    </div>
  );
};

export default Timer;
