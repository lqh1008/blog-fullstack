"use client";

import React, { useState, useRef } from "react";
import { Input, Button } from "@nextui-org/react";
import MarkdownEditor, { IMarkdownEditorRef } from "./markdown-editor";

interface BlogPost {
  title: string;
  content: string;
}

export const BlogEditor: React.FC = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const editorRef = useRef<IMarkdownEditorRef>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const markdown = editorRef.current?.getMarkdown();
    const blogPost: BlogPost = {
      title,
      content: markdown || ""
    };
    console.log("保存的博客文章:", blogPost);
    // 这里可以添加保存博客的逻辑,例如发送到API
    // await saveBlogPost(blogPost);
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <Input
        label="标题"
        placeholder="输入博客标题"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <MarkdownEditor
        ref={editorRef}
        markdown={content}
      />
      <Button color="primary" type="submit">
        保存博客
      </Button>
    </form>
  );
};
