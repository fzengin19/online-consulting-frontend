'use client';

import { useSession } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { FileInput } from '@/components/ui/file-input';
import { Avatar } from '@/components/ui/avatar';
import { Spinner } from '@/components/ui/spinner';
import { useToast } from '@/components/ui/toast';
import { ResetPasswordModal } from '@/components/auth/reset-password-modal';
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { updateProfileSchema, type UpdateProfileInput } from '@/lib/validations/auth';
import api from '@/lib/axios';

export default function ProfilePage() {
  const { data: session, update } = useSession();
  const { showToast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploadingAvatar, setIsUploadingAvatar] = useState(false);
  const [isResetPasswordModalOpen, setIsResetPasswordModalOpen] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UpdateProfileInput>({
    resolver: zodResolver(updateProfileSchema),
  });

  // Profil bilgilerini getir
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await api.get('/api/user/profile');
        const { user } = response.data;
        // Form alanlarını doldur
        reset({
          name: user.name,
          phone: user.phone || '',
          title: user.title || '',
        });
      } catch (error) {
        showToast({
          type: 'error',
          message: 'Profil bilgileri alınamadı',
        });
      }
    };

    fetchProfile();
  }, [reset, showToast]);

  const onSubmit = async (data: UpdateProfileInput) => {
    try {
      setIsLoading(true);

      const response = await api.put('/api/user/profile', data);
      const { user, message } = response.data;

      // Session'ı güncelle
      await update({
        ...session,
        user: {
          ...session?.user,
          name: user.name,
          phone: user.phone,
          title: user.title,
        },
      });

      showToast({
        type: 'success',
        message: message || 'Profil başarıyla güncellendi',
      });
    } catch (error: any) {
      showToast({
        type: 'error',
        message: error.response?.data?.message || 'Profil güncellenirken bir hata oluştu',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileSelect = (file: File | null) => {
    if (file && file.size > 4 * 1024 * 1024) {
      showToast({
        type: 'error',
        message: 'Dosya boyutu 4MB\'dan küçük olmalıdır',
      });
      return;
    }
    setSelectedFile(file);
  };

  const handleAvatarUpload = async () => {
    if (!selectedFile) return;

    try {
      setIsUploadingAvatar(true);

      const formData = new FormData();
      formData.append('avatar', selectedFile);

      const response = await api.post('/api/user/update-avatar', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      // API dosya adını dönecek şekilde güncellendiğinde burayı güncelle
      const { message } = response.data;

      // Session'ı güncelle
      await update({
        ...session,
        user: {
          ...session?.user,
          avatar: selectedFile.name, // API dosya adını döndüğünde burayı güncelle
        },
      });

      showToast({
        type: 'success',
        message: message || 'Profil fotoğrafı başarıyla güncellendi',
      });
      setSelectedFile(null);
    } catch (error: any) {
      showToast({
        type: 'error',
        message: error.response?.data?.message || 'Avatar yüklenirken bir hata oluştu',
      });
    } finally {
      setIsUploadingAvatar(false);
    }
  };

  const userInitial = session?.user?.name ? session.user.name[0]?.toUpperCase() : '';
  const avatarUrl = session?.user?.avatar 
    ? `${process.env.NEXT_PUBLIC_API_URL}/api/profile-image/${session.user.avatar}`
    : null;

  if (!session) {
    return (
      <div className="flex h-[200px] items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  return (
    <div className="container py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Profil</h1>
        <p className="text-muted-foreground">Profil bilgilerinizi yönetin.</p>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        {/* Profil Bilgileri */}
        <div className="space-y-6">
          <div className="rounded-lg border bg-card p-6">
            <h2 className="text-xl font-semibold mb-4">Kişisel Bilgiler</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium">
                  İsim
                </label>
                <Input
                  id="name"
                  {...register('name')}
                  error={errors.name?.message}
                  disabled={isLoading}
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium">
                  Email
                </label>
                <Input
                  id="email"
                  type="email"
                  value={session?.user?.email || ''}
                  disabled
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="phone" className="text-sm font-medium">
                  Telefon
                </label>
                <Input
                  id="phone"
                  type="tel"
                  {...register('phone')}
                  error={errors.phone?.message}
                  disabled={isLoading}
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="title" className="text-sm font-medium">
                  Ünvan
                </label>
                <Input
                  id="title"
                  {...register('title')}
                  error={errors.title?.message}
                  disabled={isLoading}
                />
              </div>
              <Button type="submit" disabled={isLoading} isLoading={isLoading}>
                Bilgileri Güncelle
              </Button>
            </form>
          </div>
        </div>

        {/* Profil Fotoğrafı */}
        <div className="space-y-6">
          <div className="rounded-lg border bg-card p-6">
            <h2 className="text-xl font-semibold mb-4">Profil Fotoğrafı</h2>
            <div className="flex flex-col items-center space-y-4">
              <div className="h-32 w-32">
                <Avatar
                  src={avatarUrl}
                  alt="Profil fotoğrafı"
                  fallback={userInitial}
                />
              </div>
              <div className="w-full max-w-sm space-y-4">
                <FileInput
                  accept="image/*"
                  onSelectedFile={handleFileSelect}
                  disabled={isUploadingAvatar}
                />
                <Button
                  onClick={handleAvatarUpload}
                  disabled={!selectedFile || isUploadingAvatar}
                  isLoading={isUploadingAvatar}
                  className="w-full"
                >
                  Fotoğrafı Yükle
                </Button>
              </div>
            </div>
          </div>

          <div className="rounded-lg border bg-card p-6">
            <h2 className="text-xl font-semibold mb-4">Hesap Güvenliği</h2>
            <div className="space-y-4">
              <Button
                variant="outline"
                className="w-full"
                disabled={isLoading}
                onClick={() => setIsResetPasswordModalOpen(true)}
              >
                Şifre Değiştir
              </Button>
              <Button variant="outline" className="w-full" disabled={isLoading}>
                İki Faktörlü Doğrulama
              </Button>
            </div>
          </div>
        </div>
      </div>

      <ResetPasswordModal
        isOpen={isResetPasswordModalOpen}
        onClose={() => setIsResetPasswordModalOpen(false)}
        defaultEmail={session?.user?.email}
      />
    </div>
  );
}