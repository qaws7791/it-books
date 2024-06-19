"use client";
import SearchModalWrapper from "@/src/feature/shared/components/layout/search-modal-button";
import ThemeToggleButton from "@/src/feature/shared/components/theme-toggle-button";
import { cn } from "@/src/feature/shared/lib/utils";
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
import Link from "next/link";
import { usePathname } from "next/navigation";

export type ParentLink = {
  name: string;
  href: string;
  icon: string;
  children?: ChildLink[];
};

export type ChildLink = {
  name: string;
  href: string;
  icon: string;
};

const isSelectedLink = (pathname: string, link: ParentLink) => {
  if (pathname === link.href) return true;
  if (link.children) {
    return link.children.some((child) => pathname === child.href);
  }
  return false;
};

interface SidebarProperties
  extends React.ComponentPropsWithRef<typeof NavigationRail> {
  links: ParentLink[];
}

export default function Sidebar({
  className,
  links,
  ...properties
}: SidebarProperties) {
  const pathname = usePathname();

  return (
    <NavigationRail
      className={cn("h-screen transition-all bg-surface-container", className)}
      {...properties}
    >
      <NavigationRailHeader>
        <SearchModalWrapper>
          <FloatingButton
            size="medium"
            variant="tertiary"
            icon="search"
            noShadow
          />
        </SearchModalWrapper>
      </NavigationRailHeader>

      <NavigationRailList>
        {links.map((link) => (
          <NavigationRailItem
            className="group"
            key={link.href}
            selected={isSelectedLink(pathname, link)}
          >
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
                <NavigationRailContent className="h-full">
                  <Drawer className="h-full rounded-l-none shadow-1 bg-surface-container border-l w-60">
                    {link.children.map((child) => (
                      <DrawerItem key={child.href} asChild>
                        <NavigationRailLink asChild>
                          <Link href={child.href}>
                            <DrawerIcon>{child.icon}</DrawerIcon>
                            <span>{child.name}</span>
                          </Link>
                        </NavigationRailLink>
                      </DrawerItem>
                    ))}
                  </Drawer>
                </NavigationRailContent>
              </>
            ) : (
              <NavigationRailLink asChild>
                <Link
                  href={link.href}
                  className="flex flex-col items-center w-full"
                >
                  <NavigationRailIcon>{link.icon}</NavigationRailIcon>
                  {link.name}
                </Link>
              </NavigationRailLink>
            )}
          </NavigationRailItem>
        ))}
      </NavigationRailList>
      <div className="absolute bottom-4 left-12 -translate-x-1/2">
        <ThemeToggleButton />
      </div>
    </NavigationRail>
  );
}
