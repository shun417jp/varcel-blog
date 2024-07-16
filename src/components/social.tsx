import { Github, Facebook, X } from "lucide-react";
import Link from "next/link";

const Social = () => {
  return (
    <ul
      className="flex flex-row
     justify-center items-center gap-x-6"
    >
      <li>
        <Link href={"https://x.com/home?lang=ja"}>
          <X size={24} />
          <span className="sr-only">X</span>
        </Link>
      </li>
      <li>
        <Link href={"https://www.Facebook.com/home?lang=ja_JP"}>
          <Facebook size={24} />
          <span className="sr-only">Facebook</span>
        </Link>
      </li>
      <li>
        <Link href={"https://github.com"}>
          <Github size={24} />
          <span className="sr-only">GIthub</span>
        </Link>
      </li>
    </ul>
  );
};

export default Social;
