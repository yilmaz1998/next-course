'use client'
import { useState, useEffect } from 'react'
import checkBookmarkStatus from '@/actions/checkBookmarkStatus'
import bookmarkProperty from '@/actions/bookmarkProperty'
import { useSession } from 'next-auth/react'


const BookmarkButton = ({ property }) => {
  const{data: session} = useSession()
  const [error, setError] = useState('')
  const [isBookmarked, setIsBookmarked] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const userId = session?.user?.id

  useEffect(() => {
    if (!userId) {
      setIsLoading(false)
      return
    }

    checkBookmarkStatus(property._id).then((res) => {
      if(res.error) setError(res.error)
      if(res.isBookmarked) setIsBookmarked(res.isBookmarked)
      setIsLoading(false)
    })
  }, [property._id, userId])

  
  const handleClick = async () => {

    if(!userId) {
      alert('You need to be signed in.') 
    }

    bookmarkProperty(property._id).then((res) => {
      if(res.error) return setError(res.error)
      setIsBookmarked(res.isBookmarked)
      setError(res.message)
     })
  }

  if(isLoading) {
    return <p className="text-center">Loading...</p>
  }

  return isBookmarked ? (
    <div>
       <button onClick={handleClick} className="w-1/2 p-2 mt-3 bg-red-700 text-white rounded hover:bg-red-800">Remove Property</button>
        {error && <p className="mt-2 text-red-500">{error}</p>}
    </div>
  ) : (
    <div>
  <button onClick={handleClick} className="w-1/2 p-2 mt-3 bg-yellow-700 text-white rounded hover:bg-yellow-800">Bookmark Property</button>
  {error && <p className="mt-2 text-red-500">{error}</p>}
  </div>

)
}

export default BookmarkButton