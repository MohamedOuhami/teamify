import Link from 'next/link'
import React from 'react'

const Nav = () => {
    return (
        <nav className="flex flex-row justify-between">
            <div className='appTitle'>Teamify</div>
            <nav className='flex justify-between'>
                <Link className='mx-2' href='/about-us'>About us</Link>
                <Link className='mx-2' href='/blog'>Blog</Link>
                <Link className='mx-2' href='/Docs'>Docs</Link>

                <Link className='mx-2' href='/api/auth/signup'>Sign in</Link>
                <Link className='mx-2' href='/api/auth/login'>Start for free</Link>                
            </nav>
        </nav>
    )
}

export default Nav
