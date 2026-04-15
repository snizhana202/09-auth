type Props = {
  children: React.ReactNode;
  sidebar: React.ReactNode;
}

export default function NotesLayout({ sidebar, children }: Props) {
  return (
    <section style={{ display: "grid", gridTemplateColumns: "208px 1fr", gap: "0" }}>
      <aside style={{ backgroundColor: "#444" }}>
        {sidebar}
      </aside>
      <div style={{ borderLeft: "1px solid #dee2e6", paddingLeft: "24px" }}>
        {children}
        </div>
    </section>
  );
};


