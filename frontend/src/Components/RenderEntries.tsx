import { RenderEntriesProps } from "../interface";
import Interactions from "./Interactions";

function RenderEntries(input: RenderEntriesProps) {
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
            <Interactions
              entry={entry}
              sendJsonMessage={input.sendJsonMessage}
            />
          </div>
        ))}
      </div>
    );
  }
}

export default RenderEntries;
