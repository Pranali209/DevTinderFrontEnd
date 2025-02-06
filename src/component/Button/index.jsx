import React from 'react'

function Button({type= "button" , className="" , text }) {
  return (
    <button type={type} 
    className={`bg-yellow-400  ${className} text-black py-1 px-4  rounded-md focus:outline-none focus:shadow-outline`}>
   {text}
</button>
  )
}

export default Button