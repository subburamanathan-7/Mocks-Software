import {useState, Fragment} from 'react'
import { useNavigate } from 'react-router-dom'

import toast from 'react-hot-toast';
import { Menu, Transition } from '@headlessui/react'
const forese = require('../assets/forese.png')

function DashNavbar() {
    let name = sessionStorage.getItem('name');
	const [currentRoute,setCurrentRoute]=useState(String(window.location.href));

	const navigate = useNavigate();
	const handleLogout = ()=>{
        sessionStorage.clear();
        toast.success('Logout Sucessful')
        navigate('/')
    }
    return (
       <>
        <header className='mb-[2%] shadow-md'>
            <nav className='flex justify-between items-center w-[92%] mx-auto py-2'>
                <div>
                    <img className='w-16'
                    alt='forese-logo'
                    src={forese} />
                </div>
                <div className='flex justify-end '>
                {
                  sessionStorage.getItem('role')==='Admin'?(
                    <div className='mr-2'>
                      <button className={` ${currentRoute.includes('users')?'text-blue':'text-gray hover:underline hover:decoration-2'} uppercase px-4 py-2 `} onClick={()=>navigate('/adashboard/users')}>users</button>
                    </div>
                  ):(<></>)
					      }
					      {
                    sessionStorage.getItem('role')==='Admin'?(
                    <div className='mr-2'>
                      <button className={`${currentRoute.includes('students')?'text-blue':'text-gray hover:underline hover:decoration-2'} uppercase px-4 py-2 `} onClick={()=>navigate('/adashboard/students')}>students</button>
                    </div>
                    ):(<></>)
                }

                    <Menu as="div" className="relative inline-block text-left">
                          <div>
                            <Menu.Button className="">
                            {
                       
                                <div className='mr-2 ml-2'>
                                    <button className='bg-[#DBDFEA] text-[#000000] px-5 py-2 rounded-full flex  items-center justify-between'>
                                        {name} <i class=" pl-2 fa-solid fa-caret-down"></i>
                                    </button>
                                </div>
                            }
                            </Menu.Button>
                          </div>
                    
                          <Transition
                            as={Fragment}
                          >
                            <Menu.Items className="absolute right-0 z-10 mt-2 rounded-full">
                              <div className="">
                                <Menu.Item>
                                  {({ active }) => (
                                   <div className='ml-2'>
                                    <button 
                                    className='bg-[#DBDFEA] text-[#000000] px-10 py-2 rounded-full hover:scale-95 duration-150' 
                                    onClick={handleLogout}>
                                        
                                        Logout
                                    </button>
                                    </div>
                                  )}
                                </Menu.Item>
                              </div>
                            </Menu.Items>
                          </Transition>
                    </Menu>
                </div>
            </nav>
        </header>
       </>
       
    )
}
export default DashNavbar