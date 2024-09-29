import dynamic from "next/dynamic";

import { BlogList } from "@/components/blog-list";
import { BlogPost } from "@/types/blog";

// 这里我们模拟从API获取博客文章
const fetchBlogPosts = async (): Promise<BlogPost[]> => {
  // 在实际应用中,这里应该是一个API调用
  return [
    {
      id: "1",
      title: "第一篇博客文章",
      excerpt: "这是第一篇博客文章的摘要...",
      author: "张三",
      date: "2023-06-01",
      slug: "first-blog-post",
    },
    {
      id: "2",
      title: "第二篇博客文章",
      excerpt: "这是第二篇博客文章的摘要...",
      author: "李四",
      date: "2023-06-15",
      slug: "second-blog-post",
    },
    // 可以添加更多模拟数据
  ];
};

const AboutPage = dynamic(() => import("./about/page"), { ssr: false });

export default async function Home() {
  const posts = await fetchBlogPosts();

  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <div className="inline-block max-w-lg text-center justify-center">
        <h1 className="text-3xl font-bold">欢迎来到我的博客</h1>
        <h2 className="text-lg">最新文章</h2>
      </div>
      <BlogList posts={posts} />
      <AboutPage />
    </section>
  );
}
