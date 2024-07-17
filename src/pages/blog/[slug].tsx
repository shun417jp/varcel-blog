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
    const slug = router.query.slug;
    if (typeof slug === "string") {
      setBlogId(slug);
    }
  }, [router.query]);

  useEffect(() => {
    if (blogId === "") {
      return;
    }
    const fetchPost = async () => {
      const data = await selectPost(blogId);
      if (!data) {
        return;
      }

      setPost(data);
    };
    fetchPost();
  }, [blogId]);

  return (
    <Layout>
      <article className="flex flex-col items-center">
        {post && <PostHeader post={post} />}
      </article>

      {post ? (
        <Eyecatch
          src={`https://ejubpcdhecomjjdnnkwp.supabase.co/storage/v1/object/public/thumbnails/${post.eyecatch}`}
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
