import React, { useState } from 'react';

interface FilterPanelProps {
    filterCategory: string[];
    filterIncome: number | null;
    onCategoryChange: (category: string) => void;
    onIncomeSelect: (income: number | null) => void;
  }
  
  export default function FilterPanel({
    filterCategory,
    filterIncome,
    onCategoryChange,
    onIncomeSelect,
  }: FilterPanelProps) {
    const [showIncomeOptions, setShowIncomeOptions] = useState(false);
  
    return (
      <aside className="w-1/4 bg-blue-100">
        <h2 className="font-bold m-2">求人カテゴリ</h2>
        {['事務', 'エンジニア', 'デザイン', 'マーケティング', '財務・経理', '人事', 'カスタマーサポート', '製造', '医療・介護'].map((category) => (
          <div key={category} className="ml-2">
            <input
              type="checkbox"
              id={category}
              checked={filterCategory.includes(category)}
              onChange={() => onCategoryChange(category)}
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
                  onChange={() => onIncomeSelect(income)}
                />
                <label>{income}万円以上</label>
              </div>
            ))}
            <div>
              <input
                type="radio"
                name="income"
                checked={filterIncome === null}
                onChange={() => onIncomeSelect(null)}
              />
              <label>全て表示</label>
            </div>
          </div>
        )}
      </aside>
    );
  }
  