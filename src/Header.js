import React from 'react'
import{FaTabletAlt,FaLaptop} from "react-icons/fa"

const Header = ({title,width}) => {
  return (
    <div className='Header'>
    <h2>{title}</h2>
    {width<768 ? <FaTabletAlt/>:<FaLaptop/>}
    </div>
  )
  
}

export default Header