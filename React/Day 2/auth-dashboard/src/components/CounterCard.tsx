import { useState } from "react";

export default function CounterCard() {
  const [count, setCount] = useState(0);

  return (
    <div style={cardStyle}>
      <h3>Counter</h3>
      <p style={{ fontSize: "32px", margin: "20px 0" }}>{count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
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
