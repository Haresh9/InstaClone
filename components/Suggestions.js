import {useEffect,useState} from 'react';
export default function Suggestions(){
const [suggestions,setsuggestions]=useState([]);
const [get,setGet]=useState(false);
useEffect(()=>{
let apiUrl = 'https://randomuser.me/api/?results=5';
  fetch(apiUrl)
  .then(res=>res.json())
  .then((resp)=>{setsuggestions(resp.results);
  setGet(true)
  });
},[]);
if (!get) return <h1></h1>
  return(
    <div className="mt-5 ml-9">
    <div className="flex  justify-between text-sm">
    <h3 className="font-semibold text-gray-400">Suggestions for you</h3>
    <button className="text-gray-600 font-semibold">See All </button>
    </div>
    {suggestions.map(profile=>(
      <div key={profile.id.name} className="flex items-center justify-between mt-3">
      <img className="w-10 h-10 rounded-full border p-[2px]"src={profile.picture.large} />
      <div className="flex-1 ml-4">
      <h2 className="font-semibold text-sm">{profile.name.first}</h2>
      <h3 className="text-xs text-gray-400 ">New follower </h3>
      </div>
      <button className="text-sky-600">Follow</button>
      </div>
    ))}

    </div>
  )
}
