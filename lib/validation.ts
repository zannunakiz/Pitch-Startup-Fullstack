import z from 'zod'

export const formSchema = z.object({
   title: z.string().min(1).max(30),
   // link: z.string().url()
   // .refine(async (url) => {
   //    try {
   //       const res = await fetch(url, { method: "HEAD" })
   //       const contentType = res.headers.get("content-type")
   //       return contentType?.startsWith("image/")
   //    } catch {
   //       return false
   //    }} 
   // ),

   description: z.string().min(20).max(50),
   category: z.string().max(20).min(1),
   pitch: z.string().min(10)

})