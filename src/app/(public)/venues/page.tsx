import React from 'react';
import { VenueCard } from '@/features/venue/components/VenueCard';
import { VenueFilters } from '@/features/venue/components/VenueFilters';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Danh sách sân thể thao | DatSan247',
    description: 'Khám phá và đặt các sân bóng đá, cầu lông, tennis chất lượng nhất',
};

// Mock data (will move to API later)
const mockVenues = [
    {
        id: '1',
        name: 'Sân Bóng Đá Chảo Lửa',
        slug: 'san-bong-da-chao-lua',
        address: '30 Phan Thúc Duyện',
        city: 'TP.HCM',
        district: 'Quận Tân Bình',
        rating: 4.8,
        total_reviews: 120,
        sports: ['Bóng đá', 'Giải khát'],
        min_price: 150000,
    },
    {
        id: '2',
        name: 'Cầu Lông Viettel',
        slug: 'cau-long-viettel',
        address: '158 Cách Mạng Tháng Tám',
        city: 'TP.HCM',
        district: 'Quận 10',
        rating: 4.9,
        total_reviews: 84,
        sports: ['Cầu lông'],
        min_price: 80000,
    },
    {
        id: '3',
        name: 'Sân Tennis Kỳ Hòa',
        slug: 'san-tennis-ky-hoa',
        address: '238 Ba Tháng Hai',
        city: 'TP.HCM',
        district: 'Quận 10',
        rating: 4.5,
        total_reviews: 210,
        sports: ['Tennis', 'Hồ bơi'],
        min_price: 200000,
    },
    {
        id: '4',
        name: 'Sân Cầu Lông T19',
        slug: 'cau-long-t19',
        address: 'Đào Duy Anh',
        city: 'TP.HCM',
        district: 'Quận Phú Nhuận',
        rating: 4.2,
        total_reviews: 45,
        sports: ['Cầu lông'],
        min_price: 75000,
    },
];

export default function VenuesPage() {
    return (
        <div className="bg-slate-50 min-h-screen">
            <div className="container px-4 md:px-8 py-12">
                <div className="flex flex-col md:flex-row gap-8">
                    {/* Sidebar Filters */}
                    <aside className="w-full md:w-80 flex-shrink-0">
                        <VenueFilters />
                    </aside>

                    {/* Main Content */}
                    <main className="flex-1">
                        <div className="flex items-center justify-between mb-8">
                            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
                                Tìm thấy <span className="text-primary">{mockVenues.length}</span> sân thể thao
                            </h1>
                            <div className="flex items-center gap-2 text-sm text-slate-500 font-medium bg-white px-3 py-2 rounded-xl border border-slate-200">
                                <span>Sắp xếp:</span>
                                <select className="bg-transparent border-0 focus:ring-0 cursor-pointer font-bold text-slate-800">
                                    <option>Phổ biến nhất</option>
                                    <option>Giá thấp nhất</option>
                                    <option>Đánh giá cao nhất</option>
                                </select>
                            </div>
                        </div>

                        {/* Venues Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                            {mockVenues.map((venue) => (
                                <VenueCard key={venue.id} venue={venue} />
                            ))}
                            {/* Duplicate some rows for better visual */}
                            {mockVenues.map((venue) => (
                                <VenueCard key={venue.id + "-copy"} venue={{ ...venue, id: venue.id + "2" }} />
                            ))}
                        </div>
                    </main>
                </div>
            </div>
        </div>
    );
}
