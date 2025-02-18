'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/toast';
import { registerSchema, type RegisterInput } from '@/lib/validations/auth';
import api from '@/lib/axios';

export default function RegisterPage() {
  const router = useRouter();
  const { showToast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterInput) => {
    try {
      setIsLoading(true);

      // Kayıt işlemi
      const response = await api.post('/api/auth/register', data);
      const { user, token, message } = response.data;

      showToast({
        type: 'success',
        message: message || 'Kayıt başarıyla tamamlandı',
      });

      // Kayıt başarılı, otomatik giriş yap
      const result = await signIn('credentials', {
        email: data.email,
        password: data.password,
        redirect: false,
      });

      if (result?.error) {
        showToast({
          type: 'error',
          message: 'Giriş yapılırken bir hata oluştu',
        });
        return;
      }

      router.push('/dashboard');
      router.refresh();
    } catch (error: any) {
      if (error.response?.data?.message) {
        showToast({
          type: 'error',
          message: error.response.data.message,
        });
      } else if (error.response?.data?.errors) {
        const firstError = Object.values(error.response.data.errors)[0];
        showToast({
          type: 'error',
          message: Array.isArray(firstError) ? firstError[0] : firstError,
        });
      } else {
        showToast({
          type: 'error',
          message: 'Kayıt olurken bir hata oluştu',
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container flex h-screen w-screen flex-col items-center justify-center">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">
            Hesap Oluştur
          </h1>
          <p className="text-sm text-muted-foreground">
            Bilgilerinizi girerek ücretsiz hesap oluşturun
          </p>
        </div>

        <div className="grid gap-6">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Input
                  id="name"
                  placeholder="Adınız"
                  type="text"
                  autoCapitalize="none"
                  autoComplete="name"
                  autoCorrect="off"
                  disabled={isLoading}
                  {...register('name')}
                  error={errors.name?.message}
                />
                <Input
                  id="email"
                  placeholder="ornek@email.com"
                  type="email"
                  autoCapitalize="none"
                  autoComplete="email"
                  autoCorrect="off"
                  disabled={isLoading}
                  {...register('email')}
                  error={errors.email?.message}
                />
                <Input
                  id="password"
                  placeholder="********"
                  type="password"
                  autoComplete="new-password"
                  disabled={isLoading}
                  {...register('password')}
                  error={errors.password?.message}
                />
                <Input
                  id="password_confirmation"
                  placeholder="********"
                  type="password"
                  autoComplete="new-password"
                  disabled={isLoading}
                  {...register('password_confirmation')}
                  error={errors.password_confirmation?.message}
                />
              </div>
              <Button disabled={isLoading} isLoading={isLoading}>
                Kayıt Ol
              </Button>
            </div>
          </form>
        </div>

        <div className="text-center text-sm">
          Zaten hesabınız var mı?{' '}
          <Link
            href="/login"
            className="underline underline-offset-4 hover:text-primary"
          >
            Giriş Yap
          </Link>
        </div>
      </div>
    </div>
  );
}