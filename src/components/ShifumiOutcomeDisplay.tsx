import { ShifumiSymbol } from "../types";
import { ShifumiSymbolDisplay } from "./ShifumiSymbolDisplay";
import { Button } from "react-bootstrap";

const WIN_MAP: Map<ShifumiSymbol, Map<ShifumiSymbol, string>> = new Map([
  [ShifumiSymbol.Scissors, new Map([
    [ShifumiSymbol.Paper, "Scissors cut Paper"],
    [ShifumiSymbol.Lizard, "Scissors decapitate Lizard"],
  ])],
  [ShifumiSymbol.Paper, new Map([
    [ShifumiSymbol.Rock, "Paper covers Rock"],
    [ShifumiSymbol.Spock, "Paper disproves Spock"],
  ])],
  [ShifumiSymbol.Rock, new Map([
    [ShifumiSymbol.Lizard, "Rock crushes Lizard"],
    [ShifumiSymbol.Scissors, "Rock crushes Scissors"],
  ])],
  [ShifumiSymbol.Lizard, new Map([
    [ShifumiSymbol.Spock, "Lizard poisons Spock"],
    [ShifumiSymbol.Paper, "Lizard eats Paper"],
  ])],
  [ShifumiSymbol.Spock, new Map([
    [ShifumiSymbol.Scissors, "Spock smashes Scissors"],
    [ShifumiSymbol.Rock, "Spock vaporizes Rock"],
  ])],
]);

export function getDescription(player: ShifumiSymbol, opponent: ShifumiSymbol): string {
  if (player === opponent) {
    return "Tie";
  }

  if (WIN_MAP.has(player)) {
    const opponentMap = WIN_MAP.get(player)!;
    if (opponentMap.has(opponent)) {
      return opponentMap.get(opponent)!;
    }
  }

  return getDescription(opponent, player);
}

export function ShifumiOutcomeDisplay({ playerSymbol, opponentSymbol, onContinue, onReset }: {
  playerSymbol: ShifumiSymbol,
  opponentSymbol: ShifumiSymbol,
  onContinue(): void;
  onReset(): void;
}) {
  return (
    <div>
      <h1 style={{ marginBottom: 64, textAlign: "center" }}>{getDescription(playerSymbol, opponentSymbol)}</h1>

      <div style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 32,
        flexWrap: "wrap",
      }}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "8px" }}>
          <ShifumiSymbolDisplay symbol={playerSymbol} isSelected/>
          <h6 className="text-secondary">Your selection</h6>
        </div>

        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "8px" }}>
          <ShifumiSymbolDisplay symbol={opponentSymbol} isSelected/>
          <h6 className="text-secondary">Opponent's selection</h6>
        </div>
      </div>

      <div style={{
        display: "flex",
        flexDirection: "column",
        marginTop: "80px",
        alignItems: "center",
        justifyContent: "center",
        gap: "16px",
      }}>
        <a href="#" style={{ textDecoration: "none" }} onClick={onContinue}><h4>Continue</h4></a>
        <Button size="sm" variant="outline-secondary" onClick={onReset}>Reset scores</Button>
      </div>
    </div>
  );
}