"use client";
import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { AuthSession } from "@/lib/auth/utils";
import { Chat } from "@/lib/db/schema/chats";
import { useRouter } from "next/navigation";
import { TruncatedString, calculateDaysDifference } from "@/lib/utils";

const UserButton = ({
  session,
  children,
  chats,
}: {
  session?: AuthSession["session"];
  children: React.ReactNode;
  chats: Chat[];
}) => {
  const router = useRouter();
  const uniqBy = (arr: Chat[], selector: (item: Chat) => any) => {
    const map = new Map();
    arr.forEach((item) => {
      const prop = selector(item);
      if (!map.has(prop)) map.set(prop, item);
    });
    return [...map.values()];
  };

  const uniqueChats = uniqBy(chats, (chat) => chat.sessionId);

  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="relative h-8 w-8 rounded-full">
            <Avatar className="h-8 w-8">
              <AvatarImage
                src={JSON.stringify(session?.user.picture).replace(
                  /^"|"$/g,
                  ""
                )}
                alt="@shadcn"
              />
              <AvatarFallback>User</AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end" forceMount>
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none">
                {JSON.stringify(session?.user.name).replace(/^"|"$/g, "")}
              </p>
              <p className="text-xs leading-none text-muted-foreground">
                {JSON.stringify(session?.user.email).replace(/^"|"$/g, "")}
              </p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup className="overflow-auto max-h-[30vh]">
            {uniqueChats.reverse().map((chat) => (
              <DropdownMenuItem
                key={chat.id}
                className="flex flex-col items-start gap-1"
                onSelect={() => {
                  router.replace(
                    `/chat?s_id=${chat.sessionId.replace(/^"|"$/g, "")}`
                  );
                }}
              >
                <p className="self-start font-light text-sm">
                  {calculateDaysDifference(chat.createdAt) > 0
                    ? `${calculateDaysDifference(chat.createdAt)} days ago`
                    : "Today"}
                </p>
                <div className="flex items-start justify-start">
                  {TruncatedString({ text: chat.message.trim(), limit: 60 })}
                </div>
              </DropdownMenuItem>
            ))}
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem>{children}</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
export default UserButton;
