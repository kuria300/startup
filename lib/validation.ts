import { z } from "zod";
//security guard for your data to check if its in right format

export const userSchema= z.object({
   title: z.string().min(3).max(100),
   description: z.string().min(20),
   category: z.string().min(3).max(20),
   link: z.string().url(),
   pitch: z.string().min(10),

})
