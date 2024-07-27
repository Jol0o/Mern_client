'use client'
import { getAllReviews } from '@/lib/api'
import { Star } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader } from '../ui/card'
import { ViewReviewModal } from '../modal/ViewReviewModal'
import { CreateReviewModal } from '../modal/CreateReviewModal'
import Pagination from '../Pagination'
import ReviewCard from '../ReviewCard'
import Loader from './Loader'

function Content() {
    const [data, setData] = useState([])
    const [page, setPage] = useState(1)
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        setIsLoading(true)
        const getReviews = async () => {
            const response = await getAllReviews(page)
            console.log(response.data)
            setData(response.data)
            setIsLoading(false)
        }
        getReviews()
    }, [page])

    if (isLoading) return <Loader />


    return (
        <div className="max-w-[800px] w-full m-auto grid gap-3 p-3">
            <div className="flex justify-end">
                <CreateReviewModal />
            </div>
            {data.reviews && data.reviews.map((review, index) => (
                <ReviewCard show key={review._id} review={review} index={index} />
            ))}
            {data && <Pagination data={data} setPage={setPage} page={page} />}
        </div>
    )
}

export default Content