import Link from 'next/link';

export default function Home() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-gray-50">
            <h1 className="text-4xl font-bold mb-8 text-primary-700">Sports Booking App</h1>
            <p className="mb-8 text-xl text-gray-600">Book your favorite sports venue easily!</p>
            <div className="flex gap-4">
                <Link href="/login" className="px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition font-medium">
                    Login
                </Link>
                <Link href="/register" className="px-6 py-3 bg-white text-primary-600 border border-primary-600 rounded-lg hover:bg-gray-50 transition font-medium">
                    Register
                </Link>
                <Link href="/venues" className="px-6 py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition font-medium">
                    Browe Venues
                </Link>
            </div>
        </div>
    );
}
