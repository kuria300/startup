import { auth } from '@/auth'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import NavbarActions from '@/app/components/NavbarActions'

const Navbar = async() => {
    const session= await auth();
  return (
    <header className='px-5 py-4 text-black shadow-sm bg-white font-work-sans'>
      <nav className='flex justify-between items-center'>
        <Link href='/'>
          <Image src='/logo.png' alt='logo' width={144} height={30}/>
        </Link>

     <NavbarActions session={session}/>
      </nav>
    </header>
  )
}

export default Navbar