'use client'
import React from 'react'
import { Darkmode } from '../Darkmode'
import Image from 'next/image';
import useAuth from '@/hook/useAuth';
import Link from 'next/link';
import { Button } from '../ui/button';
import { User } from 'lucide-react';

function HeaderComponent() {
    const auth = useAuth()
    return (
        <header className="max-w-[1300px] w-full m-auto flex justify-between items-center py-5 px-3">
            <Link href='/' >
                <Image src="/book.png" alt="website logo" width={100} height={100} className="mix-blend-difference" />
            </Link>
            <div className="flex items-center gap-2">
                <Darkmode />
                {auth && <Link href='/profile' >
                    <Button size="icon">
                        <User />
                    </Button>
                </Link>}
            </div>
        </header>
    )
}

export default HeaderComponent