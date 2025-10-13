"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import { Github } from "lucide-react";

export default function AuthButton() {
  const { data: session } = useSession();

  return (
    <>
      {session ? (
        <div className="flex items-center gap-3">
          <span className="text-sm text-gray-600">{session.user?.name}</span>
          <button
            onClick={() => signOut()}
            className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 transition cursor-pointer"
          >
            ログアウト
          </button>
        </div>
      ) : (
        <button
          onClick={() => signIn("github")}
          className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition cursor-pointer"
        >
          <Github className="inline-block mr-2" size={16} />
          GitHubでログイン
        </button>
      )}
    </>
  );
}
