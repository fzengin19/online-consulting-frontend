'use client';

interface AvatarProps {
  src?: string | null | undefined;
  alt: string;
  fallback: string;
}

export function Avatar({ src, alt, fallback }: AvatarProps) {
  if (!src) {
    return (
      <div className="h-full w-full rounded-full bg-gray-100 flex items-center justify-center text-3xl font-semibold text-gray-600">
        {fallback}
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className="h-full w-full rounded-full object-cover"
    />
  );
}