import React from 'react';

export default function CustomRadioButton({ label, name }) {
    return (
        <div className='flex gap-2 items-center'>
            <div className='w-[13px] h-[13px] rounded-full relative'>
                <img src='./tick.svg' className='absolute -z-[5]'/>
                <input type='radio' name={name}  className='accent-[#ff7321] w-full h-full absolute z-[4]'/>
            </div>
            <label className='text-[14px]'>
                {label}
            </label>
        </div>
    );
};