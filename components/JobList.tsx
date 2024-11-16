"use client";

import { useState, useEffect } from "react";
import { Post } from "../app/types";
import FilterPanel from "./JobList/FilterPanel";
import Pagination from "./JobList/Pagination";
import JobItem from "./JobList/JobItem";

interface JobListProps {
  posts: Post[];
}

export default function JobList({ posts }: JobListProps) {
  const [filterCategory, setFilterCategory] = useState<string[]>([]);
  const [filterIncome, setFilterIncome] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 10;

  // フィルタリング
  const filteredPosts = posts.filter((post) => {
    const categoryMatch =
      filterCategory.length > 0
        ? post.categories.some((cat) => filterCategory.includes(cat))
        : true;
    const incomeMatch = filterIncome !== null ? post.income >= filterIncome : true;
    return categoryMatch && incomeMatch;
  });

  // フィルタリング後にページをリセット
  useEffect(() => {
    setCurrentPage(1); // フィルタリング後に1ページ目に戻す
  }, [filterCategory, filterIncome]);

  // ページネーション処理
  const totalPages = Math.ceil(filteredPosts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedPosts = filteredPosts.slice(startIndex, startIndex + itemsPerPage);

  const handleCategoryChange = (category: string) => {
    setFilterCategory((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category]
    );
  };

  const handleIncomeSelect = (income: number | null) => {
    setFilterIncome(income);
  };

  return (
    <div className="flex w-full">
      {/* フィルター欄 */}
      <FilterPanel
        filterCategory={filterCategory}
        filterIncome={filterIncome}
        onCategoryChange={handleCategoryChange}
        onIncomeSelect={handleIncomeSelect}
      />

      {/* 求人一覧 */}
      <section className="w-3/4">
        <h1 className="font-bold text-xl ml-2 mt-2">求人一覧</h1>
        <p className="ml-2 mb-4 text-sm">該当件数 {filteredPosts.length} 件</p>
        {paginatedPosts.map((post) => (
          <JobItem key={post.id} post={post} />
        ))}

        {/* ページネーション */}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </section>
    </div>
  );
}
