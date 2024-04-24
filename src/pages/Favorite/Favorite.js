import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect } from "react";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import AuthContext from "~/context/AuthProvider";
import { useBook } from "~/hooks";

function Favorite() {
  const [favorites, setFavorites] = useState([]);
  const { userCurrent } = useContext(AuthContext);
  const { getFavoriteBooks } = useBook();

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
          <div className="overflow-x-auto px-4">
            <table className="w-full min-w-full divide-y divide-gray-200">
              <thead>
                <tr className="bg-[#FFD16B] rounded-lg text-left text-xs font-semibold uppercase tracking-widest text-white">
                  <th className=" px-2 py-3">Sản phẩm</th>
                  <th className="px-2 py-3">Đơn giá</th>
                  <th className="px-2 py-3">Danh mục</th>
                  <th className="px-2 py-3">Năm phát hành</th>
                  <th className="px-2 py-3"></th>
                </tr>
              </thead>
              <tbody className="text-gray-500 bg-white divide-y  text-left divide-gray-200">
                {favorites.map((favorite) => (
                  <tr key={favorite.id}>
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
                            {favorite?.book?.name}
                          </div>
                        </div>
                      </div>
                    </td>
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
                      <div className="text-sm text-gray-900">
                        {favorite?.book?.issue}
                      </div>
                    </td>
                    <td>
                      <button
                      //   onClick={() => openDeleteModal(item.id)}
                      >
                        <Link className="ml-2 px-4 py-2 font-medium text-white bg-red-600 rounded-md hover:bg-red-500 focus:outline-none focus:shadow-outline-red active:bg-red-600 transition duration-150 ease-in-out">
                          <FontAwesomeIcon icon={faTrash} />
                        </Link>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Favorite;
