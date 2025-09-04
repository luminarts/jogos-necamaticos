"use client";
import { useRouter } from "next/navigation";

export default function RoutingButton({href, children}) {
  const router = useRouter();

  const handleClick = () => {
    router.push(href);
  };

  return (
    <button
      onClick={handleClick}
      className="border-2 border-black-500 rounded-lg m-4 p-2 hover:text-white transition hover:bg-black hover:scale-110"
    >
      {children}
    </button>
  );
}