import {
  Drawer,
  DrawerDivider,
  DrawerIcon,
  DrawerItem,
  DrawerSectionHeader,
  DrawerTitle,
} from "@/src/ui/components/drawer";
import type { Meta, StoryObj } from "@storybook/react";
import React from "react";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "Example/Drawer",
  component: Drawer,
  tags: ["autodocs"],
} satisfies Meta<typeof Drawer>;

export default meta;
type Story = StoryObj<typeof meta>;

const DrawerWithHooks = () => {
  const [selected, setSelected] = React.useState<string>("inbox");
  return (
    <Drawer className="w-80">
      <DrawerTitle>Drawer Title</DrawerTitle>
      <DrawerItem
        onClick={() => setSelected("inbox")}
        selected={selected === "inbox"}
      >
        <DrawerIcon>inbox</DrawerIcon>
        Drawer Item
      </DrawerItem>
      <DrawerItem
        onClick={() => setSelected("send")}
        selected={selected === "send"}
      >
        <DrawerIcon>send</DrawerIcon>
        Drawer Item
      </DrawerItem>
      <DrawerItem
        onClick={() => setSelected("favorite_border")}
        selected={selected === "favorite_border"}
      >
        <DrawerIcon>favorite_border</DrawerIcon>
        Drawer Item
      </DrawerItem>
      <DrawerDivider />
      <DrawerSectionHeader>Section Header</DrawerSectionHeader>
      <DrawerItem
        onClick={() => setSelected("delete")}
        selected={selected === "delete"}
      >
        <DrawerIcon>delete</DrawerIcon>
        Drawer Item
      </DrawerItem>
    </Drawer>
  );
};

export const Default: Story = {
  render: () => <DrawerWithHooks />,
};
