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
import { Label } from "../elements";
import { clamp, naoColors, serif } from "../theme";

type NaoOpeningProps = {
  readonly label: string;
  readonly artist: string;
  readonly tagline: string;
  readonly genre: string;
  readonly style?: React.CSSProperties;
};

const NaoOpeningSceneInner: React.FC<NaoOpeningProps> = ({
  label,
  artist,
  tagline,
  genre,
  style,
}) => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();
  const ease = Easing.bezier(0.16, 1, 0.3, 1);

  return (
    <AbsoluteFill
      style={{
        backgroundColor: naoColors.night,
        color: naoColors.cream,
        overflow: "hidden",
        ...style,
      }}
    >
      <CanvasImage
        name="NaoNC portrait"
        src={staticFile("naonc.jpg")}
        width={width}
        height={height}
        fit="cover"
        premountFor={fps}
        style={{
          position: "absolute",
          scale: interpolate(frame, [0, 6 * fps], [1.04, 1.12], {
            ...clamp,
            output: "perceptual-scale",
          }),
        }}
      />
      <AbsoluteFill
        style={{
          background:
            "linear-gradient(180deg, rgba(3,11,20,0.55) 0%, rgba(3,11,20,0) 35%, rgba(3,11,20,0.35) 55%, rgba(3,11,20,0.95) 100%)",
        }}
      />
      <Label
        style={{
          position: "absolute",
          top: 150,
          left: 85,
          opacity: interpolate(frame, [8, 38], [0, 1], clamp),
          translate: interpolate(frame, [8, 48], ["0px 28px", "0px 0px"], {
            ...clamp,
            easing: ease,
          }),
        }}
      >
        {label}
      </Label>
      <div
        style={{
          position: "absolute",
          left: 80,
          bottom: 400,
          fontFamily: serif,
          fontSize: 190,
          letterSpacing: -6,
          lineHeight: 1,
          opacity: interpolate(frame, [18, 48], [0, 1], clamp),
          translate: interpolate(frame, [18, 58], ["0px 28px", "0px 0px"], {
            ...clamp,
            easing: ease,
          }),
        }}
      >
        {artist}
      </div>
      <div
        style={{
          position: "absolute",
          left: 88,
          bottom: 290,
          fontFamily: serif,
          fontStyle: "italic",
          fontSize: 64,
          opacity: interpolate(frame, [42, 72], [0, 1], clamp),
          translate: interpolate(frame, [42, 82], ["0px 28px", "0px 0px"], {
            ...clamp,
            easing: ease,
          }),
        }}
      >
        {tagline}
      </div>
      <Label
        style={{
          position: "absolute",
          left: 88,
          bottom: 190,
          fontSize: 36,
          letterSpacing: 5,
          opacity: interpolate(frame, [60, 90], [0, 1], clamp),
          translate: interpolate(frame, [60, 100], ["0px 28px", "0px 0px"], {
            ...clamp,
            easing: ease,
          }),
        }}
      >
        {genre}
      </Label>
    </AbsoluteFill>
  );
};

const naoOpeningSchema = {
  label: { type: "text-content", default: "NovaChord / A-05", description: "Label" },
  artist: { type: "text-content", default: "NaoNC", description: "Artist name" },
  tagline: { type: "text-content", default: "Still Creativity.", description: "Tagline" },
  genre: { type: "text-content", default: "J-Pop × Alternative R&B", description: "Genre" },
} as const satisfies InteractivitySchema;

export const NaoOpeningScene = Interactive.withSchema({
  Component: NaoOpeningSceneInner,
  componentName: "<NaoOpeningScene>",
  schema: naoOpeningSchema,
  wrapInSequence: true,
});
