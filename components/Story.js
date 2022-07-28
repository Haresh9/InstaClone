import 'tailwindcss/tailwind.css'

export default function Story({img,username}){
return(
    <div >
    <img className="h-14 hover:scale-110 w-14 rounded-full p-[1.5px] border-red-500 border-2 object-contain cursor-pointer" src={img}/>
     <p className="w-14 text-center text-xs transition transform duration-200 ease-out">{username}</p>
    </div>

)

}
