import { useState } from "react";
import { NewEntryProps } from "../interface";
import { CustomToast } from "../CustomToast";
import { EntryForm } from "../main.styles";

function NewEntry(input: NewEntryProps) {
  const [title, setTitle] = useState("");

  function handleTitleChange(input: React.ChangeEvent<HTMLInputElement>) {
    setTitle(input.target.value);
  }

  function NewEntry() {
    if (title === "") {
      CustomToast.error("Titel darf nicht leer sein");
      return;
    } else {
      input.sendJsonMessage({
        messagetyp: "new",
        entry: {
          todo: title,
          owner: sessionStorage.getItem("username"),
          status: "progress",
        },
      });
      setTitle("");
    }
  }

  return (
    <EntryForm>
      <input
        type="text"
        value={title}
        placeholder="Titel des ToDo Eintrags"
        title="Geben sie hier den Titel ihres ToDo's ein"
        onChange={handleTitleChange}
      />
      <button
        title="Klicken Sie hier, um einen ToDo Eintrag zu erstellen"
        onClick={() => NewEntry()}
      >
        ToDo anlegen
      </button>
    </EntryForm>
  );
}

export default NewEntry;
