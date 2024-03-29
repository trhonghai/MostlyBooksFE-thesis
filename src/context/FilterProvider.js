import React, { createContext, useContext, useEffect, useState } from "react";
import { useBook } from "~/hooks";

const FilterContext = createContext();

export const useFilter = () => useContext(FilterContext);

export const FilterProvider = ({ children }) => {
  const [filter, setFilter] = useState({});
  const [bookData, setBookData] = useState([]);
  const { filterBooks } = useBook();

  const updateFilter = (newFilter) => {
    setFilter((prevFilter) => ({
      ...prevFilter,
      ...newFilter,
    }));
  };

  useEffect(() => {
    fetchBooks();
  }, [filter]);

  const fetchBooks = async () => {
    // Kiểm tra và xử lý giá trị minPrice và maxPrice
    const minPrice = filter.minPrice !== undefined ? filter.minPrice : null;
    const maxPrice = filter.maxPrice !== undefined ? filter.maxPrice : null;

    const data = await filterBooks(
      minPrice,
      maxPrice,
      filter.categoryName || null,
      filter.publisherName || null
    );
    setBookData(data);
    console.log(data);
  };

  return (
    <FilterContext.Provider value={{ filter, updateFilter, bookData }}>
      {children}
    </FilterContext.Provider>
  );
};
