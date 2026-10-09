import type React from "react";
import {
  AbsoluteFill,
  Easing,
  Interactive,
  interpolate,
  useCurrentFrame,
  type InteractivitySchema,
} from "remotion";
import { Atmosphere, Label } from "../elements";
import { clamp, naoColors, sans, serif } from "../theme";

type NaoIdentityProps = {
  readonly kicker: string;
  readonly headline: string;
  readonly accent: string;
  readonly body: string;
  readonly footer: string;
  readonly style?: React.CSSProperties;
};

const NaoIdentitySceneInner: React.FC<NaoIdentityProps> = ({
  kicker,
  headline,
  accent,
  body,
  footer,
  style,
}) => {
  const frame = useCurrentFrame();
  const ease = Easing.bezier(0.16, 1, 0.3, 1);

  return (
    <AbsoluteFill
      style={{
        backgroundColor: naoColors.deep,
        color: naoColors.cream,
        overflow: "hidden",
        ...style,
      }}
    >
      <Atmosphere />
      <Label
        style={{
          position: "absolute",
          top: 180,
          left: 88,
          opacity: interpolate(frame, [4, 34], [0, 1], clamp),
          translate: interpolate(frame, [4, 44], ["0px 28px", "0px 0px"], {
            ...clamp,
            easing: ease,
          }),
        }}
      >
        {kicker}
      </Label>
      <div
        style={{
          position: "absolute",
          left: 88,
          right: 88,
          top: 420,
          fontFamily: serif,
          fontSize: 116,
          lineHeight: 1.16,
          whiteSpace: "pre-line",
          opacity: interpolate(frame, [16, 46], [0, 1], clamp),
          translate: interpolate(frame, [16, 56], ["0px 28px", "0px 0px"], {
            ...clamp,
            easing: ease,
          }),
        }}
      >
        {headline}
        <br />
        <span style={{ color: naoColors.blue, fontStyle: "italic" }}>{accent}</span>
      </div>
      <div
        style={{
          position: "absolute",
          left: 90,
          top: 1080,
          width: 200,
          height: 3,
          backgroundColor: naoColors.blue,
          transformOrigin: "left",
          scale: interpolate(frame, [25, 75], ["0 1", "1 1"], {
            ...clamp,
            easing: ease,
          }),
        }}
      />
      <div
        style={{
          position: "absolute",
          left: 90,
          right: 90,
          top: 1150,
          fontFamily: sans,
          fontSize: 50,
          lineHeight: 1.6,
          color: naoColors.mist,
          whiteSpace: "pre-line",
          opacity: interpolate(frame, [50, 80], [0, 1], clamp),
          translate: interpolate(frame, [50, 90], ["0px 28px", "0px 0px"], {
            ...clamp,
            easing: ease,
          }),
        }}
      >
        {body}
      </div>
      <Label
        style={{
          position: "absolute",
          left: 90,
          bottom: 200,
          opacity: interpolate(frame, [70, 100], [0, 1], clamp),
          translate: interpolate(frame, [70, 110], ["0px 28px", "0px 0px"], {
            ...clamp,
            easing: ease,
          }),
        }}
      >
        {footer}
      </Label>
    </AbsoluteFill>
  );
};

const naoIdentitySchema = {
  kicker: { type: "text-content", default: "", description: "Kicker" },
  headline: { type: "text-content", default: "", description: "Headline" },
  accent: { type: "text-content", default: "", description: "Accent word" },
  body: { type: "text-content", default: "", description: "Body" },
  footer: { type: "text-content", default: "", description: "Footer label" },
} as const satisfies InteractivitySchema;

export const NaoIdentityScene = Interactive.withSchema({
  Component: NaoIdentitySceneInner,
  componentName: "<NaoIdentityScene>",
  schema: naoIdentitySchema,
  wrapInSequence: true,
});
