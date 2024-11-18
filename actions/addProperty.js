'use server'
import connectDB from "@/config/database"
import Property from "@/models/Property"
import { getSessionUser } from "@/utils/getSessionUser"
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

async function addProperty(formData) {
    await connectDB()

    const sessionUser = await getSessionUser()

    if(!sessionUser || !sessionUser.userId){
        throw new Error('User ID is required.')
    }

    const { userId } = sessionUser


    
    const propertyData = {
        owner: userId,
        ordinal: formData.get('ordinal'),
        name: formData.get('name'),
        yearsInOffice: formData.get('yearsInOffice'),
        vicePresidents: formData.get('vicePresidents'),
        photo: formData.get('photo')
    }
    console.log(propertyData)
    const newProperty = new Property(propertyData)
    await newProperty.save()

    revalidatePath('/', 'layout')
    redirect(`/properties/${newProperty._id}`)
}

export default addProperty