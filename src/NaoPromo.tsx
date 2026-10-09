import { Audio } from "@remotion/media";
import { linearTiming, TransitionSeries } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import {
  AbsoluteFill,
  interpolate,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { NaoIdentityScene } from "./nao/scenes/NaoIdentityScene";
import { NaoOpeningScene } from "./nao/scenes/NaoOpeningScene";
import { NaoOutroScene } from "./nao/scenes/NaoOutroScene";
import { NaoReleaseScene } from "./nao/scenes/NaoReleaseScene";
import { NaoTracksScene } from "./nao/scenes/NaoTracksScene";
import { clamp, naoColors } from "./nao/theme";

export const NaoPromo: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  return (
    <AbsoluteFill style={{ backgroundColor: naoColors.night }}>
      <TransitionSeries>
        <TransitionSeries.Sequence name="Opening" durationInFrames={195} premountFor={fps}>
          <NaoOpeningScene
            label="NovaChord / A-05"
            artist="NaoNC"
            tagline="Still Creativity."
            genre="J-Pop × Alternative R&B"
          />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: 30 })}
        />
        <TransitionSeries.Sequence name="Identity" durationInFrames={195} premountFor={fps}>
          <NaoIdentityScene
            kicker="The art of stillness"
            headline={"A quiet voice.\nA world"}
            accent="within."
            body={"Modern soul. Ambient textures.\nEmotion unfolding in its own time."}
            footer="Reflect · Feel · Return"
          />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: 30 })}
        />
        <TransitionSeries.Sequence name="Release" durationInFrames={240} premountFor={fps}>
          <NaoReleaseScene
            kicker="EP / July 2026 / 5 Tracks"
            jacket="naonc-jacket.jpeg"
            title="Blue Without"
            titleAccent="Borrowing"
            credit="NOVACHORD feat. NaoNC"
            theme="Love. Separation. A return to oneself."
          />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: 30 })}
        />
        <TransitionSeries.Sequence name="Tracks" durationInFrames={195} premountFor={fps}>
          <NaoTracksScene
            kicker="Five chapters / One quiet journey"
            title="Blue Without"
            titleAccent="Borrowing"
            track1="Blue Tea, Two Cups"
            track2="Borrowed Weather"
            track3="Sunday Has Another Name"
            track4="Leave the Key in Water"
            track5="Blue Tea Ceremony"
            footer="A ceremony of emotional independence"
          />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: 30 })}
        />
        <TransitionSeries.Sequence name="Outro" durationInFrames={195} premountFor={fps}>
          <NaoOutroScene
            label="NovaChord / A-05"
            artist="NaoNC"
            cta="Now streaming"
            platforms="Apple Music / Spotify"
            url="novachord.jp/artists/nao"
          />
        </TransitionSeries.Sequence>
      </TransitionSeries>
      <AbsoluteFill
        style={{
          backgroundColor: naoColors.night,
          pointerEvents: "none",
          opacity: interpolate(
            frame,
            [0, 20, durationInFrames - 20, durationInFrames - 1],
            [1, 0, 0, 1],
            clamp,
          ),
        }}
      />
      <Audio
        name="Blue Without Borrowing (preview)"
        src={staticFile("naonc-preview.m4a")}
        premountFor={fps}
        volume={interpolate(
          frame,
          [0, 35, durationInFrames - 60, durationInFrames - 1],
          [0, 0.85, 0.85, 0],
          clamp,
        )}
      />
    </AbsoluteFill>
  );
};
