import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "TGAP Real Estate Investment Group";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          background: "linear-gradient(180deg, #0A0A0A 0%, #141414 100%)",
          color: "#F5F0E8",
          fontFamily: "Georgia, serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 24, marginBottom: 28 }}>
          <div style={{ width: 60, height: 2, background: "#C9A84C" }} />
          <div style={{ fontSize: 22, letterSpacing: 10, color: "#C9A84C", fontFamily: "Arial, sans-serif" }}>
            CENTRAL UTAH · NATIONWIDE REACH
          </div>
          <div style={{ width: 60, height: 2, background: "#C9A84C" }} />
        </div>
        <div style={{ fontSize: 150, fontWeight: 600, letterSpacing: 40, color: "#C9A84C", lineHeight: 1 }}>
          TGAP
        </div>
        <div style={{ fontSize: 30, letterSpacing: 8, marginTop: 28, color: "#A09888", fontFamily: "Arial, sans-serif" }}>
          REAL ESTATE INVESTMENT & DEVELOPMENT
        </div>
        <div style={{ fontSize: 34, marginTop: 56, fontStyle: "italic", color: "#F5F0E8" }}>
          We don&apos;t just find opportunity. We create it.
        </div>
      </div>
    ),
    { ...size }
  );
}
