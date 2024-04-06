import axios from "axios";

function usePublisher() {
  const getPublishers = async () => {
    const response = await axios.get("http://localhost:8080/publisher");

    return response.data;
  };

  const getAPub = async (id) => {
    try {
      const response = await axios.get(`http://localhost:8080/publisher/${id}`);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };

  const updatePub = async (data, id, image) => {
    try {
      const fromData = new FormData();
      fromData.append("data", JSON.stringify(data));
      fromData.append("image", image);
      console.log(data, image);
      const response = await axios.put(
        `http://localhost:8080/publisher/update/${id}`,
        fromData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };

  const deletePub = async (id) => {
    console.log(id);
    try {
      const response = await axios.delete(
        `http://localhost:8080/publisher/delete/${id}`
      );
    } catch (error) {
      console.log(error);
    }
  };

  const createPub = async (data, image) => {
    try {
      const fromData = new FormData();
      fromData.append("data", JSON.stringify(data));
      fromData.append("image", image);
      const response = await axios.post(
        `http://localhost:8080/publisher/add`,
        fromData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };

  return { getPublishers, getAPub, updatePub, deletePub, createPub };
}

export default usePublisher;
