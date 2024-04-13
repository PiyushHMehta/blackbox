import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'

export default function SpecificTechPage() {
    const { id } = useParams()
    // console.log(id);
    const [tech, setTech] = useState(null)
    const [linkTitles, setLinkTitles] = useState({});

    useEffect(() => {
        if (!id) return;
        axios.get(`/tech/${id}`).then(res => {
            setTech(res.data)
            fetchLinkTitles(res.data.additionalLinks)
        })
    }, [id])

    const fetchLinkTitles = async (links) => {
        try {
            const titlePromises = links.map(async (link) => {
                const response = await axios.get('/fetch-title', {
                    params: { url: link }
                });
                return { link, title: response.data.title };
            });
            const titles = await Promise.all(titlePromises);
            const titlesMap = titles.reduce((acc, { link, title }) => {
                acc[link] = title || 'Title not found';
                return acc;
            }, {});
            setLinkTitles(titlesMap);
        } catch (error) {
            console.error('Error fetching titles:', error);
            // Handle error state
        }
    }


    if (!tech) {
        return <div>Loading...</div>;
    }

    return (
        <div className='p-4 text-left flex gap-16 grow'>
            <div className='flex flex-col items-center justify-center gap-4'>
                <div className='text-2xl mb-2 text-blue-500'>{tech.title}</div>
                <div>
                    {tech.photos?.[0] && (
                        <img className="w-[200px] object-cover aspect-square"
                            src={'http://localhost:4000/uploads/' + tech.photos[0]} />
                    )}
                </div>
            </div>

            <div>
                {tech.additionalLinks && tech.additionalLinks.map((link, index) => (
                    <div className='flex gap-2 items-center'>
                        <a key={index} className='text-blue-500 block mb-2' href={link} target="_blank" rel="noopener noreferrer">
                            {`${index + 1}. ` + linkTitles[link]}
                        </a>
                    </div>
                ))}
            </div>
        </div>
    )
}
