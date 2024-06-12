"use client";
import SearchModalWrapper from "@/src/feature/shared/components/layout/search-modal-button";
import ThemeToggleButton from "@/src/feature/shared/components/theme-toggle-button";
import { cn } from "@/src/feature/shared/lib/utils";
import FloatingButton from "@/src/ui/components/floating-button";
import {
  NavigationRail,
  NavigationRailHeader,
  NavigationRailIcon,
  NavigationRailItem,
  NavigationRailList,
} from "@/src/ui/components/navigation-rail";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface Link {
  name: string;
  href: string;
  icon: string;
}

const getSelectedLink = (links: Link[], pathname: string) => {
  return links.reduce((selectedLink, link) => {
    if (pathname.startsWith(link.href)) {
      return link;
    }
    return selectedLink;
  });
};

interface SidebarProperties extends React.ComponentPropsWithRef<"nav"> {
  links: {
    name: string;
    href: string;
    icon: string;
  }[];
}

export default function Sidebar({
  className,
  links,
  ...properties
}: SidebarProperties) {
  const pathname = usePathname();
  const selectedLink = getSelectedLink(links, pathname);

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
            key={link.href}
            asChild
            selected={link.name === selectedLink.name}
          >
            <Link href={link.href}>
              <NavigationRailIcon>{link.icon}</NavigationRailIcon>
              {link.name}
            </Link>
          </NavigationRailItem>
        ))}
      </NavigationRailList>
      <div className="flex justify-center mb-6">
        <ThemeToggleButton />
      </div>
    </NavigationRail>
  );
}
