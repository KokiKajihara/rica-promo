import type React from "react";
import {
  AbsoluteFill,
  CanvasImage,
  Easing,
  Interactive,
  interpolate,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
  type InteractivitySchema,
} from "remotion";
import { clamp, colors, display, jp } from "../theme";

type ReleaseProps = {
  readonly kicker: string;
  readonly title: string;
  readonly jacket: string;
  readonly track1: string;
  readonly track2: string;
  readonly tilt: number;
  readonly style?: React.CSSProperties;
};

const ReleaseSceneInner: React.FC<ReleaseProps> = ({
  kicker,
  title,
  jacket,
  track1,
  track2,
  tilt,
  style,
}) => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();
  const ease = Easing.bezier(0.16, 1, 0.3, 1);
  const jacketSize = 820;

  return (
    <AbsoluteFill
      style={{ backgroundColor: colors.ink, overflow: "hidden", ...style }}
    >
      <CanvasImage
        name="Backdrop"
        src={staticFile(jacket)}
        width={width}
        height={height}
        fit="cover"
        premountFor={fps}
        style={{
          position: "absolute",
          filter: "blur(40px) brightness(0.35) saturate(1.4)",
          scale: 1.2,
        }}
      />
      <div
        style={{
          position: "absolute",
          top: 170,
          left: 0,
          right: 0,
          textAlign: "center",
          fontFamily: display,
          fontSize: 56,
          letterSpacing: 14,
          color: colors.red,
          opacity: interpolate(frame, [0, 10], [0, 1], clamp),
        }}
      >
        {kicker}
      </div>
      <CanvasImage
        name="Jacket"
        src={staticFile(jacket)}
        width={jacketSize}
        height={jacketSize}
        premountFor={fps}
        style={{
          position: "absolute",
          left: (width - jacketSize) / 2,
          top: 290,
          boxShadow: "0 40px 120px rgba(0,0,0,0.7), 0 0 0 4px rgba(255,255,255,0.08)",
          rotate: interpolate(frame, [0, 0.8 * fps, 5 * fps], [`${tilt * 3}deg`, `${tilt}deg`, "0deg"], {
            ...clamp,
            easing: ease,
          }),
          scale: interpolate(frame, [0, 0.8 * fps, 5 * fps], [1.25, 1, 0.97], {
            ...clamp,
            easing: ease,
            output: "perceptual-scale",
          }),
          opacity: interpolate(frame, [0, 6], [0, 1], clamp),
        }}
      />
      <div
        style={{
          position: "absolute",
          top: 1190,
          left: 90,
          right: 90,
          textAlign: "center",
          fontFamily: display,
          fontSize: 150,
          lineHeight: 1,
          color: colors.paper,
          opacity: interpolate(frame, [0.6 * fps, 1 * fps], [0, 1], clamp),
          translate: interpolate(frame, [0.6 * fps, 1.2 * fps], ["0px 50px", "0px 0px"], {
            ...clamp,
            easing: ease,
          }),
        }}
      >
        {title}
      </div>
      <div
        style={{
          position: "absolute",
          top: 1400,
          left: 140,
          right: 140,
          display: "flex",
          flexDirection: "column",
          gap: 22,
          fontFamily: jp,
          fontWeight: 900,
          fontSize: 54,
          color: colors.paper,
        }}
      >
        <div
          style={{
            display: "flex",
            gap: 36,
            borderBottom: "2px solid rgba(244,239,233,0.25)",
            paddingBottom: 18,
            opacity: interpolate(frame, [1.3 * fps, 1.6 * fps], [0, 1], clamp),
            translate: interpolate(frame, [1.3 * fps, 1.8 * fps], ["-60px 0px", "0px 0px"], {
              ...clamp,
              easing: ease,
            }),
          }}
        >
          <span style={{ fontFamily: display, fontWeight: 400, color: colors.red }}>01</span>
          {track1}
        </div>
        <div
          style={{
            display: "flex",
            gap: 36,
            borderBottom: "2px solid rgba(244,239,233,0.25)",
            paddingBottom: 18,
            opacity: interpolate(frame, [1.6 * fps, 1.9 * fps], [0, 1], clamp),
            translate: interpolate(frame, [1.6 * fps, 2.1 * fps], ["-60px 0px", "0px 0px"], {
              ...clamp,
              easing: ease,
            }),
          }}
        >
          <span style={{ fontFamily: display, fontWeight: 400, color: colors.red }}>02</span>
          {track2}
        </div>
      </div>
    </AbsoluteFill>
  );
};

const releaseSchema = {
  kicker: { type: "text-content", default: "", description: "Kicker" },
  title: { type: "text-content", default: "", description: "Release title" },
  jacket: { type: "asset", default: "noise-jacket.jpg", description: "Jacket image (public/)" },
  track1: { type: "text-content", default: "", description: "Track 01" },
  track2: { type: "text-content", default: "", description: "Track 02" },
  tilt: { type: "number", default: -4, min: -15, max: 15, step: 1, hiddenFromList: false, description: "Jacket tilt" },
} as const satisfies InteractivitySchema;

export const ReleaseScene = Interactive.withSchema({
  Component: ReleaseSceneInner,
  componentName: "<ReleaseScene>",
  schema: releaseSchema,
  wrapInSequence: true,
});
