import React, { useEffect, useState } from "react";
import "./styles.scss";
import Preloader from "../../common/Preloader/Preloader";
import ReactPaginate from "react-paginate";
import { useDispatch, useSelector } from "react-redux";
import {
  getCars,
  getCategories,
  setCurrentOffset,
} from "../../../redux/orderSlice";
import CarList from "./CarList/CarList";
import CategoryList from "./CategoryList/CategoryList";

const ModelSelection = () => {
  const dispatch = useDispatch();
  const {
    carsData,
    currentOffset,
    totalCars,
    limitLoadingCars,
    selectedCategoryCars,
    isLoading,
  } = useSelector((state) => state.order);
  const [carsItems, setCarsItems] = useState([]);
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

  return (
    <>
      <CategoryList />
      {isLoading ? (
        <Preloader message={"Загрузка данных..."} />
      ) : (
        <div className="car">
          <CarList carsItems={carsItems} />
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
