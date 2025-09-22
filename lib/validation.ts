import { z } from "zod";
//security guard for your data to chech if its in right format

export const userSchema= z.object({
   title: z.string().min(3).max(100),
   description: z.string().min(20),
   category: z.string().min(3).max(20),
   link :z.string().url().refine(async (url)=>{
      try{
        const res= await fetch(url, {method: "HEAD"});
         const content= res.headers.get("content-type");

         return content?. startsWith("image/")

      }catch{
         return false
      }
   }),
   pitch: z.string().min(10),

})