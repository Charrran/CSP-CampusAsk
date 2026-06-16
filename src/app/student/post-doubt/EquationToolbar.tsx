import React from "react";
import styles from "./Equation.module.css";

const symbols = [
  "√",
  "∑",
  "∫",
  "π",
  "θ",
  "α",
  "β",
  "≤",
  "≥",
  "≠",
  "±",
  "∞",
  "×",
  "÷",
];

type Props = {
  onInsert: (symbol: string) => void;
};

export default function EquationToolbar({ onInsert }: Props) {
  return (
    <div className={styles.toolbar} role="toolbar" aria-label="Math symbols toolbar">
      {symbols.map((sym) => (
        <button
          key={sym}
          type="button"
          className={styles.button}
          onClick={() => onInsert(sym)}
          aria-label={`Insert ${sym}`}
        >
          {sym}
        </button>
      ))}
    </div>
  );
}
