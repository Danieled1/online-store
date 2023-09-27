import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import axios from "axios";

function useFetch(url, method = "GET", requestData = null) {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { user } = useContext(AuthContext); // Get the user object from AuthContext

  useEffect(() => {
    const fetchFromDB = async () => {
      try {
        setIsLoading(true);

        let response;
        // Create headers with the authentication token
        const headers = {
          Authorization: `Bearer ${user?.token || ""}`, // Add the user's token if available
        };
        const backendBaseUrl = "http://localhost:3000";

        switch (method.toUpperCase()) {
          case "GET":
            response = await axios.get(url, { headers });
            break;
          case "POST":
            response = await axios.post(url, requestData, { headers });
            break;
          case "DELETE":
            response = await axios.delete(url, { headers });
            break;
          case "UPDATE":
            response = await axios.put(url, requestData, { headers });
            break;
          default:
            throw new Error(`Unsupported HTTP method: ${method}`);
        }
        console.log("RESPONSE_DATA_DATA: ", response.data.data);

        // Check if the response contains a product_image and update it
        if (response.data.data && response.data.data.product_image) {
          response.data.data.product_image =
            backendBaseUrl +
            response.data.data.product_image.substring(
              response.data.data.product_image.indexOf("/uploads")
            );
        }

        setData(response.data.data);
        /**
         * response {
         *
         * }
         *
         */
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFromDB();
  }, [url, method, requestData, user]); // Include user in the dependency array

  return [data, isLoading, error];
}

export default useFetch;
