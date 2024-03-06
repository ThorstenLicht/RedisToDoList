import { InteractionsProps } from "../interface";

function Interactions(input: InteractionsProps) {
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
    <div>
      <select value={input.entry.status} onChange={changeStatus}>
        <option value="progress">In Arbeit</option>
        <option value="completed">Abgschlossen</option>
        <option value="deleted">Entfernen</option>{" "}
      </select>
      <select value={input.entry.priority} onChange={changePriority}>
        <option value="1">Geringe Priorität</option>
        <option value="2">Mittlere Priorität</option>
        <option value="3">Hohe Priorität</option>
      </select>
    </div>
  );
}

export default Interactions;
