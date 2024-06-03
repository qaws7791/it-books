import {
  Drawer,
  DrawerIcon,
  DrawerItem,
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
      {["inbox", "send", "favorite_border", "delete"].map((icon) => (
        <DrawerItem
          key={icon}
          onClick={() => setSelected(icon)}
          selected={selected === icon}
        >
          <DrawerIcon>{icon}</DrawerIcon>
          Drawer Item
        </DrawerItem>
      ))}
    </Drawer>
  );
};

export const Default: Story = {
  render: () => <DrawerWithHooks />,
};
