import { useState } from "react";
import { sample } from "lodash";
import { ShifumiOutcome, ShifumiSymbol } from "../types";
import { ScoreDisplay } from "./ScoreDisplay";
import { ShifumiOutcomeDisplay } from "./ShifumiOutcomeDisplay";
import { SymbolChoice } from "./SymbolChoice";

function determineOutcome(player: ShifumiSymbol, opponent: ShifumiSymbol): ShifumiOutcome {
  if (player === opponent) {
    return ShifumiOutcome.Tie;
  }

  switch (player) {
    case ShifumiSymbol.Rock:
      return opponent === ShifumiSymbol.Scissors || opponent === ShifumiSymbol.Lizard
        ? ShifumiOutcome.PlayerWin
        : ShifumiOutcome.OpponentWin;

    case ShifumiSymbol.Paper:
      return opponent === ShifumiSymbol.Rock || opponent === ShifumiSymbol.Spock
        ? ShifumiOutcome.PlayerWin
        : ShifumiOutcome.OpponentWin;

    case ShifumiSymbol.Scissors:
      return opponent === ShifumiSymbol.Paper || opponent === ShifumiSymbol.Lizard
        ? ShifumiOutcome.PlayerWin
        : ShifumiOutcome.OpponentWin;

    case ShifumiSymbol.Lizard:
      return opponent === ShifumiSymbol.Spock || opponent === ShifumiSymbol.Paper
        ? ShifumiOutcome.PlayerWin
        : ShifumiOutcome.OpponentWin;

    case ShifumiSymbol.Spock:
      return opponent === ShifumiSymbol.Scissors || opponent === ShifumiSymbol.Rock
        ? ShifumiOutcome.PlayerWin
        : ShifumiOutcome.OpponentWin;

    default:
      // Handle unexpected cases
      throw new Error("Invalid ShifumiSymbol");
  }
}


export function Game() {
  const [playerSymbol, setPlayerSymbol] = useState<ShifumiSymbol | undefined>(undefined);
  const [opponentSymbol, setOpponentSymbol] = useState<ShifumiSymbol | undefined>(undefined);
  const [opponentScore, setOpponentScore] = useState(0);
  const [playerScore, setPlayerScore] = useState(0);
  const [highlightedPlayer, setHighlightedPlayer] = useState<string | undefined>(undefined);
  const showScores = opponentScore > 0 || playerScore > 0;

  function handleSelectSymbol(newPlayerSymbol: ShifumiSymbol) {
    setPlayerSymbol(newPlayerSymbol);

    const newOpponentSymbol = sample(Object.values(ShifumiSymbol))!;
    setOpponentSymbol(newOpponentSymbol);

    const outcome = determineOutcome(newPlayerSymbol, newOpponentSymbol);

    switch (outcome) {
      case ShifumiOutcome.PlayerWin:
        setPlayerScore((value) => value + 1);
        setHighlightedPlayer("Player");
        return;
      case ShifumiOutcome.OpponentWin:
        setOpponentScore((value) => value + 1);
        setHighlightedPlayer("Opponent");
    }
  }

  function handleContinue() {
    setPlayerSymbol(undefined);
    setOpponentSymbol(undefined);
    setHighlightedPlayer(undefined);
  }

  function handleReset() {
    setPlayerScore(0);
    setOpponentScore(0);
    handleContinue();
  }

  return (
    <div style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      width: "100vw",
      height: "100vh",
    }}>

      {showScores && (
        <div style={{
          position: "absolute",
          top: 16,
          left: 16,
          display: "flex",
          gap: 16,
        }}>
          <ScoreDisplay playerName="Player" score={playerScore} highlighted={highlightedPlayer === "Player"}/>
          <ScoreDisplay playerName="Opponent" score={opponentScore} highlighted={highlightedPlayer === "Opponent"}/>
        </div>
      )}
      {!playerSymbol && <SymbolChoice handleSelectSymbol={handleSelectSymbol}/>}
      {playerSymbol && <ShifumiOutcomeDisplay playerSymbol={playerSymbol}
                                              opponentSymbol={opponentSymbol!}
                                              onContinue={handleContinue}
                                              onReset={handleReset}/>}

    </div>
  );
}

