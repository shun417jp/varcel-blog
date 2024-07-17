import { FC } from "react";

type Props = {
  children: React.ReactNode;
};

/**
 * ２カラムレイアウトのコンポーネント
 * @param {ReactNode} children レイアウトに埋め込むJSX
 * @returns {JSX}
 */
const TwoColumnLayout: FC<Props> = ({ children }) => {
  return (
    <div className="flex justify-center items-center py-16">
      <div className="container flex flex-col md:flex-row max-w-5xl gap-x-12 gap-y-12 px-8 md:px-0">
        {/* ↑↑修正↑↑ */}
        {children}
      </div>
    </div>
  );
};

export default TwoColumnLayout;
