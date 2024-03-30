import { useEffect, useState } from "react";

const useTimeUntilFlashSale = (startDate) => {
  const [timeUntilStart, setTimeUntilStart] = useState(0);

  useEffect(() => {
    const now = new Date().getTime();
    const startDateTime = new Date(startDate).getTime();
    const timeLeft = startDateTime - now;

    const interval = setInterval(() => {
      const currentTime = new Date().getTime();
      const timeLeft = startDateTime - currentTime;
      setTimeUntilStart(timeLeft > 0 ? timeLeft : 0);
    }, 1000);

    return () => clearInterval(interval);
  }, [startDate]);

  return timeUntilStart;
};

export default useTimeUntilFlashSale;
