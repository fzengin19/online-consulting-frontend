'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/toast';
import { Spinner } from '@/components/ui/spinner';
import api from '@/lib/axios';

const resetPasswordSchema = z.object({
  password: z
    .string()
    .min(1, 'Şifre gerekli')
    .min(6, 'Şifre en az 6 karakter olmalı'),
  password_confirmation: z.string().min(1, 'Şifre tekrarı gerekli'),
}).refine((data) => data.password === data.password_confirmation, {
  message: 'Şifreler eşleşmiyor',
  path: ['password_confirmation'],
});

type ResetPasswordInput = z.infer<typeof resetPasswordSchema>;

export default function ResetPasswordPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { showToast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [isValidating, setIsValidating] = useState(true);
  const [isValidToken, setIsValidToken] = useState(false);

  const token = searchParams.get('token');
  const email = searchParams.get('email');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordInput>({
    resolver: zodResolver(resetPasswordSchema),
  });

  // Token doğrulaması
  useState(() => {
    const validateToken = async () => {
      if (!token || !email) {
        setIsValidToken(false);
        setIsValidating(false);
        return;
      }

      try {
        // Token doğrulama isteği yapılabilir
        setIsValidToken(true);
      } catch (error) {
        setIsValidToken(false);
        showToast({
          type: 'error',
          message: 'Geçersiz veya süresi dolmuş şifre sıfırlama linki',
        });
      } finally {
        setIsValidating(false);
      }
    };

    validateToken();
  });

  const onSubmit = async (data: ResetPasswordInput) => {
    if (!token || !email) {
      showToast({
        type: 'error',
        message: 'Geçersiz şifre sıfırlama linki',
      });
      return;
    }

    try {
      setIsLoading(true);

      await api.post('/api/auth/password/reset', {
        token,
        email,
        ...data,
      });

      showToast({
        type: 'success',
        message: 'Şifreniz başarıyla güncellendi',
      });

      // 3 saniye sonra login sayfasına yönlendir
      setTimeout(() => {
        router.push('/login');
      }, 3000);
    } catch (error: any) {
      showToast({
        type: 'error',
        message: error.response?.data?.message || 'Şifre güncellenirken bir hata oluştu',
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (isValidating) {
    return (
      <div className="container flex h-screen w-screen flex-col items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  if (!isValidToken) {
    return (
      <div className="container flex h-screen w-screen flex-col items-center justify-center">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight text-red-500">
              Geçersiz Link
            </h1>
            <p className="text-sm text-muted-foreground">
              Bu şifre sıfırlama linki geçersiz veya süresi dolmuş.
            </p>
          </div>
          <Button onClick={() => router.push('/login')}>
            Giriş Sayfasına Dön
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container flex h-screen w-screen flex-col items-center justify-center">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">
            Yeni Şifre Belirle
          </h1>
          <p className="text-sm text-muted-foreground">
            Lütfen yeni şifrenizi girin
          </p>
        </div>

        <div className="grid gap-6">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Input
                  id="password"
                  placeholder="Yeni şifre"
                  type="password"
                  autoComplete="new-password"
                  disabled={isLoading}
                  {...register('password')}
                  error={errors.password?.message}
                />
                <Input
                  id="password_confirmation"
                  placeholder="Şifre tekrarı"
                  type="password"
                  autoComplete="new-password"
                  disabled={isLoading}
                  {...register('password_confirmation')}
                  error={errors.password_confirmation?.message}
                />
              </div>
              <Button disabled={isLoading} isLoading={isLoading}>
                Şifreyi Güncelle
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}