import { PersonCircle } from "react-bootstrap-icons";

const CommentItem = ({ user, children }) => {
  return (
    <div className="flex w-full">
      <PersonCircle className="mr-4 size-12 shrink-0" />
      <div className="rounded-2xl bg-[var(--tertiary-color)] px-4 py-2">
        <h2 className="mb-2 font-semibold">William Smith</h2>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem
          inventore ullam deserunt consequuntur animi architecto, itaque culpa
          similique sint illum nesciunt est aperiam natus, hic at sunt
          praesentium veritatis in!
        </p>
      </div>
    </div>
  );
};

export default CommentItem;
