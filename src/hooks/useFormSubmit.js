import { useState } from "react";
import { fetchPost } from "../utils/fetchUtils";

const useFormSubmit = (route, inputs, token) => {
  const [loading, setLoading] = useState(false);

  let successCb = () => {};
  let failCb = () => {};

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    try {
      const response = await fetchPost(route, { ...inputs }, token);
      const data = await response.json();

      if (!response.ok) {
        failCb(data.message);
      } else {
        successCb(data.output);
      }
    } catch (error) {
      failCb(error.message);
    } finally {
      setLoading(false);
    }
  };

  const properties = {
    loading,
    handleSubmit,
    success(cb) {
      successCb = cb;
      return properties;
    },
    fail(cb) {
      failCb = cb;
      return properties;
    },
  };

  return properties;
};

export default useFormSubmit;
