import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Mousewheel, Keyboard } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./styles.scss";

const SliderContent = () => {
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
      <SwiperSlide>
        <div className="slider__item slide-1">
          <div className="slider__discribe">
            <div className="slider__wrapper">
              <div className="slider__header">Бесплатная парковка</div>
              <div className="slider__info">
                Оставляйте машину на платных городских парковках и разрешенных
                местах, не нарушая ПДД, а также в аэропортах.
              </div>
              <div className="slider__action">
                <a href="#" className="button slider__button button_green">
                  Подробнее
                </a>
              </div>
            </div>
          </div>
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="slider__item slide-2">
          <div className="slider__discribe">
            <div className="slider__wrapper">
              <div className="slider__header">Страховка</div>
              <div className="slider__info">
                Полная страховка страховка автомобиля
              </div>
              <div className="slider__action">
                <a href="#" className="button slider__button button_blue">
                  Подробнее
                </a>
              </div>
            </div>
          </div>
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="slider__item slide-3">
          <div className="slider__discribe">
            <div className="slider__wrapper">
              <div className="slider__header">Бензин</div>
              <div className="slider__info">
                Полный бак на любой заправке города за наш счёт
              </div>
              <div className="slider__action">
                <a href="#" className="button slider__button button_orange">
                  Подробнее
                </a>
              </div>
            </div>
          </div>
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="slider__item slide-4">
          <div className="slider__discribe">
            <div className="slider__wrapper">
              <div className="slider__header">Обслуживание</div>
              <div className="slider__info">
                Автомобиль проходит еженедельное ТО
              </div>
              <div className="slider__action">
                <a href="#" className="button slider__button button_purple">
                  Подробнее
                </a>
              </div>
            </div>
          </div>
        </div>
      </SwiperSlide>
    </Swiper>
  );
};

export default SliderContent;
