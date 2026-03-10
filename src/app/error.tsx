"use client"

import { useEffect } from "react"
import { Button } from "@/components/common/Button"

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    useEffect(() => {
        // Log the error to an error reporting service
        console.error(error)
    }, [error])

    return (
        <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4">
            <h2 className="text-2xl font-bold text-destructive">Đã có lỗi xảy ra!</h2>
            <p className="text-muted-foreground">Chúng tôi xin lỗi vì sự bất tiện này.</p>
            <Button
                variant="default"
                onClick={
                    // Attempt to recover by trying to re-render the segment
                    () => reset()
                }
            >
                Thử lại
            </Button>
        </div>
    )
}
