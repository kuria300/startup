'use client'

import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useActionState, useState } from "react"
import MDEditor from '@uiw/react-md-editor';
import { userSchema } from "@/lib/validation";
import {z} from "zod";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { createIdea } from "@/lib/actions";

type FormState = {
  status: "INITIAL" | "SUCCESS" | "ERROR";
  error: string | null;
  fieldErrors: Record<string, string>;
};


const StartupForm = () => {
    const [errors, setErrors] = useState<Record<string,string>>({})
    const [pitch, setPitch] = useState<string>('Hello friend')

    const { toast } = useToast();
    const router = useRouter();
     
    const handleForm= async (prevState: FormState, formData: FormData )=>{ //server action declared inline and managed by useActionstate even without 'use server'
       try{
        const formValues ={
            title: formData.get("title") as string,
            description: formData.get("description") as string,
            category: formData.get("category") as string,
            link: formData.get("link") as string,
            pitch,
        }

        await userSchema.parseAsync(formValues);

       const result= await createIdea(formData, pitch)
       if(result.status == "SUCCESS") {
       toast({
        title:"Success",
        description: "Your Startup has been created successfully",
       })

       router.push(`/startup/${result._id}`)
      }

      return result
       }catch(error){
        if (error instanceof z.ZodError) {
          const fieldErr= error.flatten().fieldErrors;

           const errorMessages= Object.fromEntries(
             Object.entries(fieldErr).map(([key, value]) => [key, value?.[0] || ''])
            );

            //setErrors(fieldErr as unknown as Record<string, string>) //it says its not the shape i want but pretend we move on
          
            setErrors(errorMessages);

            toast({
              title:"Error",
              description: "Please chech your Input and try again",
              variant:"destructive",
             })

            return {
              ...prevState,
              error: "validation failed", 
              status: "ERROR",
          };
          // const errorMessages: Record<string, string> = {};
          // error.errors.forEach((err) => {
          //    errorMessages[err.path[0]] = err.message;
          // });
          // setErrors(errorMessages);
       }

       toast({
        title:"Error",
        description: "An error occured uexpectedly",
        variant:"destructive", //attention-grabbing toast
       })

       return {
        ...prevState,
        error: "An error occured uexpectedly", 
        status: "ERROR",
    };
       }
    }   
const [, formAction, isPending] = useActionState(handleForm, {
  error: "",
  status: "INITIAL",
});
    return (
   <form action={formAction} className="startup-form">
    <div>
       <label htmlFor="title" className="startup-form_label">Title</label>
       <Input id="title" 
       name="title" 
       className="startup-form_input"
       required
       placeholder="Startup title"
       />

       {errors.title && <p className="startup-form_error">{errors.title}</p>}
     </div>
     <div>
       <label htmlFor="description" className="startup-form_label">Description</label>
       <Textarea id="description" 
       name="description" 
       className="startup-form_textarea"
       required
       placeholder="Startup Description"
       />

       {errors.description && <p className="startup-form_error">{errors.description}</p>}
     </div>
     <div>
       <label htmlFor="category" className="startup-form_label">category</label>
       <Input id="category" 
       name="category" 
       className="startup-form_input"
       required
       placeholder="Startup category"
       />

       {errors.category && <p className="startup-form_error">{errors.category}</p>}
     </div>
     <div>
       <label htmlFor="link" className="startup-form_label">Image URL</label>
       <Input id="link" 
       name="link" 
       className="startup-form_input"
       required
       placeholder="Startup image URL"
       />

       {errors.link && <p className="startup-form_error">{errors.link}</p>}
     </div>
      <div data-color-mode="light">
      <label htmlFor="pitch" className="startup-form_label">Pitch</label>
      <MDEditor
        value={pitch}
        onChange={(value)=>setPitch(value as string)}
        id="pitch"
        height={300}
        style={{borderRadius: 20, overflow: "hidden"
        }}
        textareaProps={{
            placeholder: "Breiefly describe what your problem solves"
        }}
      />
        {errors.pitch && <p className="startup-form_error">{errors.pitch}</p>}
      </div>

      <button type="submit" className="startup-form_btn text-white" disabled={isPending}>{isPending ? "submitting...": "Submit Your Pitch"} </button>
   </form>
  )
}

export default StartupForm