import type { AxiosResponse } from "axios";
import type { Note, NoteTag } from "../../types/note";
import type {
  RegisterRequest,
  LoginRequest,
  CheckSessionResponse,
} from "@/types/auth";
import type { User } from "@/types/user";
import api from "./api";

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

// --- Notes ---

export async function fetchNotes(
  page: number,
  perPage?: number,
  tag?: string,
  search?: string,
): Promise<FetchNotesResponse> {
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
}

export async function fetchNoteById(id: string): Promise<Note> {
  const response: AxiosResponse<FetchNoteResponse> = await api.get(
    `/notes/${id}`,
  );
  return response.data.note;
}

export async function createNote(data: CreateNoteData): Promise<Note> {
  const response: AxiosResponse<FetchNoteResponse> = await api.post(
    "/notes",
    data,
  );
  return response.data.note;
}

export async function deleteNote(id: string): Promise<Note> {
  const response: AxiosResponse<FetchNoteResponse> = await api.delete(
    `/notes/${id}`,
  );
  return response.data.note;
}

// --- Auth ---

export const register = async (data: RegisterRequest) => {
  const res = await api.post<User>("/auth/register", data);
  return res.data;
};

export const login = async (data: LoginRequest) => {
  const res = await api.post<User>("/auth/login", data);
  return res.data;
};

export const logout = async () => {
  await api.post("/auth/logout");
};

export const checkSession = async () => {
  const { data } = await api.get<CheckSessionResponse>("/auth/session");
  return data.success;
};

export const getMe = async () => {
  const { data } = await api.get<User>("/users/me");
  return data;
};

export const updateMe = async (payload: Partial<User>) => {
  const { data } = await api.patch<User>("/users/me", payload);
  return data;
};
