import React from 'react'
import Ping from './Ping'
import { client } from '@/sanity/lib/client'
import { STARTUP_VIEWS_QUERY } from '@/sanity/lib/queries'
import { writeClient } from '@/sanity/lib/write-client'
import { after } from 'next/server'
const View = async ({id}: {id: string}) => {

    const data = await client.withConfig({ useCdn: false }).fetch(STARTUP_VIEWS_QUERY, { id });
  const { views } = data ?? {}; 
after(async ()=>{ await writeClient.patch(id).set({views: views+ 1}).commit()})
 function formatNum(view: number) : string{
     const count= views ?? 0;

     if(count === 1){
        return `${count} view`
     }else{
         return `${count} views`
     }
    // return `${count} ${count === 1 ? 'view' : 'views'}`
 }
  return (
    <div className='view-container'>
        <div className='absolute -top-2 -right-2'>
            <Ping />
        </div>
        <p className='view-text'>
          <span className='font-black'>{formatNum(views)}</span>
        </p>
    </div>
  )
}

export default View