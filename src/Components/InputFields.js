import React from 'react'

export default function InputFields({img,value,placeholder,style,imgStyle,inputStyle}) {
  return (
    <div className={`${style} relative`}>
        <img src={img} className={`absolute ${imgStyle} `}/>
        <input type='text' value={value} placeholder={placeholder} className={`h-full w-full p-2 border rounded ${inputStyle}`}/>
    </div>
  )
}
