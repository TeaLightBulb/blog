import React from 'react'
import Postform from '../components/PostForm/Postform'
import { Container } from '../components/container/Container'

export default function AddPost() {
  return(
    <div className='py-8'>
      <Container >
        <Postform />
      </Container>  
    </div>
   )
  }
