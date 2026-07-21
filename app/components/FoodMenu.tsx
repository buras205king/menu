const items = [
  { name: 'Doro',  price: '80 Birr',  image: '/image/doro.jpg',  href: '/food/doro' },
  { name: 'Pizza', price: '50 Birr', image: '/image/pizza.jpg', href: '/food/pizza' },
  { name: 'Pasta', price: '25 Birr', image: '/image/pasta.jpg', href: '/food/pasta' },
  { name: 'Firfir', price:'25 Birr', image: '/image/firfir.jpg', href: '/food/firfir' },
  { name: 'Tibs', price: '60 Birr', image: '/image/tibs.Webp', href: '/food/tibs' },
  { name: 'Kitfo', price: '72 Birr', image: '/image/kitfo.jpg', href: '/food/kitfo' },
]

export default function FoodPage() {
  return (
    <main className="max-w-6xl mx-auto px-6 py-2">
      <h1 ><span className="text-4xl font-bold mb-8">Food</span><p>Whatever you want you can order</p></h1>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 pt-4">
        {items.map((item) => (
          <a
            key={item.name}
            href={item.href}
            className="block rounded-2xl border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300 hover:scale-105"
          >
            <img src={item.image} alt={item.name} className="h-48 w-full object-cover" />
            <div className="p-4">
              <h3 className="text-lg font-semibold">{item.name}</h3>
              <p className="text-amber-500 font-bold mt-1">{item.price}</p>
            </div>
          </a>
        ))}
      </div>
    </main>
  )
}