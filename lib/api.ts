import axios from "axios";
import type { AxiosResponse } from "axios";
import type { Note, NoteTag } from "../types/note";

const BASE_URL = "https://notehub-public.goit.study/api";
const token = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

export interface CreateNoteData {
  title: string;
  content: string;
  tag: NoteTag;
}

export interface FetchNoteResponse {
  note: Note;
}

export async function fetchNotes(
  page: number,
  perPage?: number,
  tag?: string,
  search?: string,
): Promise<FetchNotesResponse> {
   try {
    const params: Record<string, unknown> = {
      page,
      perPage,
      search,
      ...(tag && tag !== "all" && { tag }),
    };

    const response: AxiosResponse<FetchNotesResponse> = await api.get("/notes", {
      params,
    });

    return response.data;
  } catch (error) {
    console.error("Failed to fetch notes:", error);
    throw error;
  }
}

export async function createNote(data: CreateNoteData): Promise<Note> {
  try {
    const response: AxiosResponse<FetchNoteResponse> = await api.post("/notes", data);
    return response.data.note;
  } catch (error) {
    console.error("Failed to create note:", error);
    throw error;
  }
}

export async function deleteNote(id: string): Promise<Note> {
  try {
    const response: AxiosResponse<FetchNoteResponse> = await api.delete(`/notes/${id}`);
    return response.data.note;
  } catch (error) {
    console.error("Failed to delete note:", error);
    throw error;
  }
}

export async function fetchNoteById(id: string): Promise<Note> {
  try {
    const response: AxiosResponse<Note> = await api.get(`/notes/${id}`);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch note details:", error);
    throw error;
  }
}

