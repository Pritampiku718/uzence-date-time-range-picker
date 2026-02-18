export type RangeState =
  | { status: "empty" }
  | { status: "partial"; start: Date }
  | { status: "complete"; start: Date; end: Date };

export type DateTimeRangePickerProps = {
  value?: RangeState;
  onChange?: (range: RangeState) => void;
};
