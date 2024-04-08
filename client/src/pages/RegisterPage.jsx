import React from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useState } from 'react'

export default function RegisterPage() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    async function registerUser(ev) {
        ev.preventDefault()
        try {
            await axios.post('/register', {
                name, 
                email,
                password,
            })
            alert('Registration successful, now you may login!')
        } catch(e) {
            alert('Registration failed, please try again later.')
        }
    }

    return (
        <div className='mt-4 grow flex items-center mx-auto mb-20'>
            <div>
                <h1 className='text-4xl text-center mb-4'>Register

                </h1>
                <form onSubmit={registerUser}
                    className='max-w-md mx-auto'>
                    <input type="text" placeholder='John Doe'
                        value={name} onChange={ev => setName(ev.target.value)} />
                    <input type="email" placeholder='your@email.com'
                        value={email} onChange={ev => setEmail(ev.target.value)} />
                    <input type="password" placeholder='password'
                        value={password} onChange={ev => setPassword(ev.target.value)} />
                    <button className='mt-1'>Register</button>
                    <div className='text-center py-2'>Already a member?&thinsp;
                        <Link to={'/login'} className='text-blue-500 font-semibold'>Login here</Link>
                    </div>
                </form>
            </div>
        </div>
    )
}
