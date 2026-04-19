// app/@modal/(.)notes/[id]/page.tsx

import {
  QueryClient,
  HydrationBoundary,
  dehydrate,
} from "@tanstack/react-query";
import { fetchNoteByIdServer  } from '@/lib/api/serverApi';
import NotePreviewClient from "./NotePreview.client";
import { cookies } from "next/headers";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function NotePreview({ params }: Props) {
  const { id } = await params;
  const queryClient = new QueryClient();
  const cookieStore = cookies();
  

  await queryClient.prefetchQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteByIdServer(cookieStore.toString()),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
        <NotePreviewClient id={id} />
    </HydrationBoundary>
  );
};


