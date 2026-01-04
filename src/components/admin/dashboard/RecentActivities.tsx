import { cn } from "@/lib/utils/format";

const activities = [
    {
        id: 1,
        user: {
            name: 'Jackson Lee',
            avatar: 'https://ui-avatars.com/api/?name=Jackson+Lee&background=random',
        },
        action: 'booked a venue',
        target: 'Soccer Field A',
        time: '2 minutes ago',
        type: 'booking'
    },
    {
        id: 2,
        user: {
            name: 'Isabella Nguyen',
            avatar: 'https://ui-avatars.com/api/?name=Isabella+Nguyen&background=random',
        },
        action: 'registered as',
        target: 'Venue Owner',
        time: '15 minutes ago',
        type: 'register'
    },
    {
        id: 3,
        user: {
            name: 'William Kim',
            avatar: 'https://ui-avatars.com/api/?name=William+Kim&background=random',
        },
        action: 'cancelled booking',
        target: '#BK-2024-001',
        time: '1 hour ago',
        type: 'cancel'
    },
    {
        id: 4,
        user: {
            name: 'Sofia Davis',
            avatar: 'https://ui-avatars.com/api/?name=Sofia+Davis&background=random',
        },
        action: 'left a review on',
        target: 'Tennis Court 1',
        time: '2 hours ago',
        type: 'review'
    },
];

export const RecentActivities = () => {
    return (
        <div className="space-y-8">
            {activities.map((item, index) => (
                <div key={item.id} className="flex items-start gap-4 relative">
                    {/* Vertical Line */}
                    {index !== activities.length - 1 && (
                        <div className="absolute left-[19px] top-10 bottom-[-32px] w-[2px] bg-gray-100 dark:bg-gray-800" />
                    )}

                    <div className="relative">
                        <img
                            src={item.user.avatar}
                            alt={item.user.name}
                            className="h-10 w-10 rounded-full border-2 border-white shadow-sm dark:border-gray-900"
                        />
                        <span className={cn(
                            "absolute bottom-0 right-0 block h-3 w-3 rounded-full ring-2 ring-white dark:ring-gray-900",
                            {
                                'bg-green-500': item.type === 'booking',
                                'bg-blue-500': item.type === 'register',
                                'bg-red-500': item.type === 'cancel',
                                'bg-yellow-500': item.type === 'review',
                            }
                        )} />
                    </div>

                    <div className="flex-1 space-y-1">
                        <p className="text-sm font-medium text-gray-900 dark:text-white">
                            {item.user.name} <span className="font-normal text-gray-500 dark:text-gray-400">{item.action}</span> <span className="font-medium text-primary-600 dark:text-primary-400">{item.target}</span>
                        </p>
                        <p className="text-xs text-gray-400">
                            {item.time}
                        </p>
                    </div>
                </div>
            ))}
        </div>
    );
};
