import React from 'react'
import { v4 as uuidv4 } from 'uuid';
import { useRef, useState, useEffect } from 'react'

const Manager = () => {
    const ref = useRef()
    const passwordRef = useRef()
    const [form, setform] = useState({ site: "", username: "", password: "", id: "" })
    const [passwordArray, setpasswordArray] = useState([])

    useEffect(() => {
        let passwords = localStorage.getItem("passwords")
        if (passwords) {
            setpasswordArray(JSON.parse(passwords))
        }
    }, [])


    const showPass = () => {
        if (ref.current.src.includes("/eye-hide.svg")) {
            ref.current.src = "/eye-show.svg"
            passwordRef.current.type = "password"
        }
        else {
            passwordRef.current.type = "text"
            ref.current.src = "/eye-hide.svg"
        }
    }

    const savePassword = () => {
        if (!form.password || !form.site || !form.username) {
            alert('Please fill the inputs properly.')
            return
        }
        setpasswordArray([...passwordArray, form])
        localStorage.setItem("passwords", JSON.stringify([...passwordArray, form]))
        setform({ site: "", username: "", password: "", id: "" })
    }

    const handleChange = (e) => {
        setform({ ...form, [e.target.name]: e.target.value, id: uuidv4() })
    }

    const copyText = (text) => {
        navigator.clipboard.writeText(text)
    }

    const editPassword = (id) => {
        setform(passwordArray.filter(pass => pass.id === id)[0])
        setpasswordArray(passwordArray.filter(pass => pass.id !== id))
    }

    const deletePassword = (id) => {
        if (confirm("Do you want to delete this password?")) {
            setpasswordArray(passwordArray.filter(pass => pass.id !== id))
            localStorage.setItem("passwords", JSON.stringify(passwordArray.filter(pass => pass.id !== id)))
        }
    }




    return (
        <div className='bg-[#183D3D] flex flex-col items-center min-h-[85vh] w-11/12 mx-auto rounded-lg'>
            <div className="logo flex flex-col items-center my-3">
                <div className='font-bold text-3xl'>
                    <span className='text-blue-900'>&lt;\-</span><span className='text-fuchsia-700'>Pass</span><span className='text-blue-800'>Man-/&gt;</span>
                </div>
                <span className='text-teal-500 text-lg'>Your personal Password Manager</span>
            </div>
            <div className="inputs w-1/2 space-y-5">
                <input onChange={handleChange} value={form.site} className='w-full rounded-full px-3 outline-none placeholder:text-amber-100 bg-[#93B1A6] focus-within:border-zinc-300 border-zinc-600 border focus-within:bg-[#76958a]' type="text" placeholder='Enter the website URL' name='site' />
                <div className='flex justify-between gap-5 flex-col lg:flex-row'>

                    <input onChange={handleChange} value={form.username} className='lg:w-2/3 w-full rounded-full px-3 outline-none placeholder:text-amber-100 bg-[#93B1A6] focus-within:border-zinc-300 border-zinc-600 border focus-within:bg-[#76958a]' type="text" placeholder='Enter username' name='username' />
                    <div className="relative lg:w-1/3">

                        <input ref={passwordRef} onChange={handleChange} value={form.password} className='w-full rounded-full px-3 outline-none placeholder:text-amber-100 bg-[#93B1A6] focus-within:border-zinc-300 border-zinc-600 border focus-within:bg-[#76958a]' type="password" placeholder='Enter password' name='password' />
                        <span onClick={showPass} className="absolute right-2 bottom-[0.2px] hover:cursor-pointer">
                            <img ref={ref} width={24} src="/eye-show.svg" alt="" />
                        </span>
                    </div>
                </div>
            </div>
            <div className="save my-5">
                <button onClick={savePassword} className='bg-[#5C8374] hover:bg-[#678a7d] border-2 border-[#5fd8a0] px-3 py-1 rounded-full font-bold flex items-center gap-2'>
                    <lord-icon
                        src="https://cdn.lordicon.com/hqymfzvj.json"
                        style={{ width: "21px", height: "21px" }}
                        trigger="hover">
                    </lord-icon>Save</button>
            </div>
            <div className="passes md:w-1/2 w-10/12">
                <h2 className='font-bold lg:text-2xl text-xl py-4 text-teal-300'>Your Passwords</h2>
                {passwordArray.length === 0 && <div className='text-teal-400'> No passwords to show</div>}
                {passwordArray.length != 0 && <table className="table-auto w-full rounded-md overflow-hidden mb-10">
                    <thead className='bg-sky-700 text-white'>
                        <tr>
                            <th className='py-2'>Site</th>
                            <th className='py-2'>Username</th>
                            <th className='py-2'>Password</th>
                            <th className='py-2'>Actions</th>
                        </tr>
                    </thead>
                    <tbody className='bg-fuchsia-100'>
                        {passwordArray.map((item, index) => {
                            return <tr key={index}>
                                <td className='py-2 border border-white text-center'>
                                    <div className='flex items-center justify-center '>
                                        <a href={item.site} target='_blank'>{item.site}</a>
                                    </div>
                                </td>
                                <td className='py-2 border border-white text-center'>
                                    <div className='flex items-center justify-center '>
                                        <span>{item.username}</span>
                                        {screen.width > 600 &&
                                            <div className='lordiconcopy size-7 cursor-pointer' onClick={() => { copyText(item.username) }}>
                                                <lord-icon
                                                    style={{ "width": "25px", "height": "25px", "paddingTop": "3px", "paddingLeft": "3px" }}
                                                    src="https://cdn.lordicon.com/iykgtsbt.json"
                                                    trigger="hover" >
                                                </lord-icon>
                                            </div>}
                                    </div>
                                </td>
                                <td className='py-2 border border-white text-center'>
                                    <div className='flex items-center justify-center '>
                                        <span>{item.password}</span>
                                        {screen.width > 600 &&
                                            <div className='lordiconcopy size-7 cursor-pointer' onClick={() => { copyText(item.password) }}>
                                                <lord-icon
                                                    style={{ "width": "25px", "height": "25px", "paddingTop": "3px", "paddingLeft": "3px" }}
                                                    src="https://cdn.lordicon.com/iykgtsbt.json"
                                                    trigger="hover" >
                                                </lord-icon>
                                            </div>}
                                    </div>
                                </td>
                                <td className='justify-center py-2 border border-white text-center'>
                                    <span className='cursor-pointer mx-1' onClick={() => { editPassword(item.id) }}>
                                        <lord-icon
                                            src="https://cdn.lordicon.com/wuvorxbv.json"
                                            colors={"primary:#000000,secondary:#000000"}
                                            stroke="bold"
                                            trigger="hover"
                                            style={{ width: "21px", height: "21px" }}>
                                        </lord-icon>
                                    </span>
                                    <span className='cursor-pointer mx-1' onClick={() => { deletePassword(item.id) }}>
                                        <lord-icon
                                            src="https://cdn.lordicon.com/wpyrrmcq.json"
                                            trigger="hover"
                                            style={{ width: "21px", height: "21px" }}>
                                        </lord-icon>
                                    </span>
                                </td>
                            </tr>

                        })}
                    </tbody>
                </table>}
            </div>
        </div>
    )
}

export default Manager
