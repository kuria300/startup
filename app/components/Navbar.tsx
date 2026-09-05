import { auth } from '@/auth'
import Link from 'next/link'
import React from 'react'
import NavbarActions from '@/app/components/NavbarActions'

const Navbar = async() => {
    const session= await auth();
  return (
    <header className='px-5 py-4 text-black shadow-sm bg-white font-work-sans border-b border-gray-400'>
      <nav className='flex justify-between items-center'>
        <Link href='/' className='font-bold text-3xl '>
          {/* <Image src='/logo.png' alt='logo' width={144} height={30}/> */}
            <span className='text-pink-400'>I</span>deaHub0
        </Link>

     <NavbarActions session={session}/>
      </nav>
    </header>
  )
}

export default Navbar
