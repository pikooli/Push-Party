'use client';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html>
      <body>
        <div className="flex h-full min-h-screen w-full items-center justify-center bg-gradient-to-b from-gray-900 to-black p-8">
          <div className="max-w-lg rounded-lg bg-white/95 p-8 text-center shadow-xl backdrop-blur">
            <div className="mb-6 text-red-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="mx-auto h-16 w-16"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
            </div>
            <h1 className="mb-4 text-3xl font-bold text-gray-800">
              Oops! Something went wrong
            </h1>
            <p className="mb-6 text-gray-600">
              {error.message || 'An unexpected error occurred'}
            </p>
            <div className="mb-6">
              <button
                onClick={reset}
                className="rounded-lg bg-blue-500 px-6 py-3 text-white transition-colors hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                Try Again
              </button>
            </div>
            <p className="text-sm text-gray-500">
              If the issue persists, please contact us at{' '}
              <a
                href="mailto:zhangpas@gmail.com"
                className="text-blue-500 underline hover:text-blue-700"
              >
                zhangpas@gmail.com
              </a>
            </p>
            {error.digest && (
              <p className="mt-4 text-xs text-gray-400">
                Error ID: {error.digest}
              </p>
            )}
          </div>
        </div>
      </body>
    </html>
  );
}
