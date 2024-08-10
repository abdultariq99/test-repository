import React from 'react'
export default function Checkbox({label,style,checked,onChange}) {
  return (
    <div className={`flex gap-3 ${style}`}>
        <input type='checkbox' checked={checked} onChange={onChange}/>
        <label>
            {label}
        </label>
    </div>
  )
}


