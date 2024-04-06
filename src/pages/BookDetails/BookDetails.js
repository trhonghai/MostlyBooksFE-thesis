import { faShoppingBag } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useContext, useState } from "react";
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import DescriptionText from "./DescriptionText/DescriptionText";
import RelateProduct from "../Home/RelateProduct";
import DesCriptionBook from "./DescriptionBook/DescriptionBook";
import FlashSale from "./FlashSale";
import Reviews from "./Reviews";
import { useBook } from "~/hooks";
import toast from "react-hot-toast";
import AuthContext from "~/context/AuthProvider";
import { Rating } from "@mui/material";
import { formatPrice } from "~/utils/formatPrice";

function BookDetails() {
  const { id } = useParams();
  const [book, setBook] = useState();
  const [discounts, setDiscounts] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const { getDiscountByBookId } = useBook();
  const [rating, setRating] = useState(0);
  const { getTotalCartItems, totalCartItems } = useContext(AuthContext);
  useEffect(() => {
    const fetchBook = async () => {
      const response = await axios.get(`http://localhost:8080/books/${id}`);
      console.log(response.data);
      setBook(response.data);
      setRating(response.data.rating);
    };
    fetchBook();
  }, [id]);

  useEffect(() => {
    const fetchFlashSale = async () => {
      const result = await getDiscountByBookId(id);
      setDiscounts(result);
    };
    fetchFlashSale();
  }, []);

  useEffect(() => {
    getTotalCartItems();
  }, [totalCartItems]);
  const AddtoCart = async (id, price, quantity) => {
    const cartId = localStorage.getItem("cartId");
    try {
      const data = {
        cartId: cartId,
        bookId: id,
        price: price,
        quantity: quantity,
      };
      console.log(quantity);

      const response = await axios.post(
        "http://localhost:8080/user-cart/add-to-cart",
        data
      );
      toast.success("Thêm sản phẩm thành công");
      console.log(response);
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

  return (
    <section class="pt-2 justify-center bg-gray-100">
      <div class="container w-9/12 mx-auto px-4 bg-white rounded-lg">
        <div class="lg:col-gap-12 xl:col-gap-16 mt-4 grid grid-cols-1 gap-12 lg:grid-cols-4 lg:gap-16">
          <div class="lg:col-span-2 lg:row-end-1 mt-4">
            <div class="lg:flex lg:items-start">
              <div class="lg:order-2  ">
                <div class="max-w-xl overflow-hidden rounded-lg">
                  <img
                    class="h-full w-full max-w-full object-cover"
                    src={book?.img}
                    alt=""
                  />
                </div>
              </div>
              <div class="mt-2 w-full lg:order-1 lg:w-32 ">
                {book?.images?.map((image, index) => (
                  <div class="flex flex-row items-start lg:flex-col">
                    <button
                      key={index}
                      type="button"
                      class="flex-0 aspect-square mb-3 h-20 overflow-hidden rounded-lg border-2 border-gray-200 text-center transition-all object-cover duration-300 hover:hover:scale-110"
                    >
                      <img
                        class="h-full w-full object-cover"
                        src={image.image}
                        alt=""
                      />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div class="lg:col-span-5 lg:row-span-2 lg:row-end-2 mt-4 mb-6">
            <h1 class="text-left text-2xl  text-gray-900 sm:text-2xl">
              {book?.name}
            </h1>

            <div className="flex  justify-start">
              <h2 class="mt-4 text-base text-gray-900 text-left">
                Nhà xuất bản:{" "}
                <Link className="text-[#FBA31A]">{book?.publisher.name}</Link>
              </h2>
              <h2 class="mt-4 ml-12 text-base text-gray-900 text-left">
                Tác giả:{" "}
                <Link className="text-[#FBA31A]">{book?.authour.name}</Link>
              </h2>
            </div>
            <div className="flex justify-start">
              <h2 class="mt-2 text-base text-gray-900 text-left">
                Thể loại:{" "}
                <Link className="text-[#FBA31A]">{book?.category.name}</Link>
              </h2>
              {book?.inventory === 0 ? (
                <h2 class="mt-2 w-24 h-8 bg-[#ff3535] ml-12 text-white rounded-lg flex items-center justify-center ">
                  Hết hàng
                </h2>
              ) : (
                <div class="mt-2 w-24 h-8 bg-[#00CC66] ml-12 text-white rounded-lg flex items-center justify-center ">
                  Còn hàng
                </div>
              )}
            </div>
            {discounts?.length > 0 && <FlashSale discounts={discounts} />}
            <div class="mt-5 flex items-center">
              <Rating name="simple-controlled" value={rating} size="small" />

              <p class="ml-2 text-sm font-medium text-gray-500">
                ({book?.reviewCount} đánh giá)
              </p>
            </div>

            <div class="mt-4 flex flex-col items-center justify-between b text-[#F7941D] space-y-4  sm:flex-row sm:space-y-0">
              <div class="flex items-end">
                <h1 class="text-3xl font-bold">{formatPrice(book?.price)}</h1>
              </div>
            </div>
            <div class=" flex mt-4 justify-start ">
              <div>Số lượng:</div>
              <div class="flex ml-10 h-8 items-stretch text-gray-600">
                <button
                  onClick={decreaseQuantity}
                  class="flex items-center justify-center rounded-l-md bg-gray-200 px-4 transition hover:bg-black hover:text-white"
                >
                  -
                </button>
                <div class="flex  items-center justify-center bg-gray-100 px-4 text-xs uppercase transition">
                  {quantity}
                </div>
                <button
                  onClick={increaseQuantity}
                  class="flex items-center justify-center rounded-r-md bg-gray-200 px-4 transition hover:bg-black hover:text-white"
                >
                  +
                </button>
              </div>
            </div>
            <div className="mt-4 flex justify-items-start">
              <button
                type="button"
                onClick={() => {
                  if (book.inventory > 0) {
                    AddtoCart(book.id, book.price, quantity);
                  }
                }}
                disabled={book?.inventory === 0}
                className={`inline-flex items-center w-full justify-center rounded-md border-2 border-transparent ${
                  book?.inventory === 0
                    ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                    : "bg-[#FBA31A] bg-none"
                } px-12 py-3 text-center text-base font-bold text-white transition-all duration-200 ease-in-out focus:shadow hover:bg-[#faaf00]`}
              >
                <FontAwesomeIcon icon={faShoppingBag} className="mr-2" />
                Thêm vào giỏ hàng
              </button>
              <button
                type="button"
                disabled={book?.inventory === 0}
                className={`ml-4 w-full inline-flex items-center justify-center rounded-md border-2 border-transparent ${
                  book?.inventory === 0
                    ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                    : "bg-[#FBA31A] bg-none"
                } px-12 py-3 text-center text-base font-bold text-white transition-all duration-200 ease-in-out focus:shadow hover:bg-[#faaf00]`}
              >
                Mua ngay
              </button>
            </div>
          </div>
        </div>
      </div>
      <div class="container w-9/12 mx-auto px-4 bg-white rounded-lg">
        <RelateProduct bookId={book?.id} />
      </div>
      <div className="container w-9/12 mx-auto px-4 bg-white rounded-lg">
        <DesCriptionBook data={book} />
      </div>
      <div className="container w-9/12 mx-auto px-4 bg-white rounded-lg">
        <DescriptionText data={book} />
      </div>
      <div className="container w-9/12 mx-auto px-4 bg-white rounded-lg">
        <Reviews data={book} />
      </div>
    </section>
  );
}

export default BookDetails;
