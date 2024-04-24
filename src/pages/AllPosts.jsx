import React, { useEffect } from 'react'
import service from '../appwriteReasouces/appwrite_config'
import { Container } from '../components/container/Container'
import PostCard from '../components/PostCard'


export default function AllPosts() {

    const [posts, setPosts] = useState([]);
    useEffect( () => {}, [])

    service.getAllPost([]).then( (posts) => posts ? setPosts(posts.documents):null)

  return(
    <div className='w-full py-8'>
        <Container>
            <div className='flex flex-wrap'></div>
            {posts.map( (post) => {
                <div key={post.$id} className='p-2 w-1/4'>
                    <PostCard post={post}/>
                </div>
            })}
        </Container>
    </div>
   )
  }
