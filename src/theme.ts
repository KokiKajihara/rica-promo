import { loadFont as loadAnton } from "@remotion/google-fonts/Anton";
import { loadFont as loadMarker } from "@remotion/google-fonts/PermanentMarker";
import { loadFont as loadLocalFont } from "@remotion/fonts";
import { staticFile } from "remotion";

export const display = loadAnton("normal", {
  weights: ["400"],
  subsets: ["latin"],
}).fontFamily;

export const brush = loadMarker("normal", {
  weights: ["400"],
  subsets: ["latin"],
}).fontFamily;

// Subset of Noto Sans JP containing only the glyphs used in the video.
// If you add new Japanese text, regenerate public/fonts/ with the new characters.
export const jp = "Noto Sans JP Subset";
for (const weight of ["500", "900"]) {
  loadLocalFont({
    family: jp,
    url: staticFile(`fonts/NotoSansJP-${weight}.woff2`),
    weight,
  });
}

export const colors = {
  ink: "#07060a",
  red: "#ff1f2d",
  magenta: "#ff2d8a",
  violet: "#6b2bff",
  paper: "#f4efe9",
  dim: "rgba(244, 239, 233, 0.62)",
};

export const clamp = {
  extrapolateLeft: "clamp",
  extrapolateRight: "clamp",
} as const;
