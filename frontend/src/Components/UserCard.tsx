import { Trash } from "phosphor-react";
import { UserCardProps } from "../interface";
import CountdownUser from "./CountdownUser";
import { UserCardContent } from "../main.styles";

function UserCard(input: UserCardProps) {
  function handleDeleteUser(username: string) {
    const send = {
      messagetyp: "deleteUser",
      username: username,
    };
    input.sendJsonMessage(send);
  }

  return (
    <UserCardContent>
      <h3>E-Mail: {input.user.username}</h3>

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
      {input.user.username !== "admin@admin.com" ? (
        <Trash
          size={30}
          color={"white"}
          onClick={() => {
            handleDeleteUser(input.user.username);
          }}
          cursor={"pointer"}
        />
      ) : null}
    </UserCardContent>
  );
}

export default UserCard;
