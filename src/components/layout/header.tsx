'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Avatar } from '@/components/ui/avatar';
import { DropdownMenu, DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { useSession, signOut } from 'next-auth/react';
import { User, Settings, LogOut } from 'lucide-react';

export function Header() {
  const pathname = usePathname();
  const { data: session } = useSession();

  const userInitial = session?.user?.name ? session.user.name[0]?.toUpperCase() : '';
  const avatarUrl = session?.user?.avatar 
    ? `${process.env.NEXT_PUBLIC_API_URL}/api/profile-image/${session.user.avatar}`
    : null;

  return (
    <header className="sticky top-0 z-40 border-b bg-white shadow-sm">
      <div className="container">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-gray-900">
            Logo
          </Link>

          <div className="flex items-center space-x-4">
            {session ? (
              <DropdownMenu
                trigger={
                  <div className="flex cursor-pointer items-center space-x-3">
                    <div className="h-8 w-8">
                      <Avatar
                        src={avatarUrl}
                        alt={session.user.name || 'Profil'}
                        fallback={userInitial}
                      />
                    </div>
                    <div className="hidden md:block">
                      <p className="text-sm font-medium text-gray-900">
                        {session.user.name}
                      </p>
                      <p className="text-xs text-gray-500">
                        {session.user.email}
                      </p>
                    </div>
                  </div>
                }
              >
                <Link href="/dashboard">
                  <DropdownMenuItem>
                    Dashboard
                  </DropdownMenuItem>
                </Link>
                <Link href="/profile">
                  <DropdownMenuItem icon={<User className="h-4 w-4" />}>
                    Profil
                  </DropdownMenuItem>
                </Link>
                <Link href="/settings">
                  <DropdownMenuItem icon={<Settings className="h-4 w-4" />}>
                    Ayarlar
                  </DropdownMenuItem>
                </Link>
                <DropdownMenuItem
                  onClick={() => signOut()}
                  icon={<LogOut className="h-4 w-4" />}
                  className="text-red-600 hover:bg-red-50 hover:text-red-700"
                >
                  Çıkış Yap
                </DropdownMenuItem>
              </DropdownMenu>
            ) : (
              <div className="flex items-center space-x-4">
                <Link href="/login">
                  <Button variant="ghost">Giriş Yap</Button>
                </Link>
                <Link href="/register">
                  <Button>Kayıt Ol</Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}