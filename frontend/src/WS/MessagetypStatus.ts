import { Entry } from "../interface";

function messagetypStatus(
  message: any,
  entries: Array<Entry>,
  setEntries: Function
) {
  const newEntries = [...entries];
  const index = newEntries.findIndex(
    (element) => element.todo === message.todo
  );
  newEntries[index].status = message.status;
  if (message.status === "progress") {
    newEntries[index].remainingTime = -1;
  } else {
    newEntries[index].remainingTime = 60;
  }
  setEntries(newEntries);
}
export default messagetypStatus;
