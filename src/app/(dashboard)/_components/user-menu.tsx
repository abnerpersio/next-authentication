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
import axios from 'axios';
import { LogOutIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

export function UserMenu() {
  const router = useRouter();
  const { user } = useAuth();

  async function handleLogout() {
    try {
      router.push('/sign-in');
      await axios.post('/api/auth/sign-out');
    } catch {
      toast.error('Failed to logout');
    }
  }

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
          onSelect={handleLogout}
          className="cursor-pointer flex justify-between"
        >
          Logout <LogOutIcon />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
