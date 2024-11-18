import React from 'react'
import connectDB from '@/config/database'
import User from '@/models/User'
import { getSessionUser } from '@/utils/getSessionUser'


const SavedProperties = async () => {

    const { userId } = await getSessionUser()

    const { bookmarks } = await User.findById(userId).populate('bookmarks')

    console.log(bookmarks)
  return ( 
    <div>
     <h1 className='text-center text-2xl'>Saved Properties</h1>
    <div className='container-xl lg:container m-auto px-4 py-6'>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
    {bookmarks.map((bookmark) => {
      return (
    <div key={bookmark._id} className="border p-4 rounded shadow-md">
      <h1 className="font-semibold text-lg">{bookmark.name}</h1>
      {bookmark.photo && (
              <img src={bookmark.photo} alt={`${bookmark.name} photo`} className="w-1/2 object-cover rounded mt-2" />
            )}
            <p className="mt-2">Years in Office: {bookmark.yearsInOffice}</p>
            {bookmark.vicePresidents && (
              <p className="mt-1">Vice Presidents: {bookmark.vicePresidents.join(', ')}</p>
            )}
    </div>
  )
})}
    </div>
    </div></div>
  )
}

export default SavedProperties