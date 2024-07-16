// types/blog.ts
export type Post = {
  slug: string;
  title: string;
  eyecatch: string;
  created_at: string;
};

export type Category = {
  id: number;
  name: string;
};
