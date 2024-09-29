"use client";

import React, { useState, useEffect } from "react";
import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card";
import { Button } from "@nextui-org/button";

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

export const BlogList: React.FC<{ posts: BlogPost[] }> = ({ posts }) => {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);

  useEffect(() => {
    fetchUserBlogs().then(setBlogs);
  }, []);

  return (
    <div className="space-y-4">
      {blogs.map((blog) => (
        <Card key={blog.id}>
          <CardHeader>{blog.title}</CardHeader>
          <CardBody>{blog.excerpt}</CardBody>
          <CardFooter>
            <Button size="sm">编辑</Button>
            <Button className="ml-2" color="danger" size="sm">
              删除
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};
