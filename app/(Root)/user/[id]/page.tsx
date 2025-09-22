import Startups from '@/app/components/Startups'
import { auth } from '@/auth'
import { client } from '@/sanity/lib/client'
import { AUTHOR_GITHUB_ID } from '@/sanity/lib/queries'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import React, { Suspense } from 'react'


export const experimental_ppr= true;

const page = async ({params}: {params: Promise<{id: string}>}) => {
 const id = (await params).id
 const user = await client.fetch(AUTHOR_GITHUB_ID, {id})
  const session= await auth();
 if(!user) return notFound();

  return (
  <>
    <section className='profile_container'>
       <div className='profile_card'>
         <div className='profile_title'>
           <h3 className='text-[20px] text-black uppercase text-center line-clamp-1'>
             {user.name}
           </h3>
         </div>
         <Image src={user.image} alt={user.name} width={220} height={220} className='profile_image'/>
       
       <p className='text-[30px] font-extrabold mt-7 text-center'>@{user?.username}</p>
       <p className='mt-2 text-center text-[14px]'>{user?.bio}</p>
       </div>

       <div className='flex-1 flex flex-col gap-5 lg:mt-5'>
         <p className='text-[25px] font-bold'>
           {session?.user?.id == id ?"Your": "All"} Startups
         </p> 
         <ul className='card_grid-sm'>
          <Suspense fallback={<>Loading...</>}>
            <Startups id={id}/>
          </Suspense>
         </ul>
       </div>
    </section>
  </>
  )
}

export default page