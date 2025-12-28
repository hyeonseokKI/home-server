import { getAllPosts, getAllTags } from "@/lib/posts";
import BlogFilter from "@/components/blog/BlogFilter";
import BlogSliderWithControls from "@/components/blog/BlogSliderWithControls";

export default function BlogPage() {
  const posts = getAllPosts();
  const allTags = getAllTags();

  // 슬라이더용 포스트 (최신 5개)
  const sliderPosts = posts.slice(0, 5);

  return (
    <section className="container mx-auto px-4 md:px-6 lg:px-8 py-16 max-w-6xl">
      <h1 className="mb-8 text-3xl font-bold text-center">Blog</h1>
      
      {/* 이미지 슬라이더 (정지 버튼 포함) */}
      {sliderPosts.length > 0 && (
        <BlogSliderWithControls
          posts={sliderPosts}
          autoPlay={true}
          autoPlayInterval={7000}
        />
      )}

      {/* 태그 필터 및 카드 그리드 */}
      <BlogFilter posts={posts} allTags={allTags} />
    </section>
  );
}
