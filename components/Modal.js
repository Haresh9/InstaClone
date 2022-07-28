import { modelState } from "../atoms/modalatom"
import {useRecoilState} from 'recoil'
import {Transition,Dialog} from '@headlessui/react'
import { Fragment, useRef, useState } from "react"
import { CameraIcon } from "@heroicons/react/outline"
import {db,storage} from '../firebase'
import {useSession} from 'next-auth/react'
import {addDoc,setDoc,doc,collection,serverTimestamp} from 'firebase/firestore'
import {getDownloadURL,uploadString,ref} from 'firebase/storage'
export default function Modal(){
    const {data:session} =useSession();
    const [open,setOpen]=useRecoilState(modelState);
 const [selectedFiles,setSelectedFiles]=useState(null);
 const filePickerRef=useRef(null);
 const captionRef=useRef(null);
 const uploadPost=(e)=>{
        e.preventDefault();
        if(!captionRef.current.value) return;
          addDoc(collection(db,"posts"),{
            message:captionRef.current.value,
             name:session.user.name,
             image:session.user.image,
             email:session.user.email,
             timestamp:serverTimestamp(),
           }).then((docum)=>{
             if(selectedFiles){
               const storageRef=ref(storage,`posts/${doc.id}`);
               uploadString(storageRef,selectedFiles,'data_url').then(snapshot=>{
                 getDownloadURL(snapshot.ref).then(URL=>{
                   setDoc(
                     doc(db,'posts',docum.id),
                     {postImage:URL},
                     {merge:true}
                   );
                 });
                 remove();
                 setOpen(false);
               });
             }
           });
        captionRef.current.value=""
    
 }
 const addImageToPost=(e)=>{
      const reader=new FileReader();
      if(e.target.files[0]){
        reader.readAsDataURL(e.target.files[0])
      }
      reader.onload=(readerEvent)=>{
       setSelectedFiles(readerEvent.target.result)
      }
      
 }
 const remove=()=>{
    setSelectedFiles(null);
  }
 
    return(<Transition.Root show={open} as={Fragment}>
        <Dialog 
        as='div'
        className='fixed z-10 inset-0 overflow-y-auto '
        onClose={setOpen}>
            <div className="fixed items-end justify-center  pt-4 px-4 pb-20 text-center  ">
            <Transition.Child
             as={Fragment}
             enter="ease-out duration-300"
             enterFrom="opacity-0"
             enterTo="opacity-100"
             leave="ease-in duration-200"
             leaveFrom="opacity-100"
             leaveTo="opacity-0"
            >
            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"/>
            </Transition.Child>
            <span
            className=" sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true"
            >
            &#8203;
            </span>
            <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 traslate-y-4 sm:translate-y-0 sm:scale-95"
            >
            <div
            className=" inline-block bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden
            shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-sm sm:w-full sm:p-6
            ">
            <div>
                {selectedFiles ?(
                    <img src={selectedFiles} onClick={()=>setSelectedFiles(null)} alt=""/>)
                :(

                    <div
                    className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 cursor-pointer" 
                    onClick={()=>filePickerRef.current.click()}
                    >
                        <CameraIcon className="h-6 w-6 text-red-600 " aria-hidden="true"/>
    
                    </div>
                )}
                <div>
                    <div className="mt-3 text-center sm:mt-5">
                    <Dialog.Title
                    as="h3"
                    className="text-lg leading-6 font-medium text-gray-900">
                        upload a Photo
                    </Dialog.Title>
                    </div>
                    <div>
                        <input ref={filePickerRef} type="file" hidden onChange={addImageToPost} />
                    </div>
                    <div className="mt-2">
                        <input className="border-none focus-ring-0 w-full text-center"
                        type="text"
                        ref={captionRef}
                        placeholder="please enter a caption..."/>
                    </div>
                </div>
                <div className="mt-5 mb-5 sm:mt-6 ">
                 <button
                 type="button"
                 onClick={uploadPost}
                 className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 
                 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none
                 focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:text-sm disabled:bg-gray-300 
                 disabled:cursor-not-allowed hover:disabled-bg-gray-300
                 "
                 >
                  upload Post
                 </button>
                </div>
            </div>    
            </div>
            </Transition.Child>
            </div>
        </Dialog>
    </Transition.Root>)
}