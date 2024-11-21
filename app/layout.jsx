'use client'

import { SessionProvider } from 'next-auth/react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import '@/styles/style.css'


const Layout = ({ children }) => {
  return (
    <html lang="en">
      <head>
        <title>Course</title>
      </head>
      <body>
        <SessionProvider>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </SessionProvider>
      </body>
    </html>
  )
}

export default Layout
