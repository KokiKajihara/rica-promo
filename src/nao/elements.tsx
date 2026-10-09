import type React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { naoColors, sans } from "./theme";

// Slowly expanding concentric rings with a soft blue glow.
export const Atmosphere: React.FC = () => {
  const frame = useCurrentFrame();
  const ring = (i: number): React.CSSProperties => ({
    position: "absolute",
    width: 950 + i * 240,
    height: 950 + i * 240,
    left: 350 - i * 120,
    top: 480 - i * 120,
    border: "2px solid rgba(141,187,211,0.17)",
    borderRadius: "50%",
    scale: 1 + frame / 5000,
  });

  return (
    <AbsoluteFill style={{ overflow: "hidden", pointerEvents: "none" }}>
      <div style={ring(0)} />
      <div style={ring(1)} />
      <div style={ring(2)} />
      <AbsoluteFill
        style={{
          background:
            "radial-gradient(ellipse at 80% 20%, rgba(49,105,145,0.16), transparent 65%)",
        }}
      />
    </AbsoluteFill>
  );
};

// Small uppercase label in the accent blue.
export const Label: React.FC<{
  readonly children: React.ReactNode;
  readonly style?: React.CSSProperties;
}> = ({ children, style }) => (
  <div
    style={{
      fontFamily: sans,
      fontWeight: 500,
      fontSize: 38,
      letterSpacing: 7,
      textTransform: "uppercase",
      color: naoColors.blue,
      ...style,
    }}
  >
    {children}
  </div>
);
