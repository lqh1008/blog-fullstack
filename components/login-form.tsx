"use client";

import { useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Button } from "@nextui-org/react";

export default function LoginForm() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const supabase = createClientComponentClient();

  const handleLogin = async (provider: "github" | "google") => {
    setLoading(true);
    setError(null);

    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: provider,
        options: {
          redirectTo: `${location.origin}/auth/callback`,
        },
      });

      if (error) throw error;
    } catch (error: any) {
      setError(error.message || "登录失败,请稍后重试");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <Button
        color="primary"
        isLoading={loading}
        onClick={() => handleLogin("github")}
      >
        使用GitHub登录
      </Button>
      <Button
        color="primary"
        isLoading={loading}
        onClick={() => handleLogin("google")}
      >
        使用Google登录
      </Button>
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
}
