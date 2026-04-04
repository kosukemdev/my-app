// app/components/Header.tsx
"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useSession, signOut } from "next-auth/react";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const { data: session } = useSession();
  const pathname = usePathname() ?? "/";

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  const handleLogout = async () => {
    await signOut({ redirect: false });
  };

  return (
    <header
      className={`fixed top-0 left-0 z-50 flex w-full items-center justify-between border-b border-white/10 bg-[#1f3258]/95 px-4 py-4 text-gray-100 shadow-md backdrop-blur ${isOpen ? "h-auto" : "h-16"}`}
    >
      {/* サイト名 */}

      <h2 className="text-2xl font-bold">
        <Link href="/">Kosuke Masaki Portfolio</Link>
      </h2>

      {/* デスクトップナビ */}
      <nav className="hidden space-x-6 md:flex md:items-center">
        <Link
          href="/"
          className="group relative"
          aria-current={isActive("/") ? "page" : undefined}
        >
          Home
          <span
            className={`absolute -bottom-0.5 left-0 block h-0.5 origin-left bg-gray-100 transition-all duration-300 ease-in-out ${
              isActive("/") ? "w-full" : "w-0 group-hover:w-full"
            }`}
          ></span>
        </Link>
        <Link
          href="/about"
          className="group relative"
          aria-current={isActive("/about") ? "page" : undefined}
        >
          About
          <span
            className={`absolute -bottom-0.5 left-0 block h-0.5 origin-left bg-gray-100 transition-all duration-300 ease-in-out ${
              isActive("/about") ? "w-full" : "w-0 group-hover:w-full"
            }`}
          ></span>
        </Link>
        <Link
          href="/works"
          className="group relative"
          aria-current={isActive("/works") ? "page" : undefined}
        >
          Works
          <span
            className={`absolute -bottom-0.5 left-0 block h-0.5 origin-left bg-gray-100 transition-all duration-300 ease-in-out ${
              isActive("/works") ? "w-full" : "w-0 group-hover:w-full"
            }`}
          ></span>
        </Link>
        {session ? (
          <div>
            <button
              onClick={handleLogout}
              className="block cursor-pointer rounded bg-gray-100 px-4 py-1 font-medium text-[#455698] transition-colors duration-300 hover:bg-gray-200"
            >
              ログアウト
            </button>
          </div>
        ) : (
          <Link
            href="/login"
            className="block cursor-pointer rounded bg-gray-100 px-4 py-1 font-medium text-[#455698] transition-colors duration-300 hover:bg-gray-200"
          >
            管理者ログイン
          </Link>
        )}
      </nav>

      <div className="flex items-center space-x-2 md:hidden">
        {/* モバイル用ハンバーガーメニュー */}
        <div className="relative z-50 md:hidden">
          <button
            className="rounded p-2 focus:outline-none"
            onClick={() => setIsOpen(!isOpen)}
          >
            <span className="sr-only">Open menu</span>
            <Menu
              size={28}
              className={`absolute top-0 right-0 transition-transform duration-300 ${isOpen ? "rotate-90 opacity-0" : "rotate-0 opacity-100"}`}
            />
            <X
              size={28}
              className={`absolute top-0 right-0 transition-transform duration-300 ${isOpen ? "rotate-0 opacity-100" : "-rotate-90 opacity-0"}`}
            />
          </button>
        </div>
      </div>

      {/* モバイルメニュー */}
      <nav
        className={`absolute top-16 left-0 flex w-full flex-col items-center overflow-hidden bg-[#1f3258]/95 py-4 transition-all duration-300 md:hidden ${isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}
      >
        <Link
          href="/"
          className={`py-2 transition-colors duration-300 hover:text-yellow-500 ${isActive("/") ? "underline" : ""}`}
          onClick={() => setIsOpen(false)}
          aria-current={isActive("/") ? "page" : undefined}
        >
          Home
        </Link>
        <Link
          href="/about"
          className={`py-2 transition-colors duration-300 hover:text-yellow-500 ${isActive("/about") ? "underline" : ""}`}
          onClick={() => setIsOpen(false)}
          aria-current={isActive("/about") ? "page" : undefined}
        >
          About
        </Link>
        <Link
          href="/works"
          className={`py-2 transition-colors duration-300 hover:text-yellow-500 ${isActive("/works") ? "underline" : ""}`}
          onClick={() => setIsOpen(false)}
          aria-current={isActive("/works") ? "page" : undefined}
        >
          Works
        </Link>
        {session ? (
          <div>
            <button
              onClick={handleLogout}
              className="block rounded bg-gray-100 px-4 py-1 font-medium text-[#455698] transition-colors duration-300 hover:bg-gray-200"
            >
              ログアウト
            </button>
          </div>
        ) : (
          <Link
            href="/login"
            className="block rounded bg-gray-100 px-4 py-1 font-medium text-[#455698] transition-colors duration-300 hover:bg-gray-200"
          >
            管理者ログイン
          </Link>
        )}
      </nav>
    </header>
  );
}
