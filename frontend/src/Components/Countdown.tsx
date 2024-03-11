import { useState, useEffect } from "react";
import { Entry } from "../interface";

function formatSeconds(seconds: number): string {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;

  const paddedHours = String(hours).padStart(2, "0");
  const paddedMinutes = String(minutes).padStart(2, "0");
  const paddedSeconds = String(remainingSeconds).padStart(2, "0");

  return `${paddedHours}:${paddedMinutes}:${paddedSeconds}`;
}

function Countdown(input: {
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

export default Countdown;
