"use client";

import { useState } from "react";
import { Tabs, Tab } from "@nextui-org/react";
import { UserProfile } from "@clerk/nextjs";

import { BlogListTab } from "@/components/blog-list-tab";
import { BlogEditor } from "@/components/blog-editor";

export default function ProfilePage() {
  const [selectedTab, setSelectedTab] = useState("profile");

  const handleTabChange = (key: string) => {
    setSelectedTab(key);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">个人主页</h1>
      <Tabs selectedKey={selectedTab} onSelectionChange={handleTabChange}>
        <Tab key="profile" title="个人资料">
          <UserProfile routing="hash" />
        </Tab>
        <Tab key="blogs" title="我的博客">
          <BlogListTab />
        </Tab>
        <Tab key="editor" title="写博客">
          <BlogEditor />
        </Tab>
      </Tabs>
    </div>
  );
}
