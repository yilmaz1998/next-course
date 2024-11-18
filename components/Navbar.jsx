'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { signIn, signOut, useSession, getProviders } from 'next-auth/react'

const Navbar = () => {
  const { data: session } = useSession()
  const profileImage = session?.user?.image
  const userName = session?.user?.name

  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [providers, setProviders] = useState(null)


  const pathname = usePathname()

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen)
  }

  useEffect(() => {
    const setAuthProviders = async () => {
      const res = await getProviders()
      setProviders(res)
    }
    setAuthProviders()
  }, [])

  return (
    <>
      <nav className="bg-blue-600 text-white px-6 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">MyApp</h1>
        {session ? (<h1 className="text-xl">Welcome <span>{userName}</span> </h1>) : (<h1 className="text-xl">Welcome Guest </h1>)}
        
        <div className="md:hidden">
          <button onClick={toggleSidebar} className="text-lg">
            {sidebarOpen ? 'Close' : 'Open'}
          </button>
        </div>
        <div className="hidden md:flex gap-6">
          <Link href="/" className={`${pathname === '/' ? 'text-black' : ''} "hover:text-gray-300"`}>Home</Link>
          <Link href="/properties" className={`${pathname === '/properties' ? 'text-black' : ''} "hover:text-gray-300"`}>Properties</Link>
          <Link href="/properties/add" className={`${pathname === '/properties/add' ? 'text-black' : ''} "hover:text-gray-300"`}>Add Properties</Link>
          <Link href='/properties/saved'className={`${pathname === '/properties/saved' ? 'text-black' : ''} "hover:text-gray-300"`}>Saved Properties</Link>
          <Link href='/profile'className={`${pathname === '/profile' ? 'text-black' : ''} "hover:text-gray-300"`}>Profile</Link>
          <Link href='/messages'className={`${pathname === '/messages' ? 'text-black' : ''} "hover:text-gray-300"`}>Messages</Link>
          

          {session ? (
            <div className='flex'>
            <button onClick={() => signOut()} className="hover:text-gray-300">
              Sign Out
            </button>
                        <Image
                        src={profileImage}
                        width={20} 
                        height={10}
                        alt=''
                        className='ml-2' 
                      />
                      </div>
          ) : (
            providers && Object.values(providers).map((provider) => (
              <button 
                key={provider.name} 
                onClick={() => signIn(provider.id)} 
                className="hover:text-gray-300"
              >
                Log in or Register
              </button>
            ))
          )}
        </div>
      </nav>


      <div
        className={`fixed top-0 right-0 h-full w-64 bg-blue-700 text-white transform ${
          sidebarOpen ? 'translate-x-0' : 'translate-x-full'
        } transition-transform duration-300 ease-in-out md:hidden`}
      >
        <button
          className="absolute top-4 right-4 text-lg"
          onClick={toggleSidebar}
        >
          Close
        </button>
        <div className="mt-16 flex flex-col gap-6 p-6">
          <Link href="/" className={`${pathname === '/' ? 'text-black' : ''} "hover:text-gray-300"`} onClick={toggleSidebar}>Home</Link>
          <Link href="/properties" className={`${pathname === '/properties' ? 'text-black' : ''} "hover:text-gray-300"`} onClick={toggleSidebar}>Properties</Link>
          <Link href="/properties/add" className={`${pathname === '/properties/add' ? 'text-black' : ''} "hover:text-gray-300"`} onClick={toggleSidebar}>Add Properties</Link>
          <Link href='/properties/saved'className={`${pathname === '/properties/saved' ? 'text-black' : ''} "hover:text-gray-300"`}>Saved Properties</Link>
          <Link href='/profile' className={`${pathname === '/profile' ? 'text-black' : ''} "hover:text-gray-300"`} onClick={toggleSidebar}>Profile</Link>
          <Link href='/messages'className={`${pathname === '/messages' ? 'text-black' : ''} "hover:text-gray-300"`}>Messages</Link>

          {session ? (
          <div>
            <button onClick={() => signOut()} className="hover:text-gray-300">
              Sign Out
            </button>
            <Image
              src={profileImage}
              width={220} 
              height={300}
              alt='' 
            />
            </div>
          ) : (
            providers && Object.values(providers).map((provider) => (
              <button 
                key={provider.name} 
                onClick={() => signIn(provider.id)} 
                className="hover:text-gray-300"
              >
                Log in or Register
              </button>
            ))
          )}
        </div>
      </div>
    </>
  )
}

export default Navbar