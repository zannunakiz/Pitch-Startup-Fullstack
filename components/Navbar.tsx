import { auth, signIn, signOut } from "@/auth"
import { BadgePlus, LogOut } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import StartupLogo from '../public/StartupLogo.png'

const Navbar = async () => {


   const session = await auth()

   return (
      <nav className="mt-1 bg-transparent sm:w-[100%] w-[90%] mx-auto  font-light sm:text-[0.9rem] text-[0.8rem] sm:py-1 py-0 flex justify-between items-center sm:px-16 px-2 text-white">
         <Link href={'/'}>
            <Image src={StartupLogo}
               alt="Pitch Startup Logo"
               width={80}
               height={80}
               className="sm:w-[80px] w-[65px]"
            />
         </Link>


         {session && session?.user ?
            <div className="navbar-options items-center">
               <form action={async () => {
                  "use server";

                  await signOut({ redirectTo: "/" })
               }}>

                  <button type="submit" className="hidden md:block">Logout</button>
                  <button type="submit" className="md:hidden block"><LogOut /></button>

               </form>
               <Link href="/startup/create" className="hidden md:block">Create</Link>
               <Link href="/startup/create" className="md:hidden block"><BadgePlus /></Link>
               <Link href={`/user/${session?.id}`}>
                  <Image
                     src={session?.user?.image ? session?.user?.image : "https://redcoraluniverse.com/img/default_profile_image.png"}
                     width={40}
                     height={40}
                     className="rounded-full md:w-[40px] md:h-[40px] w-[30px] h-[30px]"
                     alt={'profile pic'} />
               </Link>
            </div>

            :
            <div className="navbar-options">
               <form action={async () => {
                  'use server'

                  await signIn()


               }}>
                  <button type="submit">Login</button>
               </form>
            </div>
         }
      </nav >
   )
}

export default Navbar