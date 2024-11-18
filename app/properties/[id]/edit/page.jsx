import React from 'react'
import EditForm from '@/components/EditForm'
import connectDB from '@/config/database'
import Property from '@/models/Property'
import { convertToSerializableObject } from '@/utils/convertToObject'

const EditPage = async ({ params }) => {
    const { id } = await params
    await connectDB()

    const properties = await Property.findById(id).lean()
    const propertyDoc = convertToSerializableObject(properties)
    
  return (
    <section className='bg-blue-50'> 
    <div className="container m-auto max-w-2xl py-24">
        <div className="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">
            <EditForm propertyDoc={propertyDoc} />
        </div>
    </div>
    </section>
  )
}

export default EditPage