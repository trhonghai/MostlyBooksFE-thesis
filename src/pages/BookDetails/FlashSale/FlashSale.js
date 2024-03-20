import { faWatchmanMonitoring } from "@fortawesome/free-brands-svg-icons";
import { faClockFour } from "@fortawesome/free-regular-svg-icons";
import { faClock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import moment from "moment";
import { useEffect } from "react";
import { useState } from "react";
import { FaClock } from "react-icons/fa";
import images from "~/assets/images";

function FlashSale() {
  const [timeLeft, setTimeLeft] = useState("");

  useEffect(() => {
    const endTime = moment().add(3, "days").toDate(); // Example: 3 days from now
    const interval = setInterval(() => {
      const now = moment();
      const end = moment(endTime);
      const duration = moment.duration(end.diff(now));

      const hours = duration.hours();
      const minutes = duration.minutes();
      const seconds = duration.seconds();

      setTimeLeft(`${hours} : ${minutes} : ${seconds}`);

      if (duration.asSeconds() <= 0) {
        clearInterval(interval);
        setTimeLeft("Sale has ended!");
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);
  return (
    <div className=" mt-2 w-auto bg-[#FDE1DF] flex  rounded-md">
      <img src={images.FlashSale} />
      {/* <div className="ml-12 text-sm flex items-center">
        Kết thúc trong: {timeLeft}
      </div> */}
      <div className="grid grid-cols-2 gap-4 text-3xl ml-4 flex  justify-center">
        <label className="text-center text-base text-gray-500 flex items-center justify-center">
          <FontAwesomeIcon
            icon={faClockFour}
            color="text-gray-500"
            className="mr-2 w-5 h-6"
          />
          Kết thúc trong:
        </label>
        <div className="flex items-center justify-center">
          <div className="text-xl  w-6 h-6 bg-gray-100  text-center flex items-center justify-center">
            {timeLeft.split(":")[0]}
          </div>
          <span className="text-xs mr-1 ml-1">:</span>
          <div className="text-xl w-6  h-6 bg-gray-100 text-center flex items-center justify-center">
            {timeLeft.split(":")[1]}
          </div>
          <span className="text-xs ml-1 mr-1">:</span>
          <div className="text-xl  w-6 h-6 bg-gray-100 text-center flex items-center justify-center">
            {timeLeft.split(":")[2]}
          </div>
        </div>
      </div>
    </div>
  );
}

export default FlashSale;
