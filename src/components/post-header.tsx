import { Post } from "@/types/blog";
import { FC } from "react";
import { Clock4 } from "lucide-react";

type Props = {
  post: Post;
};

const PostHeader: FC<Props> = ({ post }) => {
  const dt = new Date(post.created_at);
  const year = dt.getFullYear();
  const month = dt.getMonth();
  const day = dt.getDate();

  return (
    <div className="container flex flex-col gap-y-5 pt-10 pb-5 max-w-5xl px-6">
      <div className="text-2xl font-bold">Blog Article</div>
      <h2 className="text-5xl text-black font-bold">{post.title}</h2>
      <h3 className="text-base text-gray-500 flex flex-row items-center gap-x-1">
        <Clock4 size={16} />
        <div>{`${year}年${month}月${day}日`}</div>
      </h3>
    </div>
  );
};

export default PostHeader;
