import { PostMeta } from "@/lib/posts";
import BlogCard from "@/components/blog/BlogCard";

export default function BlogGrid({
  posts,
}: {
  posts: PostMeta[];
}) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {posts.map((post) => (
        <BlogCard key={post.slug} {...post} />
      ))}
    </div>
  );
}

