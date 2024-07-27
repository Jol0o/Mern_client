'use client'
import HeaderComponent from '@/components/layout/Header'
import Loader from '@/components/layout/Loader'
import { EditUserModal } from '@/components/modal/EditUserModal'
import { ViewReviewModal } from '@/components/modal/ViewReviewModal'
import ReviewCard from '@/components/ReviewCard'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
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
            <HeaderComponent />
            <div className="max-w-[1000px] w-full m-auto p-3">
                <Card>
                    <CardHeader>
                        <div className="flex items-center justify-between">
                            <div>
                                <h1 className="text-xl font-semibold capitalize">{user?.user.username}</h1>
                                <h3 className="text-sm font-normall">{user?.user.email}</h3>
                            </div>
                            {user && <EditUserModal data={user?.user} />}
                        </div>
                    </CardHeader>
                </Card>
                <div className="grid gap-3 mt-3">
                    {user?.reviews && user.reviews.map((review, index) => (
                        <ReviewCard key={review._id} review={review} index={index} edit />
                    ))}
                </div>
            </div>
        </>

    )
}

export default Page