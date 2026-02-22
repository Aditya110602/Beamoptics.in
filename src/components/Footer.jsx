export default function Footer() {
  const email = "info@beamoptics.in";

  return (
    <footer
      style={{
        padding: "18px 16px",
        background: "linear-gradient(120deg, #0b1f3a, #12345c)",
        color: "#e2e8f0",
        textAlign: "center",
        borderTop: "1px solid rgba(125,211,252,0.35)",
      }}
    >
      <p style={{ margin: 0, fontSize: "13px", lineHeight: 1.7 }}>
        &copy; 2026 BEAM Scientific Pvt. Ltd. | ISO 13485 Certified |{" "}
        <a
          href={`mailto:${email}`}
          style={{
            color: "#ffffff",
            textDecoration: "none",
            borderBottom: "1px solid rgba(125,211,252,0.65)",
          }}
        >
          {email}
        </a>
      </p>
    </footer>
  );
}
