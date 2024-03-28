function BooksOnSearch({ data }) {
  return (
    <div className="flex">
      <div className="grid hover: grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-4 p-4">
        <div className=" flex items-center justify-center h-20 w-full">
          <img src={data.img} />
        </div>
        <span className="text-left">{data.name}</span>
      </div>
    </div>
  );
}

export default BooksOnSearch;
