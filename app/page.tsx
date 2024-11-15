// app/page.tsx
import { supabase } from '../lib/supabaseClient';
import JobList from '../components/JobList';

// サーバーコンポーネントとしてデータを取得
export default async function HomePage() {
  let posts = [];

  try {
    const { data, error } = await supabase.from('posts').select('*').throwOnError();
    posts = data || [];
  } catch (error) {
    console.error('Error fetching posts:', error instanceof Error ? error.message : error);
    return <p>Failed to load posts</p>;
  }

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
