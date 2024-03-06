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
  console.log(newEntries[index].priority);
  setEntries(newEntries);
}
export default messagetypPriority;
