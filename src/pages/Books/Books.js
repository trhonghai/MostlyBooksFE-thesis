import { faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Accordion, AccordionActions } from "@mui/material";
import { useContext, useState } from "react";
import { useEffect } from "react";
import Book from "~/components/Book";
import { useFilter } from "~/context/FilterProvider";
import { useBook } from "~/hooks";

function Books() {
  const { filter, bookData } = useFilter();
  console.log(filter);

  const [books, setBooks] = useState([]);
  const { getAllBook } = useBook();

  useEffect(() => {
    const fetchBooks = async () => {
      if (bookData.length > 0) {
        setBooks(bookData);
      } else {
        const data = await getAllBook();
        setBooks(data);
        console.log(data);
      }
    };
    fetchBooks();
  }, [bookData]);

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
              {Object.keys(filter).map((key) => (
                <div className="flex items-center text-left justify-center w-32 h-10 ml-2 bg-[#fef4e8] rounded-md text-[#FFD16B]">
                  {/* <span className="font-semibold">{key}:</span>{" "} */}
                  <span className="font-normal mr-4">{filter[key]}</span>
                  <button>
                    <FontAwesomeIcon icon={faX} size="xs" color="#f79520" />
                  </button>
                </div>
              ))}
            </div>
          </div>
          <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
            {books.map((book) => (
              <Book data={book} key={book.id} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Books;
