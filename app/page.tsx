import Link from "next/link";

export default function HomePage() {
  return (
    <main style={{ padding: "2rem" }}>
      <h1>Home</h1>

      <div style={{ display: "flex", gap: "12px", marginTop: "16px" }}>
        <Link href="/portfolio" style={buttonStyle}>
          Portfolio
        </Link>

        <Link href="/study" style={buttonStyle}>
          Study
        </Link>
      </div>
    </main>
  );
}

const buttonStyle: React.CSSProperties = {
  display: "inline-block",
  padding: "10px 14px",
  borderRadius: "10px",
  border: "1px solid #ddd",
  textDecoration: "none",
};
