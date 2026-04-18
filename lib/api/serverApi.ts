import type { Note } from "../../types/note";
import type { CheckSessionRequest } from "@/types/auth";
import type { User } from "@/types/user";
import api from "./api";

export async function fetchNotesServer(
  cookies: string,
  page: number,
  perPage?: number,
  tag?: string,
  search?: string,
) {
  const params: Record<string, unknown> = {
    page,
    perPage,
    search,
    ...(tag && tag !== "all" && { tag }),
  };

  const { data } = await api.get("/notes", {
    params,
    headers: { Cookie: cookies },
  });
  return data;
}

export async function fetchNoteByIdServer(
  cookies: string,
  id: string,
): Promise<Note> {
  const { data } = await api.get(`/notes/${id}`, {
    headers: { Cookie: cookies },
  });
  return data;
}

export async function checkSessionServer(cookies: string): Promise<boolean> {
  const { data } = await api.get<CheckSessionRequest>("/auth/session", {
    headers: { Cookie: cookies },
  });
  return data.success;
}

export async function getMeServer(cookies: string): Promise<User> {
  const { data } = await api.get<User>("/auth/me", {
    headers: { Cookie: cookies },
  });
  return data;
}
