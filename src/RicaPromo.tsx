import { Audio } from "@remotion/media";
import { linearTiming, TransitionSeries } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { slide } from "@remotion/transitions/slide";
import { wipe } from "@remotion/transitions/wipe";
import {
  AbsoluteFill,
  interpolate,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { Grain } from "./elements";
import { OpeningScene } from "./scenes/OpeningScene";
import { OutroScene } from "./scenes/OutroScene";
import { PortraitScene } from "./scenes/PortraitScene";
import { ReleaseScene } from "./scenes/ReleaseScene";
import { SoundScene } from "./scenes/SoundScene";
import { clamp, colors } from "./theme";

export const RicaPromo: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  return (
    <AbsoluteFill style={{ backgroundColor: colors.ink }}>
      <TransitionSeries>
        <TransitionSeries.Sequence name="Opening" durationInFrames={120} premountFor={fps}>
          <OpeningScene
            artist="RICA"
            label="NOVACHORD SIDE-B  B-01"
            role="VIRTUAL ARTIST / POP ROCK"
          />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: 10 })}
        />
        <TransitionSeries.Sequence name="Portrait" durationInFrames={180} premountFor={fps}>
          <PortraitScene
            quoteJa={"渋谷生まれの、まっすぐな声。\n日常の冒険を、勇気に変える。"}
            quote="A bright Shibuya-born voice turning everyday adventure into courage."
          />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          presentation={wipe({ direction: "from-left" })}
          timing={linearTiming({ durationInFrames: 10 })}
        />
        <TransitionSeries.Sequence name="Sound" durationInFrames={150} premountFor={fps}>
          <SoundScene
            lineA="J-POP CLARITY"
            lineB="J-ROCK DRIVE"
            message={"迷いを、\n前へ進む力に。"}
          />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          presentation={slide({ direction: "from-bottom" })}
          timing={linearTiming({ durationInFrames: 10 })}
        />
        <TransitionSeries.Sequence name="Rock 'n' Rica" durationInFrames={150} premountFor={fps}>
          <ReleaseScene
            kicker="EP · JUN 2026"
            title="ROCK 'N' RICA"
            jacket="rocknrica-jacket.jpg"
            track1="Rock 'n' Rica"
            track2="透明な反抗"
            tilt={-4}
          />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          presentation={slide({ direction: "from-right" })}
          timing={linearTiming({ durationInFrames: 10 })}
        />
        <TransitionSeries.Sequence name="Noise" durationInFrames={150} premountFor={fps}>
          <ReleaseScene
            kicker="NEW SINGLE · JUL 2026"
            title="NOISE"
            jacket="noise-jacket.jpg"
            track1="未完の旗"
            track2="Noise"
            tilt={4}
          />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: 10 })}
        />
        <TransitionSeries.Sequence name="Outro" durationInFrames={165} premountFor={fps}>
          <OutroScene
            cta="NOW STREAMING"
            platforms="Apple Music / Spotify"
            url="novachord.jp/artists/rica"
          />
        </TransitionSeries.Sequence>
      </TransitionSeries>
      <Grain />
      <Audio
        name="Noise (preview)"
        src={staticFile("noise-preview.m4a")}
        premountFor={fps}
        volume={interpolate(
          frame,
          [0, 0.3 * fps, durationInFrames - 1.5 * fps, durationInFrames],
          [0, 1, 1, 0],
          clamp,
        )}
      />
    </AbsoluteFill>
  );
};
