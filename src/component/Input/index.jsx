import React from 'react'

function Input({ type, id, placeholder = "", value , onChange }) {
  return (
    <input
      className="w-full px-3 py-2 mt-1 bg-gray-900 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
      placeholder={placeholder} type={type} id={id} value={value} onChange={onChange} />
  )
}

export default Input