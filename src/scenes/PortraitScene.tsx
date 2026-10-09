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
import { GlitchText } from "../elements";
import { clamp, colors, display, jp } from "../theme";

type PortraitProps = {
  readonly quote: string;
  readonly quoteJa: string;
  readonly style?: React.CSSProperties;
};

const tags = ["POP ROCK", "J-POP", "ENERGETIC", "SHIBUYA"];

const PortraitSceneInner: React.FC<PortraitProps> = ({
  quote,
  quoteJa,
  style,
}) => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();
  const ease = Easing.bezier(0.16, 1, 0.3, 1);

  return (
    <AbsoluteFill
      style={{ backgroundColor: colors.ink, overflow: "hidden", ...style }}
    >
      <CanvasImage
        name="Rica portrait"
        src={staticFile("rica.jpg")}
        width={width}
        height={height}
        fit="cover"
        premountFor={fps}
        style={{
          position: "absolute",
          transformOrigin: "50% 40%",
          scale: interpolate(frame, [0, 6 * fps], [1.18, 1.02], {
            ...clamp,
            easing: Easing.bezier(0.33, 1, 0.68, 1),
            output: "perceptual-scale",
          }),
        }}
      />
      <AbsoluteFill
        style={{
          background:
            "linear-gradient(180deg, rgba(7,6,10,0.75) 0%, rgba(7,6,10,0) 22%, rgba(7,6,10,0) 48%, rgba(7,6,10,0.92) 78%, rgba(7,6,10,1) 100%)",
        }}
      />
      <GlitchText
        seed="portrait-from"
        glitch={interpolate(frame, [8, 22], [18, 0], clamp)}
        style={{
          position: "absolute",
          top: 150,
          left: 90,
          fontFamily: display,
          fontSize: 120,
          lineHeight: 0.95,
          letterSpacing: 4,
          opacity: interpolate(frame, [8, 12], [0, 1], clamp),
        }}
      >
        BORN IN SHIBUYA
      </GlitchText>
      <div
        style={{
          position: "absolute",
          left: 90,
          right: 90,
          bottom: 430,
          color: colors.paper,
          fontFamily: jp,
          fontWeight: 900,
          fontSize: 60,
          lineHeight: 1.4,
          whiteSpace: "pre-line",
          opacity: interpolate(frame, [1 * fps, 1.5 * fps], [0, 1], clamp),
          translate: interpolate(frame, [1 * fps, 1.8 * fps], ["0px 50px", "0px 0px"], {
            ...clamp,
            easing: ease,
          }),
        }}
      >
        {quoteJa}
      </div>
      <div
        style={{
          position: "absolute",
          left: 90,
          right: 90,
          bottom: 290,
          color: colors.dim,
          fontFamily: jp,
          fontWeight: 500,
          fontSize: 40,
          lineHeight: 1.45,
          opacity: interpolate(frame, [1.6 * fps, 2.2 * fps], [0, 1], clamp),
        }}
      >
        {quote}
      </div>
      <div
        style={{
          position: "absolute",
          left: 90,
          right: 90,
          bottom: 170,
          display: "flex",
          flexWrap: "wrap",
          gap: 18,
        }}
      >
        {tags.map((tag, i) => (
          <div
            key={tag}
            style={{
              fontFamily: display,
              fontSize: 40,
              letterSpacing: 4,
              color: i === 0 ? colors.ink : colors.paper,
              backgroundColor: i === 0 ? colors.magenta : "transparent",
              border: `3px solid ${colors.magenta}`,
              padding: "6px 22px",
              opacity: interpolate(
                frame,
                [2.4 * fps + i * 4, 2.4 * fps + i * 4 + 8],
                [0, 1],
                clamp,
              ),
              translate: interpolate(
                frame,
                [2.4 * fps + i * 4, 2.4 * fps + i * 4 + 12],
                ["0px 30px", "0px 0px"],
                { ...clamp, easing: ease },
              ),
            }}
          >
            {tag}
          </div>
        ))}
      </div>
    </AbsoluteFill>
  );
};

const portraitSchema = {
  quote: { type: "text-content", default: "", description: "Quote (EN)" },
  quoteJa: { type: "text-content", default: "", description: "Quote (JA)" },
} as const satisfies InteractivitySchema;

export const PortraitScene = Interactive.withSchema({
  Component: PortraitSceneInner,
  componentName: "<PortraitScene>",
  schema: portraitSchema,
  wrapInSequence: true,
});
