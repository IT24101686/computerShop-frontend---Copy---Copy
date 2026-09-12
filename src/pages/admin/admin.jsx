import { Link, Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { FaListUl, FaBox, FaUsers, FaSignOutAlt, FaTachometerAlt } from "react-icons/fa";
import { toast } from "react-hot-toast";

import AdminProductsPage from "../product/adminProductsPage";
import AdminAddProductPage from "../product/adminAddProductPage";
import AdminEditProductPage from "../product/adminEditProductPage";
import AdminUsersPage from "./adminUsersPage";
import AdminOrdersPage from "../order/adminOrdersPage";
import AdminDashboard from "./adminDashboard";
import AdminFinancePage from "../payment/adminFinancePage";
import AdminSuppliersPage from "../supplier/adminSuppliersPage";
import AdminWarrantyClaims from "../order/adminWarrantyClaims";

const navItems = [
    { label: "Dashboard", icon: <FaTachometerAlt />, path: "/admin" },
    { label: "Orders", icon: <FaListUl />, path: "/admin/orders" },
    { label: "Products", icon: <FaBox />, path: "/admin/products" },
    { label: "Users", icon: <FaUsers />, path: "/admin/users" },
    { label: "Suppliers", icon: <span>📦</span>, path: "/admin/suppliers" },
    { label: "Warranty", icon: <span>🛡️</span>, path: "/admin/warranty" },
    { label: "Finance", icon: <span>💰</span>, path: "/admin/finance" },
];

export default function AdminPage() {
    const location = useLocation();
    const navigate = useNavigate();

    function handleLogout() {
        localStorage.clear();
        toast.success("Logged out!");
        navigate("/login");
    }

    return (
        <div className="w-full h-screen flex bg-secondary overflow-hidden">

            {/* ── Sidebar ── */}
            <aside className="w-[260px] h-screen flex flex-col bg-secondary flex-shrink-0">
                {/* Logo */}
                <div className="px-6 py-6 border-b border-white/10">
                    <h1 className="text-2xl font-extrabold text-white">🖥️ TechShop</h1>
                    <p className="text-white/40 text-xs mt-1">Admin Panel</p>
                </div>

                {/* Nav Links */}
                <nav className="flex-1 px-3 py-4 space-y-1">
                    {navItems.map((item) => {
                        const isActive = location.pathname === item.path;
                        return (
                            <Link
                                key={item.path}
                                to={item.path}
                                className={`flex items-center gap-3 px-4 py-3 rounded-xl font-semibold text-sm transition-all
                                    ${isActive
                                        ? "bg-accent text-white shadow-lg shadow-accent/30"
                                        : "text-white/60 hover:bg-white/10 hover:text-white"
                                    }`}
                            >
                                <span className="text-base">{item.icon}</span>
                                {item.label}
                            </Link>
                        );
                    })}
                </nav>

                {/* Logout */}
                <div className="px-3 py-4 border-t border-white/10">
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-white/60 hover:bg-red-500/20 hover:text-red-400 font-semibold text-sm transition-all"
                    >
                        <FaSignOutAlt /> Logout
                    </button>
                </div>
            </aside>

            {/* ── Main Content ── */}
            <main className="flex-1 h-screen bg-primary rounded-l-[24px] overflow-hidden">
                <Routes>
                    <Route path="/" element={<AdminDashboard />} />
                    <Route path="/orders" element={<AdminOrdersPage />} />
                    <Route path="/products" element={<AdminProductsPage />} />
                    <Route path="/add-product" element={<AdminAddProductPage />} />
                    <Route path="/edit-product/:id" element={<AdminEditProductPage />} />
                    <Route path="/users" element={<AdminUsersPage />} />
                    <Route path="/suppliers" element={<AdminSuppliersPage />} />
                    <Route path="/warranty" element={<AdminWarrantyClaims />} />
                    <Route path="/finance" element={<AdminFinancePage />} />
                </Routes>
            </main>

        </div>
    );
}

