import Logo from "@/components/logo";
import Nav from "@/components/nav";
import { FC } from "react";

const Header: FC = () => {
  return (
    <header className="flex justify-center items-center">
      <div className="container flex flex-row justify-between items-center max-w-5xl">
        <Logo isBoxStyle />
        <Nav />
      </div>
    </header>
  );
};

export default Header;
