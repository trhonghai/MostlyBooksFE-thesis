import { faAngleRight, faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Tippy from "@tippyjs/react/headless";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import config from "~/config";
import { useFilter } from "~/context/FilterProvider";

function CategoryNav() {
  const [categories, setCategories] = useState([]);

  const { updateFilter, updateIsNewBooksClicked, fetchNewBooks } = useFilter();

  const handleCategoryClick = (categoryName) => {
    console.log("Category clicked:", categoryName);
    updateIsNewBooksClicked(false);
    updateFilter({ categoryName });
  };
  const handleNewBooksClick = () => {
    updateFilter({ issue: "2024" });
  };

  useEffect(() => {
    const category = async () => {
      try {
        const response = await axios.get("http://localhost:8080/categories");
        const { data } = response;
        setCategories(data);
        console.log(data);
        return data;
      } catch (error) {
        console.error("Lấy danh mục thất bại:", error.message);
      }
    };

    category();
  }, []);

  const getParentCategories = () => {
    return categories.filter((category) => category.parent === null);
  };

  const getSubcategories = (parent) => {
    const subcategories = categories.filter(
      (category) => category.parent?.id === parent.id
    );
    console.log(
      "Subcategories of parent category with name",
      parent.name,
      ":",
      subcategories
    );
    return subcategories;
  };

  return (
    <div className=" w-full h-auto bg-white border-b-[1px] pb-2 z-10 ">
      <div className=" h-full max-w-screen-xl mx-auto px-4 xl:px-0 flex items-center  gap-2">
        <Tippy
          interactive
          placement="bottom-end"
          render={(attrs) => (
            <div
              id="dropdown"
              className=" w-56   bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700"
              tabIndex="-1"
              {...attrs}
            >
              <ul
                className=" text-sm text-gray-700 dark:text-gray-200"
                aria-labelledby="dropdownDefaultButton"
              >
                {getParentCategories().map((category) => (
                  <li>
                    <Link
                      to={config.routes.books}
                      // onMouseEnter={() => handleMouseEnter(category.id)}
                      // onMouseLeave={handleMouseLeave}
                      onClick={() => handleCategoryClick(category.name)}
                      className="relative block text-left px-4 font-medium py-2 text-black hover:bg-[#FFD16B] dark:hover:bg-gray-600 hover:text-white"
                    >
                      <FontAwesomeIcon icon={faAngleRight} className="mr-2" />
                      {category.name}
                    </Link>
                    {/* {hoveredCategory === category.id && (
                      <ul>
                        {getSubcategories(category).map((subcategory) => (
                          <li key={subcategory.id}>
                            <div className=" w-48 h-auto bg-white absolute top-0 left-64 border-solid border border-[#FFD16B]">
                              <Link
                                // Thay đổi thành đường dẫn phù hợp với ứng dụng của bạn
                                className="  block text-left px-4 font-medium py-2 text-black hover:bg-[#FFD16B] dark:hover:bg-gray-600 hover:text-white"
                              >
                                <FontAwesomeIcon
                                  icon={faAngleRight}
                                  className="mr-2"
                                />
                                {subcategory.name}
                              </Link>
                            </div>
                          </li>
                        ))}
                      </ul>
                    )} */}
                  </li>
                ))}
              </ul>
            </div>
          )}
        >
          <div className="flex items-center w-56 h-8 rounded-md text-left bg-[#FFD16B]">
            <FontAwesomeIcon icon={faBars} className="mr-2 pl-4 text-white" />
            <span className="font-medium text-sm text-white underline-offset-4 decoration-[1px]  md:border-r-[2px] border-r-gray-400 duration-200 last:border-r-0">
              DANH MỤC
            </span>
          </div>
        </Tippy>

        <Link to={config.routes.books}>
          <div className="flex font-medium text-sm text-black w-32 h-6 justify-center items-center pl-3 pr-6 text-gray-600  underline-offset-4 decoration-[1px] hover:text-[#FFD16B] md:border-r-[2px] border-r-[#FFD16B] duration-200 last:border-r-0">
            TẤT CẢ SÁCH
          </div>
        </Link>
        <Link to={config.routes.books} onClick={handleNewBooksClick}>
          <div className="flex font-medium text-sm text-black w-32 h-6 justify-center items-center pl-3 pr-6 text-gray-600  underline-offset-4 decoration-[1px] hover:text-[#FFD16B] md:border-r-[2px] border-r-[#FFD16B] duration-200 last:border-r-0">
            SÁCH MỚI
          </div>
        </Link>
        <div className="flex font-medium text-sm text-black w-32 h-6 justify-center items-center pl-3 pr-6 text-gray-600  underline-offset-4 decoration-[1px] hover:text-[#FFD16B] md:border-r-[2px] border-r-[#FFD16B] duration-200 last:border-r-0">
          LIÊN HỆ
        </div>
      </div>
    </div>
  );
}

export default CategoryNav;
