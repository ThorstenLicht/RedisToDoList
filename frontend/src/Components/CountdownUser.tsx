import { useState, useEffect } from "react";
import { User } from "../interface";
import formatSeconds from "../FormatSeconds";

function CountdownUser(input: {
  startCount: number;
  allUsers: Array<User>;
  user: User;
  setUsers: Function;
}) {
  const [count, setCount] = useState(input.startCount);

  useEffect(() => {
    if (count <= 0) {
      const updatedUsers = input.allUsers.filter((e) => e !== input.user);
      input.setUsers(updatedUsers);
      return;
    }
    const timerId = setInterval(() => {
      setCount((prevCount) => prevCount - 1);
      if (input.user.password === null) {
        clearInterval(timerId);
      }
    }, 1000);
    return () => clearInterval(timerId);
  }, [count, input.allUsers]);

  return <p>Verbliebene Zeit: {formatSeconds(count)}</p>;
}

export default CountdownUser;
