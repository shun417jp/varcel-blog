import Eyecatch from "@/components/eyecatch";
import Layout from "@/components/layout";
import Pagenation from "@/components/pagenation";
import PostCategory from "@/components/post-category";
import PostHeader from "@/components/post-header";
import TwoColumnLayout from "@/components/two-calumn-layout";
import { Post } from "@/types/blog";
import { selectPost } from "@/utitls/supabase";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

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
          {post && <PostHeader post={post} />}
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
