"use client";
import LikesList from "@/src/app/(common)/account/likes-list";
import { useUserProfile } from "@/src/feature/user/queries";

export default function AccountClient() {
  const user = useUserProfile();

  if (user.data) {
    return (
      <div>
        <div className="flex flex-col gap-4 items-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={user.data.photo}
            alt={user.data.name}
            className="rounded-full"
            width={100}
            height={100}
          />
          <div>
            <h1 className="text-2xl font-bold text-center">{user.data.name}</h1>
            <p className="mt-1 text-on-surface-variant text-center">
              {user.data.email}
            </p>
          </div>
        </div>

        <div className="mt-20">
          <h2 className="text-2xl text-center font-bold mx-10 lg:text-left">
            저장된 도서
          </h2>
          <LikesList userId={user.data.id} />
        </div>
      </div>
    );
  }

  return null;
}
