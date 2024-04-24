import React from 'react'
import service from '../appwriteReasouces/appwrite_config.js'
import { Link } from 'react-router-dom'

export default function PostCard ({
     $id,
    text,
    featuredImage,}   
) {
  return(
    <Link to={`/post/${$id}`}>
        <div className='w-full bg-gray-400 rounded-xl p-4'>
            <div className='w-full justify-center mb-4'>
                <img src={service.getFilePreview(featuredImage)} alt={text} className='rounded-xl' />
            </div>
            <h2 className='text-xl font-bold'>{titel}</h2>
        </div>
    </Link>
    
   )
  }
