// app/notes/[id]/page.tsx

import {
  QueryClient,
  HydrationBoundary,
  dehydrate,
} from "@tanstack/react-query";
import { fetchNoteById } from "@/lib/api";
import NoteDetailsClient from "./NoteDetails.client";
import { Metadata } from "next";


type Props = {
  params: { id: string };
};

export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {
  const { id } = params;
  const note = await fetchNoteById(id);

  const previewContent = note?.content
    ? note.content.slice(0, 100) + "..."
    : "No content available";

  return {
    title: note?.title || "Note details",
    description: previewContent,
    openGraph: {
      title: note?.title || "Note details",
      description: previewContent,
      url: `http://localhost:3000/notes/${id}`,
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

export default async function NoteDetails({ params }: Props) {
  const { id } = params;
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NoteDetailsClient id={id} />
    </HydrationBoundary>
  );
}


