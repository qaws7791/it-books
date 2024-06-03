import FloatingButton from "@/src/ui/components/floating-button";
import type { Meta, StoryObj } from "@storybook/react";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "Example/FloatingButton",
  component: FloatingButton,
  tags: ["autodocs"],
  args: {
    icon: "edit",
    size: "medium",
    variant: "surface",
  },
  argTypes: {
    icon: {
      description: "아이콘",
      control: {
        type: "text",
      },
    },
    size: {
      description: "버튼 크기",
      control: "select",
      options: ["small", "medium", "large"],
    },
    variant: {
      description: "버튼 스타일",
      control: "select",
      options: ["primary", "secondary", "tertiary", "surface"],
    },
  },
} satisfies Meta<typeof FloatingButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Surface: Story = {
  render: () => {
    return (
      <div className="flex gap-4">
        <FloatingButton
          size="small"
          variant="surface"
          icon="edit"
        ></FloatingButton>
        <FloatingButton
          size="medium"
          variant="surface"
          icon="edit"
        ></FloatingButton>
        <FloatingButton
          size="large"
          variant="surface"
          icon="edit"
        ></FloatingButton>
      </div>
    );
  },
};

export const Primary: Story = {
  render: () => {
    return (
      <div className="flex gap-4">
        <FloatingButton
          size="small"
          variant="primary"
          icon="edit"
        ></FloatingButton>
        <FloatingButton
          size="medium"
          variant="primary"
          icon="edit"
        ></FloatingButton>
        <FloatingButton
          size="large"
          variant="primary"
          icon="edit"
        ></FloatingButton>
      </div>
    );
  },
};

export const Secondary: Story = {
  render: () => {
    return (
      <div className="flex gap-4">
        <FloatingButton
          size="small"
          variant="secondary"
          icon="edit"
        ></FloatingButton>
        <FloatingButton
          size="medium"
          variant="secondary"
          icon="edit"
        ></FloatingButton>
        <FloatingButton
          size="large"
          variant="secondary"
          icon="edit"
        ></FloatingButton>
      </div>
    );
  },
};

export const Tertiary: Story = {
  render: () => {
    return (
      <div className="flex gap-4">
        <FloatingButton
          size="small"
          variant="tertiary"
          icon="edit"
        ></FloatingButton>
        <FloatingButton
          size="medium"
          variant="tertiary"
          icon="edit"
        ></FloatingButton>
        <FloatingButton
          size="large"
          variant="tertiary"
          icon="edit"
        ></FloatingButton>
      </div>
    );
  },
};
