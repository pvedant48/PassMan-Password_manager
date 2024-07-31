import React from 'react'

const Navbar = () => {
    return (
        <div className='flex justify-around bg-[#6ca58f] py-1'>
            <div className="logo font-bold text-xl">
                <span className='text-blue-900'>&lt;\-</span><span className='text-fuchsia-700'>Pass</span><span className='text-blue-800'>Man-/&gt;</span>
            </div>
            <div className="auth">Github</div>
        </div>
    )
}

export default Navbar
