import ThemeColors from "@/src/ui/components/theme-colors";
import type { Meta, StoryObj } from "@storybook/react";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "Theme/Colors",
  component: ThemeColors,
  tags: ["autodocs"],
} satisfies Meta<typeof ThemeColors>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
