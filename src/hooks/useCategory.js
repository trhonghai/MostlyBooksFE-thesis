import axios from "axios";

function UseCategory() {
  const category = async () => {
    const token =
      "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJkZW1vMTFAZ21haWwuY29tIiwiaWF0IjoxNzA4MTYxMTM0LCJleHAiOjE3MDgxNjQ3MzR9.cDCmjn83whYPiaaFLbwHaOmbtyAqttANUHhQ1byIxIA";
    try {
      const response = await axios.get("http://localhost:8080/categories", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const { data } = response;
      console.log(data);
      return data;
    } catch (error) {
      console.error("Lấy danh mục thất bại:", error.message);
    }
  };

  return { category };
}

export default UseCategory;
