import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Mousewheel, Keyboard } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./styles.scss";

const SliderContent = () => {
  const slidesData = [
    {
      bgStyles: "slide-1",
      header: "Бесплатная парковка",
      info: "Оставляйте машину на платных городских парковках и разрешенных местах, не нарушая ПДД, а также в аэропортах.",
      btnStyles: "button_green",
      btnActionName: "Подробнее",
    },
    {
      bgStyles: "slide-2",
      header: "Страховка",
      info: "Полная страховка страховка автомобиля",
      btnStyles: "button_blue",
      btnActionName: "Подробнее",
    },
    {
      bgStyles: "slide-3",
      header: "Бензин",
      info: "Полный бак на любой заправке города за наш счёт",
      btnStyles: "button_orange",
      btnActionName: "Подробнее",
    },
    {
      bgStyles: "slide-4",
      header: "Обслуживание",
      info: "Автомобиль проходит еженедельное ТО",
      btnStyles: "button_purple",
      btnActionName: "Подробнее",
    },
  ];

  const slides = slidesData.map((item) => {
    return (
      <SwiperSlide>
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
