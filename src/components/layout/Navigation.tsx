
export const Navigation = () => {
    return (
        <nav className="hidden md:flex space-x-6">
            <a href="/" className="text-gray-600 hover:text-primary-600 font-medium">Home</a>
            <a href="/venues" className="text-gray-600 hover:text-primary-600 font-medium">Venues</a>
            <a href="/bookings" className="text-gray-600 hover:text-primary-600 font-medium">My Bookings</a>
            <a href="/profile" className="text-gray-600 hover:text-primary-600 font-medium">Profile</a>
        </nav>
    )
}
