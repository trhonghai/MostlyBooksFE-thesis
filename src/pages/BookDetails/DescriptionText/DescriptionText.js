import { Link } from "react-router-dom";

function DescriptionText({ data }) {
  return (
    <div className="lg:col-gap-12 xl:col-gap-16 mt-4 grid grid-cols-1 gap-12 lg:grid-cols-4 lg:gap-4">
      <div className="lg:col-span-5 p-4 lg:row-span-2 lg:row-end-2">
        <h1 className="text-left text-xl font-bold text-gray-900 sm:text-2xl">
          {data?.name}
        </h1>
        <p className="text-left">{data?.description}</p>
      </div>
    </div>
  );
}

export default DescriptionText;
