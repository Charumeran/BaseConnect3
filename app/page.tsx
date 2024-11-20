// app/page.tsx
export const revalidate = 0;

import pool from '../lib/db';
import JobList from '../components/JobList';

async function fetchPosts() {
  try {
    const client = await pool.connect();
    const res = await client.query('SELECT * FROM posts ORDER BY id DESC');
    client.release();
    return res.rows;
  } catch (error) {
    console.error('Error fetching posts:', error);
    return [];
  }
}

// サーバーコンポーネントとしてデータを取得
export default async function HomePage() {
  const posts = await fetchPosts();
  
  return (
    <>
      {/* ヘッダー */}
      <header>
        <nav className="bg-blue-900 p-3 flex items-center">
          <h1 className="text-2xl text-neutral-50 ml-2">求人検索アプリ</h1>
          <div className="flex ml-auto">
            <p className="text-1xl text-neutral-50 ml-2 mr-3">求人検索</p>
            <a href='/post' className="text-1xl text-neutral-50 ml-2 mr-3">求人投稿</a>
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
