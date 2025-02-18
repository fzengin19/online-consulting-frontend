import { z } from 'zod';

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, 'Email adresi gerekli')
    .email('Geçerli bir email adresi girin'),
  password: z
    .string()
    .min(1, 'Şifre gerekli')
    .min(6, 'Şifre en az 6 karakter olmalı'),
});

export const registerSchema = z
  .object({
    name: z
      .string()
      .min(1, 'İsim gerekli')
      .min(3, 'İsim en az 3 karakter olmalı')
      .max(30, 'İsim en fazla 30 karakter olabilir'),
    email: z
      .string()
      .min(1, 'Email adresi gerekli')
      .email('Geçerli bir email adresi girin'),
    password: z
      .string()
      .min(1, 'Şifre gerekli')
      .min(6, 'Şifre en az 6 karakter olmalı'),
    password_confirmation: z.string().min(1, 'Şifre tekrarı gerekli'),
  })
  .refine((data) => data.password === data.password_confirmation, {
    message: 'Şifreler eşleşmiyor',
    path: ['password_confirmation'],
  });

export const updateProfileSchema = z.object({
  name: z
    .string()
    .min(1, 'İsim gerekli')
    .min(3, 'İsim en az 3 karakter olmalı')
    .max(30, 'İsim en fazla 30 karakter olabilir'),
  phone: z
    .string()
    .max(15, 'Telefon numarası en fazla 15 karakter olabilir')
    .regex(/^[0-9+\-\s]*$/, 'Geçersiz telefon numarası formatı')
    .optional()
    .nullable(),
  title: z
    .string()
    .min(1, 'Ünvan gerekli')
    .max(30, 'Ünvan en fazla 30 karakter olabilir'),
});

export const updateAddressSchema = z.object({
  name: z
    .string()
    .min(1, 'Adres adı gerekli')
    .max(255, 'Adres adı en fazla 255 karakter olabilir'),
  latitude: z
    .number()
    .min(-90, 'Geçersiz enlem değeri')
    .max(90, 'Geçersiz enlem değeri'),
  longitude: z
    .number()
    .min(-180, 'Geçersiz boylam değeri')
    .max(180, 'Geçersiz boylam değeri'),
  place_id: z.string().min(1, 'Place ID gerekli'),
});

export type LoginInput = z.infer<typeof loginSchema>;
export type RegisterInput = z.infer<typeof registerSchema>;
export type UpdateProfileInput = z.infer<typeof updateProfileSchema>;
export type UpdateAddressInput = z.infer<typeof updateAddressSchema>;