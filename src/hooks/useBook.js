import axios from "axios";

function useBook() {
  const getAllBook = async () => {
    const response = await axios.get("http://localhost:8080/books");
    return response.data;
  };
  const createBook = async (newBook, file) => {
    try {
      const formData = new FormData();
      formData.append("book", JSON.stringify(newBook));
      formData.append("image", file);
      console.log(newBook, file);

      const response = await axios.post(
        "http://localhost:8080/books/new",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("response", response);
      return response.data;
    } catch (error) {
      console.error("Error creating book:", error);
    }
  };

  return { getAllBook, createBook };
}

export default useBook;
