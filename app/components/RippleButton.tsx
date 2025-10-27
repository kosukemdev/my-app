"use client";
import { useState, MouseEvent } from "react";
import Link from "next/link";

type Ripple = { x: number; y: number; id: number };

export default function RippleButton({
  children,
  href,
  color = "bg-[#918DB1]",
  hoverColor = "hover:bg-[#7787aa]",
  textColor = "text-[#323b50]",
}: {
  children: React.ReactNode;
  href?: string;
  color?: string;
  hoverColor?: string;
  textColor?: string;
}) {
  const [ripples, setRipples] = useState<Ripple[]>([]);

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const id = Date.now();

    setRipples((prev) => [...prev, { x, y, id }]);
    setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r.id !== id));
    }, 600);
  };

  const button = (
    <button
      onClick={handleClick}
      className={`relative overflow-hidden ${color} ${hoverColor} ${textColor} font-semibold rounded px-6 py-2 transition cursor-pointer`}
    >
      {children}
      {ripples.map((r) => (
        <span
          key={r.id}
          className="absolute bg-white opacity-50 rounded-full animate-ripple"
          style={{
            left: r.x,
            top: r.y,
            width: "20px",
            height: "20px",
            transform: "translate(-50%, -50%)",
          }}
        />
      ))}
      <style jsx>{`
        @keyframes ripple {
          from {
            transform: scale(0);
            opacity: 0.7;
          }
          to {
            transform: scale(15);
            opacity: 0;
          }
        }
        .animate-ripple {
          animation: ripple 0.6s linear;
        }
      `}</style>
    </button>
  );

  return href ? <Link href={href}>{button}</Link> : button;
}
