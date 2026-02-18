import { useMemo, useRef, useEffect } from "react";
import { useCalendarNavigation } from "../../hooks/useCalendarNavigation";

type CalendarGridProps = {
  year: number;
  month: number;
  start?: Date;
  end?: Date;
  onSelect: (date: Date) => void;
};

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}

function getWeekdayStart(year: number, month: number) {
  return new Date(year, month, 1).getDay();
}

function isSameDay(a: Date, b: Date) {
  return a.toDateString() === b.toDateString();
}

function isInRange(date: Date, start?: Date, end?: Date) {
  if (!start || !end) return false;
  return date >= start && date <= end;
}

export function CalendarGrid({
  year,
  month,
  start,
  end,
  onSelect,
}: CalendarGridProps) {
  const days = useMemo(() => {
    const total = getDaysInMonth(year, month);
    const offset = getWeekdayStart(year, month);

    const cells: (Date | null)[] = [];

    for (let i = 0; i < offset; i++) {
      cells.push(null);
    }

    for (let d = 1; d <= total; d++) {
      cells.push(new Date(year, month, d));
    }

    return cells;
  }, [year, month]);

  const { focusedIndex, setFocusedIndex, moveFocus } =
    useCalendarNavigation(days.length);

  const buttonRefs = useRef<Array<HTMLButtonElement | null>>([]);

  useEffect(() => {
    buttonRefs.current[focusedIndex]?.focus();
  }, [focusedIndex]);

  function handleKeyDown(e: React.KeyboardEvent) {
    if (
      e.key === "ArrowRight" ||
      e.key === "ArrowLeft" ||
      e.key === "ArrowUp" ||
      e.key === "ArrowDown"
    ) {
      e.preventDefault();
      moveFocus(e.key);
    }

    if (e.key === "Enter") {
      const date = days[focusedIndex];
      if (date) onSelect(date);
    }
  }

  return (
    <div>
      {/* Weekdays */}
      <div className="grid grid-cols-7 text-center text-sm text-muted mb-2">
        {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((label) => (
          <div key={label}>{label}</div>
        ))}
      </div>

      {/* Grid */}
      <div
        role="grid"
        tabIndex={0}
        aria-label="Calendar"
        onKeyDown={handleKeyDown}
        className="grid grid-cols-7 gap-1 outline-none"
      >
        {days.map((date, idx) => {
          if (!date) return <div key={idx} />;

          const isStart = start && isSameDay(date, start);
          const isEnd = end && isSameDay(date, end);
          const inside = isInRange(date, start, end);

          return (
            <button
              key={idx}
              ref={(el) => {
                buttonRefs.current[idx] = el;
              }}
              role="gridcell"
              tabIndex={focusedIndex === idx ? 0 : -1}
              onClick={() => {
                setFocusedIndex(idx);
                onSelect(date);
              }}
              className={`h-10 w-10 rounded-lg text-sm flex items-center justify-center
                ${
                  isStart || isEnd
                    ? "bg-primary text-white"
                    : inside
                    ? "bg-blue-100"
                    : "hover:bg-gray-200"
                }
                focus:ring-2 focus:ring-primary`}
            >
              {date.getDate()}
            </button>
          );
        })}
      </div>
    </div>
  );
}
