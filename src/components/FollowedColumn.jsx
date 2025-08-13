import { PersonCircle } from "react-bootstrap-icons";

const FollowedColumn = ({ width }) => {
  return (
    <div className={width}>
      <div>
        <div className="rounded-xl bg-[var(--secondary-color)] p-4 pb-8 text-xl">
          <h2 className="mb-4">Followed</h2>
          <div className="flex flex-col gap-4">
            <div>
              <PersonCircle className="mr-2 inline size-6" />
              <span className="inline-block align-middle">Will Doe</span>
            </div>
            <div>
              <PersonCircle className="mr-2 inline size-6" />
              <span className="inline-block align-middle">Alice Smith</span>
            </div>
            <div>
              <PersonCircle className="mr-2 inline size-6" />
              <span className="inline-block align-middle">Ryan Johnson</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FollowedColumn;
