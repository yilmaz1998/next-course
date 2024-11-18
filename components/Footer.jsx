import React from 'react'

const Footer = () => {
  const currentDate = new Date().toDateString()

  return (
    <div>
      Footer {currentDate}
    </div>
  )
}

export default Footer
