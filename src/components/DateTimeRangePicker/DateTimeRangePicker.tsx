import { useState } from "react";
import { CalendarGrid } from "./CalendarGrid";
import type { RangeState } from "./types";

import { TIMEZONES, type TimeZone } from "./timezone";
import { TimeInput } from "./TimeInput";

import { PRESETS } from "./presets";
import { validateRange } from "./constraints";
import { buildUTCInstant, formatInstant } from "./datetime";

export function DateTimeRangePicker() {
  const today = new Date();

  const [range, setRange] = useState<RangeState>({
    status: "empty",
  });

  const [timezone, setTimezone] = useState<TimeZone>("UTC");

  const [startTime, setStartTime] = useState("09:00");
  const [endTime, setEndTime] = useState("18:00");

  const [error, setError] = useState<string | null>(null);

  function applyPreset(label: string) {
    const preset = PRESETS.find((p) => p.label === label);
    if (!preset) return;

    const { start, end } = preset.getRange();

    setRange({ status: "complete", start, end });
    setError(null);
  }

  function handleSelect(date: Date) {
    setError(null);

    if (range.status === "empty") {
      setRange({ status: "partial", start: date });
      return;
    }

    if (range.status === "partial") {
      if (date < range.start) {
        setError("End date cannot be before start date.");
        return;
      }

      const validation = validateRange(range.start, date, {
        maxDurationDays: 14,
      });

      if (validation) {
        setError(validation);
        return;
      }

      setRange({
        status: "complete",
        start: range.start,
        end: date,
      });
      return;
    }

    setRange({ status: "partial", start: date });
  }

  const startInstant =
    range.status !== "empty"
      ? buildUTCInstant(range.start, startTime)
      : null;

  const endInstant =
    range.status === "complete"
      ? buildUTCInstant(range.end, endTime)
      : null;

  return (
    <div className="w-full max-w-md rounded-lg border p-4">
      <h2 className="text-lg font-semibold mb-3">
        DateTime Range Picker
      </h2>

      {/* Presets */}
      <div className="flex gap-2 mb-3 flex-wrap">
        {PRESETS.map((p) => (
          <button
            key={p.label}
            onClick={() => applyPreset(p.label)}
            className="px-3 py-1 rounded-lg border text-sm hover:bg-gray-100"
          >
            {p.label}
          </button>
        ))}
      </div>

      {/* Timezone */}
      <div className="mb-4">
        <label className="text-sm text-muted">Timezone</label>
        <select
          value={timezone}
          onChange={(e) => setTimezone(e.target.value as TimeZone)}
          className="w-full border rounded-lg px-2 py-2 mt-1"
        >
          {TIMEZONES.map((tz) => (
            <option key={tz}>{tz}</option>
          ))}
        </select>
      </div>

      {/* Calendar */}
      <CalendarGrid
        year={today.getFullYear()}
        month={today.getMonth()}
        start={range.status !== "empty" ? range.start : undefined}
        end={range.status === "complete" ? range.end : undefined}
        onSelect={handleSelect}
      />

      {/* Time Inputs */}
      {range.status !== "empty" && (
        <div className="mt-4 grid grid-cols-2 gap-4">
          <TimeInput
            label="Start Time"
            value={startTime}
            onChange={setStartTime}
          />
          <TimeInput
            label="End Time"
            value={endTime}
            onChange={setEndTime}
          />
        </div>
      )}

      {/* Error Feedback */}
      {error && (
        <p className="mt-3 text-sm text-danger font-medium">{error}</p>
      )}

      {/* Output */}
      {startInstant && (
        <p className="mt-4 text-sm">
          Start:{" "}
          <span className="font-medium">
            {formatInstant(startInstant, timezone)}
          </span>
        </p>
      )}

      {endInstant && (
        <p className="text-sm">
          End:{" "}
          <span className="font-medium">
            {formatInstant(endInstant, timezone)}
          </span>
        </p>
      )}
    </div>
  );
}
