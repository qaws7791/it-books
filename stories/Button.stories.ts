import type { Meta, StoryObj } from "@storybook/react";
import Button from "@/src/shared/components/ui/Button";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "Example/Button",
  component: Button,
  tags: ["autodocs"],
  args: {
    children: "버튼",
    variant: "default",
    size: "default",
  },
  argTypes: {
    variant: {
      control: "radio",
      options: ["default", "secondary", "outline", "ghost"],
    },
    disabled: {
      control: "boolean",
    },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Secondary: Story = {
  args: {
    variant: "secondary",
  },
};

export const Outline: Story = {
  args: {
    variant: "outline",
  },
};

export const GhostText: Story = {
  args: {
    variant: "ghost",
  },
};
