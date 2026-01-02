
export const Header = () => {
    return (
        <header className="bg-white shadow">
            <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                <div className="text-xl font-bold text-primary-600">Sports Booking</div>
                <nav>
                    <ul className="flex space-x-4">
                        <li><a href="/" className="text-gray-600 hover:text-primary-600">Home</a></li>
                        <li><a href="/venues" className="text-gray-600 hover:text-primary-600">Venues</a></li>
                        <li><a href="/login" className="text-gray-600 hover:text-primary-600">Login</a></li>
                    </ul>
                </nav>
            </div>
        </header>
    );
};
