import { useEffect, useRef, useState } from "react";
import { useOutletContext } from "react-router-dom";
import useAlert from "../hooks/useAlert";
import { fetchGet } from "../utils/fetchUtils";
import LoadingText from "./LoadingText";
import PostContainer from "./PostContainer";

const POSTS_LENGTH = 5;

const PostList = ({ userId, relationTo }) => {
  const { setCommentModal } = useOutletContext();
  const { setAlert } = useAlert();

  const [postData, setPostData] = useState([]);
  const [endFetch, setEndFetch] = useState(false);
  const [startIndex, setStartIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  const ref = useRef(null);
  const [inView, setInview] = useState(true);

  useEffect(() => {
    const currentRef = ref.current;
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
  }, [ref]);

  useEffect(() => {
    if (!inView || endFetch) return;

    const abortController = new AbortController();

    const fetchPosts = async () => {
      try {
        setLoading(true);
        let route = `posts?start=${startIndex}&length=${POSTS_LENGTH}`;
        if (userId) route += `&userId=${userId}`;
        if (relationTo) route += `&relationTo=${relationTo}`;

        const response = await fetchGet(route, {
          signal: abortController.signal,
        });

        const data = await response.json();
        setLoading(false);

        if (!response.ok) {
          setAlert({ status: "error", message: data.message });
        } else {
          if (data.output.length == 0) {
            setEndFetch(true);
          } else {
            setPostData([...postData, ...data.output]);
            setStartIndex(startIndex + POSTS_LENGTH);
          }
        }
      } catch (error) {
        if (!error.name === "AbortError") {
          console.error(error.message);
          setAlert({
            status: "error",
            message: `An error has occured. Error: ${error.name}`,
          });
        }
      }
    };

    fetchPosts();

    return () => abortController.abort();
  }, [
    endFetch,
    inView,
    loading,
    postData,
    setAlert,
    startIndex,
    relationTo,
    userId,
  ]);

  return (
    <>
      {postData.map((post) => (
        <PostContainer
          key={post.id}
          postId={post.id}
          user={`${post.user.firstname} ${post.user.lastname}`}
          username={post.user.username}
          date={post.createdAt}
          profile={post.user.profile_url}
          content={post.content}
          image={post.images[0]}
          likesCount={post._count.likes}
          isLiked={post.liked}
          commentsCount={post._count.comments}
          onComment={() => setCommentModal({ open: true, post })}
        />
      ))}

      <div ref={ref} className="flex h-20 items-center justify-center">
        {loading && <LoadingText />}
        {endFetch && <p>No more posts for now...</p>}
      </div>
    </>
  );
};

export default PostList;
