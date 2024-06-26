import Chip, { ChipRemoveIcon } from "@/src/ui/components/chip";
import type { Meta, StoryObj } from "@storybook/react";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "Example/Chip",
  component: Chip,
  tags: ["autodocs"],
  args: {
    children: "Label",
    "aria-label": "Tag",
    onClick: () => alert("click"),
  },
} satisfies Meta<typeof Chip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithRemove: Story = {
  render: ({ children, ...arguments_ }) => (
    <Chip {...arguments_}>
      {children}
      <ChipRemoveIcon />
    </Chip>
  ),
};

export const AsChild: Story = {
  render: (...arguments_) => (
    <Chip {...arguments_} asChild>
      <a href="#">Label</a>
    </Chip>
  ),
};
