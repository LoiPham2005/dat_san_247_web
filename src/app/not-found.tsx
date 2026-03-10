import Link from "next/link"
import { Button } from "@/components/common/Button"

export default function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center min-h-[600px] space-y-6 text-center px-4">
            <div className="space-y-2">
                <h1 className="text-9xl font-extrabold text-primary tracking-tighter">404</h1>
                <h2 className="text-3xl font-bold tracking-tight">Không tìm thấy trang</h2>
                <p className="text-muted-foreground max-w-[500px] mx-auto">
                    Xin lỗi, trang bạn đang tìm kiếm không tồn tại hoặc đã bị di chuyển. 
                    Vui lòng kiểm tra lại đường dẫn hoặc quay về trang chủ.
                </p>
            </div>
            
            <div className="flex flex-wrap items-center justify-center gap-4">
                <Button asChild variant="default" size="lg">
                    <Link href="/">
                        Quay về trang chủ
                    </Link>
                </Button>
                <Button asChild variant="outline" size="lg" onClick={() => window.history.back()}>
                    <span>Quay lại</span>
                </Button>
            </div>
        </div>
    )
}
