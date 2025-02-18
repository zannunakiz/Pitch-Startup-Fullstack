import { cn, formatDate } from "@/lib/utils"
import { Author, Startup } from "@/sanity/types"
import { EyeIcon } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { Skeleton } from "./ui/skeleton"


export type StartupTypeCard = Omit<Startup, "author"> & { author?: Author };

const StartupCard = ({ post }: { post: StartupTypeCard }) => {

   return (
      <div className="cards text-white py-3 px-5">

         <div className="flex justify-between text-[0.8rem] font-light ">
            <p>{formatDate(post?._createdAt)}</p>
            <div className="flex gap-2 items-center"><EyeIcon size={17} color="white" /><p>{post?.views || '0'}</p></div>
         </div>

         <div className="flex justify-between  items-center my-2">
            <div>
               <Link href={`/user/${post?.author?._id}`} className="link-hover" >
                  <p className="font-bold sm:text-[1rem] text-[0.9rem]">Author: <span className="font-light">{post?.author?.name}</span></p>
               </Link>

               <Link href={`/startup/${post?._id}`}>
                  <h3 className="font-bold sm:text-[2rem] text-[1.7rem]">{post?.title}</h3>
               </Link>


            </div>
            <Link href={`/user/${post?.author?._id}`} className="rounded-full w-max overflow-hidden">
               <Image
                  width={45}
                  height={45}
                  alt="Profile Pic"
                  src={
                     post?.author?.image ? post?.author?.image :
                        `https://static.vecteezy.com/system/resources/previews/003/715/527/non_2x/picture-profile-icon-male-icon-human-or-people-sign-and-symbol-vector.jpg`
                  }

               />
            </Link>
         </div>

         <Link href={`/startup/${post?._id}`} className=" w-[100%] mx-auto flex flex-col flex-wrap">
            <p className="max-w-[100%] sm:text-base text-[0.85rem] break-words font-light">{post?.description}</p>
            <div className="w-[100%] overflow-hidden h-[250px] my-5 flex items-center mx-auto rounded-xl">
               <img src={post?.image} className="hover:scale-110 duration-500 object-cover w-[100%] h-[290px] "></img>
            </div>
         </Link>

         <div className="flex justify-between items-center sm:text-[1rem] text-[0.85rem] py-1">
            <Link href={`/?query=${post?.category?.toLowerCase()}`}>
               <p className="font-semibold hover:underline">{post?.category}</p>
            </Link>
            <button className="border-[1px] border-white bg-transparent rounded-[20px]  px-4 py-[2px] hover:bg-slate-400 hover:border-slate-400 duration-300">
               <Link href={`/startup/${post?._id}`}><p className="font-extralight sm:text-base">Details</p></Link>
            </button>
            {//harusnya pake shadcn button
            }
         </div>

      </div>
   )
}


export const StartupCardSkeleton = () => {
   return (
      <>
         {[0, 1, 2, 3].map((index: number) => (
            <li key={cn("skeleton", index)}>
               <Skeleton className="startupcard-skeleton" />
            </li>

         ))}
      </>
   )
}

export default StartupCard