import React from 'react'
import axios from 'axios'
import { useEffect, useState } from 'react'

export default function IndexPage() {
    const [tech, setTech] = useState([])
    useEffect(() => {
        axios.get('/tech').then(res => {
            setTech(res.data)
        })
    }, [])
    return (
        <div className="mt-8 grid gap-8 gap-row-8 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {tech.length > 0 && (
                tech.map(currentTech => (
                    <div className="my-2 flex flex-col border-2 border-gray-900 rounded-md py-2 px-4" key={currentTech.title}>
                        <h1 className='font-bold text-xl text-center mb-2 text-yellow-400'>{currentTech.title}</h1>
                        <div className='flex justify-center my-4'>
                            {currentTech.photos?.[0] && (
                                <img className="w-[200px] object-cover aspect-square"
                                    src={'http://localhost:4000/uploads/' + currentTech.photos[0]} />
                            )}
                        </div>
                        <div className='flex justify-evenly'>
                            <a className='text-lg text-blue-500 font-semibold' target="_blank" href={currentTech.docs}>Docs</a>
                            <a className='text-lg text-blue-500 font-semibold' target="_blank" href={currentTech?.installation}>Download</a>
                        </div>
                    </div>
                ))
            )}
        </div>
    )
}
