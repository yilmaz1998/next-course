import connectDB from '@/config/database'
import Link from 'next/link'
import Property from '@/models/Property'
import Pagination from '@/components/Pagination'

const properties = async ({ searchParams }) => {

  const { page = 1, pageSize = 12 } = await searchParams;
  await connectDB()
  const skip = (page - 1) * pageSize
  const total = await Property.countDocuments({})
  const data = await Property.find({}).skip(skip).limit(pageSize)

  return (
    <section className='px-4 py-6'>
      <div className='container-xl lg:container m-auto px-4 py-6'>
        { data.length === 0 ? (<p>No properties found</p>) : (
          <div className='grid grid-cols-1 md:grid-cols-3 gap-10'>
            {
              data.map((property) => (
                <div key={property._id}>
                  <Link href={`/properties/${property._id}`}>{property.name}</Link></div>
              ))
            }
          </div>
        )}
      </div>
      <Pagination page={parseInt(page)} pageSize={parseInt(pageSize)} totalItems={total}/>
    </section>
  )
}

export default properties