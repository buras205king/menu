'use client'

import { useRouter } from 'next/navigation'

export default function AdminDashboard() {
  const router = useRouter()

  async function handleLogout() {
    await fetch('/api/logout', { method: 'POST' })
    router.push('/admin/login')
    router.refresh()
  }

  return (
    <main className="mx-auto max-w-6xl px-6 py-12">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-4xl font-bold">Admin Dashboard</h1>
        <button
          onClick={handleLogout}
          className="rounded-lg border px-4 py-2 font-semibold hover:bg-gray-100 hover:text-black"
        >
          Logout
        </button>
      </div>
      <p className="text-gray-500">
        Welcome, admin. Only logged-in admins can see this page.
      </p>
    </main>
  )
}
