"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '../lib/supabaseClient';

export default function PostForm(){
    const [category, setCategory] = useState<string | null>(null);
    const [isCategoryOpen, setIsCategoryOpen] = useState<boolean>(false);
    const [income, setIncome] = useState<string>('');
    const [title, setTitle] = useState('');
    const router = useRouter();

    // 投稿フォームの送信処理
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (title && income && category) {
          const newPost = {
            title,
            income: Number(income),
            categories: [category],
        };
        
            try {
                const { error } = await supabase.from('posts').insert(newPost);
                if (error) throw error;
            
                // フォームをリセット
                setTitle('');
                setIncome('');
                setCategory(null);
                setIsCategoryOpen(false);

                // 投稿後のページ遷移
                router.push('/');
            } catch (error) {
              console.error('Error creating post:', error);
              alert('投稿の作成に失敗しました。');
              }
        } else {
            alert('カテゴリ、年収、タイトルは必須項目です。');
        }
      }; 
      
    return (
        <div className="ml-10">
          <form onSubmit={handleSubmit}>
            {/* カテゴリ入力欄 */}
            <div>
              <p className="my-2">求人カテゴリを選択</p>
              <button
                type="button"
                onClick={() => setIsCategoryOpen(!isCategoryOpen)}
                className="border w-56 p-1"
              >
                {category ? category : 'カテゴリを選択 '}
                {isCategoryOpen ? ' ▲ ' : ' ▼ '}
              </button>
              {isCategoryOpen && (
                <div>
                  {['事務', 'エンジニア', 'デザイン', 'マーケティング', '財務・経理', '人事', 'カスタマーサポート', '製造', '医療・介護'].map((cat) => (
                    <div key={cat}>
                      <input
                        type="radio"
                        id={cat}
                        name="category"
                        checked={category === cat}
                        onChange={() => {
                          setIsCategoryOpen(false);
                          setCategory(cat);
                        }}
                      />
                      <label htmlFor={cat}>{cat}</label>
                    </div>
                  ))}
                </div>
              )}
            </div>
          
            {/* 年収入力欄 */}
            <label>
              <p className="my-2">年収（万円）</p>
              <input
                type="number"
                id="income"
                name="income"
                value={income}
                onChange={(e) => setIncome(e.target.value)}
                className="border p-1 w-56"
              />
            </label>
          
            {/* タイトル入力欄 */}
            <label>
              <p className="my-2">求人タイトル</p>
              <input
                type="text"
                id="title"
                name="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="border w-[90%] p-1"
              />
            </label>
            <br /><br />
            <button
              className="my-2 py-2 text-neutral-50 bg-sky-400 rounded-md hover:bg-sky-600 px-4 w-56"
              type="submit"
            >
              投稿
            </button>
          </form>
        </div>

    );
};
