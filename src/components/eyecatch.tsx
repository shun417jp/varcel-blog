import Image from "next/image";
import { FC } from "react";

type Props = {
  src: string;
  alt?: string;
  width: number;
  height: number;
};

/**
 * アイキャッチのコンポーネント
 * @param {string} src 画像のURL
 * @param {string|undefined} alt 画像の代替テキスト
 * @param {number} width 画像の横幅
 * @param {number} height 画像の縦幅
 * @returns
 */
const Eyecatch: FC<Props> = ({ src, alt = "", width, height }) => {
  return (
    <div className="flex justify-center items-center">
      <div className="container flex flex-col lg:flex-row justify-center lg:justify-between gap-8 max-w-5xl px-8 md:px-0">
        {/* ↑↑修正↑↑ */}
        <figure className="w-full">
          <Image
            src={src}
            alt={alt}
            width={width}
            height={height}
            className="w-full"
          />
        </figure>
      </div>
    </div>
  );
};

export default Eyecatch;
