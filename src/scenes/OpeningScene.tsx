import type React from "react";
import {
  AbsoluteFill,
  Easing,
  Interactive,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
  type InteractivitySchema,
} from "remotion";
import { GlitchText, NoiseWave } from "../elements";
import { clamp, colors, display } from "../theme";

type OpeningProps = {
  readonly artist: string;
  readonly label: string;
  readonly role: string;
  readonly style?: React.CSSProperties;
};

const OpeningSceneInner: React.FC<OpeningProps> = ({
  artist,
  label,
  role,
  style,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const hit = 1.3 * fps;

  return (
    <AbsoluteFill
      style={{
        backgroundColor: colors.ink,
        justifyContent: "center",
        alignItems: "center",
        fontFamily: display,
        overflow: "hidden",
        ...style,
      }}
    >
      <NoiseWave
        seed="opening"
        height={760}
        intensity={interpolate(frame, [0, hit, hit + 6, 4 * fps], [0.08, 0.35, 1, 0.55], {
          ...clamp,
          easing: Easing.bezier(0.33, 1, 0.68, 1),
        })}
        style={{
          top: 580,
          opacity: interpolate(frame, [0, 8], [0, 1], clamp),
        }}
      />
      <div
        style={{
          position: "absolute",
          top: 220,
          left: 0,
          right: 0,
          textAlign: "center",
          color: colors.paper,
          fontSize: 44,
          letterSpacing: 18,
          opacity: interpolate(frame, [6, 20], [0, 1], clamp),
          translate: interpolate(frame, [6, 24], ["0px 30px", "0px 0px"], {
            ...clamp,
            easing: Easing.bezier(0.16, 1, 0.3, 1),
          }),
        }}
      >
        {label}
      </div>
      <GlitchText
        seed="opening-name"
        glitch={interpolate(frame, [hit, hit + 18], [34, 0], clamp)}
        style={{
          fontSize: 400,
          lineHeight: 1,
          letterSpacing: 10,
          opacity: interpolate(frame, [hit - 2, hit], [0, 1], clamp),
          scale: interpolate(frame, [hit - 2, hit + 10, 4 * fps], [1.6, 1, 0.94], {
            ...clamp,
            easing: Easing.bezier(0.16, 1, 0.3, 1),
          }),
        }}
      >
        {artist}
      </GlitchText>
      <div
        style={{
          position: "absolute",
          bottom: 360,
          left: 0,
          right: 0,
          textAlign: "center",
          color: colors.red,
          fontSize: 64,
          letterSpacing: 10,
          opacity: interpolate(frame, [hit + 12, hit + 24], [0, 1], clamp),
          translate: interpolate(frame, [hit + 12, hit + 28], ["0px 40px", "0px 0px"], {
            ...clamp,
            easing: Easing.bezier(0.16, 1, 0.3, 1),
          }),
        }}
      >
        {role}
      </div>
    </AbsoluteFill>
  );
};

const openingSchema = {
  artist: { type: "text-content", default: "RICA", description: "Artist name" },
  label: { type: "text-content", default: "", description: "Top label" },
  role: { type: "text-content", default: "", description: "Role line" },
} as const satisfies InteractivitySchema;

export const OpeningScene = Interactive.withSchema({
  Component: OpeningSceneInner,
  componentName: "<OpeningScene>",
  schema: openingSchema,
  wrapInSequence: true,
});
