import { Entry } from "../interface";

function messagetypUpdateTitle(
  oldTodo: string,
  newTodo: string,
  entries: Array<Entry>,
  setEntries: Function
) {
  const newEntries = [...entries];
  const index = newEntries.findIndex((element) => element.todo === oldTodo);
  newEntries[index].todo = newTodo;
  setEntries(newEntries);
}
export default messagetypUpdateTitle;
