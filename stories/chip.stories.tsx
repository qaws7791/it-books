import Chip from "@/src/shared/components/ui/chip";
import type { Meta, StoryObj } from "@storybook/react";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "Example/Chip",
  component: Chip,
  tags: ["autodocs"],
  args: {
    children: "Label",
    "aria-label": "Tag",
  },
} satisfies Meta<typeof Chip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
