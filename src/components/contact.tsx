import Social from "./social";

/**
 * コンタクトのコンポーネント
 * @returns {JSX}
 */
const Contact = () => {
  return (
    <div className="flex flex-col py-4 gap-4 w-full md:w-60 items-start md:items-end">
      {/* ↑↑修正↑↑ */}
      <h3 className="text-lg">Contact</h3>
      <Social />
      <address className="text-center">xxxxx@xx.xx.xx</address>
    </div>
  );
};

export default Contact;
