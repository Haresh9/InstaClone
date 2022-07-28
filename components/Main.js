import Stories from './Stories'
import Posts from './Posts'
import MiniProfile from './MiniProject'
import Suggestions from './Suggestions'
import { useSession } from 'next-auth/react'
export default function Main(){
  const {data:session} = useSession();
  return(
      <main className="grid grid-cols-1 md:grid-cols-2 md:max-w-3xl xl:grid-cols-3 xl:max-w-3xl mx-auto">
     
     {session&&(
      <>
     <section className=" col-span-2">
       <Stories/>
       <Posts/>
     </section>
     <section>
     <div className="fixed top-18 ">
     <MiniProfile/>
     <Suggestions/>
     </div>
     </section>
      </>

     )}
      </main>

  )
}
