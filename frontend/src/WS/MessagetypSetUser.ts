import { User } from "../interface";

function messagetypSetUser(
  message: any,
  setUsers: Function,
  users: Array<User>
) {
  message.remainingTime = 3600;
  const newUsers = [...users];
  newUsers.push(message);
  setUsers(newUsers);
}
export default messagetypSetUser;
