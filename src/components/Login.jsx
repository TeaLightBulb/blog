import React, {useState}from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import {useForm} from 'react-hook-form'
import Button from './Button.jsx'
import Input from './Input.jsx'
import { Logo } from './Logo'
import { login as storeLogin} from '../features/authentication/authslice'
import authService from '../appwriteReasouces/auth_service'


export default function Login() {
const dispatch = useDispatch();
const navigate = useNavigate();
const [error, setError] = useState(null)
const {register, handleSubmit} = useForm()

const login = async(data) => {
    setError("")
    try {
        const session = await authService.login(data)
        console.log(session);
        if (session)  {
            const userData = await authService.getcurrentUser()
            console.log("userdata collected");
            if (userData) {
                dispatch(storeLogin(userData))
                navigate('/')
            }
        }
    } catch (error) {
        setError(error.message)
        console.log(error.message);
    }
}

  return(
    <div
    className='flex items-center justify-center w-full'
    >
        <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>
            <div className="mb-2 flex justify-center">
                        <span className="inline-block w-full max-w-[100px]">
                            <Logo width="100%" />
                        </span>
            </div>
            <h2 className="text-center text-2xl font-bold leading-tight">Sign in to your account</h2>
            <p className="mt-2 text-center text-base text-black/60">
                Don&apos;t have any account?&nbsp;
                <Link
                    to="/signup"
                    className="font-medium text-primary transition-all duration-200 hover:underline"
                >
                    Sign Up
                </Link>
            </p>
            {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
            <form  onSubmit={handleSubmit(login)}>
                <div>
                    <Input 
                    label = 'email'
                    placeholder = 'Enter your Email Add. '
                    type = 'email'
                    {...register('email',{
                        required : true,
                        validate:{
                            matchPatern: (value) => /^((?!\.)[\w\-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/.test(value) || "Email address must be valid",
                        }
                    }
                    )}/>

                    <Input 
                    label = 'password'
                    placeholder = 'Enter your Password'
                    type = 'password'
                    {...register('password', {
                        required: true,
                    })}/>

                    <Button childern='Signin' type="submit" className = 'w-full'>Signin</Button>
                </div>
            </form>
        </div>
        
    </div>
   )
}
