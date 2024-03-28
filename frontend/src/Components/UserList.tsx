import { User, UserListProps } from "../interface";
import { UserArray } from "../main.styles";
import UserCard from "./UserCard";

function UserList(input: UserListProps) {
  if (input.users.length === 0) {
    return (
      <>
        <h1>bestehende Benutzer</h1>
        <p>Keine Benutzer vorhanden</p>
      </>
    );
  }

  return (
    <>
      <UserArray>
        <h1>bestehende Benutzer</h1>
        {input.users.map((user: User) => (
          <UserCard
            user={user}
            setUsers={input.setUsers}
            users={input.users}
            sendJsonMessage={input.sendJsonMessage}
          />
        ))}
      </UserArray>
    </>
  );
}

export default UserList;
