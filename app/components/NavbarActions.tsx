'use client';

import { BadgePlus, LogOut } from 'lucide-react';
import { signIn, signOut } from 'next-auth/react'
import Link from 'next/link'
import Image from 'next/image';
import type { Session } from 'next-auth'; //Hey TypeScript, use NextAuth’s official blueprint to check that my session object is correct

interface NavbarActionsProps {
  session: Session | null;
}

const NavbarActions = ({ session }: NavbarActionsProps) => {


  return (
    <div className='flex items-center gap-5'>
         {session && session?.user ?(
           <>
             <Link href='/startup/create'>
              <span className='max-sm:hidden'>Create</span>
              <BadgePlus className='sm:hidden size-6' />
             </Link>
   
            <button onClick={()=>signOut({redirectTo: '/'})}>
                <span className='max-sm:hidden'>Logout</span>
                <LogOut className='sm:hidden size-6 text-red-400'/>
            </button>
   
            <Link href={`/user/${session?.user?.id}`}>
  {session?.user?.image ? (
    <Image
      src={session?.user?.image}
      alt="User Avatar"
      width={32}
      height={32}
      className="rounded-xl"
    />
  ) : (
    <div className="w-8 h-8 bg-gray-300 rounded-xl" />
  )}
</Link>
           </>
         ):(
         <button onClick={()=>signIn('github')}>
            <span>Login</span>
         </button>
         )}
   
         </div>
  )
}

export default NavbarActions