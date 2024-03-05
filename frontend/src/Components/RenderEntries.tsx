import { Entry } from "../interface";

function RenderEntries(input: { entries: Array<Entry> }) {
  if (!input.entries) {
    return <h1>Keine Einträge vorhanden</h1>;
  } else {
    return (
      <div>
        {input.entries.map((entry) => (
          <div>
            <h1>{entry.todo}</h1>
            <p>{entry.owner}</p>
            <p>{entry.status}</p>
            <p>{entry.priority}</p>
          </div>
        ))}
      </div>
    );
  }
}

export default RenderEntries;
