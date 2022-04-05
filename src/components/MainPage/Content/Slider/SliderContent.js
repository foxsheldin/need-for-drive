import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Mousewheel, Keyboard } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./styles.scss";
import { slidesData } from "./constants";

const SliderContent = () => {
  const slides = slidesData.map((item, index) => {
    return (
      <SwiperSlide key={index}>
        <div className={"slider__item " + item.bgStyles}>
          <div className="slider__discribe">
            <div className="slider__wrapper">
              <div className="slider__header">{item.header}</div>
              <div className="slider__info">{item.info}</div>
              <div className="slider__action">
                <a
                  href="#"
                  className={"button slider__button " + item.btnStyles}
                >
                  {item.btnActionName}
                </a>
              </div>
            </div>
          </div>
        </div>
      </SwiperSlide>
    );
  });

  return (
    <Swiper
      cssMode={true}
      navigation={true}
      pagination={{
        clickable: true,
      }}
      loop={true}
      mousewheel={true}
      keyboard={true}
      modules={[Navigation, Pagination, Mousewheel, Keyboard]}
      className="mySwiper"
    >
      {slides}
    </Swiper>
  );
};

export default SliderContent;
