"use client";

import { useEffect, useState } from "react";
import { FaArrowUp } from "react-icons/fa6";

export default function ScrollToTopButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > 300);
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <button
      onClick={scrollToTop}
      aria-label="Volver arriba"
      className={`
        fixed bottom-6 right-6 z-50
        flex items-center justify-center
        w-12 h-12 rounded-full

        bg-[#2563EB] text-white
        shadow-lg shadow-blue-900/20

        transition-all duration-300 ease-out
        hover:bg-[#1E3A8A] hover:scale-110

        focus:outline-none focus:ring-4 focus:ring-blue-300

        ${
          visible
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-6 pointer-events-none"
        }
      `}
    >
      <FaArrowUp className="text-lg font-bold" />
    </button>
  );
}
