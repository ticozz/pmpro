'use client';

export default function Error() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold">500 - Server Error</h1>
        <p className="mt-4 text-gray-600">Something went wrong on our end.</p>
      </div>
    </div>
  );
} 