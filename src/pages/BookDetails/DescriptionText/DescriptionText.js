import { Link } from "react-router-dom";

function DescriptionText({ data }) {
  return (
    <div class="lg:col-gap-12 xl:col-gap-16 mt-4 grid grid-cols-1 gap-12 lg:grid-cols-4 lg:gap-4">
      <div class="lg:col-span-5 lg:row-span-2 lg:row-end-2">
        <h1 class="text-left text-xl  text-gray-900 sm:text-2xl">
          {data?.name}
        </h1>
        <div>{data?.description}</div>
        {/* <div className="flex justify-start">
          <h2 class="mt-4 w-52 text-left text-base text-gray-900 ">Tác giả:</h2>
          <Link className="mt-4  text-base text-gray-900 items-start text-[#FBA31A]">
            {data?.authour.name}
          </Link>
        </div>
        <div className="flex justify-start">
          <h2 class="mt-4 w-52 text-base text-gray-900 text-left">
            Nhà xuất bản:
          </h2>
          <Link className="mt-4  text-base text-gray-900 text-left text-[#FBA31A]">
            {data?.publisher.name}
          </Link>
        </div>
        <div className="flex justify-start">
          <h2 class="mt-4 w-52 text-base text-gray-900 text-left">
            Năm xuất bản:
          </h2>
          <Link className="mt-4  text-base text-gray-900 text-left text-[#FBA31A]"></Link>
        </div>
        <div className="flex justify-start">
          <h2 class="mt-4 w-52 text-base text-gray-900 text-left">
            Trọng lượng (gr):
          </h2>
          <Link className="mt-4  text-base text-gray-900 text-left text-[#FBA31A]">
            {data?.weight}
          </Link>
        </div>
        <div className="flex justify-start">
          <h2 class="mt-4 w-52 text-base text-gray-900 text-left">
            Kích thước bao bì:
          </h2>
          <Link className="mt-4  text-base text-gray-900 text-left text-[#FBA31A]">
            {data?.dimensions}
          </Link>
        </div>
        <div className="flex justify-start">
          <h2 class="mt-4 w-52 text-base text-gray-900 text-left">Số trang:</h2>
          <Link className="mt-4  text-base text-gray-900 text-left text-[#FBA31A]">
            {data?.pages}
          </Link>
        </div>
        <div className="flex justify-start">
          <h2 class="mt-4 w-52 text-base text-gray-900 text-left">ISBN-13:</h2>
          <Link className="mt-4  text-base text-gray-900 text-left text-[#FBA31A]">
            {data?.isbn_13}
          </Link>
        </div>
        <div className="flex justify-start">
          <h2 class="mt-4 w-52 text-base text-gray-900 text-left">ISBN-10:</h2>
          <Link className="mt-4  text-base text-gray-900 text-left text-[#FBA31A]">
            {data?.isbn_10}
          </Link>
        </div> */}
      </div>
    </div>
  );
}

export default DescriptionText;
