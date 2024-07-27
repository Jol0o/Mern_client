import React from 'react'
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

function Pagination({ data, setPage, page }) {
    return (
        <div className="flex items-center justify-end gap-2">
            <Button variant="ghost" onClick={() => {
                if (page !== 1) {
                    setPage(page - 1)
                }
            }}>
                <ChevronLeft /> Previous
            </Button>
            {Array.from({ length: data.totalPages }, (_, index) => index + 1).map(page => (
                <Button
                    key={page}
                    variant={page === data.currentPage ? "outline" : "ghost"}
                    onClick={() => setPage(page)}
                >
                    {page}
                </Button>
            ))}
            <Button variant="ghost" onClick={() => {
                if (page !== data.totalPages) {
                    setPage(page + 1)
                }
            }}>
                Next <ChevronRight />
            </Button>
        </div>
    )
}

export default Pagination