export function ScoreDisplay({ playerName, score }: { playerName: string, score: number }) {
  return (
    <div className="text-secondary border border-secondary rounded" style={{
      padding: 8,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      width: 80,
      height: 80,
    }}>
      <div style={{ fontSize: "0.8rem" }}>{playerName}</div>
      <h1 style={{ fontSize: "1.8rem" }}>{score}</h1>
    </div>
  );
}