import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import images from "~/assets/images";

const fakeimages = [
  "https://pibook.vn/upload/banner/truy%E1%BB%87n%20tranh%20tu%E1%BA%A7n.png",
  "https://pibook.vn/upload/banner/banner%20t%E1%BA%BFt.png",
  images.Banner,
  // Add more images here
];

const Banner = () => {
  const Arrow = (props) => {
    let className = props.type === "next" ? "nextArrow" : "prevArrow";
    className += " absolute z-10  top-1/2 -mt-6 bg-transparent p-5 ";
    className += props.type === "next" ? " right-2" : " left-2";
    const icon = props.type === "next" ? faAngleRight : faAngleLeft;

    return (
      <span className={className} onClick={props.onClick}>
        <FontAwesomeIcon icon={icon} size="2x" color="white" />
      </span>
    );
  };

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    nextArrow: <Arrow type="next" />,
    prevArrow: <Arrow type="prev" />,
  };

  return (
    <div className="container w-10/12 inline-block h-1/4 sm:h-1/3 md:h-1/2 lg:h-2/4 xl:h-3/4">
      <Slider {...settings}>
        {fakeimages.map((img, idx) => (
          <div
            key={idx}
            className="w-full h-full hover:scale-105 transition-transform duration-200 ease-out"
          >
            <div
              className="w-auto h-full bg-center bg-cover bg-no-repeat shadow-lg"
              style={{ backgroundImage: `url(${img})`, height: "500px" }}
            >
              <div className="w-full h-full bg-opacity-50 flex items-center justify-center text-gray-100 text-center">
                <h1 className="text-sm sm:text-lg md:text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl font-semibold">
                  {img.caption}
                </h1>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
    // <div class="relative flex items-center justify-center h-screen mb-12 overflow-hidden">
    //   <video
    //     autoplay
    //     loop
    //     muted
    //     class="absolute z-10 w-auto min-w-full min-h-full max-w-none"
    //   >
    //     <source
    //       src="https://mostly-books.co.uk/wp-content/uploads/2023/04/mb_loop_fade.m4v-Original.mp4"
    //       type="video/mp4"
    //     />
    //     Your browser does not support the video tag.
    //   </video>
    // </div>
  );
};

export default Banner;
