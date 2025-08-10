import { PersonCircle, HandThumbsUp, ChatLeft } from "react-bootstrap-icons";

const PostContainer = () => {
  return (
    <div className="flex flex-col gap-6 rounded-xl bg-[var(--secondary-color)] p-4">
      <div className="flex items-center gap-2">
        <PersonCircle className="mr-2 inline size-10 shrink-0" />
        <div>
          <h2>John Smith</h2>
          <p className="text-xs opacity-75">2h ago</p>
        </div>
      </div>
      <div>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam
          obcaecati iusto incidunt fugit a molestiae dolorem fuga expedita?
          Ullam similique maiores veniam molestias facere quis, non excepturi
          accusamus quas rem.
        </p>
      </div>
      <div>
        <p className="text-sm italic">1.3k likes</p>
        <hr className="my-2 border-[var(--highlight-color)]" />
        <div
          className={`
            flex justify-around
            *:cursor-pointer *:rounded-xl *:px-4 *:py-2 *:hover:bg-[var(--accent-color)]
          `}
        >
          <button>
            <HandThumbsUp className="mr-3 inline size-4" />
            <p className="inline-block align-middle">Like</p>
          </button>
          <button>
            <ChatLeft className="mr-3 inline size-4" />
            <p className="inline-block align-middle">Comment</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostContainer;
