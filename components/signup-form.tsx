"use client";

import { useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Button } from "@nextui-org/react";

export default function SignUpForm() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const supabase = createClientComponentClient();

  const handleSignUp = async (provider: "github" | "google") => {
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
      setError(error.message || "注册失败,请稍后重试");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <Button
        color="primary"
        isLoading={loading}
        onClick={() => handleSignUp("github")}
      >
        使用GitHub注册
      </Button>
      <Button
        color="primary"
        isLoading={loading}
        onClick={() => handleSignUp("google")}
      >
        使用Google注册
      </Button>
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
}
