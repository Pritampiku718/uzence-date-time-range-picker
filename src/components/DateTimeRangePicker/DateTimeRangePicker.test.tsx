import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { DateTimeRangePicker } from "./DateTimeRangePicker";

test("keyboard navigation works inside calendar grid", async () => {
  render(<DateTimeRangePicker />);

  const grid = screen.getByRole("grid");

  grid.focus();

  await userEvent.keyboard("{ArrowRight}");
  await userEvent.keyboard("{Enter}");

  expect(screen.getByText(/Start:/)).toBeInTheDocument();
});
