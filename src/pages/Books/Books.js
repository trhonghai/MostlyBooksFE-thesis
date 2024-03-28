import { faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Accordion, AccordionActions, Pagination } from "@mui/material";
import { useContext, useState } from "react";
import { useEffect } from "react";
import Book from "~/components/Book";
import { useFilter } from "~/context/FilterProvider";
import { useBook } from "~/hooks";

function Books() {
  const { filter, bookData, updateFilter } = useFilter();
  console.log(filter);

  const [books, setBooks] = useState([]);
  const { getAllBook, filterBooks } = useBook();
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchBooks = async () => {
      let data;
      if (Object.keys(filter).length > 0) {
        // Nếu đã áp dụng bộ lọc
        const minPrice = filter.minPrice !== undefined ? filter.minPrice : null;
        const maxPrice = filter.maxPrice !== undefined ? filter.maxPrice : null;

        data = await filterBooks(
          minPrice,
          maxPrice,
          filter.categoryName || null,
          filter.publisherName || null
        );
      } else {
        // Nếu chưa áp dụng bộ lọc
        data = await getAllBook();
      }
      setBooks(data);
      setTotalPages(data.totalPages);
    };
    fetchBooks();
  }, [filter]);

  const clearFilter = (key) => {
    if (key === "minPrice") {
      updateFilter({ minPrice: undefined, maxPrice: undefined }); // Xóa cả minPrice và maxPrice
    } else if (key === "maxPrice") {
      updateFilter({ maxPrice: undefined }); // Xóa maxPrice
    } else {
      updateFilter({ [key]: undefined }); // Xóa bộ lọc theo key được chỉ định
    }
  };

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const offset = (currentPage - 1) * itemsPerPage;
  const pageCount = Math.ceil(bookData.length / itemsPerPage);

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected + 1);
  };

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
            {books.length > 0 ? (
              books.map((book) => <Book data={book} key={book.id} />)
            ) : (
              <div className="flex items-center justify-center h-96 w">
                <span className="text-gray-500 text-lg font-semibold">
                  Khồn tìm thấy sản phẩm
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center py-4">
        <Pagination
          count={1} // tổng số trang
          shape="rounded"
          page={pageCount}
          onChange={handlePageChange}
        />
      </div>
    </div>
  );
}

export default Books;
