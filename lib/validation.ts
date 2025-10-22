import { z } from "zod";
//security guard for your data to check if its in right format

export const userSchema= z.object({
   title: z.string().min(3).max(100),
   description: z.string().min(20),
   category: z.string().min(3).max(20),
   link :z.string().url().refine(async (url)=>{
      try{
         // Perform a HEAD request to the URL to get headers only (more efficient than GET)
        const res= await fetch(url, {method: "HEAD"});
         //extracts content-type from headers
         const content= res.headers.get("content-type");

         return content?. startsWith("image/")

      }catch{
         return false
      }
   }),
   pitch: z.string().min(10),

})