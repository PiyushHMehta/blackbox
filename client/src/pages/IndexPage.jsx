import React, { useContext } from 'react'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { UserContext } from '../UserContext'

export default function IndexPage() {
    const [tech, setTech] = useState([])
    const { user } = useContext(UserContext)

    useEffect(() => {
        axios.get('/tech').then(res => {
            setTech(res.data)
        })
    }, [])

    if(!user) {
        return 'Loading...'
    }

    return (
        <div className="mt-8 grid gap-8 gap-row-8 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {tech.length > 0 && (
                tech.map(currentTech => (
                    <div className="my-2 flex flex-col border-2 border-gray-900 rounded-md py-2 px-4" key={currentTech.title}>
                        <Link to={'/tech/' + currentTech._id} className='font-medium text-xl text-center mb-2 underline'>{currentTech.title}</Link>
                        <div className='flex justify-center my-4'>
                            {currentTech.photos?.[0] && (
                                <img className="w-[200px] object-cover aspect-square"
                                    src={'http://localhost:4000/uploads/' + currentTech.photos[0]} />
                            )}
                        </div>
                        <div className='flex justify-evenly items-center'>
                            <a className='text-lg text-blue-500' target="_blank" href={currentTech.docs}>Docs</a>
                            <a className='text-lg text-blue-500' target="_blank" href={currentTech.installation}>Download</a>
                            {user.name === 'admin' && (
                                <Link to={'/account/techstack/' + currentTech._id}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-blue-500">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="m5.25 4.5 7.5 7.5-7.5 7.5m6-15 7.5 7.5-7.5 7.5" />
                                    </svg>
                                </Link>
                            )}
                        </div>
                    </div>
                ))
            )}
        </div>
    )
}
