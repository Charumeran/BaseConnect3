// app/post/page.tsx
import PostForm from '../../components/PostForm';

export default function PostPage() {
  return (
    <>
      {/* ヘッダー */}
      <header>
        <nav className="bg-blue-900 p-3 flex items-center">
          <h1 className="text-2xl text-neutral-50 ml-2">求人検索アプリ</h1>
          <div className="flex ml-auto">
            <a href='/post' className="text-1xl text-neutral-50 ml-2 mr-3">求人投稿</a>
            <p className="text-1xl text-neutral-50 ml-2 mr-3">求人投稿</p>
          </div>
        </nav>
      </header>

      {/* 投稿フォーム */}
      <main>
        <h1 className="font-bold text-2xl m-4 ml-10">求人投稿</h1>
        <PostForm />
      </main>
    </>
  );
}

