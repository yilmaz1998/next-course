'use server'
import connectDB from "@/config/database"
import Property from "@/models/Property"
import { getSessionUser } from "@/utils/getSessionUser"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"


async function editProperty (propertyId, formData) {
    await connectDB()

    const sessionUser = await getSessionUser()

    if(!sessionUser || !sessionUser.userId){
        throw new Error('User ID is required.')
    }

    const { userId } = sessionUser


    const existingProperty = await Property.findById(propertyId)

    if(existingProperty.owner.toString() !== userId) {
        throw new Error('Unauthorized.')
    }


    const propertyData = {
        owner: userId,
        ordinal: formData.get('ordinal'),
        name: formData.get('name'),
        yearsInOffice: formData.get('yearsInOffice'),
        vicePresidents: formData.get('vicePresidents'),
        photo: formData.get('photo')
    }

    const updatedProperty = await Property.findByIdAndUpdate(propertyId, propertyData)

    revalidatePath('/', 'layout')
    redirect(`/properties/${updatedProperty._id.toString()}`)

}

export default editProperty
