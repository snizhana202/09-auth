import { NextResponse } from "next/server";
import { AxiosError } from "axios";

import { api } from "../api";

export async function GET() {
  try {
    const { data } = await api.get("/categories");

    return NextResponse.json(data);
  } catch (error) {
    const axiosError = error as AxiosError;
    return NextResponse.json(
      {
        error:
          (axiosError.response?.data as { error?: string })?.error ??
          axiosError.message,
      },
      {
        status: axiosError.status,
      },
    );
  }
}
