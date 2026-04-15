"use client";

export default function NotesError({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <div style={{ padding: "20px" }}>
      <h2>Could not fetch notes.</h2>
      <p>{error.message}</p>
      <button onClick={() => reset()}>Try again</button>
    </div>
  );
}