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
import { CirclePlus, Eye } from "lucide-react"
import { Textarea } from "../ui/textarea"
import { useEffect, useState } from "react"
import { toast } from "sonner"
import { createReview } from "@/lib/api"
import { useRouter } from "next/navigation"
import useAuth from "@/hook/useAuth"

export function CreateReviewModal() {
    const { token } = useAuth()
    const [reviewForm, setReviewForm] = useState({
        title: "",
        author: "",
        reviewText: "",
        rating: 0
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
                if (!reviewForm[key] || reviewForm[key].trim() === '') {
                    toast(`${key} is required and cannot be empty or just spaces!`);
                    return;
                }
            }
            const data = { ...reviewForm };
            const response = await createReview(data, token);
            if (response && response.status === 201) {
                toast('You have successfully submitted a new review');
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
                <Button variant="outline" className="gap-2 text-normal"><CirclePlus size={17} /> Add Review</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Review a book!</DialogTitle>
                    <DialogDescription>
                        Review your favorite book!
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
