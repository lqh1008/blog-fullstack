"use client";

import React, { useState, useEffect } from "react";
import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card";
import { Button } from "@nextui-org/button";

import { BlogPost } from "@/types/blog";

// 模拟从API获取博客文章
const fetchUserBlogs = async (): Promise<BlogPost[]> => {
  // 在实际应用中，这里应该是一个API调用
  return [
    {
      id: "1",
      title: "我的第一篇博客",
      excerpt: "这是一个简短的摘要...",
      author: "当前用户",
      date: "2023-06-01",
      slug: "my-first-blog",
    },
    {
      id: "2",
      title: "学习React的心得",
      excerpt: "React真是一个强大的库...",
      author: "当前用户",
      date: "2023-06-15",
      slug: "learning-react",
    },
  ];
};

export const BlogListTab: React.FC = () => {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);

  useEffect(() => {
    fetchUserBlogs().then(setBlogs);
  }, []);

  const handleEdit = (id: string) => {
    // 实现编辑功能
    console.log("编辑博客", id);
  };

  const handleDelete = (id: string) => {
    // 实现删除功能
    console.log("删除博客", id);
    setBlogs(blogs.filter((blog) => blog.id !== id));
  };

  return (
    <div className="space-y-4">
      {blogs.map((blog) => (
        <Card key={blog.id}>
          <CardHeader>
            <h3 className="text-lg font-semibold">{blog.title}</h3>
          </CardHeader>
          <CardBody>
            <p>{blog.excerpt}</p>
            <p className="text-sm text-gray-500 mt-2">发布日期: {blog.date}</p>
          </CardBody>
          <CardFooter>
            <Button
              color="primary"
              size="sm"
              onPress={() => handleEdit(blog.id)}
            >
              编辑
            </Button>
            <Button
              className="ml-2"
              color="danger"
              size="sm"
              onPress={() => handleDelete(blog.id)}
            >
              删除
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};
