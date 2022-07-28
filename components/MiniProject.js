import {useSession,signOut} from "next-auth/react"
export default function MiniProfile(){
 const {data:session}=useSession();
  return(
    <div className="flex items-center justify-between mt-8 ml-8">
    <img className="h-14 w-14 border rounded-full p-[2px]" src={session?.user?.image} alt=""/>

    <div className="flex-1 mx-5 text-sm">
    <h2 className="font-semibold">{session?.user?.username}</h2>
    <h3>i am here ggsdfgdf</h3>
    </div>
    <button onClick={signOut} className="text-sky-600">Sign Out</button>
    </div>


  )
}
