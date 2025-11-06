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
      className={`w-full px-4 py-4 flex items-center justify-between fixed top-0 left-0 bg-[#455698] text-gray-100 shadow-md z-50 ${isOpen ? "h-auto" : "h-16"}`}
    >
      {/* サイト名 */}

      <h2 className="text-2xl font-bold ">
        <Link href="/">Kosuke Masaki Portfolio</Link>
      </h2>

      {/* デスクトップナビ */}
      <nav className="space-x-6 hidden md:flex md:items-center">
        <Link
          href="/"
          className="relative group"
          aria-current={isActive("/") ? "page" : undefined}
        >
          Home
          <span
            className={`absolute -bottom-0.5 left-0 block h-0.5 bg-gray-100 transition-all duration-300 origin-left ease-in-out ${
              isActive("/") ? "w-full" : "w-0 group-hover:w-full"
            }`}
          ></span>
        </Link>
        <Link
          href="/about"
          className="relative group"
          aria-current={isActive("/about") ? "page" : undefined}
        >
          About
          <span
            className={`absolute -bottom-0.5 left-0 block h-0.5 bg-gray-100 transition-all duration-300 origin-left ease-in-out ${
              isActive("/about") ? "w-full" : "w-0 group-hover:w-full"
            }`}
          ></span>
        </Link>
        <Link
          href="/works"
          className="relative group"
          aria-current={isActive("/works") ? "page" : undefined}
        >
          Works
          <span
            className={`absolute -bottom-0.5 left-0 block h-0.5 bg-gray-100 transition-all duration-300 origin-left ease-in-out ${
              isActive("/works") ? "w-full" : "w-0 group-hover:w-full"
            }`}
          ></span>
        </Link>
        {session ? (
          <div>
            <button
              onClick={handleLogout}
              className="block bg-gray-100 rounded text-[#455698] px-4 py-1 hover:bg-gray-200 transition-colors duration-300  font-medium"
            >
              ログアウト
            </button>
          </div>
        ) : (
          <Link
            href="/login"
            className="block bg-gray-100 rounded text-[#455698] px-4 py-1 hover:bg-gray-200 transition-colors duration-300  font-medium"
          >
            ログイン
          </Link>
        )}
      </nav>

      <div className="flex items-center space-x-2 md:hidden">
        {/* モバイル用ハンバーガーメニュー */}
        <div className="md:hidden relative z-50">
          <button
            className="p-2 rounded focus:outline-none"
            onClick={() => setIsOpen(!isOpen)}
          >
            <span className="sr-only">Open menu</span>
            <Menu
              size={28}
              className={`absolute right-0 top-0 transition-transform duration-300 ${isOpen ? "rotate-90 opacity-0" : "rotate-0 opacity-100"}`}
            />
            <X
              size={28}
              className={`absolute right-0 top-0 transition-transform duration-300 ${isOpen ? "rotate-0 opacity-100" : "-rotate-90 opacity-0"}`}
            />
          </button>
        </div>
      </div>

      {/* モバイルメニュー */}
      <nav
        className={`absolute bg-[#455698] top-16 left-0 w-full flex flex-col items-center py-4 md:hidden transition-all duration-300 overflow-hidden ${isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}
      >
        <Link
          href="/"
          className={`py-2 hover:text-yellow-500 transition-colors duration-300 ${isActive("/") ? "underline" : ""}`}
          onClick={() => setIsOpen(false)}
          aria-current={isActive("/") ? "page" : undefined}
        >
          Home
        </Link>
        <Link
          href="/about"
          className={`py-2 hover:text-yellow-500 transition-colors duration-300 ${isActive("/about") ? "underline" : ""}`}
          onClick={() => setIsOpen(false)}
          aria-current={isActive("/about") ? "page" : undefined}
        >
          About
        </Link>
        <Link
          href="/works"
          className={`py-2 hover:text-yellow-500 transition-colors duration-300 ${isActive("/works") ? "underline" : ""}`}
          onClick={() => setIsOpen(false)}
          aria-current={isActive("/works") ? "page" : undefined}
        >
          Works
        </Link>
        {session ? (
          <div>
            <button
              onClick={handleLogout}
              className="block bg-gray-100 rounded text-[#455698] px-4 py-1 hover:bg-gray-200 transition-colors duration-300  font-medium"
            >
              ログアウト
            </button>
          </div>
        ) : (
          <Link
            href="/login"
            className="block bg-gray-100 rounded text-[#455698] px-4 py-1 hover:bg-gray-200 transition-colors duration-300  font-medium"
          >
            ログイン
          </Link>
        )}
      </nav>
    </header>
  );
}
