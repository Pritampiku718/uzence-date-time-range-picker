import { useState } from "react";

export function useCalendarNavigation(totalCells: number) {
  const [focusedIndex, setFocusedIndex] = useState(0);

  function moveFocus(key: string) {
    setFocusedIndex((prev) => {
      let next = prev;

      if (key === "ArrowRight") next = prev + 1;
      if (key === "ArrowLeft") next = prev - 1;
      if (key === "ArrowDown") next = prev + 7;
      if (key === "ArrowUp") next = prev - 7;

      if (next < 0) next = 0;
      if (next >= totalCells) next = totalCells - 1;

      return next;
    });
  }

  return { focusedIndex, setFocusedIndex, moveFocus };
}
