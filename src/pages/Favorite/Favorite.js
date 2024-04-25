import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect } from "react";
import { useContext, useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import config from "~/config";
import AuthContext from "~/context/AuthProvider";
import { useBook, useCart } from "~/hooks";

function Favorite() {
  const [favorites, setFavorites] = useState([]);
  const { userCurrent } = useContext(AuthContext);
  const { getFavoriteBooks, deleteFavoriteBook } = useBook();
  const [quantity, setQuantity] = useState(1);
  const { AddtoCart } = useCart();

  useEffect(() => {
    const fetchFavorite = async () => {
      try {
        const favoriteBooks = await getFavoriteBooks(userCurrent);
        setFavorites(favoriteBooks);
      } catch (error) {
        console.error(error);
      }
    };
    fetchFavorite();
  }, [userCurrent]);

  const removeFavorite = async (id, bookId) => {
    try {
      const result = await deleteFavoriteBook(id, bookId);
      if (result) {
        const newFavorites = favorites.filter((favorite) => favorite.id !== id);
        setFavorites(newFavorites);
        toast.success("Xóa sản phẩm khỏi danh sách yêu thích thành công");
      }
    } catch (error) {
      toast.error("Xóa sản phẩm khỏi danh sách yêu thích thất bại");
    }
  };

  const addItemIntoCart = async (id, price, quantity) => {
    try {
      const result = AddtoCart(id, price, quantity);
      console.log(result);
      toast.success("Thêm sản phẩm thành công");
    } catch (error) {
      toast.error("Thêm sản phẩm thất bại");
    }
  };
  const increaseQuantity = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity((prevQuantity) => prevQuantity - 1);
    }
  };
  console.log(favorites);

  return (
    <div className="bg-white max-w-4xl shadow overflow-hidden sm:rounded-lg">
      <div className="mx-auto max-w-screen-lg">
        <div className="overflow-y-hidden rounded-lg ">
          <div className="px-4 py-5 sm:px-6">
            <h3 className="text-lg text-left leading-6 font-medium text-gray-900">
              DANH SÁCH YÊU THÍCH CỦA TÔI
            </h3>
          </div>
          {favorites.length === 0 ? (
            <div className=" flex-col md:flex-row gap-4 ">
              <div className="w-full  p-6 mb-4 ">
                <div className=" flex items-center justify-center ">
                  <img src="https://cdn0.fahasa.com/skin//frontend/ma_vanese/fahasa/images/checkout_cart/ico_emptycart.svg" />
                </div>
                <div className="mt-2 font">
                  <span>Chưa có sản phẩm yêu thích</span>
                </div>
                <Link to={config.routes.home}>
                  <button className="bg-[#FFD16B] text-white py-2 px-4 rounded-lg mt-4 w-46">
                    Tiếp tục mua sắm
                  </button>
                </Link>
              </div>
            </div>
          ) : (
            <div className="overflow-x-auto px-4">
              <table className="w-full min-w-full divide-y divide-gray-200">
                <thead>
                  <tr className="bg-[#FFD16B] rounded-lg text-left text-xs font-semibold uppercase tracking-widest text-white">
                    <th className=" px-2 py-3">Sản phẩm</th>
                    <th className="px-2 py-3">Đơn giá</th>
                    <th className="px-2 py-3">Danh mục</th>
                    <th className=" px-2 py-3">Năm phát hành</th>
                    <th className="px-2 py-3"></th>
                  </tr>
                </thead>
                <tbody className="text-gray-500 bg-white divide-y  text-left divide-gray-200">
                  {favorites.map((favorite) => (
                    <tr key={favorite?.id}>
                      <Link to={`/books/${favorite?.book?.id}`}>
                        <td className="px-2 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="h-32 w-32 flex-shrink-0">
                              <img
                                className="h-full w-full "
                                src={favorite?.book?.img}
                                alt=""
                              />
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">
                                {favorite?.book?.name?.length > 22
                                  ? favorite?.book?.name.substring(0, 22 - 3) +
                                    "..."
                                  : favorite?.book?.name}
                              </div>
                            </div>
                          </div>
                        </td>
                      </Link>
                      <td className="px-2 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {favorite?.book?.price}
                        </div>
                      </td>
                      <td className="px-2 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {favorite?.book?.category?.name}
                        </div>
                      </td>
                      <td className="px-2 py-4 whitespace-nowrap">
                        <div className="flex mt-4 justify-start ">
                          <div className="flex h-8 items-stretch text-gray-600">
                            <button
                              onClick={decreaseQuantity}
                              className="flex items-center justify-center rounded-l-md bg-gray-200 px-4 transition hover:bg-black hover:text-white"
                            >
                              -
                            </button>
                            <div className="flex  items-center justify-center bg-gray-100 px-4 text-xs uppercase transition">
                              {quantity}
                            </div>
                            <button
                              onClick={increaseQuantity}
                              className="flex items-center justify-center rounded-r-md bg-gray-200 px-4 transition hover:bg-black hover:text-white"
                            >
                              +
                            </button>
                          </div>
                        </div>
                      </td>
                      <td>
                        <div className="flex">
                          <button
                            onClick={() =>
                              removeFavorite(favorite?.id, favorite?.book?.id)
                            }
                          >
                            <Link className="ml-2 px-4 py-2 font-medium text-white bg-red-600 rounded-md hover:bg-red-500 focus:outline-none focus:shadow-outline-red active:bg-red-600 transition duration-150 ease-in-out">
                              <FontAwesomeIcon icon={faTrash} />
                            </Link>
                          </button>
                          <a
                            className={`ml-4 w-12 inline-flex items-center justify-center rounded-md border-2 border-transparent ${
                              favorite?.book?.inventory === 0
                                ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                                : "bg-[#FBA31A] bg-none"
                            }  py-1 text-center text-base font-bold text-white transition-all duration-200 ease-in-out focus:shadow hover:bg-[#faaf00]`}
                            href={config.routes.cart}
                            onClick={() => {
                              if (favorite?.book?.inventory > 0) {
                                addItemIntoCart(
                                  favorite?.book.id,
                                  favorite?.book.price,
                                  quantity
                                );
                              }
                            }}
                            disabled={favorite?.book?.inventory === 0}
                          >
                            Mua
                          </a>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Favorite;
