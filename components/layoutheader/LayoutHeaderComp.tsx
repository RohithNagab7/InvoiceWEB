"use client";
import { NavLinksData } from "@/libs/GlobalData";
import Link from "next/link";
import { usePathname } from "next/navigation";

function LayoutHeaderComp() {
  const pathname = usePathname();
  return (
    <div className="flex justify-between items-center py-6 px-6 border-b-orange-400 border-b-2">
      <p className="text-orange-400 text-3xl">Invoice Web</p>

      <div className="flex gap-6 justify-center items-center">
        {NavLinksData.map((link) => {
          const isActive = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`hover:text-orange-400 font-bold ${
                isActive ? "text-orange-400 " : ""
              }`}
            >
              {link.name}
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default LayoutHeaderComp;
