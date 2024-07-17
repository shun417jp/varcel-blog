import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  process.env.NEXT_PUBLIC_URL || "",
  process.env.NEXT_PUBLIC_API_KEY || ""
);

export const insertCategory = async (categoryName: string) => {
  const { error } = await supabase
    .from("categories")
    .insert({ name: categoryName });
  console.log(error);
};

export const selectCategories = async () => {
  const { data, error } = await supabase.from("categories").select();
  // console.log(data ? data : error);
  if (data) {
    return data.map((category) => ({ id: category.id, name: category.name }));
  } else {
    return [];
  }
};

export const uploadEyecatchImage = async (uploadFile: File) => {
  const { data, error } = await supabase.storage
    // .from("thumbnails")
    .from("thumbnails")
    .upload(`imgs/${uploadFile.name}`, uploadFile, {
      cacheControl: "3600",
      upsert: false,
    });
  return data ? data.path : error;
};

export const insertPost = async (
  title: string,
  body: string,
  categoryId: number,
  eyecatchUrl: string
) => {
  const data = {
    title,
    body,
    category_id: categoryId,
    eyecatch_url: eyecatchUrl,
  };
  const { error } = await supabase.from("posts").insert(data);
  console.log(error);
  return error;
};

export const selectPosts = async () => {
  const { data, error } = await supabase.from("posts").select();
  console.log(data ? data : error);
  if (data) {
    return data.map((post) => ({
      ...post,
      slug: post.id,
      eyecatch: post.eyecatch_url,
    }));
  } else {
    return [];
  }
};

export const selectPost = async (slug: string) => {
  const { data, error } = await supabase
    .from("posts")
    .select()
    .eq("id", slug)
    .limit(1);
  console.log(data, error);

  return data && data.length !== 0
    ? { ...data[0], eyecatch: data[0].eyecatch_url }
    : null;
};
