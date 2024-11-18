import connectDB from "@/config/database"
import Property from "@/models/Property"
import { getSessionUser } from "@/utils/getSessionUser"
import ProfileProperties from "@/components/ProfileProperties"
import { convertToSerializableObject } from "@/utils/convertToObject"

const ProfilePage = async () => {
  await connectDB()

  const sessionUser = await getSessionUser()

  const { userId } = sessionUser

  const propertiesDoc = await Property.find({owner: userId}).lean()

  const properties = propertiesDoc.map(convertToSerializableObject)

  return (
    <div className="flex">
      <div className="text-center w-1/2 bg-white px-6 py-8 mb-4 shadow-md rounded-md borber m-4 md:m-0">
        <h1 className="mb-3 text-2xl text-bold">Your Profile</h1>
        <div className="flex justify-center items-center">
        <img className="rounded-full w-24 h-24" src={sessionUser.user.image} alt="Profile Image" />
        </div>
        <h1 className="mt-2">Name:{sessionUser.user.name}</h1>
        <h1 className="mt-1">Email: {sessionUser.user.email}</h1>
      </div>
      <div className="text-center w-1/2">
        Your Listings
        <ProfileProperties properties={properties}/>
      </div>
    </div>
  )
}

export default ProfilePage