import { Post } from "../../app/types";

interface JobItemProps {
  post: Post;
}

export default function JobItem({ post }: JobItemProps) {
  return (
    <div className="border border-neutral-400 rounded-xl ml-4 mr-10">
      <h2 className="font-bold text-lg ml-4">{post.title}</h2>
      <p className="text-sm ml-4">カテゴリ： {post.categories.join(', ')}</p>
      <p className="text-sm ml-4">年収: {post.income} 万円</p>
    </div>
  );
}
