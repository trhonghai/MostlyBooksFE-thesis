import { useEffect, useState } from "react";

const useCountdown = (startDate, endDate) => {
  const countDownStartDate = new Date(startDate).getTime();
  const countDownEndDate = new Date(endDate).getTime();

  const [countDown, setCountDown] = useState(
    countDownEndDate - new Date().getTime()
  );

  useEffect(() => {
    const now = new Date().getTime();

    // Chỉ bắt đầu đếm ngược nếu đã tới ngày bắt đầu
    if (now >= countDownStartDate) {
      const interval = setInterval(() => {
        setCountDown(countDownEndDate - new Date().getTime());
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [countDownStartDate, countDownEndDate]);

  return getReturnValues(countDown);
};

const getReturnValues = (countDown) => {
  // calculate time left
  const days = Math.floor(countDown / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (countDown % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((countDown % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((countDown % (1000 * 60)) / 1000);

  return [days, hours, minutes, seconds];
};

export { useCountdown };
