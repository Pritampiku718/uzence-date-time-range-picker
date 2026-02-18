export type ConstraintConfig = {
  minDate?: Date;
  maxDate?: Date;
  maxDurationDays?: number;
};

export function validateRange(
  start: Date,
  end: Date,
  config: ConstraintConfig
): string | null {
  if (config.minDate && start < config.minDate) {
    return "Start date is before minimum allowed date.";
  }

  if (config.maxDate && end > config.maxDate) {
    return "End date is after maximum allowed date.";
  }

  if (config.maxDurationDays) {
    const diffDays =
      (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24);

    if (diffDays > config.maxDurationDays) {
      return `Range cannot exceed ${config.maxDurationDays} days.`;
    }
  }

  return null;
}
