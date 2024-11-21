'use server'
import connectDB from "@/config/database"
import Property from "@/models/Property"
import Message from "@/models/Message"
import { getSessionUser } from "@/utils/getSessionUser"
import { revalidatePath } from "next/cache"

async function deleteProperty(PropertyId) {
    const sessionUser = await getSessionUser()

    if(!sessionUser || !sessionUser.userId) {
        throw new Error('User Id is required.')
    }

    const { userId } = sessionUser

    const property = await Property.findById(PropertyId)

    if(!property) throw new Error('Property not found.')

    if (property.owner.toString() !== userId) {
        throw new Error('Unauthorized.')
    }

    await Message.deleteMany({ property: PropertyId });

    await property.deleteOne()
    revalidatePath('/', 'layout')
}

export default deleteProperty