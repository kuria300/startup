import { formatDate } from '@/lib/utils';
import { client } from '@/sanity/lib/client';
import { PLAYLIST_QUERY, STARTUP_ID_QUERY } from '@/sanity/lib/queries';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import React, { Suspense } from 'react'
import markdownit from 'markdown-it'
import { Skeleton } from '@/components/ui/skeleton';
import View from '@/app/components/View';
import StartupCard from '@/app/components/StartupCard';
import { StartupPost } from '../../page';

const md= markdownit()

//export const experimental_ppr =true;//PPR in this page.tsx

const Page = async ({ params }: { params: Promise<{ id: string }>}) => {
   const {id} = await params

    const post = await client.fetch(STARTUP_ID_QUERY, {id})

    const {select:editorPosts } = await client.fetch(PLAYLIST_QUERY, {slug: 'startup-picks'} )

    if(!post) return notFound();
    const parsedContent= md.render(post?.pitch|| "")
    // const id= await client.fetch(`*[type== "post" && _id == $id][0]`, {id: params.id})
  return (
    <>
    <section className='pink_container !min-h-[240px]'>
      <p className='tag'>{formatDate( post._createdAt)}</p>
      <h1 className='heading'>{post.title} </h1>
      <p className='sub-heading !max-w-4xl'>{post.description}</p>
    </section>
     <section className='section_container'>
       <img src={post.image} alt='thumbnail' className='w-full rounded-xl h-[600px]'/>
      <div className='mt-10 max-w-4xl mx-auto space-y-5'>
          <div className='flex justify-between items-center'>
             <Link href={`/user/${post.author._id}`} className='flex gap-2 items-center mb-3'>
              <Image
              src={post.author.image}
              alt="avatar" 
              width={60} 
              height={60} 
              className='rounded-full drop-shadow-lg'
              />
              <div>
                <p className='text-[20px] font-medium'>{post.author.name}</p>
                <p className='text-[16px] font-medium text-[#7D8087]'>@{post.author.username}</p>
              </div>
             </Link>
             <div className="flex gap-1.5"> 
              <p className='category-tag'>{post.category}</p>
             </div>
          </div>
          <h3 className='text-[30px] font-bold'>Pitch Details</h3>
           {parsedContent ? (
             <article
             className='read'
              dangerouslySetInnerHTML={{__html:parsedContent}}
             />
           ):(
             <p className='no-result'>No Details Provided</p>
           )}
      </div>
      <hr className='divider'/>
       
      {editorPosts?.length > 0 && (
  <div className="max-w-4xl mx-auto">
    <p className="text-[30px] font-semibold">Startup Posts</p>

    <ul className="mt-7 card_grid-sm">
      {editorPosts.map((post: StartupPost, i: number) => (
        <StartupCard key={i} post={post} />
      ))}
    </ul>
  </div>
)}
      <Suspense fallback={<Skeleton className='view_skeleton'/>}>
       <View id={id}/>
      </Suspense>
     </section>
    </>
  )
}

export default Page