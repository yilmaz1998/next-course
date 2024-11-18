import connectDB from '@/config/database'
import Message from '@/models/Message'
import '@/models/Property'
import { convertToSerializableObject } from '@/utils/convertToObject'
import { getSessionUser } from '@/utils/getSessionUser'
import DeleteMessage from '@/components/DeleteMessage'

const Messages = async () => {
  await connectDB()

  const sessionUser = await getSessionUser()
  const { userId } = sessionUser

  const readMessages = await Message.find({ recipient: userId, read: true })
    .populate('sender', 'username')
    .populate('property', 'name')
    .lean()

  const unReadMessages = await Message.find({ recipient: userId, read: false })
    .populate('sender', 'username')
    .populate('property', 'name')
    .lean()

  const messages = [...readMessages, ...unReadMessages].map((messageDoc) => {
    const message = convertToSerializableObject(messageDoc)
    message.sender = convertToSerializableObject(messageDoc.sender)
    message.property = convertToSerializableObject(messageDoc.property)
    return message
  })

  return (
    <section className="bg-blue-50">
      <div className="container m-auto py-24 max-w-6xl">
        <div className="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">
          <h1 className="text-3xl font-bold mb-4">Your Messages</h1>
          <div className="space-y-4">
            {messages.length === 0 ? (
              <p>You have no messages</p>
            ) : (
              messages.map((message) => (
                <div key={message._id}>
                  <h3><span className='text-blue-500 mt-2'>Property Name: </span>{message.property.name}</h3>
                  <h3><span className='text-blue-500 mt-2'>Sender: </span>{message.sender.username}</h3>
                  <p>{message.message}</p>
                  <h3>
                    <span className='text-blue-500 mt-2'>Sender Phone: </span>
                    <a href={`tel:${message.phone}`}>
                      {message.phone}
                    </a>
                  </h3>
                  <h3>
                    <span className='text-blue-500 mt-2'>Sender Email: </span>
                    <a href={`mailto:${message.email}`}>
                      {message.email}
                    </a>
                  </h3>
                  <p className="text-gray-500 text-sm mt-2">Recieved: {new Date(message.createdAt).toLocaleDateString()}</p>
                <DeleteMessage message={message} />
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Messages
