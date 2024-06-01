"use client";
import SearchModalWrapper from "@/src/shared/components/layout/search-modal-button";
import FloatingButton from "@/src/shared/components/ui/floating-button";
import {
  NavigationRail,
  NavigationRailHeader,
  NavigationRailIcon,
  NavigationRailItem,
  NavigationRailList,
} from "@/src/shared/components/ui/navigation-rail";
import { cn } from "@/src/shared/lib/utils";
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

interface SidebarProperties extends React.HTMLAttributes<HTMLDivElement> {
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
    </NavigationRail>
  );
}
