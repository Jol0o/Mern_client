'use client'
import Image from "next/image"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useEffect, useState } from "react"
import { createAccount, loginUser } from "@/lib/api"
import { toast } from 'sonner';

export function Auth() {
    const [tab, setTab] = useState('register')
    const [userForm, setUserForm] = useState({
        username: '',
        email: '',
        password: '',
    })

    const handleChange = (e) => {
        const { name, value } = e.target
        if (value !== undefined || value !== "") {
            setUserForm({ ...userForm, [name]: value })
        }
    }

    useEffect(() => {
        console.log(userForm)
    }, [userForm])

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            for (let key of Object.keys(userForm)) {
                if (tab === 'login') {
                    if (key === 'username') continue
                }
                if (!userForm[key] || userForm[key].trim() === '') {
                    toast(`${key} is required!`)
                    return;
                }
            }
            const data = { ...userForm }
            const response = await (tab === 'register' ? createAccount(data) : loginUser(data));
            console.log(response)
            if (response.status === 201 || response.status === 200) {
                if (tab === 'register') {
                    toast('You have successfully created a new account.')
                    setTab('login')
                } else {
                    toast('You have successfully login.')
                }
            }
        } catch (err) {
            console.error(err)
            toast(err.response.data.msg)
        }
    }


    return (
        <div className="flex items-center justify-center w-full min-h-screen lg:grid lg:grid-cols-2 ">
            <div className="flex items-center justify-center ">
                <div className="mx-auto grid w-[350px] gap-6">
                    <div className="grid gap-2 text-center">
                        <h1 className="text-3xl font-bold">{tab === "register" ? "Register" : "Login"}</h1>
                        <p className="text-balance text-muted-foreground">
                            {tab === "register" ? "Fill up form below to create new account" : "Enter your account credentials to login"}
                        </p>
                    </div>
                    <div className="grid gap-4">
                        {tab === 'register' && <div className="grid gap-2">
                            <Label htmlFor="username">Username</Label>
                            <Input
                                id="username"
                                type="text"
                                name="username"
                                onChange={handleChange}
                                placeholder="Enter your username"
                                required
                            />
                        </div>}
                        <div className="grid gap-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                name="email"
                                onChange={handleChange}
                                placeholder="m@example.com"
                                required
                            />
                        </div>
                        <div className="grid gap-2">
                            <div className="flex items-center">
                                <Label htmlFor="password">Password</Label>
                            </div>
                            <Input onChange={handleChange} name="password" placeholder="******" id="password" type="password" required />
                        </div>
                        <Button onClick={handleSubmit} type="submit" className="w-full">
                            {tab === "register" ? "Register" : "Login"}
                        </Button>
                    </div>
                    <div className="mt-4 text-sm text-center">
                        Don&apos;t have an account?{" "}
                        <Link href="#" onClick={() => {
                            if (tab === "register") {
                                setTab("login")
                            } else {
                                setTab("register")
                            }
                        }} className="underline">
                            {tab === "register" ? "Sign in" : "Sign up"}
                        </Link>
                    </div>
                </div>
            </div>
            <div className="hidden bg-muted lg:block">
                <Image
                    src="https://images.pexels.com/photos/14837630/pexels-photo-14837630.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                    alt="Image"
                    width="1920"
                    height="1080"
                    className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
                />
            </div>
        </div>
    )
}
