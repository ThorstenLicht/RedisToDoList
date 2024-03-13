import { InteractionsProps } from "../interface";
import { SelectionContainer } from "../main.styles";

function Interactions(input: InteractionsProps) {
  const username = sessionStorage.getItem("username");
  function changeStatus(event: React.ChangeEvent<HTMLSelectElement>) {
    const newStatus = event.target.value;
    const newEntry = { ...input.entry, status: newStatus };
    const send = {
      messagetyp: "status",
      entry: newEntry,
    };
    input.sendJsonMessage(send);
  }

  function changePriority(event: React.ChangeEvent<HTMLSelectElement>) {
    const newPriority = event.target.value;
    const newEntry = { ...input.entry, priority: newPriority };
    const send = {
      messagetyp: "priority",
      entry: newEntry,
    };
    input.sendJsonMessage(send);
  }

  return (
    <SelectionContainer>
      {(input.entry.owner === username || username === "Admin") && (
        <select value={input.entry.status} onChange={changeStatus}>
          <option value="progress">In Arbeit</option>
          <option value="completed">Abgschlossen</option>
          <option value="deleted">Entfernen</option>{" "}
        </select>
      )}
      {input.entry.status === "progress" && (
        <select value={input.entry.priority} onChange={changePriority}>
          <option value="1">Geringe Priorität</option>
          <option value="2">Mittlere Priorität</option>
          <option value="3">Hohe Priorität</option>
        </select>
      )}
    </SelectionContainer>
  );
}

export default Interactions;
