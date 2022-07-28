import Image from "next/image";
import 'tailwindcss/tailwind.css'
import {
  SearchIcon,PlusCircleIcon,
  UserGroupIcon,
  HeartIcon,
  MenuIcon,
  ChatIcon,
  PlusIcon,
  PaperAirplaneIcon,
} from "@heroicons/react/outline";
import {HomeIcon} from "@heroicons/react/solid";
import {signIn,signOut,useSession} from "next-auth/react"
import { modelState } from "../atoms/modalatom";
import {useRecoilState} from "recoil"
export default function Header(){
  const {data:session}=useSession();
  const [open,setOpen]=useRecoilState(modelState);
    return(
    <div className="border bg-white sticky top-0 z-50">
    <section >
    <nav className="h-14 flex justify-between  max-w-4xl mx-5 lg:mx-auto">
    <div className="relative hidden lg:inline-grid  h-25 w-24 cursor-pointer">
     <Image src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/1280px-Instagram_logo.svg.png" layout="fill" objectFit="contain"/>
    </div>
    <div className="relative mt-3 w-10 h-10 lg:hidden flex-shrink-0 cursor-pointer" >
    <Image src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/Instagram_simple_icon.svg/120px-Instagram_simple_icon.svg.png" layout="fill" objectFit="contain"/>
    </div>
    <div className="mx-w-xs pt-0">
    <div className="relative rouded-md">
     <div className=" absolute mt-3 inset-y-0  pl-4 flex items-center pointer-events-none">
     <SearchIcon className="hidden sm:inline h-5 w-5 text-gray-500 "/>
     </div>
     <input className=" hidden sm:inline bg-gray-100 h-9 w-50 mt-3  block w-full pl-12 border-none hover:border-black focus:ring-black focus:border-black rounded-md"type="text" placeholder="Search"/>
    </div>
    </div>
    <div className="flex items-center justify-end space-x-4 ">
    <HomeIcon className="navButn" />
    {session?(<>
    
      <div className="relative navButn">
      <ChatIcon className="navButn "/>
      <div className="absolute -top-1 -right-1 text-xs w-4 h-4 flex justify-center items-center text-white bg-red-500 rounded-full ">15</div>
      </div>
     <PlusIcon onClick={()=>setOpen(true)} className=" h-6 w-6 b border-2 border-black rounded-md hover:scale-125 cursor-pointer"/>
     <SearchIcon className="navButn "/>
     <HeartIcon className=" navButn"/>
     <img 
     onClick={signOut}
     src={session.user?.image}
     alt="profile pic "
     className="h-8 w-8  rounded-full cursor-pointer"
     />
    </>

    ):(<button onClick={signIn}>Sign In</button>)}

    </div>
     </nav>

    </section>
    </div>
  );
}
