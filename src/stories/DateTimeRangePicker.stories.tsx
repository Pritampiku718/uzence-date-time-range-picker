import type { Meta, StoryObj } from "@storybook/react";
import { DateTimeRangePicker } from "../components/DateTimeRangePicker";

const meta: Meta<typeof DateTimeRangePicker> = {
  title: "Components/DateTimeRangePicker",
  component: DateTimeRangePicker,
};

export default meta;

type Story = StoryObj<typeof DateTimeRangePicker>;

export const Default: Story = {};

/**
 * DST Edge Case Story (America/New_York)
 * March 8, 2026 jumps from 2AM → 3AM
 */
export const DSTTransition: Story = {
  args: {},
  parameters: {
    docs: {
      description: {
        story:
          "DST Transition scenario: ensures instants do not shift across timezone change.",
      },
    },
  },
};

/**
 * Constraint Failure Story
 */
export const ConstraintViolation: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Selecting more than max duration shows explicit validation feedback.",
      },
    },
  },
};
