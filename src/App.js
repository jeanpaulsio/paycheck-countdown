import React, { useEffect } from "react";
import Confetti from "react-confetti";
import { useWindowSize } from "react-use";
import {
  differenceInCalendarDays,
  format,
  isSaturday,
  isSunday,
  lastDayOfMonth,
} from "date-fns";

import "./App.css";

const COLORS = ["#d6ba68", "#c1a95e", "#9b8649", "#ccb576", "#c6a445"];

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
  const isPayDay = days === 0;
  const { width, height } = useWindowSize();

  useEffect(() => {
    document.title = isPayDay
      ? "IT'S PAY DAY"
      : `${days} Days Till Next Paycheck`;
  });

  return (
    <div className="container">
      {isPayDay ? (
        <>
          <Confetti width={width} height={height} colors={COLORS} />
          <a
            className="payday-title"
            href="https://youtu.be/fLCf-URqIf0?t=101"
            target="_blank"
            rel="noopener noreferrer"
          >
            It's Pay Day!
          </a>
        </>
      ) : (
        <h1 className="countdown-title">{days}</h1>
      )}
    </div>
  );
}

export default App;
