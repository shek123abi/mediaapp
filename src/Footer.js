import React from 'react'
const today=new Date()
const Footer = () => {
  return (
    <footer className='Footer'>
    <div>Copy right {today.getFullYear()}
    </div>
    </footer>
  )
}

export default Footer