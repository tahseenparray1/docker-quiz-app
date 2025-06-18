import { useEffect, useState } from "react";
export default function TimeLabel() {
  const [seconds, setSeconds] = useState(600);
  useEffect(() => {
    const id = setInterval(() => setSeconds((seconds) => seconds - 1), 1000);
    return () => clearInterval(id);
  }, []);
  return (
    <p className="time">
      {Math.floor(seconds / 60)} : {String(seconds % 60).padStart(2, "0")}
    </p>
  );
}
