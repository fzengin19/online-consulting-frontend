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
import { loginSchema, type LoginInput } from '@/lib/validations/auth';

export default function LoginPage() {
  const router = useRouter();
  const { showToast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginInput) => {
    try {
      setIsLoading(true);

      const result = await signIn('credentials', {
        email: data.email,
        password: data.password,
        redirect: false,
      });

      if (result?.error) {
        showToast({
          type: 'error',
          message: 'Email veya şifre hatalı',
        });
        return;
      }

      showToast({
        type: 'success',
        message: 'Başarıyla giriş yapıldı',
      });

      router.push('/dashboard');
      router.refresh();
    } catch (error: any) {
      showToast({
        type: 'error',
        message: error.response?.data?.message || 'Giriş yapılırken bir hata oluştu',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container flex h-screen w-screen flex-col items-center justify-center">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">
            Hoş Geldiniz
          </h1>
          <p className="text-sm text-muted-foreground">
            Hesabınıza giriş yapın
          </p>
        </div>

        <div className="grid gap-6">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid gap-4">
              <div className="grid gap-2">
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
                  autoComplete="current-password"
                  disabled={isLoading}
                  {...register('password')}
                  error={errors.password?.message}
                />
              </div>
              <Button disabled={isLoading} isLoading={isLoading}>
                Giriş Yap
              </Button>
            </div>
          </form>
        </div>

        <div className="text-center text-sm">
          Hesabınız yok mu?{' '}
          <Link
            href="/register"
            className="underline underline-offset-4 hover:text-primary"
          >
            Kayıt Ol
          </Link>
        </div>
      </div>
    </div>
  );
}