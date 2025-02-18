import { auth } from "@/auth";
import Navbar from "@/components/Navbar";
import SearchForm from "@/components/SearchForm";
import StartupCard, { StartupTypeCard } from "@/components/StartupCard";
import { sanityFetch, SanityLive } from "@/sanity/lib/live";
import { STARTUPS_QUERY } from "@/sanity/lib/queries";

// export type StartupCardType = {
//   title: string;
//   _createdAt: string;
//   _id: string;
//   image: string;
//   category: string;
//   views: number;
//   description: string;
//   author: {
//     _id: string;
//     name: string;
//     image: string;
//   };
// };




const Home = async ({ searchParams }: { searchParams: Promise<{ query?: string }> }) => {


  const query = (await searchParams).query
  const params = { search: query || null }
  const { data: posts } = await sanityFetch({ query: STARTUPS_QUERY, params });
  const session = await auth()
  console.log('SESSION: ')
  console.log(session?.id)


  //console.log(posts, null, 2)
  // const posts = [{
  //   title: "Class VII",
  //   _createdAt: new Date().toISOString(),
  //   id: "a1",
  //   image: "https://th.bing.com/th/id/R.a2d89ae3e00408e93713cb55b1800397?rik=nDobCOKZG9sgaQ&riu=http%3a%2f%2fwww.trailsofcoldsteel.com%2fcs2%2fimages%2fmemoirs-story1-7.jpg&ehk=BCDu%2fPsy7IrkBMjBPXUOJgbtf06eo22LH4q19sicr0U%3d&risl=&pid=ImgRaw&r=0",
  //   category: "Education",
  //   views: 1,
  //   description: "Trails Education for third path, The wings that guided us, and Be the light in the darkness.",
  //   author: { _id: '1', name: "Rean" }
  // },
  // {
  //   title: "Gralsritter",
  //   _createdAt: new Date().toISOString(),
  //   id: "a2",
  //   image: "https://i.ytimg.com/vi/CHOFReQtewM/maxresdefault.jpg",
  //   category: "Religious Order",
  //   views: 2,
  //   description: "The secretive knights of the Septian Church, investigating and sealing dangerous artifacts.",
  //   author: { _id: "2", name: "Thomas" }
  // },
  // {
  //   title: "Ouroboros",
  //   _createdAt: new Date().toISOString(),
  //   id: "a3",
  //   image: "https://www.17thshard.com/uploads/monthly_2019_09/Banquet_of_Snakes_-_Key_Visual_(Sen_III).png.8bfbcf640cdd7e8e6a24086ec1858113.png",
  //   category: "Secret Society",
  //   views: 3,
  //   description: "A mysterious organization manipulating events behind the scenes with their enigmatic Grandmaster.",
  //   author: { _id: "3", name: "Campanella" }
  // }
  // ]


  // if (posts) {
  //   console.log(posts, null, 2)
  // }

  return (
    <div>
      <Navbar />
      <header className="w-[100%]  justify-center flex flex-col items-center mx-auto rounded-md sm:py-20 py-10 ">
        <h1 className="sm:text-[4rem] text-[2rem] lg:max-w-[800px] max-w-[90%]  font-extrabold text-center">PITCH YOUR STARTUPS AND COLLABORATE</h1>
        <h3 className="text-center  sm:text-base text-[0.6rem] sm:w-fit  w-[80%] text-white font-light bg-black sm:px-5 px-1 py-1">"You don’t have to be great to start, but you have to start to be great." — <span className="font-bold text-gray-300">Zig Ziglar</span></h3>
      </header>
      <SearchForm query={query} posts={posts} />

      <section className="py-5 px-10">
        <p className="text-white font-extrabold md:text-[2rem] text-[1.3rem] md:my-10 my-5 md:text-left text-center">
          {query ? `Results fot "${query}"` : 'All Startups'}
        </p>
        <div className="grid gap-5 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {posts?.length > 0 ?
            (
              posts.map((post: StartupTypeCard) => (
                <StartupCard key={post?._id} post={post} />
              ))
            )
            :
            (<p>No results</p>)

          }

        </div>
      </section>


      <SanityLive />
    </div>

  )
}

export default Home