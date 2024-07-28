import Profile from '@/components/pages/Profile'
import React from 'react'

function page({ params }) {
    const { id } = params

    return (
        <Profile id={id} />
    )
}

export default page