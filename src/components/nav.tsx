import Link from "next/link";
import { FC } from "react";

const Nav: FC = () => {
  return (
    <nav>
      <ul className="flex flex-row gap-x-8">
        <li>
          <Link href={"/"} className="hover:text-blue-500">
            Home
          </Link>
        </li>
        <li>
          <Link href={"/about"} className="hover:text-blue-500">
            About
          </Link>
        </li>
        <li>
          <Link href={"/blog"} className="hover:text-blue-500">
            Blog
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
