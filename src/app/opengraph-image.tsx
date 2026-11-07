import { skills } from "@/static";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

/*
 * Link preview image (WhatsApp, X, Slack, iMessage…): a 1200×630 version of
 * the hero, rendered at build time. X falls back to this image too.
 * Assets live in app/_og: Bricolage as WOFF (the renderer can't read WOFF2)
 * and the photo as JPEG (it can't read WebP).
 */
export const alt =
  "Adeyinka Akinsanya, software engineer and frontend developer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const BG = "#000000";
const FG = "#F2F2F2";
const DIM = "#9A9A9A";
const EDGE = "#E4E4E4";
const ACCENT = "#BFBFBF";
const SURFACE = "#111111";

const asset = (file: string) =>
  readFile(join(process.cwd(), "src/app/_og", file));
const dataUri = (buf: Buffer, type: string) =>
  `data:${type};base64,${buf.toString("base64")}`;

export default async function OpengraphImage() {
  const [regular, bold, photo, logo] = await Promise.all([
    asset("bricolage-500.woff"),
    asset("bricolage-800.woff"),
    asset("photo.jpg"),
    readFile(join(process.cwd(), "public/android-chrome-192x192.png")),
  ]);

  const ticker = skills.slice(0, 12).join("  /  ").toUpperCase();

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          background: BG,
          color: FG,
          fontFamily: "Bricolage",
        }}
      >
        <div
          style={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0 84px",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
              <img
                src={dataUri(logo, "image/png")}
                width={52}
                height={52}
                alt=""
                style={{
                  borderRadius: 999,
                  border: `3px solid ${EDGE}`,
                  boxShadow: `4px 4px 0 ${ACCENT}`,
                  background: SURFACE,
                }}
              />
              <div style={{ display: "flex", fontSize: 32, fontWeight: 800 }}>
                adeyinka<span style={{ color: ACCENT }}>.</span>
              </div>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                marginTop: 34,
                fontSize: 126,
                fontWeight: 800,
                lineHeight: 0.86,
                letterSpacing: -5,
              }}
            >
              <span>Adeyinka</span>
              <span style={{ color: ACCENT }}>Akinsanya</span>
            </div>
            <div
              style={{
                display: "flex",
                marginTop: 28,
                fontSize: 30,
                fontWeight: 500,
                color: DIM,
              }}
            >
              Software engineer and frontend developer
            </div>
          </div>

          <div style={{ display: "flex", position: "relative", marginTop: 10 }}>
            <img
              src={dataUri(photo, "image/jpeg")}
              width={330}
              height={330}
              alt=""
              style={{
                borderRadius: 28,
                border: `4px solid ${EDGE}`,
                boxShadow: `14px 14px 0 ${ACCENT}`,
                transform: "rotate(-3deg)",
                objectFit: "cover",
              }}
            />
            <div
              style={{
                position: "absolute",
                top: -22,
                left: -42,
                display: "flex",
                padding: "12px 20px",
                fontSize: 22,
                fontWeight: 800,
                letterSpacing: 1,
                color: "#0A0A0A",
                background: ACCENT,
                border: `3px solid ${EDGE}`,
                borderRadius: 999,
                transform: "rotate(-6deg)",
              }}
            >
              AVAILABLE FOR WORK
            </div>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            height: 74,
            padding: "0 40px",
            background: "#0B0B0B",
            borderTop: `4px solid ${EDGE}`,
            fontSize: 26,
            fontWeight: 800,
            letterSpacing: 0.5,
            whiteSpace: "nowrap",
            overflow: "hidden",
          }}
        >
          {ticker}
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Bricolage", data: regular, weight: 500, style: "normal" },
        { name: "Bricolage", data: bold, weight: 800, style: "normal" },
      ],
    },
  );
}
