import { auth } from "@/auth"
import Navbar from "@/components/Navbar"
import StartupForm from "@/components/StartupForm"
import { redirect } from "next/navigation"

const Create = async () => {
   const session = await auth()
   if (!session) redirect('/')
   return (
      <div className="text-white create-page pt-1">
         <Navbar />
         <header className="w-[100%]  justify-center flex flex-col items-center mx-auto rounded-md sm:py-20 py-10 ">
            <h1 className="sm:text-[4rem] text-[2rem] lg:max-w-[800px] max-w-[90%]  font-extrabold text-center">PITCH YOUR STARTUPS</h1>
            <h3 className="text-center  sm:text-base text-[0.6rem] w-fit text-white font-light bg-black sm:px-5 px-1 py-1">Fill in the Forms to Pitch your Startups !</h3>
         </header>
         <StartupForm />
      </div>
   )
}

export default Create