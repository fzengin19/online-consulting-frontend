'use client';

import * as React from 'react';
import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { cn } from '@/lib/utils';
import { X, CheckCircle, AlertCircle, Info } from 'lucide-react';

export type ToastType = 'success' | 'error' | 'info';

interface ToastProps {
  message: string;
  type?: ToastType;
  duration?: number;
  onClose: () => void;
}

const icons = {
  success: CheckCircle,
  error: AlertCircle,
  info: Info,
};

const colors = {
  success: 'bg-green-50 text-green-500 border-green-200',
  error: 'bg-red-50 text-red-500 border-red-200',
  info: 'bg-blue-50 text-blue-500 border-blue-200',
};

export function Toast({
  message,
  type = 'info',
  duration = 3000,
  onClose,
}: ToastProps) {
  const [isVisible, setIsVisible] = useState(true);
  const Icon = icons[type];

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onClose, 300); // Animasyon bittikten sonra kaldır
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  return createPortal(
    <div
      className={cn(
        'fixed right-4 top-4 z-50 flex items-center gap-x-3 rounded-lg border px-4 py-3 shadow-lg transition-all duration-300',
        colors[type],
        isVisible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
      )}
      role="alert"
    >
      <Icon className="h-5 w-5 shrink-0" />
      <p className="text-sm font-medium">{message}</p>
      <button
        onClick={() => {
          setIsVisible(false);
          setTimeout(onClose, 300);
        }}
        className="ml-2 rounded-full p-1 hover:bg-black/5"
      >
        <X className="h-4 w-4" />
      </button>
    </div>,
    document.body
  );
}

interface ToastContextValue {
  showToast: (props: Omit<ToastProps, 'onClose'>) => void;
}

export const ToastContext = React.createContext<ToastContextValue>({
  showToast: () => {},
});

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Array<ToastProps & { id: number }>>([]);
  let nextId = 0;

  const showToast = (props: Omit<ToastProps, 'onClose'>) => {
    const id = nextId++;
    setToasts((prev) => [...prev, { ...props, id, onClose: () => removeToast(id) }]);
  };

  const removeToast = (id: number) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {toasts.map((toast) => (
        <Toast key={toast.id} {...toast} />
      ))}
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = React.useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
}