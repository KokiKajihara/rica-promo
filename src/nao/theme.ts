import { loadFont as loadBaskerville } from "@remotion/google-fonts/LibreBaskerville";
import { loadFont as loadInter } from "@remotion/google-fonts/Inter";

export const serif = loadBaskerville("normal", {
  weights: ["400"],
  subsets: ["latin"],
}).fontFamily;

loadBaskerville("italic", { weights: ["400"], subsets: ["latin"] });

export const sans = loadInter("normal", {
  weights: ["400", "500"],
  subsets: ["latin"],
}).fontFamily;

export const naoColors = {
  night: "#06101c",
  deep: "#071421",
  cream: "#efe8d8",
  blue: "#8dbbd3",
  mist: "#b9c6cd",
};

export const clamp = {
  extrapolateLeft: "clamp",
  extrapolateRight: "clamp",
} as const;
