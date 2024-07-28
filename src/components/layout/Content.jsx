'use client'
import { getAllReviews, searchReviews } from '@/lib/api'
import { Search, Star } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader } from '../ui/card'
import { ViewReviewModal } from '../modal/ViewReviewModal'
import { CreateReviewModal } from '../modal/CreateReviewModal'
import Pagination from '../Pagination'
import ReviewCard from '../ReviewCard'
import Loader from './Loader'
import { Input } from '../ui/input'
import { toast } from 'sonner'

function Content() {
    const [data, setData] = useState([])
    const [page, setPage] = useState(1)
    const [isLoading, setIsLoading] = useState(false)
    const [search, setSearch] = useState('')

    useEffect(() => {
        setIsLoading(true)
        const getReviews = async () => {
            const response = await getAllReviews(page)
            setData(response.data)
            setIsLoading(false)
        }
        getReviews()
    }, [page])


    useEffect(() => {
        const getSearchResults = async () => {
            try {
                const response = await searchReviews(search.trim(), page);
                console.log(response);
                setData(response.data)
            } catch (error) {
                console.error('Error fetching search results:', error);
            }
        };

        if (search.trim() !== '') {
            const timer = setTimeout(() => {
                getSearchResults();
            }, 2000);

            // Cleanup the timer if the component unmounts or if search changes
            return () => clearTimeout(timer);
        }
    }, [search]);

    if (isLoading) return <Loader />


    return (
        <div className="max-w-[800px] w-full m-auto grid gap-3 p-3">
            <div className="flex items-center justify-between w-full">
                <div className="relative flex-1 md:grow-0">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                        type="search"
                        placeholder="Search..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[320px]"
                    />
                </div>
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