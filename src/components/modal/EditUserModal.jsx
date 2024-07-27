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
import { createReview, updateUser } from "@/lib/api"
import { useRouter } from "next/navigation"
import useAuth from "@/hook/useAuth"

export function EditUserModal({ data }) {
    const { token } = useAuth()
    const [reviewForm, setReviewForm] = useState({
        username: data.username || "",
        email: data.email || "",
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
                    toast(`${key} is required!`);
                    return;
                }
            }
            const data = { ...reviewForm };
            const response = await updateUser(data, token);
            if (response && response.status === 200) {
                toast('You have successfully updated your account!');
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
                <Button variant="outline" className="gap-2 text-normal"><Pencil size={17} /></Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Update Profile!</DialogTitle>
                    <DialogDescription>
                        Update your profile information!
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid items-center grid-cols-4 gap-4">
                        <Label htmlFor="username" className="text-right">
                            Username
                        </Label>
                        <Input placeholder="Enter username" id="username" name="username" onChange={handleChange} value={reviewForm.username} className="col-span-3" />
                    </div>
                    <div className="grid items-center grid-cols-4 gap-4">
                        <Label htmlFor="email" className="text-right">
                            Email
                        </Label>
                        <Input placeholder="m@gmail.com" id="email" name="email" onChange={handleChange} value={reviewForm.email} className="col-span-3" />
                    </div>

                </div>
                <DialogFooter>
                    <Button type="submit" onClick={handleSubmit}>Save changes</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
