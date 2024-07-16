import Social from "./social";

const Contact = () => {
  return (
    <div className="flex flex-col py-4 gap-4 w-60 items-start lg:items-end">
      <h3 className="text-lg">Contact</h3>
      <Social />
      <address className="text-center">xxx@sample.com</address>
    </div>
  );
};

export default Contact;
