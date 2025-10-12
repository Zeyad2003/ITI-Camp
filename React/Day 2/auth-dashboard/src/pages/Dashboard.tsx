import CounterCard from "../components/CounterCard";
import TimerCard from "../components/TimerCard";
import NotesCard from "../components/NotesCard";

export default function Dashboard() {
  return (
    <div style={{ padding: "20px" }}>
      <h1 style={{ textAlign: "center" }}>Dashboard</h1>
      <div style={{
        display: "flex",
        gap: "20px",
        flexWrap: "wrap",
        justifyContent: "center",
        marginTop: "30px"
      }}>
        <CounterCard />
        <TimerCard />
        <NotesCard />
      </div>
    </div>
  );
}
