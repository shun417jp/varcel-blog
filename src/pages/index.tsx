import Footer from "@/components/footer";
import Header from "@/components/header";
import Hero from "@/components/hero";
import Layout from "@/components/layout";
import Pagenation from "@/components/pagenation";
import Posts from "@/components/posts";
import { Post } from "@/types/blog";
import { selectPosts } from "@/utitls/supabase";
import { Inter } from "next/font/google";
import { useEffect, useState } from "react";

const inter = Inter({ subsets: ["latin"] });

/**
 * 仮データ
 */
const data: Post[] = [
  {
    slug: "0001",
    title: "記事のタイトル",
    eyecatch: "/images/eyecatch.jpg",
  },
  {
    slug: "0002",
    title: "記事のタイトル",
    eyecatch: "/images/eyecatch.jpg",
  },
  {
    slug: "0003",
    title: "記事のタイトル",
    eyecatch: "/images/eyecatch.jpg",
  },
  {
    slug: "0004",
    title: "記事のタイトル",
    eyecatch: "/images/eyecatch.jpg",
  },
];

export default function Home() {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const data = await selectPosts();
      setPosts(data);
    };
    fetchPosts();
  });

  return (
    <>
      <Layout>
        <Hero title="CUBE" subtitle="アウトプットしていくサイト" isImage />
        <Posts posts={posts} />
        <Pagenation nextUrl="/blog" nextText="次の記事へ" />
      </Layout>
    </>
  );
}
