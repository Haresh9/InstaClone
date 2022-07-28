import faker from '@faker-js/faker';
import { useSession } from 'next-auth/react';
import {useEffect,useState} from 'react';
import Story from './Story'
export default function Stories(){
const[suggestions,setSuggestions]=useState(null);
const[get,setGet]=useState(false);
const {data:session} = useSession();
useEffect(()=>{
let apiUrl = 'https://randomuser.me/api/?results=15';
  fetch(apiUrl)
  .then(res=>res.json())
  .then((resp)=>{setSuggestions(resp.results);
  setGet(true)
  });
},[]);

if (!get) return <h1></h1>
  return(
     <div className="flex border rounded-lg overflow-x-scroll space-x-3 p-6 bg-white mt-8 scrollbar-thin scrollbar-thumb-black">
      {session&& (
        <Story img={session?.user?.image} username={session?.user?.username}/>
      )}
     {suggestions.map((profile)=>(
        <Story key={profile.id.name} img={profile.picture.large} username={profile.name.first}/>
     ))}
     </div>
  )
}
