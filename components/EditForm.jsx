import React from 'react'
import editProperty from '@/actions/editProperty'

const EditForm = ( {propertyDoc }) => {
const editPropertyById = editProperty.bind(null, propertyDoc._id)
  return (
    <form action={editPropertyById}>
            <h2 className='text-3xl mb-5'>Edit President</h2>
            <div>
                <label htmlFor="name">Property Name:</label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    defaultValue={propertyDoc.name}
                    className="border p-2 w-full"
                    required
                />
            </div>
            <div>
                <label htmlFor="yearsInOffice">Years in Office:</label>
                <input
                    type="text"
                    id="yearsInOffice"
                    name="yearsInOffice"
                    defaultValue={propertyDoc.yearsInOffice}
                    className="border p-2 w-full"
                    required
                />
            </div>

            <div>
                <label>Vice Presidents:</label>
                <input
                    type="text"
                    name="vicePresidents"
                    className="border p-2 w-full mb-2"
                    defaultValue={propertyDoc.vicePresidents}
                    required
                />
            </div>
            <div>
                <label htmlFor="photo">Photo URL:</label>
                <input
                    type="text"
                    id="photo"
                    name="photo"
                    defaultValue={propertyDoc.photo}
                    className="border p-2 w-full"
                    required
                />
            </div>
            <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">
                Edit Property
            </button>
        </form>
  )
}

export default EditForm