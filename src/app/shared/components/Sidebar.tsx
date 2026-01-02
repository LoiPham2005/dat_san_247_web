// "use client";

// import React from "react";
// import Link from "next/link";
// import routesApp from "../constants/routes";

// const Sidebar = ({ isCollapsed }: { isCollapsed: boolean }) => {
//   return (
//     <aside className={`sidebar ${isCollapsed ? "collapsed" : ""}`}>
//       <nav>
//         <ul>
//           <li>
//             <Link href={routesApp.home}>🏠 Trang chủ</Link>
//           </li>
//           <li>
//             <Link href={routesApp.sportCategories}>👤 Hồ sơ</Link>
//           </li>
//           {/* <li>
//             <Link href={routesApp.settings}>⚙️ Cài đặt</Link>
//           </li> */}
//         </ul>
//       </nav>
//     </aside>
//   );
// };

// export default Sidebar;



"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import {
    FaTachometerAlt,
    FaBoxes,
    FaTags,
    FaTag,
    FaTicketAlt,
    FaBell,
    FaUser,
    FaCommentDots,
    FaPen,
    FaListUl,
    FaMoneyBillWave,
    FaPowerOff,
    FaImage,
} from "react-icons/fa";
import routesApp from "../constants/routes";

const menuItems = [
    { name: "Dashboard", href: routesApp.home, icon: FaTachometerAlt },
    { name: "Danh mục", href: routesApp.sportCategories, icon: FaBoxes },
    { name: "Sân thể thao", href: routesApp.venues, icon: FaTags },
    //   { name: "Thương hiệu", href: routesApp.brand, icon: FaTag },
    //   { name: "Banner", href: routesApp.banner, icon: FaImage },
    //   { name: "Voucher", href: routesApp.voucher, icon: FaTicketAlt },
    //   { name: "Thông báo", href: routesApp.notification, icon: FaBell },
    //   { name: "Tài khoản", href: routesApp.account, icon: FaUser },
    //   { name: "Hộp thư", href: routesApp.chats, icon: FaCommentDots },
    //   { name: "Bài viết", href: routesApp.posts, icon: FaPen },
    //   { name: "Đơn hàng", href: routesApp.orderList, icon: FaListUl },
    //   { name: "Thanh toán", href: routesApp.paymentHistory, icon: FaMoneyBillWave },
];

export default function Sidebar() {
    const pathname = usePathname();
    const router = useRouter();
    const [collapsed, setCollapsed] = useState(false);

    const handleLogout = () => {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("userId");
        router.push(routesApp.login);
    };

    return (
        <aside
            className={`h-screen bg-white dark:bg-gray-900 shadow-lg transition-all duration-300 fixed left-0 top-0 ${collapsed ? "w-20" : "w-64"
                }`}
        >
            {/* Logo */}
            <div className="flex items-center justify-between p-4">
                {!collapsed && (
                    <h1 className="text-2xl font-bold text-green-400">Đặt Sân 24/7 & SportHub</h1>
                )}
                <button
                    onClick={() => setCollapsed(!collapsed)}
                    className="text-gray-600 dark:text-gray-300 hover:text-green-500"
                >
                    {collapsed ? "»" : "«"}
                </button>
            </div>

            {/* Menu */}
            <nav className="mt-4">
                <ul className="flex flex-col space-y-1">
                    {menuItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = pathname === item.href;
                        return (
                            <li key={item.href}>
                                <Link
                                    href={item.href}
                                    className={`flex items-center px-4 py-3 rounded-md transition-all ${isActive
                                        ? "bg-green-500 text-white"
                                        : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                                        }`}
                                    title={collapsed ? item.name : ""}
                                >
                                    <Icon className="text-lg" />
                                    {!collapsed && <span className="ml-3">{item.name}</span>}
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </nav>

            {/* Logout */}
            <div className="absolute bottom-5 w-full">
                <button
                    onClick={handleLogout}
                    className="flex items-center w-full px-4 py-3 text-red-500 hover:bg-red-100 dark:hover:bg-red-800 transition-all"
                    title={collapsed ? "Đăng xuất" : ""}
                >
                    <FaPowerOff className="text-lg" />
                    {!collapsed && <span className="ml-3">Đăng xuất</span>}
                </button>
            </div>
        </aside>
    );
}
