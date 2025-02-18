import { client } from "@/sanity/lib/client"
import { STARTUPS_BY_AUTHOR_QUERY } from "@/sanity/lib/queries"
import StartupCard, { StartupTypeCard } from "./StartupCard"

const UserStartups = async ({ id }: { id: string }) => {


   const startups = await client.fetch(STARTUPS_BY_AUTHOR_QUERY, { id })

   return (
      <div className="grid xl:grid-cols-2 sm:grid-cols-1 lg:grid-cols-2 gap-5">
         {startups.length > 0 ?
            startups?.map((item: StartupTypeCard) => (
               <StartupCard key={item._id} post={item} />
            )
            )
            :
            <p>No Posts Yet</p>
         }
      </div>
   )
}

export default UserStartups