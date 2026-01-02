
interface SidebarProps {
    items: { label: string; href: string; icon: string }[];
}

export const Sidebar = ({ items }: SidebarProps) => {
    return (
        <aside className="w-64 bg-white shadow-md">
            <div className="p-4 border-b">
                <h1 className="text-xl font-bold text-gray-800">Admin Panel</h1>
            </div>
            <nav className="p-4">
                <ul>
                    {items.map((item) => (
                        <li key={item.href} className="mb-2">
                            <a href={item.href} className="flex items-center p-2 text-gray-600 hover:bg-gray-100 rounded">
                                <span>{item.label}</span>
                            </a>
                        </li>
                    ))}
                </ul>
            </nav>
        </aside>
    );
};
