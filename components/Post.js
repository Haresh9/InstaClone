
import {useSession} from 'next-auth/react'
import{
  BookmarkIcon,
  ChatIcon,
  DotsHorizontalIcon,
  EmojiHappyIcon,HeartIcon,
  PaperAirplaneIcon

}from "@heroicons/react/outline";
import {HeartIcon as HeartIconFilled} from '@heroicons/react/solid'
import { addDoc,doc,collection, onSnapshot, orderBy, query, serverTimestamp, setDoc, snapshotEqual, deleteDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from '../firebase';
import Moment from 'react-Moment';

export default function Post({id,username,userImg,Img,caption}){
const [comment,setComments]=useState("");
const [comments,setcomments]=useState([]);
const [likes,setlikes]=useState([]);
const [hasliked,setHashLiked]=useState(false);
const {data:session}=useSession();
useEffect(
  ()=>
  onSnapshot(
    query(
      collection(db,"posts",id,"comments"),
      orderBy("timestamp","asc")
      ),
      (snapshot)=> setcomments(snapshot.docs)
      ),[db])
useEffect(()=>onSnapshot(collection(db,"posts",id,"likes"),(snapshot)=>setlikes(snapshot.docs)),[db,id])
const sendComment=async(e)=>{
  e.preventDefault();
  const commenttosend=comment;
  setComments('');
  await addDoc(collection(db,"posts",id,"comments"),{
    comment:commenttosend,
    username:session.user.name,
    userImage:session.user.image,
    timestamp:serverTimestamp(),
  })
}
useEffect(
  ()=>setHashLiked(
    likes.findIndex((like)=>like.id===session?.user?.uid)!== -1
  ),
)
const likePost=()=>{
  if(hasliked){
    deleteDoc(doc(db,"posts",id,"likes",session.user.uid));
  }
  else{
    setDoc(doc(db,'posts',id,'likes',session.user.uid),{
      username:session.user.username
  
    });
    
  };
};
return(
  <div className="bg-white my-7 border rounded-md">
  <div className="flex items-center p-2">
  <img className="rounded-full h-11 w-11 p-1 mr-3 "src={userImg} alt="" />
  <p className="flex-1 font-bold"> {username}</p>
  <DotsHorizontalIcon className="h-5"/>
  </div>
  <img className="object-cover w-full "src={Img}/>
  <div className="flex justify-between px-3 pt-3">
  <div className="flex space-x-4">
    {hasliked?(
      <HeartIconFilled onClick={likePost} className="btn text-red-500"/>
    ):(<HeartIcon onClick={likePost}className="btn"/>)}
  <img className="btn"src="https://cdn0.iconfinder.com/data/icons/social-media-logo-4/32/Social_Media_instagram_comment-512.png"/>
  <PaperAirplaneIcon className="btn"/>
  </div>
  <BookmarkIcon className="btn"/>
  </div>
  <p className="p-4 truncate">
    {likes.length>0 && (
      <p className='font-bold mb-1 '>{likes.length+" "}likes</p>
    )}
  <span className="font-medium mr-1">{username}</span>
  {caption}
  </p>
  {comments.length>0 && (
    <div className='ml-4 h-20 overflow-y-scroll scrollbar-thumb-black scrollbar-thin'>
      {comments.map((comment)=>(
        <div key={comment.id} className="flex items-center space-x-2 mb-3">
          <p className='text-sm flex-1'><span className='font-bold'>{comment.data().username.split(" ").join("").toLocaleLowerCase()}</span>{" "}{comment.data().comment}</p>
           <Moment fromNow className='pr-5 text-xs'>
            {comment.data().timestamp?.toDate()}
           </Moment>
          </div>
      ))}
    </div>
  ) }
  <form className="border-y divide-y-0 flex items-center p-2 ">
  <EmojiHappyIcon className="btn"/>
  <input value={comment} onChange={e=>setComments(e.target.value)}className="border-none flex-1"type="text" placeholder="Add a comment..."/>
  <button type="submit" onClick={sendComment} disabled={!comment.trim()} className="font-semibold text-blue-400">Post</button>
  </form>
  </div>
)

}
