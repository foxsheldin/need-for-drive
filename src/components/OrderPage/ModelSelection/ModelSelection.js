import React, { useEffect, useState } from "react";
import "./styles.scss";
import plugImage from "../../../assets/images/plugImage.jpg";
import Preloader from "../../common/Preloader/Preloader";
import ReactPaginate from "react-paginate";
import { useDispatch, useSelector } from "react-redux";
import {
  getCars,
  getCategories,
  setCurrentOffset,
  setSelectedCar,
  setSelectedCategoryCars,
} from "../../../redux/orderSlice";

const ModelSelection = () => {
  const dispatch = useDispatch();
  const {
    carsData,
    categoriesData,
    currentOffset,
    totalCars,
    limitLoadingCars,
    selectedCar,
    selectedCategoryCars,
    isLoading,
  } = useSelector((state) => state.order);
  const [carsItems, setCarsItems] = useState([]);
  const [categoriesItems, setCategories] = useState([]);
  const [currentCar, setCurrentCar] = useState(selectedCar?.id ?? null);
  const [currentPage, setCurrentPage] = useState(-1);
  const [pageCount, setPageCount] = useState(0);

  useEffect(() => {
    dispatch(getCars({ offset: currentOffset, limit: limitLoadingCars }));
    dispatch(getCategories());
  }, []);

  useEffect(() => {
    setCarsItems(carsData);
    if (carsData !== null) handleSetPaginate();
  }, [carsData]);

  useEffect(() => {
    setCategories(categoriesData);
  }, [categoriesData]);

  useEffect(() => {
    setCurrentCar(selectedCar?.id);
  }, [selectedCar]);

  useEffect(() => {
    handleSetPaginate();
  }, [currentOffset, limitLoadingCars]);

  useEffect(() => {
    dispatch(getCars({ offset: currentOffset, limit: limitLoadingCars }));
  }, [selectedCategoryCars]);

  const handleSetPaginate = () => {
    setCurrentPage(Math.ceil(currentOffset / limitLoadingCars));
    setPageCount(Math.ceil(totalCars / limitLoadingCars));
  };

  const handlePageClick = (evt) => {
    const offset = evt.selected * limitLoadingCars;
    dispatch(getCars({ offset, limit: limitLoadingCars }));
    dispatch(setCurrentOffset(offset));
  };

  const handleSetSelectedCar = (car) => {
    dispatch(setSelectedCar(car));
  };

  const handleSetCategory = (category) => {
    dispatch(setSelectedCategoryCars(category));
    dispatch(setCurrentOffset(0));
  };

  return (
    <>
      <div className="category">
        <ul className="radio-list">
          {categoriesItems?.map((category) => (
            <li className="radio-list__item" key={category.id}>
              <input
                type="radio"
                className="visually-hidden radiobutton"
                name="categoryCar"
                value={category.name}
                id={category.name}
                onClick={() => handleSetCategory(category)}
                defaultChecked={
                  category.id === selectedCategoryCars.id ? true : false
                }
              />
              <label htmlFor={category.name}>{category.name}</label>
            </li>
          ))}
        </ul>
      </div>
      {isLoading ? (
        <Preloader message={"Загрузка данных..."} />
      ) : (
        <div className="car">
          <div className="car-list">
            {carsItems.map((car) => (
              <div
                className={
                  currentCar === car.id
                    ? "car-list__item car-list__item_active"
                    : "car-list__item"
                }
                key={car.id}
                onClick={() => handleSetSelectedCar(car)}
              >
                <div className="car-name">{car.name}</div>
                <div className="car-price">
                  {car.priceMin} - {car.priceMax} ₽
                </div>
                <img
                  className="car-image"
                  crossOrigin="anonymous"
                  referrerPolicy="origin"
                  src={car.thumbnail.path}
                  onError={({ currentTarget }) => {
                    currentTarget.onerror = null;
                    currentTarget.src = plugImage;
                  }}
                  width="200"
                  height="133"
                  alt="car"
                />
              </div>
            ))}
          </div>

          <div className="car__paginate">
            <ReactPaginate
              previousLabel={"<"}
              nextLabel={">"}
              breakLabel={"..."}
              pageCount={pageCount}
              onPageChange={handlePageClick}
              containerClassName={"paginate"}
              activeClassName={"active"}
              forcePage={currentPage}
              renderOnZeroPageCount={null}
              pageRangeDisplayed={2}
              marginPagesDisplayed={1}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default ModelSelection;
