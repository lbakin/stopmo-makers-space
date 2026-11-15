"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function Nav({ links }: { links: { path: string; title: string }[] }) {
  const pathname = usePathname();
  return (
    <nav aria-label="Pages">
      <ul>
        {links.map((link) => {
          const current = pathname === link.path ? "page" : pathname.startsWith(`${link.path}/`) ? "location" : undefined;
          return (
            <li key={link.path}>
              <Link href={link.path} aria-current={current}>
                {link.title}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
