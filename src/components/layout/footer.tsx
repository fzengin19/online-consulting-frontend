import Link from 'next/link';
import { Github } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-white border-t">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Logo ve Açıklama */}
            <div className="space-y-4">
              <Link href="/" className="text-xl font-bold text-gray-900">
                Logo
              </Link>
              <p className="text-gray-600 text-sm">
                Modern ve kullanıcı dostu web uygulaması. Next.js ve Laravel ile geliştirilmiştir.
              </p>
            </div>

            {/* Hızlı Linkler */}
            <div>
              <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase mb-4">
                Hızlı Linkler
              </h3>
              <ul className="space-y-3">
                <li>
                  <Link
                    href="/"
                    className="text-gray-600 hover:text-gray-900 text-sm"
                  >
                    Anasayfa
                  </Link>
                </li>
                <li>
                  <Link
                    href="/login"
                    className="text-gray-600 hover:text-gray-900 text-sm"
                  >
                    Giriş Yap
                  </Link>
                </li>
                <li>
                  <Link
                    href="/register"
                    className="text-gray-600 hover:text-gray-900 text-sm"
                  >
                    Kayıt Ol
                  </Link>
                </li>
              </ul>
            </div>

            {/* İletişim */}
            <div>
              <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase mb-4">
                İletişim
              </h3>
              <ul className="space-y-3">
                <li className="text-gray-600 text-sm">
                  Email: info@example.com
                </li>
                <li className="text-gray-600 text-sm">
                  Tel: +90 (555) 123 45 67
                </li>
                <li>
                  <a
                    href="https://github.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-gray-600 hover:text-gray-900 text-sm"
                  >
                    <Github className="h-4 w-4 mr-2" />
                    GitHub
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Alt Bilgi */}
          <div className="mt-8 pt-8 border-t border-gray-200">
            <p className="text-gray-400 text-sm text-center">
              © {new Date().getFullYear()} Tüm hakları saklıdır.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}