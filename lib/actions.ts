"use server";

import slugify from 'slugify'
import { auth } from "@/auth";
import { parseData } from "./utils";
import { writeClient } from '@/sanity/lib/write-client';


export async function createIdea(formData: FormData, pitch: string){
  const session = await auth()

  if(!session) return parseData({error:"Not signed in, please sign in", status:"ERROR"})

const {title, description, category, link} = Object.fromEntries(
    Array.from(formData).filter(([key])=> key !== "pitch")
)

const slug= slugify(title as string, {lower: true, strict: true})
try{
   const startup ={
       title,
       description,
       category,
       image: link,
       slug: {
         _type: 'slug',
         current: slug
       },
       author:{
         _type: 'reference',
         _ref: session?.id
       },
       pitch
   }
  const result= await writeClient.create({_type:'startup', ...startup})

  return parseData({
    ...result,
    error:"",
    status: "SUCCESS"
  })
}catch(error){
  console.log(error)  
  return parseData({
    error: JSON.stringify(error), 
    status:"ERROR"
})
}
}