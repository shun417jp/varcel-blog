import { FC, useEffect, useState } from "react";
import { FolderOpen } from "lucide-react";
import { Category } from "@/types/blog";
import Link from "next/link";
import { selectCategories } from "@/utils/supabase";

const PostCategory: FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  // ↑↑追加↑↑

  useEffect(() => {
    const fetchCategories = async () => {
      const data = await selectCategories();
      setCategories(data);
    };
    fetchCategories();
  }, []);
  // ↑↑追加↑↑

  return (
    <div className="flex flex-row lg:flex-col py-4 gap-4 w-full md:w-60 justify-start items-center lg:justify-center lg:items-end md:items-end">
      <FolderOpen size={16} />
      {categories.map(({ id, name }) => (
        <Link href={`/blogs/${id}`} key={id}>
          <div>{name}</div>
        </Link>
      ))}
      {/* ↑↑修正↑↑ */}
    </div>
  );
};

export default PostCategory;
