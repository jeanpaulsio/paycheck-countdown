import React, { useEffect } from "react";
import {
  differenceInCalendarDays,
  format,
  isSaturday,
  isSunday,
  lastDayOfMonth
} from "date-fns";

import "./App.css";

export function isPastMidMonth(dayOfMonth) {
  return dayOfMonth > 15;
}

export function midDayOfMonth(today) {
  return new Date(+format(today, "Y"), +format(today, "M") - 1, 15);
}

export function getNextPayDay(today) {
  return isPastMidMonth(+format(today, "d"))
    ? lastDayOfMonth(today)
    : midDayOfMonth(today);
}

export function daysUntilPaycheck(today) {
  const payDay = getNextPayDay(today);
  const difference = differenceInCalendarDays(payDay, today);

  if (isSaturday(payDay)) {
    return difference - 1;
  } else if (isSunday(payDay)) {
    return difference - 2;
  } else {
    return difference;
  }
}

function App() {
  const days = daysUntilPaycheck(new Date());

  useEffect(
    () => {
      document.title = `${days} Days Till Next Paycheck`;
    },
    [days]
  );

  return (
    <div className="App">
      <header className="App-header">
        {days === 0
          ? <h2>It's Pay Day!</h2>
          : <h1 className="App-title">
              {days}
            </h1>}
      </header>
    </div>
  );
}

export default App;
