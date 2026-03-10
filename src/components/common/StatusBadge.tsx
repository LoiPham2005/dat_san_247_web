import React from 'react';
import { cn } from '@/lib/utils/cn';

interface StatusBadgeProps {
  status: string;
  className?: string;
  type?: 'user' | 'kyc' | 'role' | 'venue' | 'booking';
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, className, type = 'user' }) => {
  let bgColor = 'bg-slate-100 text-slate-600';
  let label = status;

  if (type === 'user') {
    switch (status) {
      case 'ACTIVE': bgColor = 'bg-emerald-100 text-emerald-700 border-emerald-200'; label = 'Hoạt động'; break;
      case 'INACTIVE': bgColor = 'bg-slate-100 text-slate-600 border-slate-200'; label = 'Chưa kích hoạt'; break;
      case 'BANNED': bgColor = 'bg-rose-100 text-rose-700 border-rose-200'; label = 'Cấm (Ban)'; break;
      case 'SUSPENDED': bgColor = 'bg-amber-100 text-amber-700 border-amber-200'; label = 'Tạm khóa'; break;
    }
  } else if (type === 'venue') {
    switch (status) {
      case 'APPROVED': bgColor = 'bg-emerald-100 text-emerald-700 border-emerald-200'; label = 'Đã duyệt'; break;
      case 'PENDING': bgColor = 'bg-amber-100 text-amber-700 border-amber-200'; label = 'Chờ duyệt'; break;
      case 'REJECTED': bgColor = 'bg-rose-100 text-rose-700 border-rose-200'; label = 'Từ chối'; break;
      case 'SUSPENDED': bgColor = 'bg-slate-800 text-slate-100 border-slate-700'; label = 'Đình chỉ'; break;
    }
  } else if (type === 'booking') {
    switch (status) {
      case 'PENDING': bgColor = 'bg-amber-100 text-amber-700 border-amber-200'; label = 'Chờ thanh toán'; break;
      case 'CONFIRMED': bgColor = 'bg-blue-100 text-blue-700 border-blue-200'; label = 'Đã xác nhận'; break;
      case 'CANCELLED': bgColor = 'bg-rose-100 text-rose-700 border-rose-200'; label = 'Đã hủy'; break;
      case 'COMPLETED': bgColor = 'bg-emerald-100 text-emerald-700 border-emerald-200'; label = 'Hoàn thành'; break;
      case 'NO_SHOW': bgColor = 'bg-slate-200 text-slate-600 border-slate-300'; label = 'Khách không đến'; break;
    }
  } else if (type === 'kyc') {
    switch (status) {
      case 'VERIFIED': bgColor = 'bg-blue-100 text-blue-700 border-blue-200'; label = 'Đã xác minh'; break;
      case 'PENDING': bgColor = 'bg-amber-100 text-amber-700 border-amber-200'; label = 'Đang chờ'; break;
      case 'REJECTED': bgColor = 'bg-rose-100 text-rose-700 border-rose-200'; label = 'Từ chối'; break;
      case 'UNVERIFIED': bgColor = 'bg-slate-100 text-slate-600 border-slate-200'; label = 'Chưa xác minh'; break;
    }
  } else if (type === 'role') {
    switch (status) {
      case 'super_admin': bgColor = 'bg-purple-100 text-purple-700 border-purple-200'; label = 'Super Admin'; break;
      case 'admin': bgColor = 'bg-indigo-100 text-indigo-700 border-indigo-200'; label = 'Platform Admin'; break;
      case 'staff': bgColor = 'bg-sky-100 text-sky-700 border-sky-200'; label = 'CSKH (Staff)'; break;
      case 'owner': bgColor = 'bg-orange-100 text-orange-700 border-orange-200'; label = 'Chủ sân'; break;
      case 'venue_staff': bgColor = 'bg-cyan-100 text-cyan-700 border-cyan-200'; label = 'Nhân viên sân'; break;
      case 'customer': bgColor = 'bg-slate-100 text-slate-600 border-slate-200'; label = 'Khách hàng'; break;
      default: label = status; break;
    }
  }

  return (
    <span className={cn("px-2.5 py-1.5 rounded-md text-[11px] font-bold tracking-wide shadow-sm border", bgColor, className)}>
      {label}
    </span>
  );
};
