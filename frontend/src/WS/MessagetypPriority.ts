import { Entry } from "../interface";

function messagetypPriority(
  message: any,
  entries: Array<Entry>,
  setEntries: Function
) {
  const newEntries = [...entries];
  const index = newEntries.findIndex(
    (element) => element.todo === message.todo
  );
  newEntries[index].priority = message.priority;
  const sortedEntries = [...newEntries].sort((a, b) => b.priority - a.priority);
  setEntries(sortedEntries);
}
export default messagetypPriority;
