// app/page.tsx
// import { supabase } from '../lib/supabaseClient';
// import JobList from '../components/JobList';

// // サーバーコンポーネントとしてデータを取得
// export default async function HomePage({res}:any) {
//   if (res) {
//     res.setHeader('Cache-Control', 'no-store, max-age=0'); // キャッシュ無効化
//   }

//   let posts = [];

//   try {
//     // Supabaseからデータを取得
//     const { data } = await supabase.from('posts').select('*')
//     posts = data || [];
//   } catch (error) {
//     console.error('Error fetching posts:', error instanceof Error ? error.message : error);
//      return <p>Failed to load posts</p>;
//   }
"use client";

import { useEffect, useState } from 'react';
import JobList from '../components/JobList';
import { supabase } from '../lib/supabaseClient';

export default function HomePage() {
  const [posts, setPosts] = useState<any[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const { data, error } = await supabase.from('posts').select('*');
      if (error) {
        console.error('Error fetching posts:', error.message);
      } else {
        setPosts(data || []);
      }
    };

    fetchPosts(); // 初回データ取得

  }, []);

  return (
    <>
      {/* ヘッダー */}
      <header>
        <nav className="bg-blue-900 p-3 flex items-center">
          <h1 className="text-2xl text-neutral-50 ml-2">求人検索アプリ</h1>
          <div className="flex ml-auto">
            <p className="text-1xl text-neutral-50 ml-2 mr-3">求人検索</p>
            <a href="/post" className="text-1xl text-neutral-50 ml-2 mr-3">
              求人投稿
            </a>
          </div>
        </nav>
      </header>

      {/* メインコンテンツ */}
      <main className="flex h-screen">
        <JobList posts={posts} />
      </main>
    </>
  );
}
