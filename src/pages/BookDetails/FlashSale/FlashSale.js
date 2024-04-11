import { faClockFour } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState, useEffect } from "react";
import images from "~/assets/images";
import { useCountdown } from "~/hooks/useCountDown";

function FlashSale({ discounts }) {
  const startDate = discounts?.map((discount) => discount?.startDate);
  const endDate = discounts?.map((discount) => discount?.endDate);
  const [timeLeftDays, timeLeftHours, timeLeftMinutes, timeLeftSeconds] =
    useCountdown(startDate, endDate);
  const [saleEnded, setSaleEnded] = useState(false);

  useEffect(() => {
    if (new Date() > new Date(endDate)) {
      setSaleEnded(true);
    }
  }, [endDate]);

  if (saleEnded) {
    return (
      <div className="mt-2 w-auto bg-[#FDE1DF] flex items-center justiy-center rounded-md">
        <img src={images.FlashSale} alt="book" />
        <div className="text-xl text-gray-500 ml-4">
          Thời gian ưu đãi đã kết thúc.
        </div>
      </div>
    );
  }

  return (
    <div className="mt-2 w-auto bg-[#FDE1DF] flex rounded-md">
      <img src={images.FlashSale} alt="book" />
      {new Date() < new Date(startDate) ? (
        <div className="grid grid-cols-2 gap-4 text-3xl ml-4 flex justify-center">
          <label className="text-center text-base text-gray-500 flex items-center justify-center">
            <FontAwesomeIcon
              icon={faClockFour}
              color="text-gray-500"
              className="mr-2 w-5 h-6"
            />
            Bắt đầu từ:
          </label>
          <div className="flex items-center justify-center text-lg text-gray-500">
            {" "}
            {new Date(startDate).toLocaleString()}
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4 text-3xl ml-4 flex justify-center">
          <label className="text-center text-base text-gray-500 flex items-center justify-center">
            <FontAwesomeIcon
              icon={faClockFour}
              color="text-gray-500"
              className="mr-2 w-5 h-6"
            />
            Kết thúc trong:
          </label>
          <div className="flex items-center justify-center">
            <div className="text-xl w-6 h-6 bg-gray-100 text-center flex items-center justify-center">
              {timeLeftDays}
            </div>
            <span className="text-xs mr-1 ml-1">:</span>
            <div className="text-xl w-6 h-6 bg-gray-100 text-center flex items-center justify-center">
              {timeLeftHours}
            </div>
            <span className="text-xs ml-1 mr-1">:</span>
            <div className="text-xl w-6 h-6 bg-gray-100 text-center flex items-center justify-center">
              {timeLeftMinutes}
            </div>
            <span className="text-xs ml-1 mr-1">:</span>
            <div className="text-xl w-6 h-6 bg-gray-100 text-center flex items-center justify-center">
              {timeLeftSeconds}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default FlashSale;
