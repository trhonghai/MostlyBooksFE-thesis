import { faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Pagination } from "@mui/material"; // Thay đổi từ @mui/lab sang @mui/material
import { useContext, useState } from "react";
import { useEffect } from "react";
import Book from "~/components/Book";
import { useFilter } from "~/context/FilterProvider";
import { useBook } from "~/hooks";

function Books() {
  const { filter, bookData, updateFilter } = useFilter();
  console.log(bookData);

  const [books, setBooks] = useState([]);
  const { getAllBook, filterBooks } = useBook();

  useEffect(() => {
    // Nếu bookData đã được fetch từ FilterProvider, sử dụng nó trực tiếp
    if (bookData && bookData.length > 0) {
      setBooks(bookData);
      const startIndex = (page - 1) * PER_PAGE;
      const endIndex = startIndex + PER_PAGE;
      const currentBooks = books.slice(startIndex, endIndex);
    } else {
      // Nếu không, gọi API để fetch dữ liệu sách
      const fetchBooks = async () => {
        let data;
        if (Object.keys(filter).length > 0) {
          const minPrice =
            filter.minPrice !== undefined ? filter.minPrice : null;
          const maxPrice =
            filter.maxPrice !== undefined ? filter.maxPrice : null;

          data = await filterBooks(
            minPrice,
            maxPrice,
            filter.categoryName || null,
            filter.publisherName || null
          );
        } else {
          data = await getAllBook();
        }
        setBooks(data);
      };
      fetchBooks();
    }
  }, [filter, bookData]);

  const clearFilter = (key) => {
    if (key === "minPrice") {
      updateFilter({ minPrice: undefined, maxPrice: undefined });
    } else if (key === "maxPrice") {
      updateFilter({ maxPrice: undefined });
    } else {
      updateFilter({ [key]: undefined });
    }
  };

  const [page, setPage] = useState(1);
  const PER_PAGE = 12;

  const count = Math.ceil(books.length / PER_PAGE);

  const handleChange = (event, value) => {
    setPage(value);
  };

  const startIndex = (page - 1) * PER_PAGE;
  const endIndex = startIndex + PER_PAGE;
  const currentBooks = books.slice(startIndex, endIndex);

  return (
    <div className="bg-white w-full shadow-lg overflow-hidden sm:rounded-lg">
      <div className="mx-auto max-w-screen-xl">
        <div className=" rounded-lg mx-2 ">
          <div className=" items-center justify-between py-5 ">
            <h3 className="text-lg ml-4 text-left leading-6 font-medium text-gray-900">
              TẤT CẢ SÁCH
            </h3>
            <div className="flex items-center mt-4">
              <h2 className="text-base ml-4 text-left leading-6 text-gray-900">
                Lọc theo:
              </h2>
              {Object.keys(filter).map((key) => {
                if (key === "minPrice" && filter["maxPrice"] !== undefined) {
                  return (
                    <div
                      key={key}
                      className="flex items-center text-left justify-center w-auto h-10 ml-2 bg-[#fef4e8] rounded-md text-[#FFD16B]"
                    >
                      <span className="font-normal px-4 py-2">{`Giá: ${filter[key]}đ - ${filter["maxPrice"]}đ`}</span>
                      <button
                        onClick={() => clearFilter(key)}
                        className="px-4 py-2"
                      >
                        <FontAwesomeIcon icon={faX} size="xs" color="#f79520" />
                      </button>
                    </div>
                  );
                } else if (
                  key === "maxPrice" &&
                  filter["minPrice"] !== undefined
                ) {
                  return null;
                } else {
                  return (
                    <div
                      key={key}
                      className="flex items-center text-left justify-center w-auto h-10 ml-2 bg-[#fef4e8] rounded-md text-[#FFD16B]"
                    >
                      <span className="font-normal px-4 py-2">
                        {filter[key]}
                      </span>
                      <button
                        className="px-4 py-2"
                        onClick={() => clearFilter(key)}
                      >
                        <FontAwesomeIcon icon={faX} size="xs" color="#f79520" />
                      </button>
                    </div>
                  );
                }
              })}
            </div>
          </div>
          <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
            {currentBooks.length > 0 ? (
              currentBooks.map((book) => <Book data={book} key={book.id} />)
            ) : (
              <div className="flex items-center justify-center h-96 w">
                <span className="text-gray-500 text-lg font-semibold">
                  Không tìm thấy sản phẩm
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center py-4">
        <Pagination
          count={count}
          page={page}
          onChange={handleChange}
          size="large"
          variant="outlined"
          shape="rounded"
        />
      </div>
    </div>
  );
}

export default Books;
