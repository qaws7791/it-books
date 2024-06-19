import DUMMY from "@/src/dummy";
import Button from "@/src/ui/components/button";
import { Drawer, DrawerIcon, DrawerItem } from "@/src/ui/components/drawer";
import FloatingButton from "@/src/ui/components/floating-button";
import {
  NavigationRail,
  NavigationRailContent,
  NavigationRailHeader,
  NavigationRailIcon,
  NavigationRailItem,
  NavigationRailLink,
  NavigationRailList,
  NavigationRailTrigger,
} from "@/src/ui/components/navigation-rail";
import type { Meta, StoryObj } from "@storybook/react";
import Link from "next/link";

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
        {DUMMY.SIDEBAR_LINKS.map((link) => (
          <NavigationRailItem className="group" key={link.href}>
            {link.children?.length ? (
              <>
                <NavigationRailTrigger>
                  <NavigationRailLink asChild>
                    <Link href={link.href}>
                      <NavigationRailIcon>{link.icon}</NavigationRailIcon>
                      {link.name}
                    </Link>
                  </NavigationRailLink>
                </NavigationRailTrigger>
                <NavigationRailContent>
                  <Drawer className="rounded-l-none shadow-1 bg-surface-container border-l w-60">
                    {link.children.map((child) => (
                      <DrawerItem key={child.href} asChild>
                        <Link href={child.href}>
                          <DrawerIcon>{child.icon}</DrawerIcon>
                          <span>{child.name}</span>
                        </Link>
                      </DrawerItem>
                    ))}
                  </Drawer>
                </NavigationRailContent>
              </>
            ) : (
              <NavigationRailLink asChild>
                <Link href={link.href}>
                  <NavigationRailIcon>{link.icon}</NavigationRailIcon>
                  {link.name}
                </Link>
              </NavigationRailLink>
            )}
          </NavigationRailItem>
        ))}
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
