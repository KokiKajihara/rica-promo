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
import { Atmosphere, Label } from "../elements";
import { clamp, naoColors, sans, serif } from "../theme";

type NaoReleaseProps = {
  readonly kicker: string;
  readonly jacket: string;
  readonly title: string;
  readonly titleAccent: string;
  readonly credit: string;
  readonly theme: string;
  readonly style?: React.CSSProperties;
};

const NaoReleaseSceneInner: React.FC<NaoReleaseProps> = ({
  kicker,
  jacket,
  title,
  titleAccent,
  credit,
  theme,
  style,
}) => {
  const frame = useCurrentFrame();
  const { fps, width } = useVideoConfig();
  const ease = Easing.bezier(0.16, 1, 0.3, 1);
  const jacketSize = 820;

  return (
    <AbsoluteFill
      style={{
        backgroundColor: naoColors.night,
        color: naoColors.cream,
        overflow: "hidden",
        ...style,
      }}
    >
      <Atmosphere />
      <Label
        style={{
          position: "absolute",
          top: 155,
          left: 0,
          right: 0,
          textAlign: "center",
          opacity: interpolate(frame, [0, 30], [0, 1], clamp),
          translate: interpolate(frame, [0, 40], ["0px 28px", "0px 0px"], {
            ...clamp,
            easing: ease,
          }),
        }}
      >
        {kicker}
      </Label>
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
          boxShadow: "0 35px 100px rgba(0,0,0,0.55)",
          opacity: interpolate(frame, [12, 42], [0, 1], clamp),
          translate: interpolate(frame, [12, 52], ["0px 30px", "0px 0px"], {
            ...clamp,
            easing: ease,
          }),
          scale: interpolate(frame, [0, 8 * fps], [0.96, 1.02], {
            ...clamp,
            output: "perceptual-scale",
          }),
        }}
      />
      <div
        style={{
          position: "absolute",
          left: 85,
          right: 85,
          top: 1180,
          fontFamily: serif,
          fontSize: 92,
          lineHeight: 1.15,
          textAlign: "center",
          opacity: interpolate(frame, [32, 62], [0, 1], clamp),
          translate: interpolate(frame, [32, 72], ["0px 28px", "0px 0px"], {
            ...clamp,
            easing: ease,
          }),
        }}
      >
        {title}
        <br />
        <span style={{ fontStyle: "italic", color: naoColors.blue }}>{titleAccent}</span>
      </div>
      <div
        style={{
          position: "absolute",
          top: 1470,
          left: 0,
          right: 0,
          textAlign: "center",
          fontFamily: sans,
          fontWeight: 500,
          fontSize: 42,
          letterSpacing: 4,
          opacity: interpolate(frame, [55, 85], [0, 1], clamp),
          translate: interpolate(frame, [55, 95], ["0px 28px", "0px 0px"], {
            ...clamp,
            easing: ease,
          }),
        }}
      >
        {credit}
      </div>
      <div
        style={{
          position: "absolute",
          top: 1580,
          left: 85,
          right: 85,
          textAlign: "center",
          fontFamily: serif,
          fontStyle: "italic",
          fontSize: 48,
          lineHeight: 1.4,
          color: naoColors.mist,
          opacity: interpolate(frame, [65, 95], [0, 1], clamp),
          translate: interpolate(frame, [65, 105], ["0px 28px", "0px 0px"], {
            ...clamp,
            easing: ease,
          }),
        }}
      >
        {theme}
      </div>
    </AbsoluteFill>
  );
};

const naoReleaseSchema = {
  kicker: { type: "text-content", default: "", description: "Kicker" },
  jacket: { type: "asset", default: "naonc-jacket.jpeg", description: "Jacket image (public/)" },
  title: { type: "text-content", default: "", description: "Title" },
  titleAccent: { type: "text-content", default: "", description: "Title accent" },
  credit: { type: "text-content", default: "", description: "Credit" },
  theme: { type: "text-content", default: "", description: "Theme line" },
} as const satisfies InteractivitySchema;

export const NaoReleaseScene = Interactive.withSchema({
  Component: NaoReleaseSceneInner,
  componentName: "<NaoReleaseScene>",
  schema: naoReleaseSchema,
  wrapInSequence: true,
});
