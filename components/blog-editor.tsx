"use client";

import React, { useState, useCallback, useRef } from "react";
import { Input, Button } from "@nextui-org/react";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { AutoFocusPlugin } from "@lexical/react/LexicalAutoFocusPlugin";
import LexicalErrorBoundary from "@lexical/react/LexicalErrorBoundary";
import { HeadingNode, QuoteNode } from "@lexical/rich-text";
import { TableCellNode, TableNode, TableRowNode } from "@lexical/table";
import { ListItemNode, ListNode } from "@lexical/list";
import { CodeHighlightNode, CodeNode } from "@lexical/code";
import { AutoLinkNode, LinkNode } from "@lexical/link";
import { LinkPlugin } from "@lexical/react/LexicalLinkPlugin";
import { ListPlugin } from "@lexical/react/LexicalListPlugin";
import { MarkdownShortcutPlugin } from "@lexical/react/LexicalMarkdownShortcutPlugin";
import { TRANSFORMERS } from "@lexical/markdown";
import { $generateHtmlFromNodes, LexicalEditor } from "lexical";

import ToolbarPlugin from "./plugins/ToolbarPlugin";

function Placeholder() {
  return <div className="editor-placeholder">在此输入您的博客内容...</div>;
}

const editorConfig = {
  namespace: "BlogEditor",
  onError(error: Error) {
    console.error("Lexical 编辑器错误:", error);
  },
  nodes: [
    HeadingNode,
    QuoteNode,
    ListItemNode,
    ListNode,
    TableCellNode,
    TableNode,
    TableRowNode,
    CodeHighlightNode,
    CodeNode,
    AutoLinkNode,
    LinkNode
  ],
};

export const BlogEditor: React.FC = () => {
  const [title, setTitle] = useState("");
  const editorRef = useRef<LexicalEditor | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    console.log("保存博客", { title, });

    e.preventDefault();
    if (editorRef.current) {
      editorRef.current.update(() => {
        const htmlString = $generateHtmlFromNodes(editorRef.current!, null);
        console.log("htmlString", htmlString);
        saveBlog(title, htmlString);
      });
    }
  };

  const saveBlog = async (title: string, content: string) => {
    try {
      const response = await fetch('/api/blogs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, content }),
      });

      if (response.ok) {
        console.log('博客保存成功');
        // 可以添加保存成功后的操作，比如清空表单或显示成功消息
      } else {
        console.error('博客保存失败');
        // 可以添加错误处理逻辑
      }
    } catch (error) {
      console.error('保存博客时发生错误:', error);
      // 可以添加错误处理逻辑
    }
  };

  const onRef = useCallback((nodeOrNull: HTMLElement | null) => {
    if (nodeOrNull) {
      editorRef.current = (nodeOrNull as any)._lexicalEditor;
    }
  }, []);

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <Input
        label="标题"
        placeholder="输入博客标题"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <LexicalComposer initialConfig={editorConfig}>
        <div className="editor-container">
          <ToolbarPlugin />
          <div className="editor-inner" ref={onRef}>
            <RichTextPlugin
              contentEditable={<ContentEditable className="editor-input" />}
              placeholder={<Placeholder />}
              ErrorBoundary={LexicalErrorBoundary}
            />
            <HistoryPlugin />
            <AutoFocusPlugin />
            <ListPlugin />
            <LinkPlugin />
            <MarkdownShortcutPlugin transformers={TRANSFORMERS} />
          </div>
        </div>
      </LexicalComposer>
      <Button color="primary" type="submit">
        保存博客
      </Button>
    </form>
  );
};
