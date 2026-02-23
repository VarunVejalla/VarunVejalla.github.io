import { useMemo, useState } from "react";

const tips = [
  "This is a placeholder for your real client-side tool.",
  "Astro only hydrates this React component on the browser.",
  "Swap this file with your actual project widget."
];

export default function InteractiveCounter() {
  const [count, setCount] = useState(0);
  const [tipIndex, setTipIndex] = useState(0);

  const status = useMemo(() => {
    if (count === 0) return "Try the controls below.";
    if (count < 5) return "Great, the island is interactive.";
    return "You can embed more complex app state here.";
  }, [count]);

  return (
    <section className="interactive-shell">
      <p className="eyebrow">React Island Demo</p>
      <p className="interactive-count">{count}</p>
      <p>{status}</p>
      <div className="interactive-controls">
        <button className="button" onClick={() => setCount((value) => value + 1)}>
          Increment
        </button>
        <button className="button outline" onClick={() => setCount(0)}>
          Reset
        </button>
        <button className="button outline" onClick={() => setTipIndex((value) => (value + 1) % tips.length)}>
          Next tip
        </button>
      </div>
      <p className="muted">{tips[tipIndex]}</p>
    </section>
  );
}
