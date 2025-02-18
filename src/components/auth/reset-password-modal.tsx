'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Modal } from '@/components/ui/modal';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import api from '@/lib/axios';

const resetPasswordSchema = z.object({
  email: z
    .string()
    .min(1, 'Email adresi gerekli')
    .email('Geçerli bir email adresi girin'),
});

type ResetPasswordInput = z.infer<typeof resetPasswordSchema>;

interface ResetPasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultEmail: string | null | undefined;
}

export function ResetPasswordModal({
  isOpen,
  onClose,
  defaultEmail,
}: ResetPasswordModalProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordInput>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      email: defaultEmail || '',
    },
  });

  const onSubmit = async (data: ResetPasswordInput) => {
    try {
      setIsLoading(true);
      setError(null);
      setSuccessMessage(null);

      await api.post('/api/auth/password/email', data);

      setSuccessMessage('Şifre sıfırlama bağlantısı email adresinize gönderildi.');

      // 3 saniye sonra modalı kapat
      setTimeout(() => {
        onClose();
      }, 3000);
    } catch (error: any) {
      setError(
        error.response?.data?.message ||
          'Şifre sıfırlama bağlantısı gönderilirken bir hata oluştu'
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Şifre Sıfırlama"
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="email" className="text-sm font-medium">
            Email
          </label>
          <Input
            id="email"
            type="email"
            {...register('email')}
            error={errors.email?.message}
            disabled={isLoading}
          />
        </div>
        {error && (
          <div className="text-sm text-red-500">
            {error}
          </div>
        )}
        {successMessage && (
          <div className="text-sm text-green-500">
            {successMessage}
          </div>
        )}
        <div className="flex justify-end space-x-2">
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            disabled={isLoading}
          >
            İptal
          </Button>
          <Button
            type="submit"
            disabled={isLoading}
            isLoading={isLoading}
          >
            Gönder
          </Button>
        </div>
      </form>
    </Modal>
  );
}