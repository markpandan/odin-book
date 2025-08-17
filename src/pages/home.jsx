import ctl from "@netlify/classnames-template-literals";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { useOutletContext } from "react-router-dom";
import LoadingText from "../components/LoadingText";
import PostContainer from "../components/PostContainer";
import useAlert from "../hooks/useAlert";
import useAuth from "../hooks/useAuth";
import { fetchGet } from "../utils/fetchUtils";

const POSTS_LENGTH = 5;

const Home = () => {
  const { setCommentModal } = useOutletContext();
  const { user } = useAuth();
  const { setAlert } = useAlert();

  const [postData, setPostData] = useState([]);
  const [endFetch, setEndFetch] = useState(false);
  const [startIndex, setStartIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const { ref, inView } = useInView({ threshold: 0.5 });

  useEffect(() => {
    if (!inView || endFetch) return;

    const abortController = new AbortController();

    const fetchPosts = async () => {
      try {
        setLoading(true);
        const response = await fetchGet(
          `posts?start=${startIndex}&length=${POSTS_LENGTH}&relationTo=${user.id}`,
          { signal: abortController.signal }
        );

        const data = await response.json();
        if (!response.ok) {
          setAlert({ status: "error", message: data.message });
        } else {
          if (data.output.length == 0) setEndFetch(true);
          setPostData([...postData, ...data.output]);
          setStartIndex(startIndex + POSTS_LENGTH);
        }
      } catch (error) {
        if (!error.name === "AbortError") {
          console.error(error.message);
          setAlert({
            status: "error",
            message: `An error has occured. Error Code: ${error.name}`,
          });
        }
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();

    return () => abortController.abort();
  }, [endFetch, inView, loading, postData, setAlert, startIndex, user.id]);

  return (
    <>
      <div
        className={ctl(`
          flex w-4/7 flex-col gap-4 overflow-y-auto border-x-1 border-[var(--highlight-color)] px-4
        `)}
      >
        {postData.map((post) => (
          <PostContainer
            key={post.id}
            postId={post.id}
            user={`${post.user.firstname} ${post.user.lastname}`}
            username={post.user.username}
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
      </div>
    </>
  );
};

export default Home;
