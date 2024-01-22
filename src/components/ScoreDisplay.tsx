import { compact } from "lodash";

export function ScoreDisplay({ playerName, score, highlighted }: {
  playerName: string,
  score: number,
  highlighted: boolean
}) {
  const className = compact([
    highlighted ? "text-light" : "text-secondary",
    highlighted && "bg-secondary",
    "border",
    "border-secondary",
    "rounded",
  ]).join(" ");

  return (
    <div className={className} style={{
      padding: 8,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      width: 80,
      height: 80,
      transition: "150ms all",
    }}>
      <div style={{ fontSize: "0.8rem" }}>{playerName}</div>
      <h1 style={{ fontSize: "1.8rem" }}>{score}</h1>
    </div>
  );
}