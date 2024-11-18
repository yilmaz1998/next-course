'use client'
import { useState } from "react"
import deleteMessage from "@/actions/deleteMessage"

const DeleteMessage = ({ message }) => {

    const [isDelete, setIsDelete] = useState(false)

    const handleDelete = async (messageId) => {
        await deleteMessage(messageId)
        setIsDelete(true)
    }
  return (
    <div>
        <button onClick={() => handleDelete(message._id)} className='mt-4 mr-3 bg-red-500 text-white py-1 px-3 rounded-md'>Delete</button> 
    </div>
  )
}

export default DeleteMessage