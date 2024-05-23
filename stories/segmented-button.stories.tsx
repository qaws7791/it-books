import {
  SegmentedButtonGroup,
  SegmentedButtonItem,
} from "@/src/shared/components/ui/segmented-button";
import type { Meta, StoryObj } from "@storybook/react";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "Example/SegmentedButton",
  component: SegmentedButtonGroup,
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof SegmentedButtonGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Date: Story = {
  render: () => (
    <SegmentedButtonGroup defaultValue="day">
      <SegmentedButtonItem value="day" id="option-day" label="Day" />
      <SegmentedButtonItem value="week" id="option-week" label="Week" />
      <SegmentedButtonItem value="month" id="option-month" label="Month" />
    </SegmentedButtonGroup>
  ),
};

export const SortBy: Story = {
  render: () => (
    <SegmentedButtonGroup defaultValue="relevance" className="w-full">
      <SegmentedButtonItem
        value="relevance"
        id="option-relevance"
        label="Relevance"
      />
      <SegmentedButtonItem
        value="distance"
        id="option-distance"
        label="Distance"
      />
    </SegmentedButtonGroup>
  ),
};

export const Price: Story = {
  render: () => (
    <SegmentedButtonGroup defaultValue="one">
      <SegmentedButtonItem value="one" id="option-one" label="$" />
      <SegmentedButtonItem value="two" id="option-two" label="$$" />
      <SegmentedButtonItem value="three" id="option-three" label="$$$" />
      <SegmentedButtonItem value="four" id="option-four" label="$$$$" />
    </SegmentedButtonGroup>
  ),
};
