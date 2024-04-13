import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Navigate, useParams } from 'react-router-dom'


export default function AddTechPage() {
    const { id } = useParams()
    const [title, setTitle] = useState('')
    const [addedPhotos, setAddedPhotos] = useState([])
    const [docs, setDocs] = useState('')
    const [installation, setInstallation] = useState('')
    const [redirect, setRedirect] = useState('')
    const [link, setLink] = useState('')
    const [additionalLinks, setAdditionalLinks] = useState([])

    useEffect(() => {
        if (!id) return;
        axios.get('/account/techstack/' + id).then(res => {
            const { data } = res
            setTitle(data.title)
            setAddedPhotos(data.photos)
            setDocs(data.docs)
            setInstallation(data.installation)
            setAdditionalLinks(data.additionalLinks)
        })
    }, [id])

    async function addExtraLinks(ev) {
        ev.preventDefault()
        setAdditionalLinks(prev => {
            return [...prev, link]
        })
        setLink('')
    }

    function uploadPhoto(ev) {
        const files = ev.target.files
        const data = new FormData()
        for (let i = 0; i < files.length; i++) {
            data.append('photos', files[i])
        }
        axios.post('/upload', data, {
            headers: {
                "Content-Type": 'multipart/form-data'
            }
        }).then(response => {
            const { data: filename } = response
            setAddedPhotos(prev => {
                return [...prev, filename]
            })
        })
    }

    async function saveNewTech(ev) {
        ev.preventDefault()
        if (id) {
            // update
            await axios.put('/tech', { id, title, addedPhotos, docs, installation, additionalLinks })
            setRedirect('/account')
        } else {
            // new 
            const { data } = await axios.post('/tech', { title, addedPhotos, docs, installation, additionalLinks })
            setRedirect('/account')
        }

    }

    if (redirect) {
        return <Navigate to={redirect} />
    }

    return (
        <div>
            <form onSubmit={saveNewTech}
                className='flex flex-col gap-2'>
                <input type="text" placeholder='Name of the technology' value={title}
                    onChange={ev => setTitle(ev.target.value)} />

                <div className='grid grid-cols-4 gap-4'>
                    {addedPhotos.length > 0 && addedPhotos.map(link => (
                        <div key={link}>
                            <img src={"http://localhost:4000/uploads/" + link} alt="image" />
                        </div>
                    ))}
                    <label className='w-60 px-4 py-8 text-2xl flex items-center justify-center gap-2 cursor-pointer bg-black border border-whiterounded-sm shadow shadow-yellow-500'>
                        <input type="file" multiple className='hidden' onChange={uploadPhoto} />
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0 3 3m-3-3-3 3M6.75 19.5a4.5 4.5 0 0 1-1.41-8.775 5.25 5.25 0 0 1 10.233-2.33 3 3 0 0 1 3.758 3.848A3.752 3.752 0 0 1 18 19.5H6.75Z" />
                        </svg>
                        Upload
                    </label>
                </div>

                <input type="text" placeholder='Link to the documentation page' value={docs}
                    onChange={ev => setDocs(ev.target.value)} />

                <input type="text" placeholder='Link to the installation page'
                    value={installation} onChange={ev => setInstallation(ev.target.value)} />

                <div className='flex gap-2 items-center'>
                    <input type="text" placeholder='Additional links' value={link} onChange={ev => setLink(ev.target.value)} />
                    <button className='w-60 h-11' onClick={addExtraLinks}>Add</button>
                </div>

                <button className='w-60 mx-auto mt-4'>Save & Update</button>
            </form>
        </div>
    )
}