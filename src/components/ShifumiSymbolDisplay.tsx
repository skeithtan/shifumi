import { ShifumiSymbol } from "../types";
import { Button } from "react-bootstrap";
import { ButtonVariant } from "react-bootstrap/types";

function getVariantForSymbol(symbol: ShifumiSymbol, outline: boolean): ButtonVariant {
  switch (symbol) {
    case ShifumiSymbol.Paper:
      return outline ? "outline-primary" : "primary";
    case ShifumiSymbol.Rock:
      return outline ? "outline-secondary" : "secondary";
    case ShifumiSymbol.Scissors:
      return outline ? "outline-success" : "success";
    case ShifumiSymbol.Lizard:
      return outline ? "outline-warning": "warning";
    case ShifumiSymbol.Spock:
      return outline ? "outline-danger": "danger";
  }
}

export function ShifumiSymbolDisplay({ symbol, onSelect, isSelected }: {
  symbol: ShifumiSymbol,
  onSelect?(symbol: ShifumiSymbol): void,
  isSelected?: boolean
}) {
  return (
    <Button
      variant={getVariantForSymbol(symbol, !isSelected)}
      style={{
        padding: "24px",
        minWidth: 240,
      }}
      onClick={() => onSelect?.(symbol)}
      disabled={isSelected}
    >
      {symbol}
    </Button>
  );
}