import React from 'react'
import Header from './Header'
import { Outlet } from 'react-router-dom'
import Footer from './Footer'

export default function Layout() {
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth' 
        })
    }
    return (
        <div className='p-4 flex flex-col min-h-screen bg-black text-white'>
            <Header id={'header'} />
            <Outlet className={'flex grow-1 shrink-0'} />
            <Footer />
            <div className="fixed bottom-4 right-4 text-2xl cursor-pointer" onClick={scrollToTop}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m15 11.25-3-3m0 0-3 3m3-3v7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>
            </div>
        </div>
    )
}
