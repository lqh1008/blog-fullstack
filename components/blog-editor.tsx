"use client";

import React, { useState } from "react";
import { Input, Textarea, Button } from "@nextui-org/react";

export const BlogEditor: React.FC = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // 这里应该是实际的保存博客逻辑
    console.log("保存博客", { title, content });
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <Input
        label="标题"
        placeholder="输入博客标题"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <Textarea
        label="内容"
        minRows={10}
        placeholder="输入博客内容"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <Button color="primary" type="submit">
        保存博客
      </Button>
    </form>
  );
};
