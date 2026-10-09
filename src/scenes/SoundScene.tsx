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
import { clamp, colors, display, jp } from "../theme";

type SoundProps = {
  readonly lineA: string;
  readonly lineB: string;
  readonly message: string;
  readonly style?: React.CSSProperties;
};

const SoundSceneInner: React.FC<SoundProps> = ({
  lineA,
  lineB,
  message,
  style,
}) => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();
  const ease = Easing.bezier(0.16, 1, 0.3, 1);

  return (
    <AbsoluteFill
      style={{
        backgroundColor: colors.ink,
        overflow: "hidden",
        fontFamily: display,
        ...style,
      }}
    >
      <CanvasImage
        name="Rica backdrop"
        src={staticFile("rica.jpg")}
        width={width}
        height={height}
        fit="cover"
        premountFor={fps}
        style={{
          position: "absolute",
          filter: "grayscale(1) contrast(1.3) brightness(0.45)",
          transformOrigin: "50% 35%",
          scale: interpolate(frame, [0, 5 * fps], [1.5, 1.35], {
            ...clamp,
            output: "perceptual-scale",
          }),
        }}
      />
      <AbsoluteFill
        style={{ backgroundColor: colors.red, mixBlendMode: "multiply", opacity: 0.55 }}
      />
      <NoiseWave
        seed="sound"
        height={420}
        intensity={interpolate(frame, [0, 10, 5 * fps], [0.2, 0.9, 0.6], clamp)}
        color={colors.red}
        style={{ top: 750, opacity: 0.7 }}
      />
      <div
        style={{
          position: "absolute",
          top: 330,
          left: 90,
          right: 90,
          display: "flex",
          flexDirection: "column",
          gap: 10,
        }}
      >
        <GlitchText
          seed="sound-a"
          glitch={interpolate(frame, [4, 16], [24, 0], clamp)}
          style={{
            fontSize: 190,
            lineHeight: 1,
            opacity: interpolate(frame, [4, 6], [0, 1], clamp),
            translate: interpolate(frame, [4, 18], ["-120px 0px", "0px 0px"], {
              ...clamp,
              easing: ease,
            }),
          }}
        >
          {lineA}
        </GlitchText>
        <div
          style={{
            color: colors.red,
            fontSize: 140,
            lineHeight: 1,
            alignSelf: "center",
            opacity: interpolate(frame, [16, 22], [0, 1], clamp),
            scale: interpolate(frame, [16, 28], [2.2, 1], {
              ...clamp,
              easing: ease,
              output: "perceptual-scale",
            }),
          }}
        >
          ×
        </div>
        <GlitchText
          seed="sound-b"
          glitch={interpolate(frame, [26, 38], [24, 0], clamp)}
          style={{
            fontSize: 190,
            lineHeight: 1,
            textAlign: "right",
            opacity: interpolate(frame, [26, 28], [0, 1], clamp),
            translate: interpolate(frame, [26, 40], ["120px 0px", "0px 0px"], {
              ...clamp,
              easing: ease,
            }),
          }}
        >
          {lineB}
        </GlitchText>
      </div>
      <div
        style={{
          position: "absolute",
          left: 90,
          right: 90,
          bottom: 300,
          color: colors.paper,
          fontFamily: jp,
          fontWeight: 900,
          fontSize: 96,
          lineHeight: 1.3,
          whiteSpace: "pre-line",
          opacity: interpolate(frame, [2 * fps, 2.5 * fps], [0, 1], clamp),
          translate: interpolate(frame, [2 * fps, 2.8 * fps], ["0px 50px", "0px 0px"], {
            ...clamp,
            easing: ease,
          }),
        }}
      >
        {message}
      </div>
    </AbsoluteFill>
  );
};

const soundSchema = {
  lineA: { type: "text-content", default: "J-POP CLARITY", description: "Line A" },
  lineB: { type: "text-content", default: "J-ROCK DRIVE", description: "Line B" },
  message: { type: "text-content", default: "", description: "Message" },
} as const satisfies InteractivitySchema;

export const SoundScene = Interactive.withSchema({
  Component: SoundSceneInner,
  componentName: "<SoundScene>",
  schema: soundSchema,
  wrapInSequence: true,
});
