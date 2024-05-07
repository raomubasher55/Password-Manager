import React from 'react'

export const Navbar = () => {
    return (
        <div>
            <nav className='bg-slate-800 text-white '>
                <div className="mycontainer flex justify-between items-center px-4 h-14 py-5">

                    <div className='logo font-bold text-white text-2xl'>
                        <span className='text-green-700 '> &lt; </span>
                            Pass
                        <span className='text-green-700'>OP/&gt;  </span>
                    </div>
                  
                    <button className='text-white bg-green-700 my-5 p-2 mx-2 rounded-full flex justify-between items-center ring-1 ring-white'>
                    <img width={30} className='myfilter' src="../img/github.svg " alt="gihub" />
                    <span className='font-bold px-2'>GitHub</span>
                    </button>
                </div>
            </nav>
        </div>
    )
}
