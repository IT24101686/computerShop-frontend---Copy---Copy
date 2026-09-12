import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaPlus, FaEdit, FaTrash, FaSearch } from "react-icons/fa";
import axiosClient from "../../axiosClient";
import { toast } from "react-hot-toast";
import { confirmToast } from "../../utils/confirmToast";

export default function AdminProductsPage() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [deleting, setDeleting] = useState(null);

    useEffect(() => {
        fetchProducts();
    }, []);

    async function fetchProducts() {
        try {
            setLoading(true);
            const res = await axiosClient.get("/products");
            setProducts(res.data);
        } catch (err) {
            console.error(err);
            toast.error("Failed to load products!");
        } finally {
            setLoading(false);
        }
    }

    async function handleDelete(id, name) {
        const confirmed = await confirmToast(`Delete "${name}"?`);
        if (!confirmed) return;
        try {
            setDeleting(id);
            await axiosClient.delete(`/products/${id}`);
            toast.success("Product deleted!");
            setProducts((prev) => prev.filter((p) => p._id !== id));
        } catch (err) {
            toast.error("Delete failed!");
        } finally {
            setDeleting(null);
        }
    }

    const filtered = products.filter((p) =>
        p.name?.toLowerCase().includes(search.toLowerCase()) ||
        p.category?.toLowerCase().includes(search.toLowerCase()) ||
        p.brand?.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="w-full h-full flex flex-col overflow-hidden">
            {/* Header */}
            <div className="sticky top-0 bg-primary z-10 px-8 pt-8 pb-4 border-b border-secondary/10">
                <div className="flex items-center justify-between mb-4">
                    <div>
                        <h1 className="text-2xl font-extrabold text-secondary">Products</h1>
                        <p className="text-secondary/50 text-sm">{products.length} products total</p>
                    </div>
                    <Link
                        to="/admin/add-product"
                        className="flex items-center gap-2 px-4 py-2 bg-accent text-white rounded-xl font-bold hover:bg-blue-600 transition-colors"
                    >
                        <FaPlus /> Add Product
                    </Link>
                </div>

                {/* Search */}
                <div className="relative">
                    <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-secondary/40" />
                    <input
                        type="text"
                        placeholder="Search products by name, category, brand..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full h-11 pl-11 pr-4 rounded-xl border-2 border-secondary/20 focus:outline-none focus:ring-2 focus:ring-accent bg-white text-secondary"
                    />
                </div>
            </div>

            {/* Table */}
            <div className="flex-1 overflow-y-auto hide-scroll-track px-8 py-4">
                {loading ? (
                    <div className="flex justify-center items-center h-48">
                        <div className="w-10 h-10 border-4 border-accent border-t-transparent rounded-full animate-spin" />
                    </div>
                ) : filtered.length === 0 ? (
                    <div className="text-center py-16 text-secondary/40">
                        <p className="text-5xl mb-3">📦</p>
                        <p className="font-medium">{search ? "No results found" : "No products yet"}</p>
                    </div>
                ) : (
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="text-left text-secondary/50 uppercase text-xs tracking-wider border-b border-secondary/10">
                                <th className="pb-3 pr-4">Product</th>
                                <th className="pb-3 pr-4">Category</th>
                                <th className="pb-3 pr-4">Brand</th>
                                <th className="pb-3 pr-4">Price</th>
                                <th className="pb-3 pr-4">Stock</th>
                                <th className="pb-3">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-secondary/5">
                            {filtered.map((product) => (
                                <tr key={product._id} className="hover:bg-secondary/5 transition-colors">
                                    {/* Product Name */}
                                    <td className="py-3 pr-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center text-xl flex-shrink-0 overflow-hidden">
                                                {product.image?.[0] ? (
                                                    <img src={product.image[0]} className="w-full h-full object-contain" alt={product.name} />
                                                ) : "💻"}
                                            </div>
                                            <div>
                                                <p className="font-semibold text-secondary line-clamp-1">{product.name}</p>
                                                <p className="text-secondary/40 text-xs">{product.productid}</p>
                                            </div>
                                        </div>
                                    </td>

                                    {/* Category */}
                                    <td className="py-3 pr-4">
                                        <span className="px-2 py-1 bg-blue-50 text-blue-700 rounded-lg text-xs font-semibold">
                                            {product.category || "Other"}
                                        </span>
                                    </td>

                                    {/* Brand */}
                                    <td className="py-3 pr-4 text-secondary/70">{product.brand || "—"}</td>

                                    {/* Price */}
                                    <td className="py-3 pr-4 font-bold text-accent">
                                        Rs. {Number(product.price)?.toLocaleString()}
                                    </td>

                                    {/* Stock */}
                                    <td className="py-3 pr-4">
                                        <span className={`text-xs font-semibold ${product.stock > 0 ? "text-green-600" : "text-red-500"}`}>
                                            {product.stock > 0 ? `✅ ${product.stock}` : "❌ Out"}
                                        </span>
                                    </td>

                                    {/* Actions */}
                                    <td className="py-3">
                                        <div className="flex items-center gap-2">
                                            <Link
                                                to={`/admin/edit-product/${product._id}`}
                                                className="p-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition"
                                            >
                                                <FaEdit />
                                            </Link>
                                            <button
                                                onClick={() => handleDelete(product._id, product.name)}
                                                disabled={deleting === product._id}
                                                className="p-2 bg-red-50 text-red-500 rounded-lg hover:bg-red-100 transition disabled:opacity-50"
                                            >
                                                <FaTrash />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
}