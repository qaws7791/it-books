import ThemeShadows from "@/src/shared/components/ui/theme-shadows";
import type { Meta, StoryObj } from "@storybook/react";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "Theme/Shadows",
  component: ThemeShadows,
  tags: ["autodocs"],
} satisfies Meta<typeof ThemeShadows>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
