import { client } from "@/sanity/lib/client"
import { STARTUP_VIEWS_QUERY } from "@/sanity/lib/queries"
import { writeClient } from "@/sanity/lib/write-client"
import { after } from "next/server"

const View = async ({ id }: { id: string }) => {
   const { views: totalViews } = await client
      .withConfig({ useCdn: false })
      .fetch(STARTUP_VIEWS_QUERY, { id })

   after(async () => await writeClient
      .patch(id)
      .set({ views: totalViews + 1 })
      .commit()
   )

   return (
      < div className="view text-white fixed bottom-5 right-5 bg-slate-500/50 w-fit px-3 py-1 text-[0.9rem] rounded-[20px] font-light">
         <div className="view-blip"></div>
         <p><span className="font-bold">Views: </span>{totalViews || 'null'}</p>
      </div>
   )
}

export default View