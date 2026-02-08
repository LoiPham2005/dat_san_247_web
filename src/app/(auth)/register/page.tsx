import Link from 'next/link';
import { RegisterForm } from '@/components/auth/RegisterForm';

export default function RegisterPage() {
    return (
        <div className="flex min-h-screen w-full items-center justify-center bg-gradient-to-br from-primary-50 via-white to-primary-100 p-4">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>

            <div className="relative w-full max-w-lg animate-in fade-in zoom-in-95 duration-500">
                {/* Decorative blobs */}
                <div className="absolute -top-10 -left-10 h-32 w-32 rounded-full bg-primary-400 opacity-20 blur-3xl"></div>
                <div className="absolute -bottom-10 -right-10 h-32 w-32 rounded-full bg-primary-600 opacity-20 blur-3xl"></div>

                <div className="glass shadow-2xl rounded-2xl p-8 backdrop-blur-xl bg-white/70 border-white/50">
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 mb-2">
                            Đăng ký tài khoản
                        </h1>
                        <p className="text-sm text-gray-600">
                            Tham gia cộng đồng những người đam mê thể thao
                        </p>
                    </div>

                    <RegisterForm />

                    <div className="mt-6 text-center text-sm">
                        <span className="text-gray-500">Đã có tài khoản? </span>
                        <Link href="/login" className="font-semibold text-primary-600 hover:text-primary-500 transition-colors">
                            Đăng nhập
                        </Link>
                    </div>
                </div>

                <div className="mt-8 text-center text-xs text-gray-400">
                    &copy; 2024 Dat San 247. All rights reserved.
                </div>
            </div>
        </div>
    );
}
