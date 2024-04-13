import React, { useContext, useState } from 'react'
import { UserContext } from '../UserContext'
import { Link, Navigate, useParams } from 'react-router-dom'
import axios from 'axios'
import AddTechPage from './AddTechPage'

export default function AccountPage() {
    const [redirect, setRedirect] = useState(null)
    const { ready, user, setUser } = useContext(UserContext)
    let { subpage } = useParams()
    if (subpage === undefined) {
        subpage = 'profile'
    }

    // console.log(subpage);
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

    function linkClasses(type = null) {
        let className = 'py-2 px-6 text-xl font-medium'
        if (subpage === type) {
            className += ' bg-white text-black rounded-md'
        }
        return className
    }

    return (
        <div className='flex flex-col grow'>
            <nav className='w-full flex gap-2 mt-4 mb-8 justify-center'>
                <Link to={'/account'} className={linkClasses('profile')}>
                    My profile
                </Link>
                {user.name === 'admin' && (
                    <Link to={'/account/techstack'} className={linkClasses('techstack')}>
                        Add
                    </Link>
                )}

            </nav>
            {subpage === 'profile' && (
                <div className='text-center max-w-60 mx-auto flex flex-col gap-2'>
                    <span>Logged in as {user.name} ({user.email})</span>
                    <button onClick={logout}>
                        Logout
                    </button>
                </div>
            )}
            {subpage === 'techstack' && (
                <AddTechPage />
            )}
        </div>
    )
}
