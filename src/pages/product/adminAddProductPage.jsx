import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosClient from "../../axiosClient";
import { toast } from "react-hot-toast";

export default function AdminAddProductPage() {
    const [productId, setProductId] = useState("");
    const [productName, setProductName] = useState("");
    const [description, setDescription] = useState("");
    const [AltName, setAltName] = useState("");
    const [price, setPrice] = useState("");
    const [LabledPrice, setLabledPrice] = useState("");
    const [category, setCategory] = useState("Other");
    const [brand, setBrand] = useState("Generic");
    const [model, setModel] = useState("");
    const [warranty, setWarranty] = useState("No Warranty");
    const [stock, setStock] = useState(0);
    const [isVisible, setIsVisible] = useState(true);
    const [imageUrls, setImageUrls] = useState([]);     // uploaded image URLs
    const [uploading, setUploading] = useState(false);  // upload loading state

    const navigate = useNavigate();

    // Upload images to Supabase via backend /upload
    async function handleImageUpload(e) {
        const files = Array.from(e.target.files);
        if (files.length === 0) return;
        setUploading(true);
        try {
            const uploaded = [];
            for (const file of files) {
                const formData = new FormData();
                formData.append("image", file);
                const res = await axiosClient.post("/upload", formData, {
                    headers: { "Content-Type": "multipart/form-data" }
                });
                uploaded.push(res.data.imageUrl);
            }
            setImageUrls(prev => [...prev, ...uploaded]);
            toast.success(`${uploaded.length} image(s) uploaded!`);
        } catch (err) {
            toast.error("Image upload failed: " + (err?.response?.data?.message || err.message));
        } finally {
            setUploading(false);
        }
    }

    function removeImage(index) {
        setImageUrls(prev => prev.filter((_, i) => i !== index));
    }

    async function handleAddProduct() {
        if (!productId || !productName || !description || !price) {
            toast.error("Please fill all required fields!");
            return;
        }

        const numPrice = Number(price);
        const numLabelled = Number(LabledPrice) || numPrice;

        // Validate: labelledprice must be >= price (MRP should be >= selling price)
        if (Number(LabledPrice) > 0 && Number(LabledPrice) < numPrice) {
            toast.error(`Labelled price (Rs. ${Number(LabledPrice).toLocaleString()}) cannot be less than selling price (Rs. ${numPrice.toLocaleString()})!`);
            return;
        }

        try {
            await axiosClient.post("/products", {
                productid: productId,
                name: productName,
                description,
                altnames: AltName.split(",").map(n => n.trim()).filter(Boolean),
                price: numPrice,
                labelledprice: numLabelled >= numPrice ? numLabelled : numPrice,
                category,
                brand,
                warranty,
                model,
                stock: Number(stock),
                isvisible: isVisible,
                image: imageUrls.length > 0 ? imageUrls : ["/images/default.png"],
            });
            toast.success("Product added successfully!");
            navigate("/admin/products");
        } catch (error) {
            const msg = error?.response?.data?.message || error.message;
            toast.error("Error: " + msg);
        }
    }


    return (
        <div className=" overflow-y-scroll hide-scroll-track rounded-2xl w-full h-full bg-[#e0f4ff] p-8" >
            <h1 className="text-3xl font-bold mb-4 text-[#003366] whitespace-nowrap sticky top-0 bg-primary">Add New Product</h1>


            <div className="w-full min-h-screen bg-[#e0f4ff] p-8 flex flex-wrap items-start" >

                {/* Product ID */}
                <div className="flex-[0_0_50%] p-2 flex flex-col" >
                    <label className="text-lg font-bold text-[#1e3a8a] mb-1">Product ID</label>
                    <input value={productId}
                        onChange={(e) => setProductId(e.target.value)}
                        placeholder="Ex: ID001"
                        className="w-full h-[55px] border-[3px] border-[#81d4fa] rounded-xl px-4 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white"
                    />
                </div>

                {/* Product Name */}
                <div className="flex-[0_0_50%] p-2 flex flex-col" >
                    <label className="text-lg font-bold text-[#1e3a8a] mb-1">Product Name</label>
                    <input value={productName}
                        onChange={(e) => setProductName(e.target.value)}
                        placeholder="Ex: Laptop"
                        className="w-full h-[55px] border-[3px] border-[#81d4fa] rounded-xl px-4 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white"
                    />
                </div>

                {/* Images Upload - Full Width */}
                <div className="flex-[0_0_100%] p-2 flex flex-col">
                    <label className="text-lg font-bold text-[#1e3a8a] mb-2">Product Images</label>

                    {/* Upload Button */}
                    <label className={`flex items-center justify-center w-full h-[55px] border-[3px] border-dashed border-[#81d4fa] rounded-xl cursor-pointer hover:bg-blue-50 transition-colors ${uploading ? "opacity-60 pointer-events-none" : ""}`}>
                        <span className="text-[#1e3a8a] font-semibold text-sm">
                            {uploading ? "⏳ Uploading..." : "📸 Click to upload images (multiple)"}
                        </span>
                        <input
                            type="file"
                            multiple
                            accept="image/*"
                            onChange={handleImageUpload}
                            className="hidden"
                        />
                    </label>

                    {/* Image Previews */}
                    {imageUrls.length > 0 && (
                        <div className="flex flex-wrap gap-3 mt-3">
                            {imageUrls.map((url, i) => (
                                <div key={i} className="relative group w-24 h-24">
                                    <img
                                        src={url}
                                        alt={`product-${i}`}
                                        className="w-full h-full object-cover rounded-xl border-2 border-blue-200"
                                    />
                                    <button
                                        onClick={() => removeImage(i)}
                                        className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity"
                                    >
                                        ✕
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Description - Full Width */}
                <div className="flex-[0_0_100%] p-2 flex flex-col" >
                    <label className="text-lg font-bold text-[#1e3a8a] mb-1">Description</label>
                    <textarea value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Ex: Laptop"
                        className="w-full h-[120px] border-[3px] border-[#81d4fa] rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white resize-none"
                    />
                </div>

                {/* Alternative Names */}
                <div className="flex-[0_0_100%] p-2 flex flex-col" >
                    <label className="text-lg font-bold text-[#1e3a8a] mb-1">Alternative Names (Comma Separated)</label>
                    <input value={AltName}
                        onChange={(e) => setAltName(e.target.value)}
                        placeholder="Ex: Laptop, Notebook, Portable Computer"
                        className="w-full h-[55px] border-[3px] border-[#81d4fa] rounded-xl px-4 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white"
                    />
                </div>

                {/* Price */}
                <div className="flex-[0_0_33%] p-2 flex flex-col" >
                    <label className="text-lg font-bold text-[#1e3a8a] mb-1">Price (Rs.) *</label>
                    <input value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        type="number"
                        placeholder="Ex: 50000"
                        className="w-full h-[55px] border-[3px] border-[#81d4fa] rounded-xl px-4 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white"
                    />
                </div>

                {/* Labeled Price */}
                <div className="flex-[0_0_33%] p-2 flex flex-col" >
                    <label className="text-lg font-bold text-[#1e3a8a] mb-1">
                        Labelled Price / MRP (Rs.)
                        <span className="text-xs text-gray-400 font-normal ml-1">(must be ≥ selling price)</span>
                    </label>
                    <input value={LabledPrice}
                        onChange={(e) => setLabledPrice(e.target.value)}
                        type="number"
                        placeholder="Ex: 60000"
                        className={`w-full h-[55px] border-[3px] rounded-xl px-4 focus:outline-none focus:ring-2 bg-white ${Number(LabledPrice) > 0 && Number(LabledPrice) < Number(price)
                            ? "border-red-400 focus:ring-red-400"
                            : "border-[#81d4fa] focus:ring-blue-400"
                            }`}
                    />
                    {/* Live feedback */}
                    {Number(price) > 0 && Number(LabledPrice) > 0 && (
                        Number(LabledPrice) < Number(price) ? (
                            <p className="text-red-500 text-xs font-semibold mt-1">
                                ⚠️ Labelled price must be ≥ selling price (Rs. {Number(price).toLocaleString()})
                            </p>
                        ) : Number(LabledPrice) > Number(price) ? (
                            <p className="text-green-600 text-xs font-semibold mt-1">
                                ✅ Discount: {Math.round((1 - Number(price) / Number(LabledPrice)) * 100)}% off
                                &nbsp;(Save Rs. {(Number(LabledPrice) - Number(price)).toLocaleString()})
                            </p>
                        ) : (
                            <p className="text-gray-400 text-xs mt-1">No discount (price = MRP)</p>
                        )
                    )}
                </div>

                {/* Stock */}
                <div className="flex-[0_0_33%] p-2 flex flex-col" >
                    <label className="text-lg font-bold text-[#1e3a8a] mb-1">Stock Qty</label>
                    <input value={stock}
                        onChange={(e) => setStock(e.target.value)}
                        type="number"
                        placeholder="Ex: 10"
                        className="w-full h-[55px] border-[3px] border-[#81d4fa] rounded-xl px-4 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white"
                    />
                </div>

                {/* Bottom Row - 4 columns (25% each) */}
                <div className="flex-[0_0_25%] p-2 flex flex-col" >
                    <label className="text-lg font-bold text-[#1e3a8a] mb-1">Categories</label>
                    <select value={category} onChange={(e) => setCategory(e.target.value)} className="w-full h-[55px] border-[3px] border-[#81d4fa] rounded-xl px-4 bg-white focus:outline-none">
                        <option value="Other">Others</option>
                        <option value="Laptop">Laptops</option>
                        <option value="Desktop">Desktops</option>
                        <option value="Monitor">Monitors</option>
                        <option value="Accessory">Accessories</option>

                    </select>
                </div>

                <div className="flex-[0_0_25%] p-2 flex flex-col" >
                    <label className="text-lg font-bold text-[#1e3a8a] mb-1">Brand</label>
                    <select value={brand} onChange={(e) => setBrand(e.target.value)} className="w-full h-[55px] border-[3px] border-[#81d4fa] rounded-xl px-4 bg-white focus:outline-none">
                        <option value="Generic">Generic</option>
                        <option value="Dell">Dell</option>
                        <option value="HP">HP</option>
                        <option value="Lenovo">Lenovo</option>
                        <option value="Apple">Apple</option>
                        <option value="Asus">Asus</option>
                        <option value="Acer">Acer</option>
                    </select>
                </div>



                <div className="flex-[0_0_25%] p-2 flex flex-col" >
                    <label className="text-lg font-bold text-[#1e3a8a] mb-1">Model</label>
                    <input value={model}
                        onChange={(e) => setModel(e.target.value)}
                        placeholder="Ex: Inspiron 15"
                        className="w-full h-[55px] border-[3px] border-[#81d4fa] rounded-xl px-4 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white"
                    />
                </div>

                {/* Warranty */}
                <div className="flex-[0_0_25%] p-2 flex flex-col" >
                    <label className="text-lg font-bold text-[#1e3a8a] mb-1">Warranty</label>
                    <input value={warranty}
                        onChange={(e) => setWarranty(e.target.value)}
                        placeholder="Ex: 1 Year, 6 Months"
                        className="w-full h-[55px] border-[3px] border-[#81d4fa] rounded-xl px-4 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white"
                    />
                </div>

                <div className="flex-[0_0_25%] p-2 flex flex-col" >
                    <label className="text-lg font-bold text-[#1e3a8a] mb-1">
                        Visibility
                        <span className="text-xs text-gray-400 font-normal ml-1">(customer can see?)</span>
                    </label>
                    <select
                        value={isVisible ? "true" : "false"}
                        onChange={(e) => setIsVisible(e.target.value === "true")}
                        className={`w-full h-[55px] border-[3px] rounded-xl px-4 bg-white focus:outline-none font-bold ${isVisible ? "border-green-400 text-green-700" : "border-red-300 text-red-600"
                            }`}
                    >
                        <option value="true">✅ Visible (Public)</option>
                        <option value="false">🙈 Hidden (Invisible)</option>
                    </select>
                    <p className="text-xs mt-1 font-medium" style={{ color: isVisible ? "#16a34a" : "#dc2626" }}>
                        {isVisible ? "✅ Product will be shown to customers" : "🙈 Product is hidden from customers"}
                    </p>
                </div>
                <div className="w-full h-[100px] sticky bottom-0 flex items-center justify-end px-10 gap-4 shadow-[0_-5px_15px_rgba(0,0,0,0.05)] rounded-b-2xl gap-4">
                    <button className="px-6 py-3 bg-gray-300 text-gray-700 rounded-lg hover:bg-red-900 transition-colors duration-300 font-bold">Cancel</button>
                    <button onClick={handleAddProduct} className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-green-900 transition-colors duration-300 font-bold">Add Product</button>
                </div>




            </div>
        </div>
    )
}