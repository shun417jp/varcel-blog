// types/blog.ts
export type Post = {
  slug: string;
  title: string;
  eyecatch: string;
  created_at: string;
  body: string;
};

export type Category = {
  id: number;
  name: string;
};
