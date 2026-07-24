'use client'

import { useState } from 'react'

const typeCategories: Record<string, string[]> = {
  food: ['Traditional', 'Fast Food', 'Grill', 'Breakfast', 'Dessert'],
  drink: ['Hot Drink', 'Cold Drink', 'Soft Drink', 'Alcohol'],
  room: ['One Bed', 'Two Bed', 'Three Bed', 'Family Suite'],
}

export default function AddItemForm({ onAdded }: { onAdded?: () => void }) {
  const [type, setType] = useState('food')
  const [category, setCategory] = useState(typeCategories['food'][0])
  const [name, setName] = useState('')
  const [price, setPrice] = useState('')
  const [ingredients, setIngredients] = useState('')
  const [image, setImage] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  function handleTypeChange(value: string) {
    setType(value)
    setCategory(typeCategories[value][0])
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setMessage('')
    const formData = new FormData()
    formData.append('type', type)
    formData.append('category', category)
    formData.append('name', name)
    formData.append('price', price)
    formData.append('ingredients', ingredients)
    if (image) formData.append('image', image)
    try {
      const res = await fetch('/api/items', { method: 'POST', body: formData })
      const data = await res.json()
      if (!res.ok) {
        setMessage(`Error: ${data.error ?? 'could not add item'}`)
      } else {
        setMessage(`Added "${data.name}" to ${data.type}.`)
        setName(''); setPrice(''); setIngredients(''); setImage(null)
        onAdded?.()
      }
    } catch (err) {
      setMessage(`Error: ${err instanceof Error ? err.message : 'request failed'}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mt-6 max-w-xl space-y-4 rounded-2xl border border-gray-200 p-6 shadow-sm">
      <h2 className="text-2xl font-bold">Add Item</h2>

      <div>
        <label className="mb-1 block font-semibold">Type</label>
        <select value={type} onChange={(e) => handleTypeChange(e.target.value)} className="w-full rounded-lg border px-3 py-2">
          <option value="food">Food</option>
          <option value="drink">Drink</option>
          <option value="room">Room</option>
        </select>
      </div>

      <div>
        <label className="mb-1 block font-semibold">Category</label>
        <select value={category} onChange={(e) => setCategory(e.target.value)} className="w-full rounded-lg border px-3 py-2">
          {typeCategories[type].map((c) => <option key={c} value={c}>{c}</option>)}
        </select>
      </div>

      <div>
        <label className="mb-1 block font-semibold">Item Name</label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} required className="w-full rounded-lg border px-3 py-2" placeholder="e.g. Doro Wat" />
      </div>

      <div>
        <label className="mb-1 block font-semibold">Price</label>
        <input type="text" value={price} onChange={(e) => setPrice(e.target.value)} required className="w-full rounded-lg border px-3 py-2" placeholder="e.g. 80 Birr" />
      </div>

      <div>
        <label className="mb-1 block font-semibold">{type === 'room' ? 'Features / Details' : 'Ingredients'}</label>
        <textarea value={ingredients} onChange={(e) => setIngredients(e.target.value)} className="w-full rounded-lg border px-3 py-2" rows={3} placeholder={type === 'room' ? 'e.g. Wi-Fi, TV, Balcony' : 'e.g. Chicken, Berbere, Egg'} />
      </div>

      <div>
        <label className="mb-1 block font-semibold">Image</label>
        <input type="file" accept="image/*" onChange={(e) => setImage(e.target.files?.[0] ?? null)} className="w-full rounded-lg border px-3 py-2" />
      </div>

      <button type="submit" disabled={loading} className="rounded-lg bg-amber-500 px-5 py-2 font-semibold text-black hover:bg-amber-400 disabled:opacity-60">
        {loading ? 'Saving...' : 'Save Item'}
      </button>

      {message && <p className="text-sm text-gray-600">{message}</p>}
    </form>
  )
}