"use client";

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { Button } from '@/components/common/Button';
import { Input } from '@/components/common/Input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/common/Card';
import { Mail, Lock, Eye, EyeOff, LogIn, ShieldCheck, User as UserIcon, Store, HardHat, Headset } from 'lucide-react';
import { MOCK_USERS } from '@/constants/mock-users';
import { toast } from 'sonner';

export const LoginForm = () => {
    const router = useRouter();
    const [showPassword, setShowPassword] = React.useState(false);
    const [loading, setLoading] = React.useState<string | null>(null);

    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading('regular');

        try {
            const result = await signIn('credentials', {
                email,
                password,
                redirect: false,
            });

            if (result?.error) {
                toast.error('Email hoặc mật khẩu không chính xác');
            } else {
                toast.success('Đăng nhập thành công');
                router.push('/');
                router.refresh();
            }
        } catch (error) {
            toast.error('Đã có lỗi xảy ra');
        } finally {
            setLoading(null);
        }
    };

    const handleMockLogin = async (mockUser: typeof MOCK_USERS[0]) => {
        setLoading(mockUser.role);

        try {
            const result = await signIn('credentials', {
                email: mockUser.email,
                password: mockUser.password,
                redirect: false,
            });

            if (result?.error) {
                toast.error('Mock login failed');
            } else {
                toast.success(`Đã đăng nhập với vai trò ${mockUser.fullName}`);
                router.push(mockUser.redirect);
                router.refresh();
            }
        } catch (error) {
            toast.error('Đã có lỗi xảy ra');
        } finally {
            setLoading(null);
        }
    };

    return (
        <div className="flex flex-col gap-6">
            <Card className="border-slate-200/60 shadow-xl bg-white rounded-2xl overflow-hidden">
                <CardHeader className="space-y-1 pb-6 pt-8 text-center text-slate-900">
                    <CardTitle className="text-2xl font-bold tracking-tight">Chào mừng trở lại</CardTitle>
                    <CardDescription className="text-slate-500">
                        Vui lòng đăng nhập để tiếp tục khám phá các sân thể thao
                    </CardDescription>
                </CardHeader>
                <form onSubmit={handleLogin}>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-slate-700 ml-1">Email hoặc Số điện thoại</label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                                <Input
                                    type="text"
                                    placeholder="example@gmail.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="pl-10 h-11 border-slate-200 focus:border-primary focus:ring-primary/20 bg-slate-50/50"
                                    required
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <div className="flex justify-between items-center ml-1">
                                <label className="text-sm font-semibold text-slate-700">Mật khẩu</label>
                                <Link href="/forgot-password" title="Quên mật khẩu?" className="text-xs text-primary hover:underline font-medium">
                                    Quên mật khẩu?
                                </Link>
                            </div>
                            <div className="relative">
                                <Lock className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                                <Input
                                    type={showPassword ? "text" : "password"}
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="pl-10 h-11 border-slate-200 focus:border-primary focus:ring-primary/20 bg-slate-50/50"
                                    required
                                />
                                <button
                                    type="button"
                                    className="absolute right-3 top-3 text-slate-400 hover:text-slate-600 focus:outline-none"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                </button>
                            </div>
                        </div>

                        <div className="flex items-center space-x-2 ml-1">
                            <input type="checkbox" id="remember" className="rounded border-slate-300 text-primary focus:ring-primary h-4 w-4 cursor-pointer" />
                            <label htmlFor="remember" className="text-sm text-slate-600 cursor-pointer select-none">Duy trì đăng nhập</label>
                        </div>

                        <Button
                            type="submit"
                            className="w-full h-11 mt-4 text-base font-bold shadow-md shadow-primary/20 rounded-xl"
                            disabled={!!loading}
                        >
                            {loading === 'regular' ? "Đang xử lý..." : (
                                <><LogIn className="w-4 h-4 mr-2" /> Đăng Nhập</>
                            )}
                        </Button>
                    </CardContent>
                </form>
                <CardFooter className="flex flex-col space-y-4 pb-8 border-t border-slate-50 pt-6 mt-2">
                    <div className="text-sm text-center text-slate-500">
                        Chưa có tài khoản?{' '}
                        <Link href="/register" className="text-primary font-bold hover:underline">
                            Đăng ký ngay
                        </Link>
                    </div>
                </CardFooter>
            </Card>

            {/* Quick Mock Login for Testing Roles */}
            <div className="space-y-4 p-6 bg-slate-50/80 backdrop-blur-sm border border-slate-200 rounded-2xl shadow-inner">
                <div className="text-center">
                    <h3 className="text-sm font-bold text-slate-600 uppercase tracking-widest flex items-center justify-center gap-2">
                        <ShieldCheck className="w-4 h-4" /> Đăng nhập nhanh (Mock)
                    </h3>
                    <p className="text-xs text-slate-500 mt-1">Dùng để test giao diện theo vai trò</p>
                </div>

                <div className="grid grid-cols-2 gap-3">
                    {MOCK_USERS.map((user) => (
                        <Button
                            key={user.role}
                            variant="outline"
                            size="sm"
                            className="bg-white border-slate-200 hover:border-primary hover:text-primary transition-all text-xs justify-start h-10 px-3"
                            onClick={() => handleMockLogin(user)}
                            disabled={!!loading}
                        >
                            {loading === user.role ? "..." : (
                                <div className="flex items-center gap-2 overflow-hidden overflow-ellipsis whitespace-nowrap">
                                    {user.role === 'admin' || user.role === 'super_admin' ? <ShieldCheck className="w-3.5 h-3.5 shrink-0" /> :
                                        user.role === 'staff' ? <Headset className="w-3.5 h-3.5 shrink-0" /> :
                                            user.role === 'owner' ? <Store className="w-3.5 h-3.5 shrink-0" /> :
                                                user.role === 'venue_staff' ? <HardHat className="w-3.5 h-3.5 shrink-0" /> :
                                                    <UserIcon className="w-3.5 h-3.5 shrink-0" />}
                                    <span className="truncate">{user.fullName.split(' ').pop()}</span>
                                </div>
                            )}
                        </Button>
                    ))}
                </div>
            </div>
        </div>
    );
};
