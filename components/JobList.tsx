// components/JobList.tsx
"use client"; // クライアントコンポーネント

import { useState } from 'react';

interface Post {
  id: number;
  title: string;
  income: number;
  categories: string[];
}

interface JobListProps {
  posts: Post[];
}

export default function JobList({ posts }: JobListProps) {
  const [filterCategory, setFilterCategory] = useState<string[]>([]);
  const [filterIncome, setFilterIncome] = useState<number | null>(null);

  // カテゴリーフィルターの選択・解除
  const handleCategoryChange = (category: string) => {
    if (filterCategory.includes(category)) {
      setFilterCategory(filterCategory.filter((c) => c !== category));
    } else {
      setFilterCategory([...filterCategory, category]);
    }
  };

  // 年収フィルターの選択
  const [showIncomeOptions, setShowIncomeOptions] = useState(false);
  const handleIncomeSelect = (income: number | null) => {
    setFilterIncome(income);
    setShowIncomeOptions(false);
  };

  // フィルタリング
  const filteredPosts = posts.filter((post) => {
    const categoryMatch = filterCategory.length > 0 ? post.categories.some((cat) => filterCategory.includes(cat)) : true;
    const incomeMatch = filterIncome !== null ? post.income >= filterIncome : true;
    return categoryMatch && incomeMatch;
  });

  return (
    <div className='flex w-full'>
      {/* フィルター欄 */}
      <aside className="w-1/4 bg-blue-100">
        <h2 className="font-bold m-2">求人カテゴリ</h2>
        {['事務', 'エンジニア', 'デザイン', 'マーケティング', '財務・経理', '人事', 'カスタマーサポート', '製造', '医療・介護'].map((category) => (
          <div key={category} className="ml-2">
            <input
              type="checkbox"
              id={category}
              checked={filterCategory.includes(category)}
              onChange={() => handleCategoryChange(category)}
            />
            <label htmlFor={category} className="text-sm">
              {category}
            </label>
          </div>
        ))}

        <h2 className="font-bold m-2">年収</h2>
        <button
          onClick={() => setShowIncomeOptions(!showIncomeOptions)}
          className="border bg-white w-[90%] mx-2"
        >
          {filterIncome !== null ? `${filterIncome}万円以上 ▼` : '年収を選択 ▼'}
        </button>
        {showIncomeOptions && (
          <div>
            {[300, 400, 500, 600, 700, 800, 900, 1000].map((income) => (
              <div key={income}>
                <input
                  type="radio"
                  name="income"
                  checked={filterIncome === income}
                  onChange={() => handleIncomeSelect(income)}
                />
                <label>{income}万円以上</label>
              </div>
            ))}
            <div>
              <input
                type="radio"
                name="income"
                checked={filterIncome === null}
                onChange={() => handleIncomeSelect(null)}
              />
              <label>全て表示</label>
            </div>
          </div>
        )}
      </aside>

      {/* 求人一覧 */}
      <section className="w-3/4">
        <h1 className="font-bold text-xl ml-2 mt-2">求人一覧</h1>
        <p className="ml-2 mb-4 text-sm">該当件数 {filteredPosts.length} 件</p>
        {filteredPosts.map((post) => (
          <div key={post.id} className="border border-neutral-400 rounded-xl ml-4 mr-10">
            <h2 className="font-bold text-lg ml-4">{post.title}</h2>
            <p className="text-sm ml-4">カテゴリ： {post.categories.join(', ')}</p>
            <p className="text-sm ml-4">年収: {post.income} 万円</p>
          </div>
        ))}
      </section>
    </div>
  );
}
