"use client";

import css from "./NoteForm.module.css";
import { createNote, type CreateNoteData } from "@/lib/clientApi";
import type { NoteTag } from "../../types/note";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNoteStore } from "@/lib/store/noteStore";
import { useRouter } from "next/navigation";

// export interface NoteFormProps {
//   onCancel: () => void;
// }

export default function NoteForm() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { draft, setDraft, clearDraft } = useNoteStore();

  const mutation = useMutation({
    mutationFn: (newNote: CreateNoteData) => createNote(newNote),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
      clearDraft();
      router.back();
    },
  });

  const handleChange = (field: keyof typeof draft, value: string) => {
    setDraft({ ...draft, [field]: value });
  };

  return (
    <form
      className={css.form}
      action={async (formData: FormData) => {
        const newNote: CreateNoteData = {
          title: formData.get("title") as string,
          content: formData.get("content") as string,
          tag: formData.get("tag") as NoteTag,
        };
         if (!newNote.title || newNote.title.length < 3) {
          alert("Title must be at least 3 characters");
          return;
        }
        if (newNote.title.length > 50) {
          alert("Title must be at most 50 characters");
          return;
        }
        if (newNote.content && newNote.content.length > 500) {
          alert("Content must be at most 500 characters");
          return;
        }

        await mutation.mutateAsync(newNote);
      }}
    >
      <div className={css.formGroup}>
        <label htmlFor="title">Title</label>
        <input
          id="title"
          name="title"
          type="text"
          value={draft.title}
          onChange={(e) => handleChange("title", e.target.value)}
          className={css.input}
          required
          minLength={3}
          maxLength={50}
        />
      </div>

      <div className={css.formGroup}>
        <label htmlFor="content">Content</label>
        <input
          id="content"
          name="content"
          value={draft.content}
          onChange={(e) => handleChange("content", e.target.value)}
          className={css.textarea}
          maxLength={500}
        />
      </div>

      <div className={css.formGroup}>
        <label htmlFor="tag">Tag</label>
        <select
          id="tag"
          name="tag"
          value={draft.tag}
          onChange={(e) => handleChange("tag", e.target.value)}
          className={css.select}
          required
        >
          <option value="Todo">Todo</option>
          <option value="Work">Work</option>
          <option value="Personal">Personal</option>
          <option value="Meeting">Meeting</option>
          <option value="Shopping">Shopping</option>
        </select>
      </div>

      <div className={css.actions}>
        <button type="button" className={css.cancelButton} onClick={() => router.back()}>
          Cancel
        </button>
        <button
          type="submit"
          className={css.submitButton}
          disabled={mutation.isPending}
        >
          {mutation.isPending ? "Creating..." : "Create note"}
        </button>
      </div>
    </form>
  );
}
