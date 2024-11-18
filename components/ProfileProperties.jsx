'use client'
import Link from "next/link"
import { useState } from "react"
import deleteProperty from "@/actions/deleteProperty"

const ProfileProperties = ({ properties: initialProperties }) => {
  const [properties, setProperties] = useState(initialProperties)

  const handleDeleteProperty = async (propertyId) => {
    const confirmed = window.confirm("Are you sure?")

    if(!confirmed) return

    await deleteProperty(propertyId)

    const updatedProperties = properties.filter((property) => property._id !== propertyId)
    setProperties(updatedProperties)
  }

  return (
    <div className='container-xl lg:container m-auto px-4 py-6'>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        {properties.map((property) => (
          <div key={property._id} className="border p-4 rounded shadow-md">
            <h1 className="font-semibold text-lg">{property.name}</h1>
            {property.photo && (
              <img src={property.photo} alt={`${property.name} photo`} className="w-full h-48 object-cover rounded mt-2" />
            )}
            <p className="mt-2">Years in Office: {property.yearsInOffice}</p>
            {property.vicePresidents && (
              <p className="mt-1">Vice Presidents: {property.vicePresidents.join(', ')}</p>
            )}
            <p className="text-gray-500 text-sm mt-2">Added on: {new Date(property.createdAt).toLocaleDateString()}</p>
            <button onClick={() => handleDeleteProperty(property._id)}>Delete</button>
            <Link href={`/properties/${property._id}/edit`} className="ml-4">Edit</Link>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ProfileProperties

