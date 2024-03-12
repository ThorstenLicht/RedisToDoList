import { User } from "../interface";

function changePasswordAdminInfo(
  users: Array<User>,
  setUsers: Function,
  username: string
) {
  const newUsers = users.map((user) => {
    if (user.username === username) {
      return {
        username: user.username,
        password: null,
        remainingTime: -1,
      };
    }
    return user;
  });

  console.log("newUsers", newUsers);
  setUsers(newUsers);
}

export default changePasswordAdminInfo;
