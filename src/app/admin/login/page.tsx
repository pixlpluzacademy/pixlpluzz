import { Suspense } from 'react'
import LoginForm from './LoginForm'

export default function AdminLoginPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-svh items-center justify-center bg-black text-white/50">
          Loading…
        </div>
      }
    >
      <LoginForm />
    </Suspense>
  )
}
