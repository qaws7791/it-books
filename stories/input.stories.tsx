import type { Meta, StoryObj } from "@storybook/react";
import { Input } from "@/src/shared/components/ui/input";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "Example/Input",
  component: Input,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: "centered",
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  args: {
    placeholder: "Placeholder",
  },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithValue: Story = {
  args: {
    value: "Value",
  },
};

export const FileType: Story = {
  args: {
    type: "file",
  },
};

export const DateType: Story = {
  args: {
    type: "date",
  },
};

export const URLInput: Story = {
  args: {
    type: "url",
  },
};
