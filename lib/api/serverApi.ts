import type { Note } from "../../types/note";
import type { CheckSessionResponse } from "@/types/auth";
import type { User } from "@/types/user";
import api from "./api";
import { cookies } from 'next/headers';
import type { AxiosResponse } from "axios";

export async function fetchNotesServer(
  page: number,
  perPage?: number,
  tag?: string,
  search?: string,
) {
  const cookieStore = await cookies();
  const params: Record<string, unknown> = {
    page,
    perPage,
    search,
    ...(tag && tag !== "all" && { tag }),
  };

  const { data } = await api.get("/notes", {
    params,
    headers: { Cookie: cookieStore.toString() },
  });
  return data;
}

export async function fetchNoteByIdServer(id: string,): Promise<Note> {
  const cookieStore = cookies().toString
  const { data } = await api.get(`/notes/${id}`, {
    headers: { Cookie: cookieStore.toString() },
  });
  return data;
}

export async function checkSessionServer(): Promise<AxiosResponse<CheckSessionResponse>> {
  const cookieStore = cookies().toString();
  const response  = await api.get<CheckSessionResponse>("/auth/session", {
    headers: { Cookie: cookieStore },
  });
  return response;
}

export async function getMeServer(): Promise<User> {
  const cookieStore = await cookies();
  const { data } = await api.get<User>("/users/me", {
    headers: { Cookie: cookieStore.toString() },
  });
  return data;
}
