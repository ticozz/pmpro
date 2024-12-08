import Link from 'next/link'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm">
        <h1 className="text-4xl font-bold mb-8 text-center">Welcome to Property Management</h1>
        
        <div className="mt-8 text-center">
          <p className="text-xl mb-8">
            Manage your properties, maintenance requests, and tenants all in one place.
          </p>
          
          <div className="space-x-4">
            <Link 
              href="/auth/login" 
              className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg text-lg font-semibold transition-colors"
            >
              Login
            </Link>
            <Link 
              href="/auth/register" 
              className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg text-lg font-semibold transition-colors"
            >
              Register
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
} 