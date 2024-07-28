import React from 'react';
import ReviewCard from './ReviewCard';
import HeaderComponent from './layout/Header';
import { Card, CardHeader } from '@/components/ui/card';
import { EditUserModal } from './modal/EditUserModal';

const UserProfile = ({ user, edit }) => {
    return (
        <>
            <HeaderComponent />
            <div className="max-w-[1000px] w-full m-auto p-3">
                <Card>
                    <CardHeader>
                        <div className="flex items-center justify-between">
                            <div>
                                <h1 className="text-xl font-semibold capitalize">{user?.user.username}</h1>
                                <h3 className="text-sm font-normal">{user?.user.email}</h3>
                            </div>
                            {edit && user ? <EditUserModal data={user?.user} /> : null}
                        </div>
                    </CardHeader>
                </Card>
                <div className="grid gap-3 mt-3">
                    {user?.reviews && user.reviews.map((review, index) => (
                        <ReviewCard key={review._id} review={review} index={index} edit={edit ? true : false} />
                    ))}
                </div>
            </div>
        </>
    );
};

export default UserProfile;