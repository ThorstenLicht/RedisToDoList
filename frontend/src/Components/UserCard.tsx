import { Trash } from "phosphor-react";
import { User } from "../interface";
import CountdownUser from "./CountdownUser";

function UserCard(input: {
  user: User;
  setUsers: Function;
  users: Array<User>;
  sendJsonMessage: Function;
}) {
  function handleDeleteUser(username: string) {
    const send = {
      messagetyp: "deleteUser",
      username: username,
    };
    input.sendJsonMessage(send);
  }

  return (
    <div>
      <h3>{input.user.username}</h3>
      {input.user.username !== "Admin" ? (
        <Trash
          size={30}
          onClick={() => {
            handleDeleteUser(input.user.username);
          }}
          cursor={"pointer"}
        />
      ) : null}
      {input.user.password ? (
        <p>Einmalpasswort: {input.user.password}</p>
      ) : null}
      {input.user.remainingTime >= 0 ? (
        <CountdownUser
          startCount={input.user.remainingTime}
          allUsers={input.users}
          user={input.user}
          setUsers={input.setUsers}
        />
      ) : null}
    </div>
  );
}

export default UserCard;
