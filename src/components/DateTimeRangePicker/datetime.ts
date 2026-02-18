import type { TimeZone } from "./timezone";

/**
 * Combine a calendar date + "HH:mm" into a UTC instant.
 * This prevents DST shifting issues.
 */
export function buildUTCInstant(date: Date, time: string): Date {
  const [hh, mm] = time.split(":").map(Number);

  return new Date(
    Date.UTC(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
      hh,
      mm
    )
  );
}

/**
 * Format UTC instant in chosen timezone safely
 */
export function formatInstant(date: Date, zone: TimeZone) {
  return new Intl.DateTimeFormat("en-US", {
    timeZone: zone,
    dateStyle: "medium",
    timeStyle: "short",
  }).format(date);
}
