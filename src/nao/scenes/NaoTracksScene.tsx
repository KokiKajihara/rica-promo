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

type NaoTracksProps = {
  readonly kicker: string;
  readonly title: string;
  readonly titleAccent: string;
  readonly track1: string;
  readonly track2: string;
  readonly track3: string;
  readonly track4: string;
  readonly track5: string;
  readonly footer: string;
  readonly style?: React.CSSProperties;
};

const TrackRow: React.FC<{
  readonly no: string;
  readonly title: string;
  readonly delay: number;
}> = ({ no, title, delay }) => {
  const frame = useCurrentFrame();
  return (
    <div
      style={{
        display: "flex",
        alignItems: "baseline",
        gap: 34,
        padding: "34px 0",
        borderBottom: "2px solid rgba(141,187,211,0.2)",
        opacity: interpolate(frame, [delay, delay + 30], [0, 1], clamp),
        translate: interpolate(frame, [delay, delay + 40], ["0px 28px", "0px 0px"], {
          ...clamp,
          easing: Easing.bezier(0.16, 1, 0.3, 1),
        }),
      }}
    >
      <span
        style={{
          fontFamily: sans,
          fontWeight: 500,
          fontSize: 36,
          letterSpacing: 3,
          color: naoColors.blue,
        }}
      >
        {no}
      </span>
      <span style={{ fontFamily: serif, fontSize: 54 }}>{title}</span>
    </div>
  );
};

const NaoTracksSceneInner: React.FC<NaoTracksProps> = ({
  kicker,
  title,
  titleAccent,
  track1,
  track2,
  track3,
  track4,
  track5,
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
          top: 170,
          left: 88,
          right: 88,
          fontSize: 34,
          letterSpacing: 5,
          opacity: interpolate(frame, [0, 30], [0, 1], clamp),
          translate: interpolate(frame, [0, 40], ["0px 28px", "0px 0px"], {
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
          top: 300,
          fontFamily: serif,
          fontSize: 100,
          lineHeight: 1.13,
          opacity: interpolate(frame, [10, 40], [0, 1], clamp),
          translate: interpolate(frame, [10, 50], ["0px 28px", "0px 0px"], {
            ...clamp,
            easing: ease,
          }),
        }}
      >
        {title}
        <br />
        <span style={{ fontStyle: "italic", color: naoColors.blue }}>{titleAccent}</span>
      </div>
      <div style={{ position: "absolute", left: 88, right: 88, top: 640 }}>
        <TrackRow no="01" title={track1} delay={20} />
        <TrackRow no="02" title={track2} delay={32} />
        <TrackRow no="03" title={track3} delay={44} />
        <TrackRow no="04" title={track4} delay={56} />
        <TrackRow no="05" title={track5} delay={68} />
      </div>
      <Label
        style={{
          position: "absolute",
          left: 88,
          right: 88,
          bottom: 190,
          fontSize: 34,
          letterSpacing: 4,
          lineHeight: 1.5,
          opacity: interpolate(frame, [95, 125], [0, 1], clamp),
          translate: interpolate(frame, [95, 135], ["0px 28px", "0px 0px"], {
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

const naoTracksSchema = {
  kicker: { type: "text-content", default: "", description: "Kicker" },
  title: { type: "text-content", default: "", description: "Title" },
  titleAccent: { type: "text-content", default: "", description: "Title accent" },
  track1: { type: "text-content", default: "", description: "Track 01" },
  track2: { type: "text-content", default: "", description: "Track 02" },
  track3: { type: "text-content", default: "", description: "Track 03" },
  track4: { type: "text-content", default: "", description: "Track 04" },
  track5: { type: "text-content", default: "", description: "Track 05" },
  footer: { type: "text-content", default: "", description: "Footer label" },
} as const satisfies InteractivitySchema;

export const NaoTracksScene = Interactive.withSchema({
  Component: NaoTracksSceneInner,
  componentName: "<NaoTracksScene>",
  schema: naoTracksSchema,
  wrapInSequence: true,
});
