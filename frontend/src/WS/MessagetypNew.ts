import { Entry } from "../interface";

function messagetypNew(
  message: any,
  entries: Array<Entry>,
  setEntries: Function
) {
  message.status = "progress";
  message.priority = "1";
  const newEntry = [...entries];
  newEntry.push(message);
  setEntries(newEntry);
}
export default messagetypNew;
