import React, { useContext, useState } from 'react'
import { UserContext } from '../UserContext'
import { Navigate } from 'react-router-dom'
import axios from 'axios'

export default function AccountPage() {
    const [redirect, setRedirect] = useState(null)
    const { ready, user, setUser } = useContext(UserContext)
    if (ready && !user && !redirect) {
        return <Navigate to={'/login'} />
    }
    if (!ready) {
        return 'Loading...'
    }

    async function logout() {
        await axios.post('/logout')
        setRedirect('/')
        setUser(null)
    }

    if (redirect) {
        return (
            <Navigate to={redirect} />
        )
    }

    return (
        <div className='w-60 flex flex-col grow mx-auto justify-center items-center gap-4 mb-12 text-xl'>
            <span>Logged in as {user.name}</span>
            <button onClick={logout}>Logout</button>
        </div>
    )
}
