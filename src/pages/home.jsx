const Home = () => {
  return (
    <div className="flex grow flex-col items-center justify-center gap-8 bg-[var(--primary-color)]">
      <h1 className="text-6xl">
        Welcome to my <span className="text-[var(--accent-color)]">React</span>{" "}
        template!
      </h1>
      <div className="text-start">
        <h2 className="text-2xl">This template uses the following libraries</h2>
        <ul className="mt-4 list-inside list-disc columns-2 text-lg">
          <li>Tailwind CSS</li>
          <li>React DOM</li>
          <li>Headless UI</li>
          <li>Classnames Template Literals</li>
          <li>React Bootstrap Icons</li>
        </ul>
      </div>
    </div>
  );
};

export default Home;
