import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Page Not Found",
  description: "The page you are looking for does not exist on BeamOptics.",
  path: "/404",
  noIndex: true,
});

export default function NotFound() {
  return (
    <main
      style={{
        minHeight: "56vh",
        display: "grid",
        placeItems: "center",
        padding: "24px",
        textAlign: "center",
        fontFamily: "Manrope, sans-serif",
        background:
          "radial-gradient(circle at 12% 18%, rgba(56, 189, 248, 0.12), rgba(56, 189, 248, 0) 34%), #f8fcff",
      }}
    >
      <section>
        <h1 style={{ fontSize: "clamp(32px, 6vw, 52px)", color: "#0b2f52", margin: 0 }}>404</h1>
        <p style={{ marginTop: "12px", color: "#3f5a74", lineHeight: 1.7 }}>
          The page was moved, deleted, or is not available.
        </p>
      </section>
    </main>
  );
}
