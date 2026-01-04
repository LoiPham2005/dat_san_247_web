export const MOCK_OWNER_VENUE_DETAILS = {
    id: 'ov1',
    name: 'Sân bóng đá Mini 247',
    description: 'Sân bóng đá cỏ nhân tạo chất lượng cao, đạt chuẩn FIFA. Có đèn chiếu sáng, wifi miễn phí và khu vực căng tin.',
    address: '123 Đường 3/2, Quận 10, TP.HCM',
    type: 'Soccer',
    status: 'ACTIVE',
    images: [
        'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800&auto=format&fit=crop&q=60',
        'https://images.unsplash.com/photo-1529900748604-07564a03e7a6?w=800&auto=format&fit=crop&q=60',
        'https://images.unsplash.com/photo-1518609878373-06d740f60d8b?w=800&auto=format&fit=crop&q=60'
    ],
    amenities: ['Wifi', 'Parking', 'Shower', 'Canteen', 'Lighting'],
    pricing: {
        default: 300000,
        weekend: 500000,
        peak: 450000
    },
    openingHours: {
        open: '06:00',
        close: '23:00'
    },
    rules: [
        'Không mang giày đinh kim loại',
        'Không hút thuốc trong sân',
        'Giữ vệ sinh chung'
    ]
};
