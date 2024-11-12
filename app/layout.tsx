import '../styles/globals.css';

export const metadata = {
  title: '求人検索アプリ',
  description: '求人を投稿、検索できるアプリ',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  )
}
