import Hero from "@/components/hero";
import Layout from "@/components/layout";
import Pagenation from "@/components/pagenation";
import Posts from "@/components/posts";
import { Post } from "@/types/blog";
import { selectPosts, supabase } from "@/utitls/supabase";
import { Inter } from "next/font/google";
import { useEffect, useState } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [posts, setPosts] = useState<Post[]>([]);
  // ↑↑追加↑↑

  useEffect(() => {
    const fetchPosts = async () => {
      const data = await selectPosts();
      setPosts(data);
    };
    fetchPosts();
  }, []);
  // ↑↑追加↑↑

  return (
    <Layout>
      <Hero title="CUBE" subtitle="アウトプットしていくサイト" isImage />
      <Posts posts={posts} />
      {/* ↑↑修正↑↑ */}
      <Pagenation nextUrl="/blog" nextText="次の記事へ" />
    </Layout>
  );
}
