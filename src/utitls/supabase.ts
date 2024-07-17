import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  process.env.NEXT_PUBLIC_URL || "",
  process.env.NEXT_PUBLIC_API_KEY || ""
);

/**
 * categoriesテーブルにカテゴリを追加する
 * @param categoryName カテゴリ名
 */
export const insertCategory = async (categoryName: string) => {
  const { error } = await supabase
    .from("categories")
    .insert({ name: categoryName });
  console.log(error);
};

/**
 * categoriesテーブルからデータを取得する
 * @returns Category[]
 */
export const selectCategories = async () => {
  const { data, error } = await supabase.from("categories").select();
  // console.log(data ? data : error);
  if (data) {
    return data.map((category) => ({ id: category.id, name: category.name }));
  } else {
    return [];
  }
};

/**
 * thumbnailsバケットに画像をアップロードする
 * @param uploadFile アイキャッチ画像
 */
export const uploadEyecatchImage = async (uploadFile: File) => {
  const { data, error } = await supabase.storage
    // .from("thumbnails")
    .from("public-image-bucket")
    .upload(`imgs/${uploadFile.name}`, uploadFile, {
      cacheControl: "3600",
      upsert: false,
    });
  return data ? data.path : error;
};

/**
 * postsテーブルに記事を追加する
 * @param title 記事のタイトル
 * @param body 記事の本文
 * @param categoryId 記事のカテゴリID
 * @param eyecatchUrl 記事のアイキャッチ画像
 */
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

/**
 * postsテーブルから記事を取得する
 * @returns Post[]
 */
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

/**
 * postsテーブルから記事を１件取得する
 * @param slug 記事のID
 * @returns Post|null
 */
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
// ↑↑追加↑↑
