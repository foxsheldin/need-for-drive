import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Mousewheel, Keyboard } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./styles.scss";

const SliderContent = () => {
  return (
    <section className="slider-container">
      <div className="slider__item slide-1">
        <div className="slider__discribe">
          <div className="slider__wrapper">
            <div className="slider__header">Бесплатная парковка</div>
            <div className="slider__info">
              Оставляйте машину на платных городских парковках и разрешенных
              местах, не нарушая ПДД, а также в аэропортах.
            </div>
            <div className="slider__action">
              <a href="#" className="button slider__button button_blue">
                Подробнее
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SliderContent;
