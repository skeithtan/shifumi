import { ShifumiSymbol } from "../types";
import { ShifumiSymbolDisplay } from "./ShifumiSymbolDisplay";

export function SymbolChoice({ handleSelectSymbol }: {
  handleSelectSymbol(symbol: ShifumiSymbol): void;
}) {
  return (
    <div style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: 16,
      flexWrap: "wrap",
      maxWidth: 800
    }}>
      {Object.values(ShifumiSymbol)
        .map((symbol) => (
          <ShifumiSymbolDisplay
            key={symbol}
            symbol={symbol}
            onSelect={handleSelectSymbol}
          />
        ))}
    </div>
  );
}