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
import { Eye } from "lucide-react"
import Link from "next/link"

export function ViewReviewModal({ review, show }) {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline" size="icon" ><Eye size={15} /></Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>{review.title}</DialogTitle>
                    <DialogDescription>
                        {review.author}
                    </DialogDescription>
                </DialogHeader>
                <p>{review.reviewText}</p>
                {show && <DialogFooter>
                    <h3 className="text-xs font-normal text-slate-300">Review by : <Link href={`/profile/${review.userId._id}`}>
                        {review.userId.username}
                    </Link></h3>
                </DialogFooter>}
            </DialogContent>
        </Dialog>
    )
}
