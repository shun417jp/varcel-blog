import Eyecatch from "@/components/eyecatch";
import Layout from "@/components/layout";
import Pagenation from "@/components/pagenation";
import PostCategory from "@/components/post-category";
import PostHeader from "@/components/post-header";
import TwoColumnLayout from "@/components/TwoColumnLayout";
import { Post } from "@/types/blog";
import { selectPost } from "@/utitls/supabase";
import { useRouter } from "next/router";
import {
  Children,
  ClassAttributes,
  HTMLAttributes,
  useEffect,
  useState,
} from "react";
import ReactMarkdown, { ExtraProps } from "react-markdown";
import remarkGfm from "remark-gfm";

type HeadingProps = ClassAttributes<HTMLHeadElement> &
  HTMLAttributes<HTMLHeadElement> &
  ExtraProps;
const H1 = ({ Children }: HeadingProps) => {
  return <h1 className="text-3xl border-l-2 m-l-2"></h1>;
};

type ParagraphProps = ClassAttributes<HTMLParagraphElement> &
  HTMLAttributes<HTMLParamElement> &
  ExtraProps;
const P = ({ Children }: ParagraphProps) => {
  return <p className="text-base">{Children}</p>;
};

const DetailPage = () => {
  const [post, setPost] = useState<Post>();
  const [blogId, setBlogId] = useState<string>("");
  const router = useRouter();

  useEffect(() => {
    // クエリパラメータを取得する
    const slug = router.query.slug;
    // console.log(slug, typeof slug, typeof slug === "string");
    // クエリパラメーターにslugが存在する時にblogIdの状態を更新する
    if (typeof slug === "string") {
      setBlogId(slug);
    }
  }, [router.query]);

  useEffect(() => {
    // blogIdが空白の時には何もしない
    if (blogId === "") {
      return;
    }
    const fetchPost = async () => {
      // 記事データを取得する
      const data = await selectPost(blogId);
      // 記事データが取得できない時は処理を終了する
      if (!data) {
        return;
      }
      // blogIdが存在する時にはpostの状態を更新する
      setPost(data);
    };
    fetchPost();
  }, [blogId]);
  // ↑↑修正↑↑

  return (
    <Layout>
      <article className="flex flex-col items-center">
        {post && <PostHeader post={post} />}
      </article>

      {post ? (
        <Eyecatch
          src={`https://puvgtufvrywnimyrntkc.supabase.co/storage/v1/object/public/public-image-bucket/${post.eyecatch}`}
          width={568}
          height={288}
        />
      ) : (
        <Eyecatch src="/images/eyecatch.jpg" width={568} height={288} />
      )}
      {/* ↑↑修正↑↑ */}

      <TwoColumnLayout>
        <div className="flex flex-col flex-1 text-base leading-8">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{ h1: H1, p: P }}
          >
            {post && post.body}
          </ReactMarkdown>
        </div>
        <PostCategory />
      </TwoColumnLayout>

      <Pagenation
        prevText="前の記事へ"
        prevUrl="/blog/0001"
        nextText="次の記事へ"
        nextUrl="/blog/0003"
      />
    </Layout>
  );
};

export default DetailPage;
