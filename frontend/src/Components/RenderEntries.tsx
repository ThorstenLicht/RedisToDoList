import { RenderEntriesProps } from "../interface";
import Countdown from "./Countdown";
import Interactions from "./Interactions";

function RenderEntries(input: RenderEntriesProps) {
  if (input.entries.length === 0) {
    return <p>Keine Einträge vorhanden</p>;
  } else {
    return (
      <div>
        {input.entries.map((entry) => (
          <div>
            <h3>{entry.todo}</h3>
            <p>Eigentümer: {entry.owner}</p>
            {entry.remainingTime >= 0 ? (
              <Countdown
                startCount={entry.remainingTime}
                allEntries={input.allEntries}
                entry={entry}
                setEntries={input.setEntries}
              />
            ) : null}
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
