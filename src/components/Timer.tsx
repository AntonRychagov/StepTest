import React, { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import testStore from "../stores/TestStore";
import Typography from "@mui/material/Typography";

const Timer: React.FC = observer(() => {
  const [timeRemaining, setTimeRemaining] = useState(
    testStore.getTimeRemaining()
  );

  useEffect(() => {
    const timerId = setInterval(() => {
      setTimeRemaining(testStore.getTimeRemaining());
    }, 1000);

    return () => clearInterval(timerId);
  }, []);

  return (
    <Typography variant="body1">
      {Math.floor(timeRemaining / 60)}:
      {Math.floor(timeRemaining % 60)
        .toString()
        .padStart(2, "0")}
    </Typography>
  );
});

export default Timer;
