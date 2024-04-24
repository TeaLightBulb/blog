import React, {useEffect, useState} from 'react'
import service from '../appwriteReasouces/appwrite_config'
import { Container } from '../components/container/Container'

export default function Home() {
    console.log("home is running")
    const [posts, setPosts] = useState([])
    useEffect(() => {
        service.getAllPost().then( (posts) => {
            if (posts) {
                setPosts(posts.documents)
            }
        })
    }, [])
  if (posts.length === 0 ) {
    return ( <h3>Login to read posts</h3>)
  }
  else{
    <div className='w-full py-8'>
        <Container>
            <div className='flex flex-wrap'>
            {posts.map( (post) => {
                <div key={post.$id} className='p-2 w-1/4'>
                    <PostCard {...post}/>
                </div>
            })}
            </div>
        </Container>
    </div>
  }
  }
