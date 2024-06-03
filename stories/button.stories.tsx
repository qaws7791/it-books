import Button from "@/src/ui/components/button";
import type { Meta, StoryObj } from "@storybook/react";

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
      options: ["default", "secondary", "tertiary", "outline", "ghost"],
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

export const Tertiary: Story = {
  args: {
    variant: "tertiary",
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

export const Icon: Story = {
  args: {
    children: <span className="material-icons">add</span>,
    variant: "ghost",
    size: "icon",
  },
};
