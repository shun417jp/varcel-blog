import Logo from "./logo";
import Social from "./social";

const Footer = () => {
  return (
    <div
      className="flex justify-center items-center
        py-24 lg:py-16 bg-stone-200"
    >
      <div
        className="container flex flex-row
             justify-center lg:justify-between items-center gap-8 max-w-5xl"
      >
        <Logo />
        <Social />
      </div>
    </div>
  );
};

export default Footer;
