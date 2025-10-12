import { useState, useEffect } from "react";

export default function TimerCard() {
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    if (!isRunning) return;
    
    const timer = setInterval(() => {
      setSeconds(s => s + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [isRunning]);

  const reset = () => {
    setSeconds(0);
    setIsRunning(false);
  };

  return (
    <div style={cardStyle}>
      <h3>Timer</h3>
      <p style={{ fontSize: "32px", margin: "20px 0" }}>{seconds}s</p>
      <div style={{ display: "flex", gap: "10px", justifyContent: "center" }}>
        <button onClick={() => setIsRunning(true)}>Start</button>
        <button onClick={() => setIsRunning(false)}>Pause</button>
        <button onClick={reset}>Reset</button>
      </div>
    </div>
  );
}

const cardStyle = {
  border: "1px solid #ddd",
  padding: "20px",
  borderRadius: "8px",
  textAlign: "center" as const,
  minWidth: "200px",
};
