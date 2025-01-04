'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useAuth } from '@/hooks/use-auth';
import { useSignOut } from '@/hooks/use-sign-out';
import { Loader2Icon, LogOutIcon } from 'lucide-react';

export function UserMenu() {
  const { user } = useAuth();
  const { isLoading, handleSignOut } = useSignOut();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar>
          <AvatarImage
            src={`https://github.com/${user.username}.png`}
            alt={`@${user.username}`}
          />

          <AvatarFallback>{user.name.slice(0, 2).toUpperCase()}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-44">
        <DropdownMenuLabel>
          <strong>{user.name}</strong>

          <small className="text-muted-foreground block">{user.email}</small>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          onSelect={handleSignOut}
          className="cursor-pointer flex justify-between"
        >
          {isLoading && <Loader2Icon className="animate-spin w-4 h-4" />}
          {!isLoading && (
            <>
              Logout <LogOutIcon />
            </>
          )}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
