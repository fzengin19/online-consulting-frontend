'use client';

import { useSession } from 'next-auth/react';
import { Avatar } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Heart, MessageCircle, Share2, Bookmark, Calendar, Clock } from 'lucide-react';
import { formatDate } from '@/lib/utils';

export default function DashboardPage() {
  const { data: session } = useSession();

  const userInitial = session?.user?.name ? session.user.name[0]?.toUpperCase() : '';
  const avatarUrl = session?.user?.avatar 
    ? `${process.env.NEXT_PUBLIC_API_URL}/api/profile-image/${session.user.avatar}`
    : null;

  return (
    <div className="container py-10">
      {/* Hoş Geldin Kartı */}
      <div className="mb-8 rounded-lg bg-gradient-to-r from-primary/10 via-primary/5 to-transparent p-8">
        <h1 className="text-3xl font-bold">
          Hoş Geldiniz, {session?.user?.name}
        </h1>
        <p className="mt-2 text-muted-foreground">
          Güncel blog yazılarını ve güncellemeleri buradan takip edebilirsiniz.
        </p>
      </div>

      {/* Blog Post */}
      <div className="grid gap-8">
        <article className="overflow-hidden rounded-lg border bg-card shadow-sm transition-all hover:shadow-md">
          <div className="p-6">
            {/* Yazar Bilgisi */}
            <div className="flex items-center gap-x-4">
              <div className="h-10 w-10">
                <Avatar
                  src={avatarUrl}
                  alt={session?.user?.name || 'Yazar'}
                  fallback={userInitial}
                />
              </div>
              <div>
                <h2 className="font-semibold">{session?.user?.name}</h2>
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  <time dateTime={new Date().toISOString()}>
                    {formatDate(new Date())}
                  </time>
                  <span>•</span>
                  <Clock className="h-4 w-4" />
                  <span>5 dk okuma</span>
                </div>
              </div>
            </div>

            {/* İçerik */}
            <div className="mt-6">
              <h3 className="text-2xl font-bold mb-4">
                Modern Web Uygulaması Geliştirme
              </h3>
              <div className="prose prose-gray max-w-none">
                <p>
                  Modern web uygulaması geliştirme sürecinde Next.js ve Laravel
                  kullanmanın avantajları nelerdir? Bu yazıda, modern web
                  teknolojilerinin sağladığı faydaları ve geliştirme sürecini
                  kolaylaştıran özellikleri inceleyeceğiz.
                </p>
                <p className="mt-4">
                  Next.js&apos;in sunduğu Server Side Rendering, Static Site
                  Generation ve Incremental Static Regeneration gibi özellikler,
                  uygulamamızın performansını ve SEO uyumluluğunu artırıyor.
                  Laravel&apos;in güçlü backend özellikleri ile birleştiğinde,
                  güvenli ve ölçeklenebilir uygulamalar geliştirmek çok daha kolay
                  hale geliyor.
                </p>
              </div>
            </div>

            {/* Etkileşim Butonları */}
            <div className="mt-6 flex items-center gap-x-4 border-t pt-4">
              <Button
                variant="ghost"
                size="sm"
                className="flex items-center gap-x-2 text-muted-foreground hover:text-primary"
              >
                <Heart className="h-4 w-4" />
                <span>123 Beğeni</span>
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="flex items-center gap-x-2 text-muted-foreground hover:text-primary"
              >
                <MessageCircle className="h-4 w-4" />
                <span>12 Yorum</span>
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="flex items-center gap-x-2 text-muted-foreground hover:text-primary"
              >
                <Share2 className="h-4 w-4" />
                <span>Paylaş</span>
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="ml-auto flex items-center gap-x-2 text-muted-foreground hover:text-primary"
              >
                <Bookmark className="h-4 w-4" />
                <span>Kaydet</span>
              </Button>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
}