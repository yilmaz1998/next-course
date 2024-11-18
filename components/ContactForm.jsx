'use client'
import {useActionState} from 'react'
import { useSession } from "next-auth/react"
import addMessage from "@/actions/addMessage"

const ContactForm = ({ property }) => {
  const { data: session } = useSession()

  const [state, formAction] = useActionState(addMessage, {})

  if(state.submitted === true) {
    return (
      <p className="text-green-500 mb-4">Your message has been sent.</p>
    )
  }

  return session && (
    <div>
    <h1 className='text-2xl text-center mt-4'>Send a Message to the owner</h1>
    <form action={formAction}>

      <input type='hidden' name='property'id='property' defaultValue={property._id} />
      <input type='hidden' name='recipient'id='recipient' defaultValue={property.owner} />
      <input
  type="text"
  name="name"
  placeholder="Name"
  required
  className="w-full p-2 border border-gray-300 rounded mb-2"
/>

<input
  type="text"
  name="email"
  placeholder="Email"
  required
  className="w-full p-2 border border-gray-300 rounded mb-2"
/>

<input
  type="text"
  name="phone"
  placeholder="Phone Number"
  required
  className="w-full p-2 border border-gray-300 rounded mb-2"
/>

<textarea
  name="message"
  id='message'
  placeholder="Message"
  required
  className="w-full p-2 border border-gray-300 rounded mb-2"
/>
<button type="submit" className="w-1/2 p-2 bg-blue-500 text-white rounded hover:bg-blue-600">
        Submit
      </button>

</form></div>
  )
}

export default ContactForm