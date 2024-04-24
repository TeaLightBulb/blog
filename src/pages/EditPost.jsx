import React, {useEffect} from 'react'
import { Container } from '../components/container/Container'
import PostForm from '../components/PostForm/Postform'
import service from '../appwriteReasouces/appwrite_config'
import { useParams } from 'react-router'
import { useNavigate } from 'react-router'
import PostCard from '../components/PostCard'

export default function EditPost() {

    const [post, setPost] = useState(null)
    const {slug} = useParams()
    const navigate = useNavigate()
    useEffect( () => {
        if (slug) {
            service.getPost(slug).then( (post) => {
                if (post) {
                    setPost(post)
                }
            })
        }else{
            navigate('/')
        }
    }, [slug, navigate])
  return(
    post? (
        <div className='p-8'>
            <Container>
                <PostForm post={post}/>
            </Container>
        </div>
    ) : null
   )
  }
