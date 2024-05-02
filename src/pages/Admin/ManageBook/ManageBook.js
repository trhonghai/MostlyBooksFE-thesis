import { faEdit } from "@fortawesome/free-regular-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import useBook from "~/hooks/useBook";
import BookForm from "./BookForm";
import { Box, Modal, Pagination } from "@mui/material";
import toast from "react-hot-toast";

function ManageBook() {
  const { getAllBook, getAbook } = useBook();
  const [books, setBooks] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalEditOpen, setIsModalEditOpen] = useState(false);
  const [mode, setMode] = useState("add");
  const [bookCurrent, setBookCurrent] = useState({
    name: "",
    description: "",
    originalPrice: 0,
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
  const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);
  const [deleteItemId, setDeleteItemId] = useState(null);
  const openDeleteModal = (id) => {
    setIsModalDeleteOpen(true);
    setDeleteItemId(id);
  };

  const closeDeleteModal = () => {
    setIsModalDeleteOpen(false);
  };

  const handleDelete = async () => {
    try {
      // await deleteCategory(deleteItemId);
      // fetchCategories();
      closeDeleteModal();
      toast.success("Xóa sách thành công");
    } catch (error) {
      toast.error("Xóa sách thất bại");
    }
  };

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

                      <button onClick={() => openDeleteModal(book.id)}>
                        <Link className="ml-2 px-4 py-2 font-medium text-white bg-red-600 rounded-md hover:bg-red-500 focus:outline-none focus:shadow-outline-red active:bg-red-600 transition duration-150 ease-in-out">
                          <FontAwesomeIcon icon={faTrash} />
                        </Link>
                      </button>
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
                <Modal
                  open={isModalDeleteOpen}
                  onClose={closeDeleteModal}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
                >
                  <Box className="fixed z-10 inset-0 overflow-y-auto">
                    <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                      <div className="fixed inset-0 transition-opacity">
                        <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                      </div>
                      <span className="hidden sm:inline-block sm:align-middle sm:h-screen"></span>
                      &#8203;
                      <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                        <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                          <h2
                            id="modal-modal-title"
                            className="text-lg font-medium text-gray-900"
                          >
                            Xác nhận
                          </h2>
                          <div className="mt-3 sm:mt-0  sm:text-left">
                            <p
                              id="modal-modal-description"
                              className="text-sm text-gray-500"
                            >
                              Bạn có chắc chắn muốn xóa sản phẩm này không?
                            </p>
                          </div>
                        </div>
                        <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                          <button
                            onClick={() => handleDelete()}
                            type="button"
                            className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                          >
                            Xóa
                          </button>
                          <button
                            onClick={closeDeleteModal}
                            type="button"
                            className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                          >
                            Hủy
                          </button>
                        </div>
                      </div>
                    </div>
                  </Box>
                </Modal>
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
