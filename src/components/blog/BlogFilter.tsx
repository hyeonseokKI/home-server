"use client";

import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { PostMeta } from "@/lib/posts";
import BlogGrid from "@/components/blog/BlogGrid";

interface BlogFilterProps {
  posts: PostMeta[];
  allTags: string[];
}

export default function BlogFilter({
  posts,
  allTags,
}: BlogFilterProps) {
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  const filteredPosts = useMemo(() => {
    if (!selectedTag) {
      return posts;
    }
    return posts.filter(
      (post) => post.tags && post.tags.includes(selectedTag)
    );
  }, [posts, selectedTag]);

  // 태그별 포스트 개수 계산
  const tagCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    allTags.forEach((tag) => {
      counts[tag] = posts.filter(
        (post) => post.tags && post.tags.includes(tag)
      ).length;
    });
    return counts;
  }, [posts, allTags]);

  return (
    <div>
      <div className="mb-6 flex flex-wrap gap-2 justify-center">
        <Button
          variant={selectedTag === null ? "default" : "outline"}
          size="sm"
          onClick={() => setSelectedTag(null)}
        >
          전체({posts.length})
        </Button>
        {allTags.map((tag) => (
          <Button
            key={tag}
            variant={selectedTag === tag ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedTag(tag)}
          >
            {tag}({tagCounts[tag] || 0})
          </Button>
        ))}
      </div>
      <BlogGrid posts={filteredPosts} />
    </div>
  );
}

