/** Calendar helpers for booking slots. Times are wall-clock times in the configured time zone. */

export interface ZonedParts {
  year: number;
  month: number;
  day: number;
  hour: number;
  minute: number;
  weekday: string;
}

export function zonedParts(date: Date, timeZone: string): ZonedParts {
  const parts = Object.fromEntries(
    new Intl.DateTimeFormat('en-US', {
      timeZone,
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
      weekday: 'short',
      hour: 'numeric',
      minute: 'numeric',
      hourCycle: 'h23',
    })
      .formatToParts(date)
      .map((part) => [part.type, part.value]),
  );
  return {
    year: Number(parts.year),
    month: Number(parts.month),
    day: Number(parts.day),
    hour: Number(parts.hour),
    minute: Number(parts.minute),
    weekday: parts.weekday ?? '',
  };
}

/** The UTC instant of a wall-clock time in a time zone. */
export function zonedTimeToUtc(
  year: number,
  month: number,
  day: number,
  time: string,
  timeZone: string,
) {
  const [hour, minute] = time.split(':').map(Number);
  const guess = Date.UTC(year, month - 1, day, hour, minute);
  const seen = zonedParts(new Date(guess), timeZone);
  const offset = Date.UTC(seen.year, seen.month - 1, seen.day, seen.hour, seen.minute) - guess;
  return new Date(guess - offset);
}

export function pad(value: number) {
  return String(value).padStart(2, '0');
}

/** Calendar date `offset` days after year-month-day, with no time-zone shift. */
export function shiftDate(year: number, month: number, day: number, offset: number) {
  const utc = new Date(Date.UTC(year, month - 1, day + offset));
  return {
    year: utc.getUTCFullYear(),
    month: utc.getUTCMonth() + 1,
    day: utc.getUTCDate(),
  };
}

export function dateKey(year: number, month: number, day: number) {
  return `${year}-${pad(month)}-${pad(day)}`;
}

const weekend = new Set(['Sat', 'Sun']);

/** The next `count` weekdays after today in `timeZone`, starting tomorrow. */
export function upcomingWeekdays(from: Date, count: number, timeZone: string) {
  const today = zonedParts(from, timeZone);
  const dates: Array<{ year: number; month: number; day: number; date: string }> = [];

  for (let offset = 1; dates.length < count && offset < count * 3 + 7; offset += 1) {
    const next = shiftDate(today.year, today.month, today.day, offset);
    const noon = zonedTimeToUtc(next.year, next.month, next.day, '12:00', timeZone);
    if (weekend.has(zonedParts(noon, timeZone).weekday)) continue;
    dates.push({ ...next, date: dateKey(next.year, next.month, next.day) });
  }

  return dates;
}
