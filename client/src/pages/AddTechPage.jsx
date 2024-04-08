import React, { useState } from 'react'
import axios from 'axios'
import { Navigate } from 'react-router-dom'

export default function AddTechPage() {
    const [title, setTitle] = useState('')
    const [addedPhotos, setAddedPhotos] = useState([])
    const [photoLink, setPhotoLink] = useState('')
    const [docs, setDocs] = useState('')
    const [installation, setInstallation] = useState('')
    const [redirect, setRedirect] = useState('')

    async function addPhotoByLink(ev) {
        ev.preventDefault()
        const { data: filename } = await axios.post('/upload-by-link', { link: photoLink })
        setAddedPhotos(prev => {
            return [...prev, filename]
        })
        console.log(addedPhotos);
        setPhotoLink('')
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

    async function addNewTech(ev) {
        ev.preventDefault()
        const { data } = await axios.post('/tech', { title, addedPhotos, docs, installation })
        setRedirect('/account')
    }

    if (redirect) {
        return <Navigate to={redirect} />
    }

    return (
        <div>
            <form onSubmit={addNewTech}
                className='flex flex-col gap-2'>
                <input type="text" placeholder='Name of the technology' value={title}
                    onChange={ev => setTitle(ev.target.value)} />

                <div className='flex gap-2 items-center'>
                    <input type="text" placeholder='Add logo using link' value={photoLink} onChange={ev => setPhotoLink(ev.target.value)} />
                    <button className='w-60 h-11' onClick={addPhotoByLink}>Add</button>
                </div>

                <div className='grid grid-cols-4 gap-4'>
                    {addedPhotos.length > 0 && addedPhotos.map(link => (
                        <div key={link}>
                            <img src={"http://localhost:4000/uploads/" + link} alt="image" />
                            {/* {link} */}
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

                <button className='w-60 mx-auto mt-4'>Save & Update</button>
            </form>
        </div>
    )
}