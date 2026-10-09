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
import { GlitchText, NoiseWave } from "../elements";
import { brush, clamp, colors, display, jp } from "../theme";

type OutroProps = {
  readonly cta: string;
  readonly platforms: string;
  readonly url: string;
  readonly style?: React.CSSProperties;
};

const OutroSceneInner: React.FC<OutroProps> = ({ cta, platforms, url, style }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const ease = Easing.bezier(0.16, 1, 0.3, 1);

  return (
    <AbsoluteFill
      style={{
        backgroundColor: colors.ink,
        alignItems: "center",
        overflow: "hidden",
        ...style,
      }}
    >
      <NoiseWave
        seed="outro"
        height={300}
        intensity={interpolate(frame, [0, 12, 5 * fps], [1, 0.4, 0.25], clamp)}
        style={{ top: 330, opacity: 0.85 }}
      />
      <div
        style={{
          position: "absolute",
          top: 300,
          fontFamily: brush,
          fontSize: 300,
          lineHeight: 1.2,
          color: colors.red,
          rotate: "-6deg",
          textShadow: "0 10px 50px rgba(255,31,45,0.45)",
          opacity: interpolate(frame, [0, 4], [0, 1], clamp),
          scale: interpolate(frame, [0, 14], [1.5, 1], {
            ...clamp,
            easing: ease,
            output: "perceptual-scale",
          }),
        }}
      >
        Rica
      </div>
      <GlitchText
        seed="outro-cta"
        glitch={interpolate(frame, [0.6 * fps, 0.6 * fps + 12], [20, 0], clamp)}
        style={{
          position: "absolute",
          top: 820,
          fontFamily: display,
          fontSize: 140,
          letterSpacing: 6,
          opacity: interpolate(frame, [0.6 * fps, 0.6 * fps + 3], [0, 1], clamp),
        }}
      >
        {cta}
      </GlitchText>
      <div
        style={{
          position: "absolute",
          top: 1010,
          fontFamily: jp,
          fontWeight: 900,
          fontSize: 52,
          color: colors.paper,
          letterSpacing: 2,
          opacity: interpolate(frame, [1.1 * fps, 1.5 * fps], [0, 1], clamp),
          translate: interpolate(frame, [1.1 * fps, 1.7 * fps], ["0px 30px", "0px 0px"], {
            ...clamp,
            easing: ease,
          }),
        }}
      >
        {platforms}
      </div>
      <div
        style={{
          position: "absolute",
          top: 1110,
          fontFamily: jp,
          fontWeight: 500,
          fontSize: 44,
          color: colors.dim,
          opacity: interpolate(frame, [1.4 * fps, 1.8 * fps], [0, 1], clamp),
        }}
      >
        {url}
      </div>
      <CanvasImage
        name="NovaChord logo"
        src={staticFile("novachord-logo.jpg")}
        width={230}
        height={230}
        premountFor={fps}
        style={{
          position: "absolute",
          top: 1380,
          left: 425,
          borderRadius: 32,
          opacity: interpolate(frame, [2 * fps, 2.5 * fps], [0, 1], clamp),
          scale: interpolate(frame, [2 * fps, 2.6 * fps], [0.8, 1], {
            ...clamp,
            easing: ease,
            output: "perceptual-scale",
          }),
        }}
      />
      <div
        style={{
          position: "absolute",
          top: 1630,
          fontFamily: display,
          fontSize: 44,
          letterSpacing: 12,
          color: colors.paper,
          opacity: interpolate(frame, [2.3 * fps, 2.8 * fps], [0, 1], clamp),
        }}
      >
        NOVACHORD · SIDE-B
      </div>
    </AbsoluteFill>
  );
};

const outroSchema = {
  cta: { type: "text-content", default: "NOW STREAMING", description: "Call to action" },
  platforms: { type: "text-content", default: "", description: "Platforms" },
  url: { type: "text-content", default: "", description: "URL" },
} as const satisfies InteractivitySchema;

export const OutroScene = Interactive.withSchema({
  Component: OutroSceneInner,
  componentName: "<OutroScene>",
  schema: outroSchema,
  wrapInSequence: true,
});
