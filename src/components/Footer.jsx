import ctl from "@netlify/classnames-template-literals";

const Footer = () => {
  return (
    <div
      className={ctl(`
        border-t-1 border-[var(--highlight-color)] bg-[var(--secondary-color)] p-4 transition-colors
        duration-300
      `)}
    >
      Footer
    </div>
  );
};

export default Footer;
