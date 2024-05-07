import React, { useEffect, useState } from 'react'
import { useRef } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { v4 as uuidv4 } from 'uuid';

export const Manager = () => {
    const url = "http://localhost:3000/api"
    const ref = useRef();
    const passwordRef = useRef();
    const [form, setForm] = useState({ site: "", username: "", password: "" });
    const [passwordArray, setPasswordArray] = useState([])

    const getPasswords = async () => {
        let response = await fetch('http://localhost:3000/api/fetchPasswords/');
        let passwords = await response.json();
        setPasswordArray(passwords);
        console.log(passwords);
    };

    useEffect(() => {
        getPasswords();
    }, []);



    const showPassword = () => {

        //   ref.current.src.includes("../img/eye.svg")?ref.current.src = "../img/hide.svg":ref.current.src = "../img/eye.svg";
        console.log(ref.current.src);
        if (ref.current.src.includes("hide.svg")) {
            passwordRef.current.type = "password";
            ref.current.src = "../img/eye.svg";
        } else {
            ref.current.src = "../img/hide.svg";
            passwordRef.current.type = "text";
        }
    }
    const savePassword = async () => {
        if (form.password.length >= 3 && form.site.length >= 3 && form.username.length > 3) {

            // console.log(form);

            //if any such id exist in the db , delete it
            // Send the delete request to the server
            fetch(`${url}/deletepassword/${form.id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ id: form.id })
            });


            // Send request to add password to the database
            const response = await fetch(url + "/addPassword", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ ...form })
            });

            if (response.ok) {
                // Update local state only after the database operation is successful
                getPasswords(); // Fetch passwords again to reflect the latest changes
                setForm({ site: "", username: "", password: "" });
                // Show success message
                try {
                    toast.success("Password saved successfully",{
                        position: "top-center",
                        theme:"dark"
                    })
                } catch (error) {
                    console.error("oppss")
                }
            }

        }else{
            toast.error('Enter valid Values',{
                theme:"dark",
                position:"top-center"
            });
        }
    }

    const deletePassword = async (_id) => {
        let c = window.confirm("Do you want to delete password");
        if (c) {

            console.log("deleting password with id", _id);

            // Send the delete request to the server
            const response = await fetch(`${url}/deletepassword/${_id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ _id })
            });

            if (response.ok) {
                // Update the state only if deletion is successful
                getPasswords(); // Fetch passwords again to reflect the latest changes
                // Show success message
                toast.success("Deleted Successfully",{
                    position: "top-center",
                    theme:"dark"
                })
            } else {
                // Show error message
                toast.error('Failed to delete password');
            }

        }
    };




    const editPassword = async (_id) => {
        console.log("Edit password with id", _id);
        await fetch(`${url}/editpassword/${_id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            }
        });
        //yhe from ko set kia aur form ko id dy di
        setForm({ ...passwordArray.filter(item => item._id === _id)[0], id: _id })

        //yhe id wali password ko delete kia ta k table me show na ho
        setPasswordArray(passwordArray.filter(item => item._id !== _id))

        // localStorage.setItem("password", JSON.stringify([...passwordArray, form]))

    }

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const copyText = (text) => {
        toast.success("Copy to clipboard",{
            position: "top-center",
            theme:"dark"
        })
        let a = navigator.clipboard.writeText(text);
    }


    return (
        <>

            <div className="absolute top-0 z-[-2] h-screen w-screen rotate-180 transform bg-green-50 bg-[radial-gradient(60%_120%_at_50%_50%,hsla(0,0%,100%,0)_0,rgba(252,205,238,.5)_100%)]"></div>
            <div className='mx-auto max-w-7xl px-2 md:px-0 md:mycontainer'>
                <h1 className='text-2xl font-bold text-center'>
                    <span className='text-green-500 '> &lt; </span>
                    Pass
                    <span className='text-green-500'>OP/&gt;  </span>
                </h1>
                <p className='text-green-700 text-lg text-center'>Your own Pasword Manager</p>


                <div className=" flex flex-col items-center p-4 gap-7 ">
                    <input value={form.site} onChange={handleChange} className='rounded-full border border-green-500  w-full  p-4 py-1' type="text" placeholder='Enter website URL' name='site' />
                    <div className='flex justify-between gap-8 w-full flex-col md:flex-row'>
                        <input value={form.username} onChange={handleChange} className='rounded-full border border-green-500  w-full  p-4 py-1' type="text" placeholder='Enter username ' name='username' />
                        <div className="relative">
                            <input ref={passwordRef} value={form.password} onChange={handleChange} className='rounded-full border border-green-500  w-full  p-4 py-1' type="password"
                                placeholder='Password ' name='password' />
                            <span className="absolute right-[1px] top-[4px] cursor-pointer " onClick={showPassword}>
                                <img ref={ref} className='p-1' width={26} src="../img/eye.svg" alt="show" />
                            </span>
                        </div>
                    </div>
                    <button onClick={() => savePassword()} className='flex justify-center items-center text-bold hover:bg-green-400 bg-green-500 rounded-full px-8 py-2 w-fit gap-2  font-bold border-2 border-green-900'>
                        <lord-icon
                            src="https://cdn.lordicon.com/wzwygmng.json"
                            trigger="hover"
                        >
                        </lord-icon>Save Password</button>
                </div>
                <div className="passwords">
                    <h1 className='font-bold text-xl py-4' >Your Passwords</h1>
                    {passwordArray.length === 0 ? <div> No Password to show</div> :
                        <table className="table-auto w-full rounded-md  overflow-hidden">
                            <thead className='bg-green-800 text-center'>
                                <tr>
                                    <th className='py-2'>Site</th>
                                    <th className='py-2'>User</th>
                                    <th className='py-2'>Password</th>
                                    <th className='py-2'>Aciton</th>
                                </tr>
                            </thead>
                            <tbody className='bg-green-100 text-lg'>
                                {passwordArray.map((item, index) => {
                                    return (<tr key={index}>
                                        <td className='text-center w-32 py-2 border border-white'><div className='flex justify-center  gap-2 md:gap-9 cursor-pointer'> <a href={item.site} target='_blank'>{item.site}</a> <img className='md:w-9 w-6' onClick={() => { copyText(item.site) }} src="../img/copy.svg" alt="" /></div> </td>
                                        <td className='text-center w-32 py-2 border border-white'> <div className='flex justify-center gap-2 md:gap-9 cursor-pointer' >{item.username}<img onClick={() => { copyText(item.username) }} className='md:w-9 w-6' src="../img/copy.svg" alt="" /></div> </td>
                                        <td className='text-center w-32 py-2 border border-white'> <div className='flex justify-center gap-2 md:gap-9 cursor-pointer' >{"*".repeat(item.password.length)}<img onClick={() => { copyText(item.password) }} className='md:w-9 w-6' src="../img/copy.svg" alt="" /></div> </td>
                                        <td className='text-center w-32 py-2 border border-white'> <div className='flex justify-center gap-2 md:gap-9 cursor-pointer' ><lord-icon onClick={() => editPassword(item._id)} src="https://cdn.lordicon.com/wuvorxbv.json" trigger="hover"></lord-icon> <lord-icon onClick={() => deletePassword(item._id)} src="https://cdn.lordicon.com/skkahier.json" trigger="hover" state="hover-line"></lord-icon></div> </td>


                                    </tr>)

                                })}

                            </tbody>
                        </table>}
                </div>
            </div>
            {/* for toast */}

            <ToastContainer />
        </>
    )
}
