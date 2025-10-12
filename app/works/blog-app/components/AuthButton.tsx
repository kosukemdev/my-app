"use client";

import { signIn, signOut, useSession } from "next-auth/react";

export default function AuthButton() {
  const { data: session } = useSession();

  if (session) {
    return (
      <div className="flex items-center gap-3">
        <span className="text-sm text-gray-600">{session.user?.name}</span>
        <button
          onClick={() => signOut()}
          className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 transition"
        >
          ログアウト
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={() => signIn("github")}
      className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition cursor-pointer"
    >
      GitHubでログイン
    </button>
  );
}
