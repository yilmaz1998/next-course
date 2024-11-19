'use client'

import { SessionProvider } from 'next-auth/react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import '@/styles/style.css'

export const metadata = {
  title: 'Course',
};

const Layout = ({ children }) => {
  return (
    <SessionProvider>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </SessionProvider>
  )
}

export default Layout
