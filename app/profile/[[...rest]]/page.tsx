"use client";

import { useState } from "react";
import { UserProfile } from "@clerk/nextjs";
import { Tabs, Tab } from "@nextui-org/react";

import { BlogList } from "@/components/blog-list";
import { BlogEditor } from "@/components/blog-editor";

export default function ProfilePage() {
  const [selectedTab, setSelectedTab] = useState("profile");

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">个人中心</h1>
      <Tabs
        selectedKey={selectedTab}
        onSelectionChange={(key) => setSelectedTab(key.toString())}
      >
        <Tab key="profile" title="个人信息">
          <div className="mt-4">
            <UserProfile path="/profile" routing="path" />
          </div>
        </Tab>
        <Tab key="blogList" title="博客列表">
          <div className="mt-4">
            <BlogList posts={[]} />
          </div>
        </Tab>
        <Tab key="blogEditor" title="写博客">
          <div className="mt-4">
            <BlogEditor />
          </div>
        </Tab>
      </Tabs>
    </div>
  );
}
