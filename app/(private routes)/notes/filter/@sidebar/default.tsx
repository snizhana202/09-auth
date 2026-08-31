"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import css from "@/components/SidebarNotes/SidebarNotes.module.css";

export default function NotesSidebar() {
  const pathname = usePathname();
  const tags = ["Todo", "Work", "Personal", "Meeting", "Shopping"];

  const isActive = (tag: string) => pathname === `/notes/filter/${tag}`;

  return (
    <ul className={css.menuList}>
      <li className={css.menuItem}>
        <Link
          href={`/notes/filter/all`}
          className={`${css.menuLink} ${
            pathname === "/notes/filter/all" ? css.active : ""
          }`}
        >
          All notes
        </Link>
      </li>
      {tags.map((tag) => (
        <li key={tag} className={css.menuItem}>
          <Link
            href={`/notes/filter/${tag}`}
            className={`${css.menuLink} ${isActive(tag) ? css.active : ""}`}
          >
            {tag}
          </Link>
        </li>
      ))}
    </ul>
  );
}
