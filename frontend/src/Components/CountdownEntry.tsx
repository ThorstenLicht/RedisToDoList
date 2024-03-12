import { useState, useEffect } from "react";
import { Entry } from "../interface";
import formatSeconds from "../FormatSeconds";

function CountdownEntry(input: {
  startCount: number;
  allEntries: Array<Entry>;
  entry: Entry;
  setEntries: Function;
}) {
  const [count, setCount] = useState(input.startCount);

  useEffect(() => {
    if (count <= 0) {
      const updatedEntries = input.allEntries.filter((e) => e !== input.entry);
      input.setEntries(updatedEntries);
      return;
    }
    const timerId = setInterval(() => {
      setCount((prevCount) => prevCount - 1);
      if (input.entry.status === "progress") {
        clearInterval(timerId);
      }
    }, 1000);
    return () => clearInterval(timerId);
  }, [count, input.allEntries]);

  return <p>Verbliebene Zeit: {formatSeconds(count)}</p>;
}

export default CountdownEntry;
