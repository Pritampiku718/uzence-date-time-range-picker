export const TIMEZONES = [
  "UTC",
  "Asia/Kolkata",
  "America/New_York",
  "Europe/London",
] as const;

export type TimeZone = (typeof TIMEZONES)[number];

export function formatInZone(date: Date, zone: TimeZone) {
  return new Intl.DateTimeFormat("en-US", {
    timeZone: zone,
    dateStyle: "medium",
    timeStyle: "short",
  }).format(date);
}
