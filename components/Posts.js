import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { db } from '../firebase';
import Post from './Post';


export default function Posts(){
const [post,setPost]=useState(null);
useEffect(
  ()=>
  onSnapshot(query(collection(db,"posts"),orderBy("timestamp","desc")),
  (snapshot)=>{
    setPost(snapshot.docs);
  }

),[db]);
  return(
    <div>
    {post?.map((post)=>(
      <Post key={post.id}
            id={post.id}
            username={post.data().name.split(" ").join("").toLocaleLowerCase()}
            userImg={post.data().image}
            Img={post.data().postImage}
            caption={post.data().message}

             />
    ))
}
    </div>
  )

}
