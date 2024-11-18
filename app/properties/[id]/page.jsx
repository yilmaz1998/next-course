import connectDB from "@/config/database";
import Property from "@/models/Property";
import Image from "next/image";
import Link from "next/link";
import BookmarkButton from "@/components/BookmarkButton";
import ShareButtons from "@/components/ShareButtons";
import ContactForm from "@/components/ContactForm";
import { convertToSerializableObject } from "@/utils/convertToObject";


async function propertypage ({params}) {
  const { id } = await params
  await connectDB()
  const properties = await Property.findById(id).lean()

  const property = convertToSerializableObject(properties)
  
  
  return (
    <div className="flex">
      <div className="w-2/3 text-center">
      <h1>{property.name}</h1>
      <div className="flex justify-center items-center">
      <img
      src={property.photo} 
      alt={property.name}
      width={220} 
      height={300} 
    /></div>
    <h1>Years in Office: {property.yearsInOffice}</h1>
    <h1>Vice President: {Array.isArray(property.vicePresidents) 
    ? property.vicePresidents.join(', ') 
    : property.vicePresidents}</h1>
    <Link href='/properties'> Go Back</Link>
    </div>
    <div className="w-1/3">
      <BookmarkButton property={property} />
      <ShareButtons property={property} />
      <ContactForm property={property} />
    </div>
    </div>
  )
}

export default propertypage