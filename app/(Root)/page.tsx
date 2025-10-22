import Searchform from "../components/Searchform";
import StartupCard from "../components/StartupCard";
import { STARTUPS_QUERY } from "@/sanity/lib/queries";
import { sanityFetch } from "@/sanity/lib/live";


export const revalidate = 60;

export type StartupPost = {
  _createdAt: Date;
  views: number;
  author: { _id: number , name: string, image: string };
  _id: number;
  description: string;
  image: string;
  category: string;
  title: string;
};

export default async function Home({searchParams} : {searchParams: Promise<{query?: string}>}) {

  const query = (await searchParams).query;
   const params= {search: query || null}
  const {data: posts}= await sanityFetch( {query: STARTUPS_QUERY, params});


  
  return (
    <>
      <section className="pink_container bg-pattern">
        <h1 className="heading">Pitch your Startup <br/> connect with Developers</h1>

        <p className="sub-heading">
          Submit Ideas, Vote on Pitches and Get noticed
        </p>

        <Searchform query={query}/>
     </section>

     <section className="section_container">
      <p className=" text-2xl font-bold">
        {query ? `Search results for "${query}"`: 'All Startups' }
      </p>

      <ul className="mt-6 card_grid">
        {posts?.length > 0 ?(
           posts.map((startupCard: StartupPost)=>
            <StartupCard key={startupCard._id} post={startupCard} />
        )
       ):(
         <p className="no-results"></p>
        )}
      </ul>
     </section>
    
    </>
  );
}
