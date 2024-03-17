import { Pencil, Trash } from "phosphor-react";
import { InteractionsProps } from "../interface";
import { SelectionContainer } from "../main.styles";
import { useState } from "react";
import { CustomToast } from "../CustomToast";

function Interactions(input: InteractionsProps) {
  const [updatefield, setUpdatefield] = useState(false);
  const [newTitle, setNewTitle] = useState(input.entry.todo);
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

  function handleVisible() {
    setUpdatefield(!updatefield);
  }
  function handleUpdate() {
    if (newTitle !== input.entry.todo) {
      const send = {
        messagetyp: "updateTitle",
        oldTitle: input.entry.todo,
        newTitle: newTitle,
      };
      input.sendJsonMessage(send);
      setUpdatefield(false);
    } else {
      CustomToast.error("Der Titel ist identisch mit dem alten Titel.");
    }
  }
  function handleDelete() {
    const send = {
      messagetyp: "deleteEntry",
      title: input.entry.todo,
    };
    input.sendJsonMessage(send);
  }

  function handleTodoChange(input: React.ChangeEvent<HTMLInputElement>) {
    setNewTitle(input.target.value);
  }

  return (
    <SelectionContainer>
      {(input.entry.owner === username || username === "admin@admin.com") && (
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
      {(input.entry.owner === username || username === "admin@admin.com") && (
        <Pencil
          size={24}
          color={"white"}
          cursor={"pointer"}
          onClick={handleVisible}
        />
      )}
      {updatefield && (
        <>
          <input
            type="text"
            placeholder="Neuer Titel"
            title="Gebe hier Deinen neuen Titel ein."
            value={newTitle}
            onChange={handleTodoChange}
          />
          <button onClick={handleUpdate}>Speichern</button>
        </>
      )}
      {username === "admin@admin.com" && (
        <Trash
          size={24}
          color={"white"}
          cursor={"pointer"}
          onClick={handleDelete}
        />
      )}
    </SelectionContainer>
  );
}

export default Interactions;
