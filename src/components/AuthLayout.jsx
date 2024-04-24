import React, {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'



export default function Protected ({childern, authentication = true}) {

    const navigate = useNavigate();
    const [loader, setLoader] = useState(true);
    const authStatus = useSelector(state => state.auth.status)

    useEffect(() => {
        if (authentication && authStatus !== authentication) {
            navigate("/login") // user is authenticated
        }else if(!authentication && authStatus !== authentication){
            navigate("/")  // user is not authenticated **navigate to home page**
        }
        setLoader(false)
    }, [authStatus, navigate, authentication])
  return( loader? <h1>Loading...</h1> : <>{childern}</>)
  }
