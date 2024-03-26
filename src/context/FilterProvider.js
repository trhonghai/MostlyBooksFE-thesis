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
    const data = await filterBooks(
      filter.minPrice || null,
      filter.maxPrice || null,
      filter.categoryId || null,
      filter.publisherId || null
    );
    setBookData(data);
    console.log(data);
  };

  return (
    <FilterContext.Provider value={{ filter, updateFilter,bookData }}>
      {children}
    </FilterContext.Provider>
  );
};
