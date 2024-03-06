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
  setEntries(newEntries);
}
export default messagetypStatus;
