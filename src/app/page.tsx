import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function Home() {
  return (
    <div className="flex-1">
      {/* Hero Section */}
      <section className="bg-white">
        <div className="relative isolate px-6 pt-14 lg:px-8">
          <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
            <div className="text-center">
              <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                Modern Web Uygulaması
              </h1>
              <p className="mt-6 text-lg leading-8 text-gray-600">
                Next.js ve Laravel ile geliştirilmiş, modern ve kullanıcı dostu web uygulaması.
                Hemen ücretsiz hesap oluşturun ve kullanmaya başlayın.
              </p>
              <div className="mt-10 flex items-center justify-center gap-x-6">
                <Link href="/register">
                  <Button size="lg" className="rounded-md px-8">
                    Ücretsiz Başla
                  </Button>
                </Link>
                <Link href="/login">
                  <Button
                    variant="outline"
                    size="lg"
                    className="rounded-md px-8"
                  >
                    Giriş Yap
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-gray-50 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-base font-semibold leading-7 text-indigo-600">
              Daha Hızlı Geliştirin
            </h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Modern Teknolojiler
            </p>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              En son web teknolojileri kullanılarak geliştirilmiş, performanslı ve güvenli bir platform.
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
              {features.map((feature) => (
                <div key={feature.name} className="flex flex-col">
                  <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900">
                    {feature.name}
                  </dt>
                  <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                    <p className="flex-auto">{feature.description}</p>
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>
    </div>
  );
}

const features = [
  {
    name: 'Modern Arayüz',
    description:
      'Tailwind CSS ile geliştirilmiş modern ve responsive tasarım. Her cihazda mükemmel görünüm.',
  },
  {
    name: 'Güvenli Kimlik Doğrulama',
    description:
      'JWT tabanlı güvenli kimlik doğrulama sistemi. Verileriniz güvende.',
  },
  {
    name: 'Hızlı Performans',
    description:
      'Next.js ve Laravel ile optimize edilmiş performans. Hızlı sayfa yüklemeleri.',
  },
];
