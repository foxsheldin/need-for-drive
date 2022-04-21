import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setCurrentOffset,
  setSelectedCategoryCars,
} from "../../../../redux/orderSlice";
import Radiobutton from "../../../common/Radiobutton/Radiobutton";

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
          <Radiobutton
            nameInput={"categoryCar"}
            name={category.name}
            onClick={() => handleSetCategory(category)}
            compare={selectedCategoryCars.name}
            key={category.id}
          />
        ))}
      </ul>
    </div>
  );
};

export default CategoryList;
