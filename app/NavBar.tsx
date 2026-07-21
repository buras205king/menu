import Link from 'next/link'
import React from 'react'
import Image from 'next/image'
const NavBar = () => {
  return (
    <div className='flex space-x-2 p-5 bg-amber-400 text-2xl'>
    <Link href='/campany'> <Image
        src="/anf.jpg"
        width={60}
        height={60}
        className="rounded-full"
        alt="Screenshots of the dashboard project showing desktop version"
      /></Link>
    <ul className='flex space-x-8 ml-auto pr-15 pt-3 text-2xl '>
        <li className='  hover:p-0.5 '>
            <Link href='/all'>All</Link>
        </li>
        <li className=' hover:p-0.5'>
            <Link href='food'>Food</Link>
        </li>
        <li className=' hover:p-0.5'>
            <Link href='drink'>Drink</Link>
        </li>
        <li className=' hover:p-0.5'>
            <Link href='room'>Room</Link>
        </li>
    </ul>

    </div>
  )
}

export default NavBar