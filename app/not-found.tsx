
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "404 — Page Not Found | NoteHub",
  description: "The page you are looking for does not exist.",
  openGraph: {
    title: "404 — Page Not Found | NoteHub",
    description: "The page you are looking for does not exist.",
    url: "http://localhost:3000/not-found",
    images: [
      {
        url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg?_gl=1*7djz2s*_gcl_au*MjAyMjUwMDU3Ni4xNzc0OTgwMDMw*_ga*MTM4ODEyNzAxMy4xNzUzNjkzODE0*_ga_PW0T7S5LDQ*czE3NzU1NzkyNzUkbzMxNiRnMSR0MTc3NTU4MDA5MiRqNTMkbDAkaDA.",
        width: 1200,
        height: 630,
        alt: "NoteHub Open Graph Image",
      }
    ]
  }
};

export default function NotFound() {

  return (
    <div>
      <h1>404 - Page not found</h1>
      <p>You will be redirected to the home page automatically.</p>
    </div>
  );
}
