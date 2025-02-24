'use client';

import { Inter } from 'next/font/google';
import './globals.css';
import Link from 'next/link';
import { AuthProvider } from '../context/AuthContext';
import { useAuth } from '../context/AuthContext';

const inter = Inter({ subsets: ['latin'] });

function Header() {
  const { isLoggedIn, logout } = useAuth();

  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-primary">SimpleBox</h1>
        <div>
          {isLoggedIn ? (
            <button
              onClick={logout}
              className="text-blue-600 hover:text-blue-800 font-medium"
            >
              Logout
            </button>
          ) : (
            <>
              <Link href="/login" className="text-blue-600 hover:text-blue-800 font-medium">
                Login
              </Link>
              <Link href="/signup" className="ml-4 text-blue-600 hover:text-blue-800 font-medium">
                Signup
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-background text-text`}>
        <AuthProvider>
          <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8">
              {children}
            </main>
            <footer className="bg-white shadow-sm mt-auto">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 text-center text-sm text-gray-500">
                {/* Removed copyright notice */}
              </div>
            </footer>
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
