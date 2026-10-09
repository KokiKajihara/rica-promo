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
import { clamp, naoColors, sans, serif } from "../theme";

type NaoOutroProps = {
  readonly label: string;
  readonly artist: string;
  readonly cta: string;
  readonly platforms: string;
  readonly url: string;
  readonly style?: React.CSSProperties;
};

const NaoOutroSceneInner: React.FC<NaoOutroProps> = ({
  label,
  artist,
  cta,
  platforms,
  url,
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
          opacity: 0.42,
          scale: interpolate(frame, [0, 7 * fps], [1.08, 1.115], {
            ...clamp,
            output: "perceptual-scale",
          }),
        }}
      />
      <AbsoluteFill
        style={{
          background:
            "linear-gradient(180deg, rgba(6,16,28,0.07) 0%, rgba(6,16,28,0.93) 72%)",
        }}
      />
      <Label
        style={{
          position: "absolute",
          top: 170,
          left: 88,
          opacity: interpolate(frame, [0, 30], [0, 1], clamp),
          translate: interpolate(frame, [0, 40], ["0px 28px", "0px 0px"], {
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
          left: 88,
          top: 940,
          fontFamily: serif,
          fontSize: 170,
          lineHeight: 1,
          opacity: interpolate(frame, [12, 42], [0, 1], clamp),
          translate: interpolate(frame, [12, 52], ["0px 28px", "0px 0px"], {
            ...clamp,
            easing: ease,
          }),
        }}
      >
        {artist}
      </div>
      <Label
        style={{
          position: "absolute",
          left: 95,
          top: 1170,
          fontSize: 52,
          letterSpacing: 8,
          color: naoColors.cream,
          opacity: interpolate(frame, [32, 62], [0, 1], clamp),
          translate: interpolate(frame, [32, 72], ["0px 28px", "0px 0px"], {
            ...clamp,
            easing: ease,
          }),
        }}
      >
        {cta}
      </Label>
      <div
        style={{
          position: "absolute",
          left: 95,
          top: 1290,
          fontFamily: sans,
          fontWeight: 500,
          fontSize: 48,
          color: naoColors.blue,
          opacity: interpolate(frame, [45, 75], [0, 1], clamp),
          translate: interpolate(frame, [45, 85], ["0px 28px", "0px 0px"], {
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
          left: 95,
          top: 1390,
          fontFamily: sans,
          fontSize: 44,
          color: naoColors.mist,
          opacity: interpolate(frame, [55, 85], [0, 1], clamp),
          translate: interpolate(frame, [55, 95], ["0px 28px", "0px 0px"], {
            ...clamp,
            easing: ease,
          }),
        }}
      >
        {url}
      </div>
      <div
        style={{
          position: "absolute",
          left: 95,
          bottom: 170,
          fontFamily: sans,
          fontWeight: 500,
          fontSize: 40,
          letterSpacing: 8,
          opacity: interpolate(frame, [65, 95], [0, 1], clamp),
          translate: interpolate(frame, [65, 105], ["0px 28px", "0px 0px"], {
            ...clamp,
            easing: ease,
          }),
        }}
      >
        ★ NOVACHORD
      </div>
    </AbsoluteFill>
  );
};

const naoOutroSchema = {
  label: { type: "text-content", default: "NovaChord / A-05", description: "Label" },
  artist: { type: "text-content", default: "NaoNC", description: "Artist name" },
  cta: { type: "text-content", default: "Now streaming", description: "Call to action" },
  platforms: { type: "text-content", default: "", description: "Platforms" },
  url: { type: "text-content", default: "", description: "URL" },
} as const satisfies InteractivitySchema;

export const NaoOutroScene = Interactive.withSchema({
  Component: NaoOutroSceneInner,
  componentName: "<NaoOutroScene>",
  schema: naoOutroSchema,
  wrapInSequence: true,
});
