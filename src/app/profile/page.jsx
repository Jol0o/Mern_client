'use client'
import HeaderComponent from '@/components/layout/Header'
import Loader from '@/components/layout/Loader'
import { EditUserModal } from '@/components/modal/EditUserModal'
import { ViewReviewModal } from '@/components/modal/ViewReviewModal'
import ReviewCard from '@/components/ReviewCard'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import UserProfile from '@/components/UserProfile'
import useAuth from '@/hook/useAuth'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'

function Page() {
    const { auth, loading, user } = useAuth()
    const router = useRouter()
    useEffect(() => {
        if (!loading && !auth) {
            router.push('/register')
        }
    }, [loading, auth, router])

    if (loading) return <Loader />
    return (
        <>
            <UserProfile user={user} edit />
        </>

    )
}

export default Page