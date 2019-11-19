import React, { useEffect } from "react";
import {
  differenceInCalendarDays,
  format,
  isSaturday,
  isSunday,
  lastDayOfMonth,
  subDays,
  isSameDay,
} from "date-fns";

import "./App.css";

const UPCOMING_HOLIDAYS = [
  new Date(2019, 10, 28), // Thanksgiving
  new Date(2019, 10, 29), // Day After Thanksgiving
  new Date(2019, 11, 24), // Christmas Eve
  new Date(2019, 11, 25), // Christmas
  new Date(2020, 0, 1), // New Years
  new Date(2020, 0, 20), // MLK Jr. Day
  new Date(2020, 1, 17), // President's Day
  new Date(2020, 4, 25), // Memorial Day
  new Date(2020, 6, 4), // Independence Day
  new Date(2020, 8, 7), // Labor Day
]

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

  let newDate;
  let holidays = [...UPCOMING_HOLIDAYS];

  if (isSaturday(payDay)) {
    newDate = subDays(payDay, 1)

    while(holidays.length > 0) {
      let holiday = holidays.pop()
      if (isSameDay(holiday, newDate)) {
        newDate = subDays(newDate, 1)
      }
    }

    return differenceInCalendarDays(newDate, today)
  } else if (isSunday(payDay)) {
    newDate = subDays(payDay, 2)

    while(holidays.length > 0) {
      let holiday = holidays.pop()
      if (isSameDay(holiday, newDate)) {
        newDate = subDays(newDate, 1)
      }
    }

    return differenceInCalendarDays(newDate, today)
  } else {
    return differenceInCalendarDays(payDay, today);
  }
}

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function dayDisplay(days) {
  return days === 1 ? "day" : "days";
}

function App() {
  const days = daysUntilPaycheck(new Date());

  useEffect(() => {
    document.title =
      days === 0
        ? "It's Pay Day!"
        : `${days} ${capitalize(dayDisplay(days))} Left`;
  });

  return days === 0 ? (
    <h2 className="alt-title">It's Pay Day!</h2>
  ) : (
    <h1 className="title">{days}</h1>
  );
}

export default App;
