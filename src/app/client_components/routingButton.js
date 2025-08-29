"use client";
import { useRouter } from "next/navigation";

export default function RoutingButton({href, children, className = ""}) {
  const router = useRouter();

  const handleClick = () => {
    router.push(href);
  };

  return (
    <button
      onClick={handleClick}
      className={className}
    >
      {children}
    </button>
  );
}