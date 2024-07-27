import React from 'react';
import { ViewReviewModal } from './modal/ViewReviewModal';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Star, Trash } from 'lucide-react';
import { EditReviewModal } from './modal/EditReviewModal';
import { Button } from './ui/button';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { removeReview as apiRemoveReview } from './../lib/api';
import useAuth from '@/hook/useAuth';

const ReviewCard = ({ review, show, index, edit }) => {
    const animationDelay = `${index * 0.3}s`;
    const router = useRouter();
    const { token } = useAuth();

    const handleRemoveReview = async (id) => {
        if (!token) return
        try {
            const response = await apiRemoveReview(id, token);
            if (response && response.status === 200) {
                toast('You have successfully deleted your review!');
            }
        } catch (err) {
            console.error(err);
            if (err?.response?.status === 401) {
                router.push('/register');
            }
            toast(err.message);
        }
    };

    return (
        <Card key={review._id} className="slide-in" style={{ animationDelay }}>
            <CardHeader>
                <div className="flex items-center justify-between">
                    <div>
                        <div className="flex items-center gap-3">
                            <h1 className="text-lg font-semibold">{review.title}</h1>
                            <span className='flex items-center gap-1 text-sm'><Star size={15} color='yellow' />{review.rating}</span>
                        </div>
                        <h3 className="text-xs font-medium text-slate-500">{review.author}</h3>
                    </div>
                    <div className="flex items-center gap-1">
                        <ViewReviewModal review={review} show={show} />
                        {
                            edit && <>
                                <EditReviewModal review={review} />
                                <Button variant="destructive" size="icon" onClick={() =>
                                    toast("Delete Review", {
                                        variant: "destructive",
                                        description: "Are you sure you want to delete this review?",
                                        action: {
                                            label: "Yes",
                                            onClick: () => handleRemoveReview(review._id),
                                        }
                                    })
                                }>
                                    <Trash size={15} />
                                </Button>
                            </>
                        }
                    </div>
                </div>
            </CardHeader>
            <CardContent>
                <p>{review.reviewText}</p>
            </CardContent>
        </Card>
    );
};

export default ReviewCard;