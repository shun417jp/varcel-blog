import Link from "next/link";
import { FC } from "react";

type Props = {
  isBoxStyle?: boolean;
};

/**
 * ロゴのコンポーネント
 * @param {boolean} isBoxStyle 長方形の背景色を設定するかどうか
 * @returns {JSX}
 */
const Logo: FC<Props> = ({ isBoxStyle = false }) => {
  return (
    <>
      {isBoxStyle ? (
        <Link
          href={"/"}
          className="bg-stone-700 text-white font-bold text-2xl py-4 px-8 inline-block"
        >
          CUBE
        </Link>
      ) : (
        <Link
          href={"/"}
          className="text-black font-bold text-2xl py-4 px-8 inline-block text-center"
        >
          {/* ↑↑修正↑↑ */}
          CUBE
        </Link>
      )}
    </>
  );
};

export default Logo;
