import MenuCard, { MenuItem } from '../components/MenuCard'

const items: MenuItem[] = [
  { name: 'Coffee',       price: '$3', image: '/images/coffee.jpg', href: '/drink/coffee' },
  { name: 'Fresh Juice',  price: '$4', image: '/images/juice.jpg',  href: '/drink/juice' },
  { name: 'Soft Drink',   price: '$2', image: '/images/soda.jpg',   href: '/drink/soda' },
]

export default function DrinkPage() {
  return (
    <main className="max-w-6xl mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold mb-8">Drinks</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {items.map((item) => <MenuCard key={item.name} item={item} />)}
      </div>
    </main>
  )
}