import { ImageResponse } from "next/og";
import { SITE_NAME } from "@/lib/seo";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default function TwitterImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "68px 78px",
          color: "#ffffff",
          background:
            "radial-gradient(circle at 12% 18%, rgba(56, 189, 248, 0.32), rgba(56, 189, 248, 0) 34%), radial-gradient(circle at 88% 82%, rgba(14, 165, 233, 0.28), rgba(14, 165, 233, 0) 36%), linear-gradient(135deg, #061b35 0%, #0b5d95 58%, #0891b2 100%)",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            alignSelf: "flex-start",
            padding: "10px 18px",
            borderRadius: "999px",
            border: "1px solid rgba(255,255,255,0.36)",
            fontSize: 22,
            fontWeight: 700,
            letterSpacing: "0.06em",
            textTransform: "uppercase",
            marginBottom: 26,
            background: "rgba(15, 23, 42, 0.3)",
          }}
        >
          BeamOptics
        </div>
        <div
          style={{
            fontSize: 74,
            lineHeight: 1.06,
            fontWeight: 800,
            letterSpacing: "-0.02em",
            maxWidth: 980,
          }}
        >
          {SITE_NAME}
        </div>
        <div
          style={{
            fontSize: 36,
            lineHeight: 1.3,
            marginTop: 18,
            color: "rgba(255,255,255,0.92)",
            maxWidth: 980,
          }}
        >
          Precision diagnostic and analytical instrumentation for real-world deployment.
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
