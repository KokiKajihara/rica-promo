import type React from "react";
import { AbsoluteFill, random, useCurrentFrame, useVideoConfig } from "remotion";
import { colors } from "./theme";

// Red audio-waveform band, echoing the "Noise" jacket artwork.
export const NoiseWave: React.FC<{
  readonly intensity: number;
  readonly height: number;
  readonly color?: string;
  readonly seed?: string;
  readonly style?: React.CSSProperties;
}> = ({ intensity, height, color = colors.red, seed = "wave", style }) => {
  const frame = useCurrentFrame();
  const { width } = useVideoConfig();
  const bars = 90;
  const barWidth = width / bars;

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      style={{ position: "absolute", left: 0, ...style }}
    >
      {new Array(bars).fill(true).map((_, i) => {
        const base = random(`${seed}-${i}`);
        const flicker = random(`${seed}-${i}-${Math.floor(frame / 2)}`);
        // Taller in the middle, tapering toward the edges.
        const envelope = 0.35 + 0.65 * Math.sin((i / (bars - 1)) * Math.PI);
        const h =
          height *
          intensity *
          envelope *
          (0.25 + 0.75 * (0.5 * base + 0.5 * flicker));
        return (
          <rect
            key={i}
            x={i * barWidth + barWidth * 0.2}
            y={(height - h) / 2}
            width={barWidth * 0.6}
            height={h}
            fill={color}
            opacity={0.55 + 0.45 * flicker}
          />
        );
      })}
    </svg>
  );
};

// White text with red / magenta RGB-split copies. `glitch` is the split in px.
export const GlitchText: React.FC<{
  readonly children: string;
  readonly glitch: number;
  readonly seed?: string;
  readonly style?: React.CSSProperties;
}> = ({ children, glitch, seed = "glitch", style }) => {
  const frame = useCurrentFrame();
  const jitter =
    glitch > 0.5 ? (random(`${seed}-${frame}`) - 0.5) * glitch * 1.6 : 0;
  const layer: React.CSSProperties = {
    position: "absolute",
    inset: 0,
    mixBlendMode: "screen",
  };

  return (
    <div style={{ position: "relative", color: colors.paper, ...style }}>
      <span
        style={{
          ...layer,
          color: colors.red,
          translate: `${-glitch + jitter}px 0px`,
        }}
      >
        {children}
      </span>
      <span
        style={{
          ...layer,
          color: "#22d3ff",
          translate: `${glitch - jitter}px ${jitter * 0.3}px`,
        }}
      >
        {children}
      </span>
      <span style={{ position: "relative", translate: `${jitter * 0.4}px 0px` }}>
        {children}
      </span>
    </div>
  );
};

// Film grain + scanlines laid over the whole video.
export const Grain: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ pointerEvents: "none" }}>
      <svg width="100%" height="100%" style={{ opacity: 0.16 }}>
        <filter id="grain">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.9"
            numOctaves="2"
            seed={frame % 12}
          />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#grain)" />
      </svg>
      <AbsoluteFill
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, rgba(0,0,0,0.18) 0px, rgba(0,0,0,0.18) 2px, transparent 2px, transparent 5px)",
        }}
      />
    </AbsoluteFill>
  );
};
