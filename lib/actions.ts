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

try{
  const res = await fetch(link as string, { method: "HEAD" });
  const contentType = res.headers.get("content-type");

  if(!contentType?.startsWith("image/")){
    return parseData({
      error: "Image URL must point directly to an image file",
      status: "ERROR",
      fieldErrors: { link: "This link is not a valid image" },
    })
  }
}catch{
  return parseData({
    error: "Could not reach the image URL",
    status: "ERROR",
    fieldErrors: { link: "This link could not be verified" },
  })
}

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
