import Link from "next/link";

export default function BlogPage() {
  return (
    <main style={{ padding: "2rem" }}>
      <h1>Blog</h1>

      <ul>
        <li>
          <Link href="/blog/hello-world">
            홈서버 블로그 시작
          </Link>
        </li>
      </ul>
    </main>
  );
}
