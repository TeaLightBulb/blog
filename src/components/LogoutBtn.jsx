import React from 'react'
import {useDispatch} from 'react-redux'
import authService from '../appwriteReasouces/auth_service.js'
import logout from '../appwriteReasouces/auth_service.js'
export const LogoutBtn = (props) => {

  const dispatch = useDispatch()
  const logoutHandler = () => {
    authService.logout()
      .then( () => {
        dispatch(logout())
      })
  } 
  return(
    <button onClick={logoutHandler}>Logout</button>
   )
  }
