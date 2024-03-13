import { RenderEntriesProps } from "../interface";
import CountdownEntry from "./CountdownEntry";
import Interactions from "./Interactions";
import { ToDoContainer, ToDoGrid } from "../main.styles";

function RenderEntries(input: RenderEntriesProps) {
  if (input.entries.length === 0) {
    return <p>Keine Einträge vorhanden</p>;
  } else {
    return (
      <ToDoGrid>
        {input.entries.map((entry) => (
          <ToDoContainer>
            <h2>{entry.todo}</h2>
            <p>Eigentümer: {entry.owner}</p>
            {entry.remainingTime >= 0 ? (
              <CountdownEntry
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
          </ToDoContainer>
        ))}
      </ToDoGrid>
    );
  }
}

export default RenderEntries;
