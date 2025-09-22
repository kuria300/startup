import { client } from '@/sanity/lib/client'
import { STARTUPS_BY_AUTHOR } from '@/sanity/lib/queries'
import React from 'react'
import StartupCard from "@/app/components/StartupCard";

const Startups = async ({id}: {id:string}) => {

    const startups= await client.fetch(STARTUPS_BY_AUTHOR, {id})
  
  return (
    <>
   {startups.length > 0 ? (
     startups.map((startup: any) => {
       return <StartupCard key={startup._id} post={startup} />;
    })
   ) : (
  <div className='no-result'>No posts yet</div>
   )}
    </>
  )
}

export default Startups