'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { useLocale } from 'next-intl';

function AuthErrorContent() {
  const searchParams = useSearchParams();
  const error = searchParams.get('error');
  const locale = useLocale();

  const errorMessages: Record<string, string> = {
    AccessDenied: 'Access denied. You do not have permission to access this resource.',
    Callback: 'There was an error during the callback.',
    OAuthSignin: 'Error signing in with OAuth provider.',
    OAuthCallback: 'Error in OAuth callback.',
    OAuthCreateAccount: 'Could not create OAuth account.',
    EmailCreateAccount: 'Could not create email account.',
    EmailSignInError: 'Email sign-in failed.',
    CredentialsSignin: 'Sign in failed. Check the details you provided are correct.',
    SessionCallback: 'Session callback error.',
    Default: 'An error occurred during authentication.',
  };

  const message = error ? errorMessages[error] || errorMessages.Default : errorMessages.Default;

  return (
    <div className="min-h-screen bg-[#F5F5DC] flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="text-center mb-8">
            <div className="text-6xl mb-4">⚠️</div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Authentication Error</h1>
            <p className="text-gray-600">{message}</p>
          </div>

          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <p className="text-sm text-red-700">
              Error Code: <span className="font-mono font-semibold">{error || 'UNKNOWN'}</span>
            </p>
          </div>

          <Link
            href={`/${locale}/auth/signin`}
            className="w-full block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition duration-200 text-center"
          >
            Try Again
          </Link>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Need help?{' '}
              <a href={`/${locale}/contact`} className="text-blue-600 hover:text-blue-700 font-medium">
                Contact Support
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function AuthError() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#F5F5DC] flex items-center justify-center">Loading...</div>}>
      <AuthErrorContent />
    </Suspense>
  );
}
