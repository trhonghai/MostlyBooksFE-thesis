import React, { createContext, useContext, useEffect, useState } from "react";
import { useBook } from "~/hooks";

const FilterContext = createContext();

export const useFilter = () => useContext(FilterContext);

export const FilterProvider = ({ children }) => {
  const [filter, setFilter] = useState({});
  const [bookData, setBookData] = useState([]);
  const [newBooks, setNewBooks] = useState([]); // [1
  const { filterBooks, getNewBooks } = useBook();

  const updateFilter = (newFilter) => {
    setFilter((prevFilter) => ({
      ...prevFilter,
      ...newFilter,
    }));
  };

  useEffect(() => {
    fetchBooks();
  }, [filter]);

  const fetchNewBooks = async () => {
    const data = await getNewBooks();
    setNewBooks(data);
    console.log(data);
  };

  // useEffect(() => {
  //   fetchNewBooks();
  // }, []);

  const fetchBooks = async () => {
    // Kiểm tra và xử lý giá trị minPrice và maxPrice
    const minPrice = filter.minPrice !== undefined ? filter.minPrice : null;
    const maxPrice = filter.maxPrice !== undefined ? filter.maxPrice : null;

    const data = await filterBooks(
      minPrice,
      maxPrice,
      filter.categoryName || null,
      filter.publisherName || null,
      filter.issue || null
    );
    setBookData(data);
    console.log(data);
  };

  return (
    <FilterContext.Provider
      value={{
        filter,
        updateFilter,
        bookData,
        newBooks,
        fetchNewBooks,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
};
