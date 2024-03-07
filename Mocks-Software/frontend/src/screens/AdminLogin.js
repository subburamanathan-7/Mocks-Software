import {useState} from 'react';
import { useNavigate } from "react-router-dom";

import toast from 'react-hot-toast';
import{useMutation, useQueryClient} from '@tanstack/react-query';

import {login} from "../features/access/AccessServices"

function AdminLogin() {
    const [formData, setFormData] = useState({email:"", password:"",role:"Admin"})
    const [buttonState, setButtonState]  = useState(false);

    const queryClient = useQueryClient();
    const navigate = useNavigate();

    const adminLoginMutation = useMutation({
        mutationFn: login,
        onSuccess:(data)=>{
            sessionStorage.setItem('name',data.name)
            sessionStorage.setItem('email',data.email)
            sessionStorage.setItem('role',data.role)
            sessionStorage.setItem('incharge',data.incharge)
            sessionStorage.setItem('company',data.companyName)

            toast.success(`Welcome ${data.name}`)
            setButtonState(false)
           
            navigate('/adashboard')
        },
        onError:(message)=>{
            toast.error('Invalid Credentials')   
            setButtonState(false)

        }
    })

    const handleChange = (e)=>{
        const {name,value} = e.target;
        setFormData((prev)=>({...prev,[name]:value}));
    }
    const handleSubmit = (e)=>{
        e.preventDefault();
        console.log(formData);
        setButtonState(true)
        adminLoginMutation.mutate({
            email:formData.email,
            password:formData.password,
            role:formData.role
        })

    }
    return (
        <>
            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 ">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray">
                        Welcome Admin,
                    </h2>
                    <h2 className="mt-5 text-center text-2xl font-semibold leading-9 tracking-tight text-gray">
                        Sign in to your account
                    </h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form className="space-y-6">
                        <div>
                        <label htmlFor="email" className="block text-sm font-bold leading-6 text-gray">
                            Email address
                        </label>
                        <div className="mt-2">
                            <input
                            id="email"
                            name="email"
                            type="email"
                            autoComplete="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="block w-full rounded-md border-0 p-1.5 font-bold text-gray shadow-sm ring-1 ring-inset ring-gray placeholder:text-gray focus:ring-2 focus:ring-inset focus:ring-blue sm:text-sm sm:leading-6"
                            />
                        </div>
                        </div>

                        <div>
                        <div className="flex items-center justify-between">
                            <label htmlFor="password" className="block text-sm font-bold leading-6 text-gray">
                            Password
                            </label>
                            
                        </div>
                        <div className="mt-2">
                            <input
                            id="password"
                            name="password"
                            type="password"
                            autoComplete="current-password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            className="block w-full rounded-md border-0 p-1.5 font-bold text-gray shadow-sm ring-1 ring-inset ring-gray placeholder:text-gray focus:ring-2 focus:ring-inset focus:ring-indigo sm:text-sm sm:leading-6"
                            />
                        </div>
                        </div>

                        <div>
                        <button
                            type="submit"
                            disabled={buttonState}
                            className="text-white flex w-full justify-center rounded-md bg-blue px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            onClick={handleSubmit}
                        >
                            Sign in
                        </button>
                        </div>
                    </form>
                    <p className="mt-10 text-left text-sm text-gray">
                        <a href="/vlogin" className="font-semibold leading-6 text-gray hover:underline">Incharge Login</a>
                    </p>
                </div>
            </div>
        </>
    )
}

export default AdminLogin