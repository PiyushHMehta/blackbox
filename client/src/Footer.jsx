import React from 'react'
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';
import { MdMail } from 'react-icons/md';

export default function Footer() {
    return (
        <div className='mt-16 border-gray-800 border-t-[0.1px]'>
            <div className='text-xl font-extralight text-center mt-4'>
                Streamlining Your Development Experience
            </div>
            <div className='flex justify-around items-center mt-4  text-gray-700'>
                <div className='flex items-center justify-center gap-1'>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-12 h-12 text-white">
                        <path d="M11.644 1.59a.75.75 0 0 1 .712 0l9.75 5.25a.75.75 0 0 1 0 1.32l-9.75 5.25a.75.75 0 0 1-.712 0l-9.75-5.25a.75.75 0 0 1 0-1.32l9.75-5.25Z" />
                        <path d="m3.265 10.602 7.668 4.129a2.25 2.25 0 0 0 2.134 0l7.668-4.13 1.37.739a.75.75 0 0 1 0 1.32l-9.75 5.25a.75.75 0 0 1-.71 0l-9.75-5.25a.75.75 0 0 1 0-1.32l1.37-.738Z" />
                        <path d="m10.933 19.231-7.668-4.13-1.37.739a.75.75 0 0 0 0 1.32l9.75 5.25c.221.12.489.12.71 0l9.75-5.25a.75.75 0 0 0 0-1.32l-1.37-.738-7.668 4.13a2.25 2.25 0 0 1-2.134-.001Z" />
                    </svg>
                    <span className='text-2xl text-white'>Blackbox</span>
                </div>
                <div className='cursor-pointer text-md font-semibold'>About</div>
                <div className='cursor-pointer text-md font-semibold'>Support</div>
                <div className='cursor-pointer text-xl flex gap-12'>
                    <a href="https://github.com/PiyushHMehta" target='_blank'><FaGithub /></a>
                    <a href="https://www.linkedin.com/in/piyush-mehta-52a815285/"  target='_blank'><FaLinkedin /></a>
                    <a href="#" target='_blank'><FaTwitter /></a>
                    <a href="mailto:jainpiyush1450@gmail.com" target='_blank'><MdMail /></a>
                </div>
            </div>
        </div>
    )
}
