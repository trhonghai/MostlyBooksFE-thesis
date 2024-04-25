import { faEdit } from "@fortawesome/free-regular-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import useBook from "~/hooks/useBook";
import BookForm from "./BookForm";
import { Pagination } from "@mui/material";

function ManageBook() {
  const { getAllBook, getAbook } = useBook();
  const [books, setBooks] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalEditOpen, setIsModalEditOpen] = useState(false);
  const [mode, setMode] = useState("add");
  const [bookCurrent, setBookCurrent] = useState({
    name: "",
    description: "",
    price: 0,
    pages: 0,
    isbn_10: "",
    isbn_13: "",
    dimensions: "",
    weight: 0,
    inventory: 0,
    authour: {
      id: "",
    },
    category: {
      id: "",
    },
    publisher: {
      id: "",
    },
    issue: "",
  });

  const openModal = (mode) => {
    setIsModalOpen(true);
    setMode(mode);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };
  const closeModalEdit = () => {
    setIsModalEditOpen(false);
  };

  const openModalEdit = (bookId, mode) => {
    fetchAbook(bookId);
    setIsModalEditOpen(true);
    setMode(mode);
  };

  const fetchAbook = async (bookId) => {
    try {
      const result = await getAbook(bookId);
      setBookCurrent(result);
    } catch (error) {
      console.error("Error fetching book:", error);
    }
  };
  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const result = await getAllBook();
      console.log(result);
      setBooks(result);
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  };

  const [page, setPage] = useState(1);
  const PER_PAGE = 10;

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
        <div className=" rounded-lg mx-4 ">
          <div className="flex items-center justify-between py-5 ">
            <h3 className="text-lg text-left leading-6 font-medium text-gray-900">
              QUẢN LÝ SÁCH
            </h3>
            <button
              onClick={() => openModal("add")}
              class=" ml-4 inline-flex items-center justify-center rounded-md border-2 border-transparent bg-[#FBA31A] bg-none px-12 py-3 text-center text-base font-bold text-white transition-all duration-200 ease-in-out focus:shadow hover:bg-[#faaf00]"
            >
              Thêm sách
            </button>
            <BookForm
              open={isModalOpen}
              onClose={closeModal}
              mode={mode}
              fetchBooks={fetchBooks}
            />
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-[#FFD16B] rounded-lg text-left text-xs font-semibold uppercase tracking-widest text-white">
                  <th className="px-2 py-3">Mã sách</th>
                  <th className="px-2 py-3">Sách</th>
                  <th className="px-2 py-3">Tên sách</th>
                  <th className="px-2 py-3">Danh mục</th>
                  <th className="px-2 py-3">Ngày phát hành</th>
                  <th className="px-2 py-3">Tồn kho</th>
                  <th className="px-2 py-3"></th>
                </tr>
              </thead>
              <tbody className="text-gray-500 text-left bg-white divide-y divide-gray-200">
                {currentBooks.map((book) => (
                  <tr key={book.id} className="hover:bg-gray-100">
                    <td className="px-2 py-4">{book.id}</td>
                    <td className="px-2 py-4">
                      <img className="w-32" src={book.img} />
                    </td>
                    <td className="px-2 py-4">
                      {book.name.length > 22
                        ? book.name.substring(0, 22 - 3) + "..."
                        : book.name}
                    </td>
                    <td className="px-2 py-4">{book.category.name}</td>
                    <td className="px-2 py-4">{book.issue}</td>
                    <td className="px-2 py-4">{book.inventory}</td>
                    <td className="px-2 py-4">
                      <button
                        onClick={() => openModalEdit(book.id, "edit")}
                        className="px-4 py-2 font-medium text-white bg-[#FFD16B] rounded-md hover:bg-[#FBA31A] focus:outline-none focus:shadow-outline-blue active:bg-blue-600 transition duration-150 ease-in-out"
                      >
                        <FontAwesomeIcon icon={faEdit} />
                      </button>

                      <Link className="ml-2 px-4 py-2 font-medium text-white bg-red-600 rounded-md hover:bg-red-500 focus:outline-none focus:shadow-outline-red active:bg-red-600 transition duration-150 ease-in-out">
                        <FontAwesomeIcon icon={faTrash} />
                      </Link>
                    </td>
                  </tr>
                ))}
                <BookForm
                  open={isModalEditOpen}
                  onClose={closeModalEdit}
                  bookCurrent={bookCurrent}
                  mode={mode}
                  fetchBooks={fetchBooks}
                />
              </tbody>
            </table>
          </div>
          <div className="flex items-center justify-center border-t bg-white px-5 py-5 sm:flex-row sm:justify-center">
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
      </div>
    </div>
  );
}

export default ManageBook;
