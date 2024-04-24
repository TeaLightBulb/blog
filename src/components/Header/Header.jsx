import React from 'react'
import { Container } from '../container/Container'
import { Logo } from '../Logo'
import { LogoutBtn } from '../LogoutBtn'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Login from '../Login'
import Signup from '../Signup'
function Header() {
  const authStatus = useSelector((state) => (state.auth.status));
  const navigate = useNavigate()
  const navItems = [
    {
      name: 'Home',
      slug: "/",
      active: true,
    }, 
    {
      name: "Login",
      slug: "/login",
      active: !authStatus,
      component: <Login />
  },
  {
      name: "Signup",
      slug: "/signup",
      active: true,
  },
  {
      name: "All Posts",
      slug: "/all-posts",
      active: authStatus,
  },
  {
      name: "Add Post",
      slug: "/add-post",
      active: authStatus,
  },
]


  return (
    <div className='py-3 shadow bg-gray-500'>
      <Container>
        {/* <Login /> */}
        {/* <Signup /> */}
        <nav className='flex'>
          <div className='mr-4'>
            <Link to='/'>
              <Logo width='70px'   />
            </Link>
          </div>
          <ul className='flex ml-auto'>
            {navItems.map((item) => 
            item.active ? (
              <li key={item.name}>
                <button
                onClick={() => {navigate(item.slug)
                console.log(`navigated to ${item.slug}`);}}
                className='inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full'
                >{item.name}</button>
              </li>
            ) : null
            )}
            {authStatus && (
              <li>
                <LogoutBtn />
              </li>
            )} 
          </ul>
        </nav>
      </Container>
    </div>
  )


/*  test  */
// const users = [
//   {
//     name: "jhon",
//     age: 1
//   },
//   {
//     name: "janerey",
//     age: 2
//   },
//   {
//     name: "jhon",
//     age: 3
//   },
// ];
// return (
//   <div>
//     <Container>
//       {
//       navItems.map( (item) => (
//         <p>{item.name}</p>
//       ))
//     }
//     </Container>
    
//   </div>
// )
}

export default Header