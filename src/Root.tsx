import { Composition, Folder } from "remotion";
import { NaoPromo } from "./NaoPromo";
import { NaoIdentityScene } from "./nao/scenes/NaoIdentityScene";
import { NaoOpeningScene } from "./nao/scenes/NaoOpeningScene";
import { NaoOutroScene } from "./nao/scenes/NaoOutroScene";
import { NaoReleaseScene } from "./nao/scenes/NaoReleaseScene";
import { NaoTracksScene } from "./nao/scenes/NaoTracksScene";
import { RicaPromo } from "./RicaPromo";
import { OpeningScene } from "./scenes/OpeningScene";
import { OutroScene } from "./scenes/OutroScene";
import { PortraitScene } from "./scenes/PortraitScene";
import { ReleaseScene } from "./scenes/ReleaseScene";
import { SoundScene } from "./scenes/SoundScene";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="NaoPromo"
        component={NaoPromo}
        durationInFrames={900}
        fps={30}
        width={1080}
        height={1920}
      />
      <Folder name="NaoPromo-Scenes">
        <Composition
          id="NaoOpening"
          component={NaoOpeningScene}
          durationInFrames={195}
          fps={30}
          width={1080}
          height={1920}
          defaultProps={{
            label: "NovaChord / A-05",
            artist: "NaoNC",
            tagline: "Still Creativity.",
            genre: "J-Pop × Alternative R&B",
          }}
        />
        <Composition
          id="NaoIdentity"
          component={NaoIdentityScene}
          durationInFrames={195}
          fps={30}
          width={1080}
          height={1920}
          defaultProps={{
            kicker: "The art of stillness",
            headline: "A quiet voice.\nA world",
            accent: "within.",
            body: "Modern soul. Ambient textures.\nEmotion unfolding in its own time.",
            footer: "Reflect · Feel · Return",
          }}
        />
        <Composition
          id="NaoRelease"
          component={NaoReleaseScene}
          durationInFrames={240}
          fps={30}
          width={1080}
          height={1920}
          defaultProps={{
            kicker: "EP / July 2026 / 5 Tracks",
            jacket: "naonc-jacket.jpeg",
            title: "Blue Without",
            titleAccent: "Borrowing",
            credit: "NOVACHORD feat. NaoNC",
            theme: "Love. Separation. A return to oneself.",
          }}
        />
        <Composition
          id="NaoTracks"
          component={NaoTracksScene}
          durationInFrames={195}
          fps={30}
          width={1080}
          height={1920}
          defaultProps={{
            kicker: "Five chapters / One quiet journey",
            title: "Blue Without",
            titleAccent: "Borrowing",
            track1: "Blue Tea, Two Cups",
            track2: "Borrowed Weather",
            track3: "Sunday Has Another Name",
            track4: "Leave the Key in Water",
            track5: "Blue Tea Ceremony",
            footer: "A ceremony of emotional independence",
          }}
        />
        <Composition
          id="NaoOutro"
          component={NaoOutroScene}
          durationInFrames={195}
          fps={30}
          width={1080}
          height={1920}
          defaultProps={{
            label: "NovaChord / A-05",
            artist: "NaoNC",
            cta: "Now streaming",
            platforms: "Apple Music / Spotify",
            url: "novachord.jp/artists/nao",
          }}
        />
      </Folder>
      <Composition
        id="RicaPromo"
        component={RicaPromo}
        durationInFrames={865}
        fps={30}
        width={1080}
        height={1920}
      />
      <Folder name="RicaPromo-Scenes">
        <Composition
          id="Opening"
          component={OpeningScene}
          durationInFrames={120}
          fps={30}
          width={1080}
          height={1920}
          defaultProps={{
            artist: "RICA",
            label: "NOVACHORD SIDE-B  B-01",
            role: "VIRTUAL ARTIST / POP ROCK",
          }}
        />
        <Composition
          id="Portrait"
          component={PortraitScene}
          durationInFrames={180}
          fps={30}
          width={1080}
          height={1920}
          defaultProps={{
            quoteJa: "渋谷生まれの、まっすぐな声。\n日常の冒険を、勇気に変える。",
            quote:
              "A bright Shibuya-born voice turning everyday adventure into courage.",
          }}
        />
        <Composition
          id="Sound"
          component={SoundScene}
          durationInFrames={150}
          fps={30}
          width={1080}
          height={1920}
          defaultProps={{
            lineA: "J-POP CLARITY",
            lineB: "J-ROCK DRIVE",
            message: "迷いを、\n前へ進む力に。",
          }}
        />
        <Composition
          id="RocknRica"
          component={ReleaseScene}
          durationInFrames={150}
          fps={30}
          width={1080}
          height={1920}
          defaultProps={{
            kicker: "EP · JUN 2026",
            title: "ROCK 'N' RICA",
            jacket: "rocknrica-jacket.jpg",
            track1: "Rock 'n' Rica",
            track2: "透明な反抗",
            tilt: -4,
          }}
        />
        <Composition
          id="Noise"
          component={ReleaseScene}
          durationInFrames={150}
          fps={30}
          width={1080}
          height={1920}
          defaultProps={{
            kicker: "NEW SINGLE · JUL 2026",
            title: "NOISE",
            jacket: "noise-jacket.jpg",
            track1: "未完の旗",
            track2: "Noise",
            tilt: 4,
          }}
        />
        <Composition
          id="Outro"
          component={OutroScene}
          durationInFrames={165}
          fps={30}
          width={1080}
          height={1920}
          defaultProps={{
            cta: "NOW STREAMING",
            platforms: "Apple Music / Spotify",
            url: "novachord.jp/artists/rica",
          }}
        />
      </Folder>
    </>
  );
};
