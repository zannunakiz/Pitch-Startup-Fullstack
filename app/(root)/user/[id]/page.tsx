import { auth } from "@/auth"
import Navbar from "@/components/Navbar"
import { StartupCardSkeleton } from "@/components/StartupCard"
import UserStartups from "@/components/UserStartups"
import { client } from "@/sanity/lib/client"
import { AUTHOR_BY_ID_QUERY } from "@/sanity/lib/queries"
import Image from "next/image"
import { notFound } from "next/navigation"
import { Suspense } from "react"


const Profile = async ({ params }: { params: Promise<{ id: string }> }) => {

   const id = (await params).id
   const session = await auth()
   const user = await client.fetch(AUTHOR_BY_ID_QUERY, { id })

   if (!user) return notFound()

   return (
      <div className="profile-page min-h-screen pt-1">
         <Navbar />
         <h1 className="pt-10 sm:text-[4rem] text-[2rem] text-white font-extrabold text-center">USER PROFILE</h1>

         <section className="flex xl:flex-row flex-col xl:items-start items-center gap-16 py-12 text-white mx-auto max-w-[1300px] w-[90%]">

            <div>
               <div className="profile-container px-2 py-2 flex flex-col justify-evenly items-center w-[330px] h-[330px]">
                  <p className="font-bold text-[1.3rem] text-slate-300">{user?.name}</p>
                  <div className="profile-img-container flex rounded-[20px] overflow-hidden w-[200px] h-[200px]">
                     <Image src={user?.image} alt="use pic" width={100} height={100}
                        className="w-[100%] h-[100%] object-cover hover:scale-110 duration-500"
                     ></Image>
                  </div>
                  <p className="font-light italic shine">{user?.username}</p>
                  <p className="text-[0.9rem]">{user?.bio}</p>
               </div>
            </div>

            <div>
               <p className="font-bold text-[2rem] pb-10">{session?.id === id ? "Your" : "All"} Startups</p>

               <Suspense fallback={<StartupCardSkeleton />}>
                  <UserStartups id={id} />
               </Suspense>


            </div>

         </section>


      </div>
   )
}

export default Profile