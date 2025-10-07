// app/components/Header.tsx
"use client";
import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header
      className={`w-full px-4 py-4 flex items-center justify-between fixed top-0 left-0 bg-purple-900 text-gray-100 shadow-md z-50 ${isOpen ? "h-auto" : "h-16"}`}
    >
      {/* サイト名 */}

      <h2 className="text-2xl font-bold ">
        <Link href="/">Kousuke Masaki Portfolio</Link>
      </h2>

      {/* デスクトップナビ */}
      <nav className="space-x-6 hidden md:flex">
        <Link
          href="/"
          className="hover:text-yellow-500 transition-colors duration-300"
        >
          Home
        </Link>
        <Link
          href="/about"
          className="hover:text-yellow-500 transition-colors duration-300"
        >
          About
        </Link>
        <Link
          href="/works"
          className="hover:text-yellow-500 transition-colors duration-300"
        >
          Works
        </Link>
        <Link
          href="/contact"
          className="hover:text-yellow-500 transition-colors duration-300"
        >
          Contact
        </Link>
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
        className={`absolute bg-purple-900 top-16 left-0 w-full flex flex-col items-center py-4 md:hidden transition-all duration-300 overflow-hidden ${isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}
      >
        <Link
          href="/"
          className="py-2 hover:text-yellow-500 transition-colors duration-300"
          onClick={() => setIsOpen(false)}
        >
          Home
        </Link>
        <Link
          href="/about"
          className="py-2 hover:text-yellow-500 transition-colors duration-300"
          onClick={() => setIsOpen(false)}
        >
          About
        </Link>
        <Link
          href="/works"
          className="py-2 hover:text-yellow-500 transition-colors duration-300"
          onClick={() => setIsOpen(false)}
        >
          Works
        </Link>
        <Link
          href="/contact"
          className="py-2 hover:text-yellow-500 transition-colors duration-300"
          onClick={() => setIsOpen(false)}
        >
          Contact
        </Link>
      </nav>
    </header>
  );
}
