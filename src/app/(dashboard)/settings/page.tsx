'use client';

import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { 
  User, 
  MapPin, 
  Shield, 
  Bell, 
  Lock, 
  Palette,
  ChevronRight,
  UserCircle,
  Mail,
  Phone,
  Building,
  Key,
  BellRing,
  Eye,
  Monitor
} from 'lucide-react';

export default function SettingsPage() {
  const { data: session } = useSession();

  const settingsGroups = [
    {
      title: 'Hesap',
      items: [
        {
          title: 'Profil Ayarları',
          description: 'Kişisel bilgilerinizi ve profil ayarlarınızı düzenleyin.',
          href: '/settings/profile',
          icon: User,
          details: [
            { icon: UserCircle, text: session?.user?.name },
            { icon: Mail, text: session?.user?.email },
            { icon: Phone, text: session?.user?.phone || 'Belirtilmemiş' },
            { icon: Building, text: session?.user?.title || 'Belirtilmemiş' },
          ],
        },
        {
          title: 'Adres Ayarları',
          description: 'Adres bilgilerinizi güncelleyin ve yönetin.',
          href: '/settings/address',
          icon: MapPin,
        },
        {
          title: 'Güvenlik',
          description: 'Şifre ve güvenlik ayarlarınızı yönetin.',
          href: '/settings/security',
          icon: Shield,
          details: [
            { icon: Key, text: 'Son şifre değişikliği: 3 ay önce' },
            { icon: Eye, text: 'İki faktörlü doğrulama: Pasif' },
          ],
        },
      ],
    },
    {
      title: 'Tercihler',
      items: [
        {
          title: 'Bildirim Ayarları',
          description: 'Email ve uygulama bildirim tercihlerinizi ayarlayın.',
          href: '/settings/notifications',
          icon: Bell,
          details: [
            { icon: BellRing, text: 'Email bildirimleri: Aktif' },
            { icon: Monitor, text: 'Uygulama bildirimleri: Aktif' },
          ],
        },
        {
          title: 'Gizlilik Ayarları',
          description: 'Gizlilik ve veri paylaşım tercihlerinizi yönetin.',
          href: '/settings/privacy',
          icon: Lock,
        },
        {
          title: 'Görünüm',
          description: 'Uygulama teması ve görünüm tercihlerinizi değiştirin.',
          href: '/settings/appearance',
          icon: Palette,
        },
      ],
    },
  ];

  return (
    <div className="container py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Ayarlar</h1>
        <p className="text-muted-foreground">
          Hesap ayarlarınızı ve tercihlerinizi yönetin.
        </p>
      </div>

      <div className="space-y-8">
        {settingsGroups.map((group) => (
          <div key={group.title}>
            <h2 className="mb-4 text-lg font-semibold">{group.title}</h2>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {group.items.map((item) => (
                <Link
                  key={item.title}
                  href={item.href}
                  className="group relative rounded-lg border bg-card p-6 hover:shadow-md transition-all"
                >
                  <div className="flex items-center gap-x-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <item.icon className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-semibold group-hover:text-primary">
                        {item.title}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {item.description}
                      </p>
                    </div>
                    <ChevronRight className="ml-auto h-5 w-5 text-muted-foreground group-hover:text-primary" />
                  </div>
                  {item.details && (
                    <div className="mt-4 grid gap-2 border-t pt-4">
                      {item.details.map((detail, index) => (
                        <div
                          key={index}
                          className="flex items-center gap-x-2 text-sm text-muted-foreground"
                        >
                          <detail.icon className="h-4 w-4" />
                          <span>{detail.text}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}