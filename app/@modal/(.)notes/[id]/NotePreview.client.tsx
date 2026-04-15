// app/@modal/(.)notes/[id]/NotePreview.client.tsx
"use client";

import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { fetchNoteById } from "@/lib/api";
import css from "@/components/NotePreview/NotePreview.module.css";
import Modal from "@/components/Modal/Modal";
import type { Note } from "@/types/note";

type Props = {
  id: string;
};

export default function NotePreviewClient({ id }: Props) {
  const router = useRouter();

  const { data, isLoading, error } = useQuery<Note>({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
    refetchOnMount: false,
  });


  if (isLoading) {
    return (
      <Modal onClose={() => router.back()}>
        <p>Loading...</p>
      </Modal>
    );
  }

  if (error) {
    return (
      <Modal onClose={() => router.back()}>
        <p>Error loading note.</p>
      </Modal>
    );
  }

  if (!data) {
    return (
      <Modal onClose={() => router.back()}>
        <p>Note not found.</p>
      </Modal>
    );
  }

  return (
    <Modal onClose={() => router.back()}>
      <div className={css.container}>
        <button onClick={() => router.back()}>Close</button>
        <h2>{data.title}</h2>
        <p>{data.content}</p>
        <p className={css.tag}>{data.tag}</p>
        <p className={css.date}>
          {new Date(data.createdAt).toLocaleDateString()}
        </p>
      </div>
    </Modal>
  );
}
