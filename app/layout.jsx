import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import '@/styles/style.css'
import AuthProvider from '@/components/AuthProvider'

export const metadata = {
  title: 'Course'
}

const layout = ({ children }) => {
  return (
    <AuthProvider>
    <html>
        <body>
          <Navbar />
            <main>
                 {children}
            </main>
            <Footer />
        </body>
    </html>
  </AuthProvider>
  )
}

export default layout