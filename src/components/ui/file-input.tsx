'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

export interface FileInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
  onSelectedFile?: (file: File | null) => void;
}

const FileInput = React.forwardRef<HTMLInputElement, FileInputProps>(
  ({ className, error, onChange, onSelectedFile, accept, ...props }, ref) => {
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0] || null;
      if (onSelectedFile) {
        onSelectedFile(file);
      }
      if (onChange) {
        onChange(event);
      }
    };

    return (
      <div className="relative">
        <input
          type="file"
          className={cn(
            'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
            error && 'border-red-500 focus-visible:ring-red-500',
            className
          )}
          onChange={handleChange}
          accept={accept}
          ref={ref}
          {...props}
        />
        {error && (
          <p className="mt-1 text-sm text-red-500">
            {error}
          </p>
        )}
      </div>
    );
  }
);

FileInput.displayName = 'FileInput';

export { FileInput };