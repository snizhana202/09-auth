// app/notes/filter/[...slug]/page.tsx

import {
  QueryClient,
  HydrationBoundary,
  dehydrate,
} from "@tanstack/react-query";
import { fetchNotesServer  } from "@/lib/api/serverApi";
import NotesClient from "./Notes.client";
import type { Metadata } from "next";
import { cookies } from "next/headers";

interface NotesFiltersProps {
  params: Promise<{ slug: string[] }>;
}

export async function generateMetadata(
 { params }: NotesFiltersProps): Promise<Metadata> {
    const {slug} = await params;
  const category = slug[0] === "all" ? "" : slug[0];

  return {
    title: `Notes - ${category || "All"}`,
    description: `List of notes filtered by ${category || "all categories"}`,
    openGraph: {
      title: `Notes - ${category || "All"}`,
      description: `List of notes filtered by ${category || "all categories"}`,
      url: `http://localhost:3000/notes/filter/${slug.join("/")}`,
      images: [
        {
          url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg?_gl=1*7djz2s*_gcl_au*MjAyMjUwMDU3Ni4xNzc0OTgwMDMw*_ga*MTM4ODEyNzAxMy4xNzUzNjkzODE0*_ga_PW0T7S5LDQ*czE3NzU1NzkyNzUkbzMxNiRnMSR0MTc3NTU4MDA5MiRqNTMkbDAkaDA.",
          width: 1200,
          height: 630,
          alt: "Note Hub Open Graph Image",
        },
      ],
    },
  };
}

export default async function NotesFilters({ params }: NotesFiltersProps) {
  const {slug} = await params ?? ["all"];
  const category = slug[0] === "all" ? "" : slug[0];

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["notes", category],
    queryFn: async () => {
       const cookieStore = await cookies();
      return fetchNotesServer( 1, 12, category, cookieStore.toString());
    },
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="rounded-xl border border-border bg-surface p-8 shadow-sm">
        <h1>Notes List</h1>
        <NotesClient tag={category} />
      </div>
    </HydrationBoundary>
  );
}
