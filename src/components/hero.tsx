// hero.tsx
import Image from "next/image";
import { FC } from "react";

type Props = {
  title: string;
  subtitle: string;
  isImage?: boolean;
};

const Hero: FC<Props> = ({ title, subtitle, isImage }) => {
  return (
    <div className="flex justify-center items-center">
      <div
        className="container flex flex-row
        justify-between items-center max-w-5xl"
      >
        <div
          className="flex flex-col justify-center items-center
        pt-16 pb-24"
        >
          <h1 className="text-9xl font-black">{title}</h1>
          <p className="text-2xl">{subtitle}</p>
        </div>
        {isImage && (
          <figure className="w-full lg:w-12">
            <Image
              src={"/images/cube.jpg"}
              alt=""
              width={376}
              height={288}
              className="w-full"
            />
          </figure>
        )}
      </div>
    </div>
  );
};

export default Hero;
