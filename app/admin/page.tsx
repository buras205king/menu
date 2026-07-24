'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import AddItemForm from '../components/AddItemForm'

export default function AdminPage() {
  const router = useRouter()
  const [showForm, setShowForm] = useState(false)

  async function handleLogout() {
    await fetch('/api/logout', { method: 'POST' })
    router.push('/admin/login')
    router.refresh()
  }

  return (
    <main className="mx-auto max-w-6xl px-6 py-12">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-4xl font-bold">Admin Page</h1>
        <button onClick={handleLogout} className="rounded-lg border px-4 py-2 font-semibold hover:bg-gray-100 hover:text-black">
          Logout
        </button>
      </div>

      <p className="mb-6 text-gray-500">Welcome, admin. Add your actions here.</p>

      <div className="flex gap-4">
        <button onClick={() => setShowForm((prev) => !prev)} className="rounded-lg bg-amber-500 px-4 py-2 font-semibold text-black hover:bg-amber-400">
          {showForm ? 'Close Form' : 'Add Items'}
        </button>
        <button onClick={() => router.push('/')} className="rounded-lg border px-4 py-2 font-semibold hover:bg-gray-100 hover:text-black">
          Go to Menu
        </button>
      </div>

      {showForm && <AddItemForm />}
    </main>
  )
}