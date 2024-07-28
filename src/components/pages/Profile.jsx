'use client'
import useAuth from '@/hook/useAuth'
import { getAllUserReviewsById } from '@/lib/api'
import React, { useEffect, useState } from 'react'
import UserProfile from './../UserProfile';
import Loader from '../layout/Loader';

function Profile({ id }) {
    const [user, setUser] = useState(null)
    const { token } = useAuth()


    useEffect(() => {
        if (!token) return
        const getUserData = async () => {
            const response = await getAllUserReviewsById(id, token)
            console.log(response)
            setUser(response)
        }
        getUserData()
    }, [token])

    if (!token) return <Loader />

    return (
        <UserProfile user={user} />
    )
}

export default Profile