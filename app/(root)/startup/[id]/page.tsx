import Navbar from "@/components/Navbar"
import StartupCard, { StartupTypeCard } from "@/components/StartupCard"
import { Skeleton } from "@/components/ui/skeleton"
import View from "@/components/View"
import { formatDate } from "@/lib/utils"
import { client } from "@/sanity/lib/client"
import { PLAYLIST_BY_SLUG_QUERY, STARTUP_BY_ID_QUERY } from "@/sanity/lib/queries"
import markdownit from "markdown-it"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { Suspense } from "react"


const md = markdownit()

const Startup = async ({ params }: { params: Promise<{ id: string }> }) => {
   const id = (await params).id

   const [post, { select: impactfulPosts }] = await Promise.all([
      client.fetch(STARTUP_BY_ID_QUERY, { id }),
      client.fetch(PLAYLIST_BY_SLUG_QUERY, { slug: 'top-impactful-startups' })
   ])

   if (!post) return notFound()

   const parsedContent = md.render(post?.pitch || "");



   return (
      <div className="md:pb-10 pb-4 pitch-page mt-[-5px] min-h-screen">
         <Navbar />
         <header className="md:w-[100%] w-[90%] text-white  justify-center flex flex-col items-center mx-auto rounded-md sm:py-20 py-10 ">
            <h3 className="text-center  sm:text-base text-[0.6rem] w-fit  text-white font-light bg-black sm:px-5 px-1 py-1">{formatDate(post._createdAt)}<span className="font-bold text-gray-300"></span></h3>
            <h1 className="sm:text-[4rem] text-[2rem] lg:max-w-[800px] max-w-[90%]  font-extrabold text-center">{post?.title}</h1>
            <p className="text-center md:text-base text-[0.8rem]">{post?.description}</p>
         </header>

         <section className="text-white mx-auto md:max-w-[800px] max-w-[85%] md:px-8 px-5 md:py-10 py-5 pitch-container ">

            <div className="flex items-center md:text-base text-[0.9rem] justify-between mb-1 w-[100%] px-2">
               <p className="font-light">Posted By
                  <br></br>
                  <Link href={`/user/${post?.author?._id}`} className="hover:text-slate-400 font-bold">{post?.author?.name}</Link>
               </p>
               <Link href={`/user/${post?.author?._id}`}>
                  <img src={post?.author?.image!}
                     alt="profile pic"
                     className="rounded-full md:w-[50px] w-[40px] md:h-[50px] h-[40px] object-cover"
                  />
               </Link>
            </div>


            <hr></hr>

            <div className="pitch-detail-image-container overflow-hidden p-2 my-5 flex rounded-[30px] justify-center items-center mx-auto">
               <Image width={400} height={400} className=" rounded-[30px] md:max-w-[400px] hover:scale-110 duration-500 max-w-[200px]"
                  src={post?.image!} alt="startup pic" />
            </div>


            <hr></hr>
            <h3 className=" tracking-[5px] font-light md:text-[1.5rem] text-[1.1rem] text-center my-1 shine bg-gray-500/25">Pitch Details</h3>
            <hr></hr>

            <article
               dangerouslySetInnerHTML={{ __html: parsedContent }}
               className="prose break-word py-5"
            />

            <hr></hr>
         </section>

         {impactfulPosts?.length > 0 && (
            <section className="mt-14 pb-5">
               <h1 className="text-center text-white font-bold mb-10 text-[2rem]">Top Impactful Startups</h1>
               <div className="grid xl:grid-cols-2 sm:grid-cols-1 lg:grid-cols-2 md:grid-cols-2 gap-5 max-w-[900px] w-[90%] mx-auto">
                  {impactfulPosts.map((post: StartupTypeCard) => (
                     <StartupCard post={post} />
                  ))}
               </div>
            </section>
         )}

         <Suspense fallback={<Skeleton className="w-[100%] h-[100px] bg-slate-400 rounded-[20px]" />}>
            <View id={id} />
         </Suspense>
      </div>
   )
}

export default Startup