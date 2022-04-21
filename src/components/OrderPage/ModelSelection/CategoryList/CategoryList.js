import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setCurrentOffset,
  setSelectedCategoryCars,
} from "../../../../redux/orderSlice";

const CategoryList = () => {
  const dispatch = useDispatch();
  const { categoriesData, selectedCategoryCars } = useSelector(
    (state) => state.order
  );
  const [categoriesItems, setCategories] = useState([]);

  useEffect(() => {
    setCategories(categoriesData);
  }, [categoriesData]);

  const handleSetCategory = (category) => {
    dispatch(setSelectedCategoryCars(category));
    dispatch(setCurrentOffset(0));
  };

  return (
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
  );
};

export default CategoryList;
