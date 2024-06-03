import Button from "@/src/ui/components/button";
import FloatingButton from "@/src/ui/components/floating-button";
import {
  NavigationRail,
  NavigationRailHeader,
  NavigationRailIcon,
  NavigationRailItem,
  NavigationRailList,
} from "@/src/ui/components/navigation-rail";
import type { Meta, StoryObj } from "@storybook/react";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "Example/NavigationRail",
  component: NavigationRail,
  tags: ["autodocs"],
  args: {},
} satisfies Meta<typeof NavigationRail>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <NavigationRail className="h-screen">
      <NavigationRailHeader>
        <FloatingButton
          size="medium"
          variant="surface"
          icon="search"
        ></FloatingButton>
      </NavigationRailHeader>

      <NavigationRailList>
        <NavigationRailItem selected>
          <NavigationRailIcon>home</NavigationRailIcon>홈
        </NavigationRailItem>
        <NavigationRailItem>
          <NavigationRailIcon>favorite</NavigationRailIcon>
          아이템1
        </NavigationRailItem>
        <NavigationRailItem>
          <NavigationRailIcon>star</NavigationRailIcon>
          아이템2
        </NavigationRailItem>
      </NavigationRailList>
    </NavigationRail>
  ),
};

export const Center: Story = {
  render: () => (
    <NavigationRail className="h-screen">
      <NavigationRailHeader>
        <Button variant="ghost" size="icon">
          <span className="material-icons">menu</span>
        </Button>
      </NavigationRailHeader>

      <NavigationRailList>
        <NavigationRailItem selected>
          <NavigationRailIcon>home</NavigationRailIcon>홈
        </NavigationRailItem>
        <NavigationRailItem>
          <NavigationRailIcon>favorite</NavigationRailIcon>
          아이템1
        </NavigationRailItem>
        <NavigationRailItem>
          <NavigationRailIcon>star</NavigationRailIcon>
          아이템2
        </NavigationRailItem>
      </NavigationRailList>
    </NavigationRail>
  ),
};
