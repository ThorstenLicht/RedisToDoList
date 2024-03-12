import { User } from "../interface";
import UserCard from "./UserCard";

function UserList(input: {
  users: Array<User>;
  setUsers: Function;
  sendJsonMessage: Function;
}) {
  if (input.users.length === 0) {
    return <p>Keine Benutzer vorhanden</p>;
  }

  return (
    <div>
      <h1>bestehende Benutzer</h1>
      {input.users.map((user: User) => (
        <UserCard
          user={user}
          setUsers={input.setUsers}
          users={input.users}
          sendJsonMessage={input.sendJsonMessage}
        />
      ))}
    </div>
  );
}

export default UserList;
