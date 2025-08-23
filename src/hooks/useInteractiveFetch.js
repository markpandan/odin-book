import { useEffect, useRef, useState } from "react";
import { fetchGet } from "../utils/fetchUtils";
import useAlert from "./useAlert";

const useInteractiveFetch = (route, length, options = {}) => {
  const { offset = 0, token } = options;
  const { setAlert } = useAlert();
  const scrollRef = useRef(null);
  const [startIndex, setStartIndex] = useState(0 + offset);
  const [inView, setInview] = useState(true);
  const [endFetch, setEndFetch] = useState(false);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const currentRef = scrollRef.current;
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        setInview(entry.isIntersecting);
      },
      { threshold: 0.5 }
    );
    if (currentRef) observer.observe(currentRef);

    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, [scrollRef]);

  useEffect(() => {
    setData([]);
    setInview(true);
    setEndFetch(false);
    setStartIndex(0);
  }, [route]);

  useEffect(() => {
    if (!inView || endFetch) return;

    const abortController = new AbortController();

    const fetchPosts = async () => {
      try {
        setLoading(true);
        const response = await fetchGet(
          `${route}?start=${startIndex}&length=${length}`,
          {
            signal: abortController.signal,
            token,
          }
        );

        const jsonData = await response.json();
        setLoading(false);

        if (!response.ok) {
          setAlert({ status: "error", message: jsonData.message });
        } else {
          if (jsonData.output.length < length) {
            setEndFetch(true);
          } else {
            setStartIndex(startIndex + length + offset);
          }
          setData([...data, ...jsonData.output]);
        }
      } catch (error) {
        if (!error.name === "AbortError") {
          console.error(error.message);
          setAlert({
            status: "error",
            message: `An error has occured. Error: ${error.name}`,
          });
          setLoading(false);
        }
      }
    };

    fetchPosts();

    return () => abortController.abort();
  }, [
    endFetch,
    inView,
    loading,
    setAlert,
    startIndex,
    length,
    data,
    route,
    token,
    offset,
  ]);

  return { data, loading, scrollRef, endFetch };
};

export default useInteractiveFetch;
