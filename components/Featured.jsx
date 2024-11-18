import Link from "next/link"
import connectDB from "@/config/database";
import Property from "@/models/Property";

const Featured = async () => {

  await connectDB()

    const featuredProperties = await Property.aggregate([{ $sample: { size: 3 } }])
  return (
    <section className='px-4 py-6'>
    <div className='container-xl lg:container m-auto px-4 py-6'>
      { featuredProperties.length === 0 ? (<p>No properties found</p>) : (
        <div className='grid grid-cols-1 md:grid-cols-3 gap-10'>
          {
            featuredProperties.map((property) => (
              <div key={property._id}>
                <Link href={`/properties/${property._id}`}>{property.name}</Link></div>
            ))
          }
        </div>
      )}
    </div>
  </section>
  )
}

export default Featured