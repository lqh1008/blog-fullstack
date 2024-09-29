"use client";

import React from "react";
import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card";
import { Button } from "@nextui-org/button";

import { BlogPost } from "@/types/blog";

export const BlogList: React.FC<{ posts: BlogPost[] }> = ({ posts }) => {
  return (
    <div className="space-y-4">
      {posts.map((blog) => (
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
