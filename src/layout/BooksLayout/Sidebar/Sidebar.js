import React, { useEffect } from "react";
import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useFilter } from "~/context/FilterProvider";
import { useCategory, usePublisher } from "~/hooks";

function Sidebar() {
  const [categories, setCategories] = useState([]);
  const [publishers, setPublishers] = useState([]);
  const priceRanges = [
    { min: 0, max: 100000, label: "0đ - 100.000đ" },
    { min: 100000, max: 150000, label: "100.000đ - 150.000đ" },
    { min: 150000, max: 200000, label: "150.000đ - 200.000đ" },
  ];

  const { category } = useCategory();
  const { getPublishers } = usePublisher();
  const fetchCategory = async () => {
    const data = await category();
    setCategories(data);
    console.log(data);
  };
  const fetchPublisher = async () => {
    const data = await getPublishers();
    setPublishers(data);
    console.log(data);
  };

  useEffect(() => {
    fetchCategory();
    fetchPublisher();
  }, []);

  const { updateFilter, filter, updateIsNewBooksClicked } = useFilter();

  const handleCategoryClick = (categoryName) => {
    updateFilter({ categoryName });
  };

  const handlePublisherClick = (publisherName) => {
    updateFilter({ publisherName });
  };

  const handlePriceRangeClick = (minPrice, maxPrice) => {
    updateFilter({ minPrice, maxPrice });
  };

  return (
    <div>
      <div className="bg-white rounded-lg shadow-md p-6 mb-4">
        <ul className=" w-full text-sm text-gray-700 dark:text-gray-200">
          <li className=" flex border-b pl-4 block text-left text-2xl w-full font-medium py-2 text-gray-600 ">
            Danh mục
          </li>
          {categories.map((category, index) => (
            <li
              key={index}
              className="border-b py-4 flex hover:scale-115 transition duration-400 ease-in-out pl-4 block text-left w-full font-medium py-2 text-gray-600 hover:bg-[#FFD16B] hover:rounded-lg dark:hover:bg-gray-600 hover:text-white"
            >
              <Link onClick={() => handleCategoryClick(category.name)}>
                {category.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="bg-white rounded-lg shadow-md p-6 mb-4">
        <ul className=" w-full text-sm text-gray-700 dark:text-gray-200">
          <li className=" flex border-b pl-4 block text-left text-2xl w-full font-medium py-2 text-gray-600 ">
            Nhà xuất bản
          </li>
          {publishers.map((publisher, index) => (
            <Link onClick={() => handlePublisherClick(publisher.name)}>
              <li
                key={index}
                className="flex border-b pl-4 block text-left py-2 text-gray-600 "
              >
                <input
                  type="checkbox"
                  checked={filter.publisherName === publisher.name}
                  className="mr-2"
                />
                <label for="1">{publisher.name}</label>
              </li>
            </Link>
          ))}
        </ul>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6 mb-4">
        <ul className=" w-full text-sm text-gray-700 dark:text-gray-200">
          {priceRanges.map((range, index) => (
            <li
              key={index}
              className="flex border-b pl-4 block text-left py-2 text-gray-600"
            >
              <input
                type="checkbox"
                className="mr-2"
                checked={
                  (filter.minPrice === range.min ||
                    (filter.minPrice === 0 && range.min === 0)) &&
                  filter.maxPrice === range.max
                }
                onChange={() => handlePriceRangeClick(range.min, range.max)}
              />
              <label
                onClick={() => handlePriceRangeClick(range.min, range.max)}
              >
                {range.label}
              </label>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Sidebar;
