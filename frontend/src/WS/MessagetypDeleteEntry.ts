import { Entry } from "../interface";

function messagetypDeleteEntry(
  todo: string,
  entries: Array<Entry>,
  setEntries: Function
) {
  const updatedEntries = entries.filter((e) => e.todo !== todo);
  setEntries(updatedEntries);
}

export default messagetypDeleteEntry;
