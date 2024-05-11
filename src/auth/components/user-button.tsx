"use client";

import { AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { useQueryClient } from "@tanstack/react-query";
import { googleLogout } from "@/src/auth/api";
import Avatar from "@/src/shared/components/ui/avatar";
import Button from "@/src/shared/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/src/shared/components/ui/dropdown-menu";
import useCurrentPath from "@/src/shared/hooks/use-current-path";
import { useUserProfile } from "@/src/user/queries";
import { UserProfile } from "@/src/user/types";
import Link from "next/link";

export const NotLoggedInUserButton = () => {
  const currentPath = useCurrentPath();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <Avatar>
            <AvatarImage src="https://placehold.co/32" alt="@shadcn" />
            <AvatarFallback>SC</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <Link href={`/login?return=${currentPath}`}>로그인</Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            <Link href="/policy/privacy">
              개인정보처리방침
              <DropdownMenuShortcut>
                <span className="material-icons">open_in_new</span>
              </DropdownMenuShortcut>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/policy/terms">
              이용약관
              <DropdownMenuShortcut>
                <span className="material-icons">open_in_new</span>
              </DropdownMenuShortcut>
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export const LoggedInUserButton = ({ user }: { user: UserProfile }) => {
  const queryClient = useQueryClient();

  const handleLogout = async () => {
    try {
      await googleLogout();
      await queryClient.invalidateQueries({
        queryKey: ["user"],
      });
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <Avatar>
            <AvatarImage src={user.photo} alt={user.name} />
            <AvatarFallback>{user.name[0]}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-light">
          <div className="flex items-center gap-2">
            <Avatar>
              <AvatarImage src={user.photo} alt={user.name} />
              <AvatarFallback>{user.name[0]}</AvatarFallback>
            </Avatar>
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none line-clamp-1">
                {user.name}
              </p>
              <p className="text-xs leading-none text-muted-foreground line-clamp-1">
                {user.email}
              </p>
            </div>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <Link href="/account">계정</Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/policy/privacy">
              개인정보처리방침
              <DropdownMenuShortcut>
                <span className="material-icons">open_in_new</span>
              </DropdownMenuShortcut>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/policy/terms">
              이용약관
              <DropdownMenuShortcut>
                <span className="material-icons">open_in_new</span>
              </DropdownMenuShortcut>
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <button onClick={handleLogout}>로그아웃</button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default function UserButton() {
  const { data, isError } = useUserProfile();
  const isLoggedIn = !isError && data;

  return (
    <>
      {isLoggedIn ? (
        <LoggedInUserButton user={data} />
      ) : (
        <NotLoggedInUserButton />
      )}
    </>
  );
}
