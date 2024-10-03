"use client"
import { signIn, signOut, useSession } from 'next-auth/react'
import Link from 'next/link';

const Nav = () => {
    const { data: session } = useSession();

    return (
        <nav className="flex flex-row justify-between">
            <div className='appTitle'>Teamify</div>
            <nav className='flex justify-between'>
                <Link className='mx-2' href='/about-us'>About us</Link>
                <Link className='mx-2' href='/blog'>Blog</Link>
                <Link className='mx-2' href='/Docs'>Docs</Link>

                {!session ? (
                    <>
                        <button className='mx-2' onClick={() => signIn()}>Sign in</button>
                        <button className='mx-2' onClick={() => signIn()}>Start for free</button>
                    </>
                ) : (
                    <button className='mx-2' onClick={() => signOut()}>Sign out</button>
                )}
            </nav>
        </nav>
    )
}


export default Nav
