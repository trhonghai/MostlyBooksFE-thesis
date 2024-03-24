import axios from "axios";

function usePublisher() {
  const getPublishers = async () => {
    const response = await axios.get("http://localhost:8080/publisher");

    return response.data;
  };

  return { getPublishers };
}

export default usePublisher;
