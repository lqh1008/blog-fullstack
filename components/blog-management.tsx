"use client";

import React, { useState, useEffect } from "react";
import { Button, Input, Textarea } from "@nextui-org/react";

import { BlogPost } from "@/types/blog";

// 模拟API调用
const fetchUserBlogs = async (): Promise<BlogPost[]> => {
  // 这里应该是实际的API调用
  return [
    {
      id: "1",
      title: "测试博客1",
      excerpt: "摘要1",
      author: "作者",
      date: "2023-01-01",
      slug: "test-blog-1",
    },
    {
      id: "2",
      title: "测试博客2",
      excerpt: "摘要2",
      author: "作者",
      date: "2023-01-02",
      slug: "test-blog-2",
    },
  ];
};

export const BlogManagement: React.FC = () => {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [selectedBlog, setSelectedBlog] = useState<BlogPost | null>(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    fetchUserBlogs().then(setBlogs);
  }, []);

  const handleCreate = () => {
    // 创建新博客的逻辑
    const newBlog: BlogPost = {
      id: Date.now().toString(),
      title,
      excerpt: content.substring(0, 100),
      author: "当前用户",
      date: new Date().toISOString().split("T")[0],
      slug: title.toLowerCase().replace(/ /g, "-"),
    };

    setBlogs([...blogs, newBlog]);
    resetForm();
  };

  const handleUpdate = () => {
    if (selectedBlog) {
      const updatedBlogs = blogs.map((blog) =>
        blog.id === selectedBlog.id
          ? { ...blog, title, excerpt: content.substring(0, 100) }
          : blog,
      );

      setBlogs(updatedBlogs);
      resetForm();
    }
  };

  const handleDelete = (id: string) => {
    setBlogs(blogs.filter((blog) => blog.id !== id));
    resetForm();
  };

  const resetForm = () => {
    setSelectedBlog(null);
    setTitle("");
    setContent("");
  };

  return (
    <div>
      <div className="mb-4">
        <Input
          className="mb-2"
          label="标题"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <Textarea
          className="mb-2"
          label="内容"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        {selectedBlog ? (
          <Button color="primary" onClick={handleUpdate}>
            更新博客
          </Button>
        ) : (
          <Button color="primary" onClick={handleCreate}>
            创建博客
          </Button>
        )}
      </div>
      <div>
        {blogs.map((blog) => (
          <div key={blog.id} className="border p-2 mb-2">
            <h3>{blog.title}</h3>
            <p>{blog.excerpt}</p>
            <Button
              className="mr-2"
              color="secondary"
              size="sm"
              onClick={() => setSelectedBlog(blog)}
            >
              编辑
            </Button>
            <Button
              color="danger"
              size="sm"
              onClick={() => handleDelete(blog.id)}
            >
              删除
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};
