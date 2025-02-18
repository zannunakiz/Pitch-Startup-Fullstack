'use client'

import { useToast } from '@/hooks/use-toast';
import { createPitch } from '@/lib/actions';
import { formSchema } from '@/lib/validation';
import MDEditor from '@uiw/react-md-editor';
import { Send } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useActionState, useState } from "react";
import { z } from 'zod';
import { Button } from './ui/button';
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";

const StartupForm = () => {
   const [errors, setErrors] = useState<Record<string, string>>({});
   const [pitch, setPitch] = useState("");
   const { toast } = useToast();
   const router = useRouter();

   const handleFormSubmit = async (prevState: any, formData: FormData) => {
      try {
         const formValues = {
            title: formData.get("title") as string,
            description: formData.get("description") as string,
            category: formData.get("category") as string,
            link: formData.get("link") as string,
            pitch,
         };

         await formSchema.parseAsync(formValues);

         const result = await createPitch(prevState, formData, pitch);

         if (result.status == "SUCCESS") {
            toast({
               title: "Success",
               description: "Your startup pitch has been created successfully",
            });

            router.push(`/startup/${result._id}`);
         }

         return result;
      } catch (error) {
         if (error instanceof z.ZodError) {
            const fieldErorrs = error.flatten().fieldErrors;

            setErrors(fieldErorrs as unknown as Record<string, string>);

            toast({
               title: "Error",
               description: "Please check your inputs and try again",
               variant: "destructive",
            });

            return { ...prevState, error: "Validation failed", status: "ERROR" };
         }

         toast({
            title: "Error",
            description: "An unexpected error has occurred",
            variant: "destructive",
         });

         return {
            ...prevState,
            error: "An unexpected error has occurred",
            status: "ERROR",
         };
      }
   };

   const [state, formAction, isPending] = useActionState(handleFormSubmit, {
      error: "",
      status: "INITIAL",
   });


   return (
      <form action={formAction}
         className=' md:text-[1.2rem] text-[0.9rem] pb-10 gap-10 w-[85%] max-w-[750px] mx-auto flex flex-col justify-center'>

         <div className='form-div'>
            <label>Title</label>
            <Input id="title" className='form-div-input' name="title" placeholder='Enter Your Startup Title' />
            {errors?.title && <p>{errors?.title}</p>}
         </div>

         <div className='form-div'>
            <label>Description</label>
            <Textarea name="description" id="description" className='h-[100px]' placeholder='Enter Your Startup Short Description (Max 50 char)' />
            {errors?.description && <p>{errors?.description}</p>}
         </div>

         <div className='form-div'>
            <label>Category</label>
            <Input className='form-div-input' id="category" name="category" placeholder='Enter Category (ex: Education, Management, etc)' />
            {errors?.category && <p>{errors?.category}</p>}
         </div>

         <div className='form-div'>
            <label>Image</label>
            <Input className='form-div-input' id="link" name="link" placeholder='Enter Your Image url (ex: https://....)' />
            {errors?.link && <p>{errors?.link}</p>}
         </div>

         <div className='form-div'>
            <label>Pitch</label>
            <MDEditor
               value={pitch}
               onChange={(value) => setPitch(value as string)}
               id="pitch"
               preview="edit"
               height={300}
               style={{ borderRadius: 20, overflow: "hidden" }}
               textareaProps={{
                  placeholder:
                     "Briefly describe your idea and what problem it solves",
               }}
               previewOptions={{
                  disallowedElements: ["style"],
               }}
            />
            {errors?.pitch && <p>{errors?.pitch}</p>}
         </div>

         <Button
            className='w-fit self-center bg-slate-700 hover:bg-slate-600 rounded-[15px]'
            type="submit" disabled={isPending}>{isPending ? 'Submitting...' : 'Submit'} <Send /></Button>

      </form>
   )
}

export default StartupForm