import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { CirclePlus, Eye, Pencil } from "lucide-react"
import { Textarea } from "../ui/textarea"
import { useEffect, useState } from "react"
import { toast } from "sonner"
import { createReview, updateReview } from "@/lib/api"
import { useRouter } from "next/navigation"
import useAuth from "@/hook/useAuth"

export function EditReviewModal({ review }) {
    const { token } = useAuth()
    const [reviewForm, setReviewForm] = useState({
        title: review.title || "",
        author: review.author || "",
        reviewText: review.reviewText || "",
        rating: review.rating || 0
    })
    const router = useRouter()

    const handleChange = (e) => {
        const { name, value } = e.target
        if (value !== undefined || value !== "") {
            setReviewForm({ ...reviewForm, [name]: value })
        }
    }

    useEffect(() => {
        console.log(reviewForm)
    }, [reviewForm])

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            for (let key of Object.keys(reviewForm)) {
                const value = reviewForm[key];
                if (typeof value === 'string' && value.trim() === '') {
                    toast(`${key} is required and cannot be empty or just spaces!`);
                    return;
                } else if (typeof value !== 'string' && !value) {
                    toast(`${key} is required and cannot be empty!`);
                    return;
                }
            }
            const data = { ...reviewForm };
            const response = await updateReview(review._id.toString(), data, token);
            if (response && response.status === 200) {
                toast('You have successfully update your review!');
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
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline" size="icon" className="gap-2 text-normal"><Pencil size={17} /></Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Update Review!</DialogTitle>
                    <DialogDescription>
                        Update your book review!
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid items-center grid-cols-4 gap-4">
                        <Label htmlFor="title" className="text-right">
                            Title
                        </Label>
                        <Input placeholder="Enter title" id="title" name="title" onChange={handleChange} value={reviewForm.title} className="col-span-3" />
                    </div>
                    <div className="grid items-center grid-cols-4 gap-4">
                        <Label htmlFor="author" className="text-right">
                            Author
                        </Label>
                        <Input placeholder="Enter author name" id="author" name="author" onChange={handleChange} value={reviewForm.author} className="col-span-3" />
                    </div>
                    <div className="grid items-center grid-cols-4 gap-4">
                        <Label htmlFor="review" className="text-right">
                            Review
                        </Label>
                        <Textarea id="review" name="reviewText" onChange={handleChange} value={reviewForm.reviewText} placeholder="Type your review here." className="col-span-3" />
                    </div>
                    <div className="grid items-center grid-cols-4 gap-4">
                        <Label htmlFor="rating" className="text-right">
                            Rating
                        </Label>
                        <Input type="number" placeholder="Rate" id="rating" max={5} name="rating" onChange={handleChange} value={reviewForm.rating} className="col-span-3" />
                    </div>
                </div>
                <DialogFooter>
                    <Button type="submit" onClick={handleSubmit}>Save changes</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
