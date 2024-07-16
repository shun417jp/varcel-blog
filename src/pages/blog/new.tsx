import Layout from "@/components/layout";
import { Category } from "@/types/blog";
import {
  insertCategory,
  insertPost,
  selectCategories,
  uploadEyecatchImage,
} from "@/utitls/supabase";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";

const Page = () => {
  const [categoryName, setCategoryName] = useState("");
  // **** START [記事の追加フォームで使用する] ****
  const [categories, setCategories] = useState<Category[]>([]);
  const [categoryId, setCategoryId] = useState(0);
  const [postTitle, setPostTitle] = useState("");
  const [postBody, setPostBody] = useState("");
  const [postEyecatchUrl, setPostEyecatchUrl] = useState("");
  // ↑↑追加↑↑

  const fetchCategories = async () => {
    const data = await selectCategories();
    setCategories([...data]);
    setCategoryId(data.length === 0 ? 0 : data[0].id);
  };
  // **** END ****

  const onChangeCategoryName = (e: ChangeEvent<HTMLInputElement>) => {
    setCategoryName(e.target.value);
  };

  const onSubmitInsertCategory = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (categoryName.length === 0) {
      return;
    }
    insertCategory(categoryName);
    setCategoryName("");
    fetchCategories();
  };

  // **** START [記事の追加フォームで使用する] ****
  useEffect(() => {
    if (categoryName.length === 0) {
      fetchCategories();
    }
  }, [categoryName]);

  const onChangeCategoryId = (e: ChangeEvent<HTMLSelectElement>) => {
    setCategoryId(Number(e.target.value));
  };

  const onChangePosttitle = (e: ChangeEvent<HTMLInputElement>) => {
    setPostTitle(e.target.value);
  };
  // ↑↑追加↑↑

  const onChangePostBody = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setPostBody(e.target.value);
  };
  // ↑↑追加↑↑

  const onChangeEyecatch = async (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) {
      setPostEyecatchUrl("");
      return;
    }

    const file = e.target.files[0];
    const eyecatchUrl = await uploadEyecatchImage(file);
    if (typeof eyecatchUrl === "string") {
      setPostEyecatchUrl(eyecatchUrl);
    } else {
      alert("アップロードに失敗しました");
    }
  };
  // ↑↑追加↑↑

  const onSubmitInsertPost = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (
      postTitle.length === 0 ||
      postBody.length === 0 ||
      categoryId === 0 ||
      postEyecatchUrl.length === 0
    ) {
      return;
    }
    const response = await insertPost(
      postTitle,
      postBody,
      categoryId,
      postEyecatchUrl
    );
    if (response === null) {
      setPostTitle("");
      setPostBody("");
      setPostEyecatchUrl("");
      setCategoryId(categories.length === 0 ? 0 : 1);
    } else {
      alert("記事の投稿に失敗しました");
    }
  };
  // ↑↑追加↑↑
  // **** END ****

  return (
    <Layout>
      <div className="flex flex-col lg:flex-row gap-10 justify-center items-center lg:items-start my-10">
        <div className="flex flex-col p-5 bg-slate-200 rounded-lg w-80 text-xl">
          <h2 className="text-center">ブログの追加</h2>
          <form className="flex flex-col gap-y-5" onSubmit={onSubmitInsertPost}>
            <div className="flex flex-col">
              <label htmlFor="post-title">Post Title</label>
              <input
                type="text"
                id="post-title"
                value={postTitle}
                onChange={onChangePosttitle}
              />
              {/* ↑↑value属性とonChange属性の追加↑↑ */}
            </div>
            <div className="flex flex-col">
              <label htmlFor="post-body">Post Body</label>
              <textarea
                id="post-body"
                value={postBody}
                onChange={onChangePostBody}
              ></textarea>
              {/* ↑↑value属性とonChange属性の追加↑↑ */}
            </div>
            <div className="flex flex-col">
              <label htmlFor="post-category">Post Category</label>
              <select
                id="post-category"
                onChange={onChangeCategoryId}
                value={categoryId}
              >
                {categories.map(({ id, name }) => (
                  <option value={id} key={id}>
                    {name}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-col">
              <label htmlFor="post-eyecatch">Post Eyecatch</label>
              <input
                type="file"
                accept="image/*"
                id="post-eyecatch"
                onChange={onChangeEyecatch}
              />
              {/* ↑↑onChange属性の追加↑↑ */}
            </div>
            <div className="flex justify-center">
              <input
                type="submit"
                value="カテゴリを追加する"
                className="bg-indigo-700 text-white p-2 w-full rounded"
              />
            </div>
          </form>
        </div>

        <div className="flex flex-col p-5 bg-slate-200 rounded-lg w-80 text-xl">
          <h2 className="text-center">カテゴリの追加</h2>
          <form
            className="flex flex-col gap-y-5"
            onSubmit={onSubmitInsertCategory}
          >
            <div className="flex flex-col">
              <label htmlFor="post-new-category">Category</label>
              <input
                type="text"
                id="post-new-category"
                value={categoryName}
                onChange={onChangeCategoryName}
              />
            </div>
            <div className="flex justify-center">
              <input
                type="submit"
                value="カテゴリを追加する"
                className="bg-indigo-700 text-white p-2 w-full rounded"
              />
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default Page;
