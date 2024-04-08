import React, { useContext, useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import axios from 'axios'
import { UserContext } from '../UserContext'

export default function LoginPage() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [redirect, setRedirect] = useState(false)
    const {setUser} = useContext(UserContext)

    async function loginUser(ev) {
        ev.preventDefault()
        try {
            const {data} = await axios.post('/login', {
                email,
                password,
            })
            setUser(data)
            alert('Login successful.')
            setRedirect(true)
        } catch(e) {
            alert('Login failed, try again.')
        }
    }

    if(redirect) {
        return (
            <Navigate to={'/'} />
        )
    }

    return (
        <div className='mt-4 grow flex items-center mx-auto mb-20'>
            <div>
                <h1 className='text-4xl text-center mb-4'>Login</h1>
                <form onSubmit={loginUser}
                    className='max-w-md mx-auto'>
                    <input type="email" placeholder='your@email.com'
                        value={email} onChange={ev => setEmail(ev.target.value)} />
                    <input type="password" placeholder='password'
                        value={password} onChange={ev => setPassword(ev.target.value)} />
                    <button className='mt-1'>Login</button>
                    <div className='text-center py-2'>Don't have an account yet?&thinsp;
                        <Link to={'/register'} className='text-blue-500 font-semibold'>Register Now</Link>
                    </div>
                </form>
            </div>
        </div>
    )
}
