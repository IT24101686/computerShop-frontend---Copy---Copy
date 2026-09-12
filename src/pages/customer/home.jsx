import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axiosClient from "../../axiosClient";
import { toast } from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";
import Tilt from "react-parallax-tilt";
import { useTranslation } from "react-i18next";
import i18n from "../../i18n/i18n";
import useStore from "../../store/useStore";
import {
    FaShippingFast, FaHeadset, FaAward, FaFacebook, FaTwitter,
    FaInstagram, FaLinkedin, FaArrowRight, FaSearch, FaShoppingCart, FaUser, FaStar
} from "react-icons/fa";

const categories = [
    { name: "Laptops", icon: "💻", slug: "Laptop", color: "from-blue-500/20" },
    { name: "Desktops", icon: "🖥️", slug: "Desktop", color: "from-purple-500/20" },
    { name: "Components", icon: "⚙️", slug: "components", color: "from-orange-500/20" },
    { name: "Peripherals", icon: "🖱️", slug: "Accessory", color: "from-green-500/20" },
    { name: "Storage", icon: "💾", slug: "storage", color: "from-red-500/20" },
    { name: "Networking", icon: "🌐", slug: "networking", color: "from-cyan-500/20" },
];

// Animation variants
const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: (i = 0) => ({
        opacity: 1,
        y: 0,
        transition: { delay: i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] },
    }),
};

const stagger = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.08 } },
};

export default function HomePage() {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [scrolled, setScrolled] = useState(false);

    // Global state
    const { user, logout, addToCart, cartCount, language, setLanguage, theme, toggleTheme } = useStore();

    useEffect(() => {
        fetchProducts();
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    async function fetchProducts() {
        try {
            const res = await axiosClient.get("/products");
            setProducts(res.data.slice(0, 8));
        } catch {
            // silent
        } finally {
            setLoading(false);
        }
    }

    function handleLogout() {
        logout();
        toast.success(language === "si" ? "ඉවත් විය!" : "Logged out!");
        navigate("/login");
    }

    function toggleLanguage() {
        const next = language === "en" ? "si" : "en";
        setLanguage(next);
        i18n.changeLanguage(next);
    }

    const features = [
        {
            icon: <FaShippingFast className="text-4xl text-accent" />,
            title: t("fastShipping"),
            desc: t("fastShippingDesc"),
        },
        {
            icon: <FaHeadset className="text-4xl text-accent" />,
            title: t("expertSupportTitle"),
            desc: t("expertSupportDesc"),
        },
        {
            icon: <FaAward className="text-4xl text-accent" />,
            title: t("officialWarranty"),
            desc: t("officialWarrantyDesc"),
        },
    ];

    return (
        <div className="min-h-screen bg-[#fcfcfd] dark:bg-[#0a0f16] font-outfit text-secondary dark:text-white overflow-x-hidden selection:bg-accent/30 transition-colors duration-500">

            {/* ───── STICKY NAVIGATION ───── */}
            <nav className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 px-6 md:px-12 py-5 flex items-center justify-between ${scrolled ? "bg-white/70 dark:bg-[#0a0f16]/70 backdrop-blur-xl shadow-[0_10px_40px_-15px_rgba(0,0,0,0.05)] py-4" : "bg-transparent"
                }`}>
                <Link to="/" className="flex items-center gap-2 group">
                    <div className="bg-accent p-2 rounded-xl shadow-lg rotate-3 group-hover:rotate-0 transition-all duration-500 scale-110 group-hover:bg-secondary dark:group-hover:bg-white">
                        <span className="text-2xl text-white dark:group-hover:text-secondary">🖥️</span>
                    </div>
                    <span className={`text-2xl font-black tracking-tighter ml-1 ${scrolled ? "text-secondary dark:text-white" : "text-white"}`}>
                        Tech<span className="text-accent">Shop</span>
                    </span>
                </Link>

                <div className={`hidden lg:flex items-center gap-10 font-bold text-xs uppercase tracking-[0.2em] ${scrolled ? "text-secondary/70 dark:text-white/70" : "text-white/80"}`}>
                    <Link to="/" className="hover:text-accent transition-all relative group py-2">
                        {t("home")}
                        <span className="absolute bottom-0 left-0 w-full h-[2px] bg-accent scale-x-0 group-hover:scale-x-100 transition-transform origin-left rounded-full" />
                    </Link>
                    <Link to="/products" className="hover:text-accent transition-all relative group py-2">
                        {t("products")}
                        <span className="absolute bottom-0 left-0 w-full h-[2px] bg-accent scale-x-0 group-hover:scale-x-100 transition-transform origin-left rounded-full" />
                    </Link>
                    <Link to="/my-orders" className="hover:text-accent transition-all relative group py-2">
                        {t("myOrders")}
                        <span className="absolute bottom-0 left-0 w-full h-[2px] bg-accent scale-x-0 group-hover:scale-x-100 transition-transform origin-left rounded-full" />
                    </Link>
                </div>

                <div className="flex items-center gap-4">
                    {/* Theme Toggle */}
                    <button
                        onClick={toggleTheme}
                        className={`p-2 rounded-full transition-all ${scrolled ? "text-secondary dark:text-white hover:bg-secondary/5 dark:hover:bg-white/10" : "text-white hover:bg-white/10"}`}
                    >
                        <AnimatePresence mode="wait">
                            {theme === "light" ? (
                                <motion.span key="moon" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} className="block text-lg">🌙</motion.span>
                            ) : (
                                <motion.span key="sun" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} className="block text-lg">☀️</motion.span>
                            )}
                        </AnimatePresence>
                    </button>

                    {/* Language Toggle */}
                    <button
                        onClick={toggleLanguage}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border font-black text-[11px] uppercase tracking-widest transition-all ${scrolled
                            ? "border-secondary/20 dark:border-white/20 text-secondary dark:text-white hover:bg-accent hover:text-white hover:border-accent"
                            : "border-white/20 text-white hover:bg-white/20"
                            }`}
                    >
                        🌐 {language === "en" ? "SI" : "EN"}
                    </button>

                    <button className={`${scrolled ? "text-secondary dark:text-white" : "text-white"} hover:text-accent transition-all p-2 hover:bg-white/10 rounded-full`}>
                        <FaSearch className="text-xl" />
                    </button>

                    {user ? (
                        <div className="flex items-center gap-4">
                            <Link to="/cart" className={`relative p-2.5 rounded-full ${scrolled ? "text-secondary dark:text-white hover:bg-secondary/5 dark:hover:bg-white/10" : "text-white hover:bg-white/10"} transition-all`}>
                                <FaShoppingCart className="text-xl" />
                                {cartCount > 0 && (
                                    <span className="absolute top-1 right-1 bg-accent text-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-black border-2 border-transparent">
                                        {cartCount}
                                    </span>
                                )}
                            </Link>
                            <Link to="/profile" className="flex items-center gap-3 group px-1 py-1 pr-4 rounded-full bg-white/10 backdrop-blur-md border border-white/20 hover:border-accent transition-all">
                                <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-accent transition-transform group-hover:scale-110">
                                    {user.image ? <img src={user.image} className="w-full h-full object-cover" alt="avatar" /> : <div className="w-full h-full bg-accent flex items-center justify-center text-white"><FaUser size={12} /></div>}
                                </div>
                                <span className={`text-[11px] font-black uppercase tracking-widest hidden md:block ${scrolled ? "text-secondary dark:text-white" : "text-white"}`}>
                                    {user.firstName || "Account"}
                                </span>
                            </Link>
                            <button onClick={handleLogout} className="px-5 py-2.5 bg-red-500 text-white rounded-xl hover:bg-red-600 transition-all text-xs font-black uppercase tracking-widest shadow-xl shadow-red-500/20 active:scale-95">
                                {t("logout")}
                            </button>
                        </div>
                    ) : (
                        <div className="flex items-center gap-4">
                            <Link to="/login" className={`px-4 py-2 font-black text-xs uppercase tracking-widest transition-all ${scrolled ? "text-secondary dark:text-white hover:text-accent" : "text-white hover:text-white/60"}`}>
                                {t("login")}
                            </Link>
                            <Link to="/register" className="px-6 py-3 bg-white text-secondary rounded-xl hover:bg-accent hover:text-white transition-all text-xs font-black uppercase tracking-tighter shadow-2xl hover:-translate-y-1 active:scale-95">
                                {t("startJourney")}
                            </Link>
                        </div>
                    )}
                </div>
            </nav>

            {/* ───── HERO ───── */}
            <section className="relative h-screen min-h-[800px] flex items-center flex-col justify-center overflow-hidden bg-secondary">
                <div className="absolute inset-0 z-0">
                    <img src="/hero.png" className="w-full h-full object-cover opacity-30 mix-blend-overlay" alt="" />
                    <div className="absolute top-[10%] right-[10%] w-[500px] h-[500px] bg-accent/20 blur-[150px] rounded-full animate-pulse" />
                    <div className="absolute bottom-[20%] left-[5%] w-[400px] h-[400px] bg-blue-500/10 blur-[120px] rounded-full" />
                    <div className="absolute inset-0 bg-gradient-to-b from-secondary/40 via-secondary/80 to-secondary" />
                </div>

                <motion.div
                    className="container mx-auto px-6 md:px-12 relative z-10 text-center"
                    variants={stagger}
                    initial="hidden"
                    animate="visible"
                >
                    <motion.div variants={fadeInUp} className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-white/5 backdrop-blur-md border border-white/10 text-white/80 font-bold text-[10px] uppercase tracking-[0.4em] mb-10">
                        <span className="w-2 h-2 bg-accent rounded-full animate-ping" />
                        {t("heroTag")}
                    </motion.div>

                    <motion.h1 variants={fadeInUp} custom={1} className="text-7xl md:text-[120px] font-black leading-[0.85] mb-8 tracking-tighter text-white">
                        {t("heroTitle1")} <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent via-blue-400 to-indigo-400">
                            {t("heroTitle2")}
                        </span>
                    </motion.h1>

                    <motion.p variants={fadeInUp} custom={2} className="max-w-2xl mx-auto text-lg md:text-xl text-white/50 mb-12 leading-relaxed font-medium">
                        {t("heroSub")}
                    </motion.p>

                    <motion.div variants={fadeInUp} custom={3} className="flex flex-col sm:flex-row items-center justify-center gap-6">
                        <Link to="/products" className="group px-12 py-5 bg-accent text-white rounded-2xl font-black text-lg hover:bg-blue-600 transition-all hover:scale-105 shadow-[0_20px_50px_-10px_rgba(2,169,247,0.5)] flex items-center gap-4">
                            {t("heroCta1")} <FaArrowRight className="group-hover:translate-x-2 transition-transform" />
                        </Link>
                        <Link to="/products" className="px-10 py-5 bg-white/5 backdrop-blur-xl border border-white/10 text-white rounded-2xl font-black text-lg hover:bg-white/10 transition-all active:scale-95">
                            {t("heroCta2")}
                        </Link>
                    </motion.div>
                </motion.div>

                {/* Bottom Stats */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6, duration: 0.8 }}
                    className="absolute bottom-12 left-1/2 -translate-x-1/2 hidden md:flex items-center gap-12 px-12 py-6 bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl"
                >
                    {[
                        { val: "15k+", label: t("premiumGear") },
                        { val: "5.0", label: t("globalRating") },
                        { val: "24/7", label: t("expertSupport") },
                    ].map((stat, i) => (
                        <div key={i} className={`text-center ${i < 2 ? "border-r border-white/10 pr-12" : ""}`}>
                            <p className="text-3xl font-black text-accent tracking-tighter">{stat.val}</p>
                            <p className="text-[10px] uppercase font-bold text-white/30 tracking-widest mt-1">{stat.label}</p>
                        </div>
                    ))}
                </motion.div>
            </section>

            {/* ───── FEATURES ───── */}
            <section className="py-24 relative z-20 -mt-20">
                <div className="container mx-auto px-6">
                    <motion.div
                        className="grid grid-cols-1 md:grid-cols-3 gap-8"
                        variants={stagger}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.2 }}
                    >
                        {features.map((feat, idx) => (
                            <motion.div
                                key={idx}
                                variants={fadeInUp}
                                custom={idx}
                                className="group p-10 rounded-[40px] bg-white dark:bg-[#121a25] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.05)] border border-slate-100 dark:border-white/5 hover:shadow-[0_40px_100px_-20px_rgba(0,0,0,0.1)] dark:hover:shadow-[0_40px_100px_-20px_rgba(255,255,255,0.02)] transition-all duration-700 hover:-translate-y-3"
                            >
                                <div className="mb-8 p-5 inline-block bg-accent/5 rounded-3xl group-hover:bg-accent transition-all duration-500 group-hover:rotate-[15deg] group-hover:scale-110">
                                    <div className="group-hover:text-white transition-colors">{feat.icon}</div>
                                </div>
                                <h3 className="text-2xl font-black mb-5 text-secondary dark:text-white tracking-tight">{feat.title}</h3>
                                <p className="text-secondary/50 dark:text-white/50 font-medium leading-relaxed text-sm">{feat.desc}</p>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* ───── CATEGORIES ───── */}
            <section className="py-24 bg-primary dark:bg-[#060a0f] overflow-hidden">
                <div className="container mx-auto px-6">
                    <motion.div
                        className="flex flex-col lg:flex-row lg:items-end justify-between mb-20"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7 }}
                    >
                        <div className="max-w-2xl">
                            <span className="text-accent font-black text-xs uppercase tracking-[0.4em] italic mb-4 block">{t("ourCollections")}</span>
                            <h2 className="text-5xl md:text-7xl font-black text-secondary dark:text-white leading-none tracking-tighter">
                                {t("chooseGear")}
                            </h2>
                        </div>
                    </motion.div>

                    <motion.div
                        className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6"
                        variants={stagger}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.2 }}
                    >
                        {categories.map((cat, idx) => (
                            <motion.div key={idx} variants={fadeInUp} custom={idx}>
                                <Link
                                    to={`/products?category=${cat.slug}`}
                                    className={`group relative h-48 rounded-[36px] bg-white dark:bg-[#121a25] border border-slate-100 dark:border-white/5 p-8 flex flex-col justify-end overflow-hidden hover:bg-secondary dark:hover:bg-accent transition-all duration-500 hover:shadow-2xl hover:shadow-secondary/30 block`}
                                >
                                    <div className={`absolute top-0 left-0 w-full h-full bg-gradient-to-br ${cat.color} to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700`} />
                                    <span className="text-5xl translate-y-4 group-hover:-translate-y-12 transition-all duration-500 z-10">{cat.icon}</span>
                                    <span className="text-xs font-black text-secondary dark:text-white group-hover:text-white transition-colors duration-500 uppercase tracking-widest z-10 group-hover:translate-x-2">{cat.name}</span>
                                    <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-all translate-x-4 group-hover:translate-x-0">
                                        <FaArrowRight className="text-accent" />
                                    </div>
                                </Link>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* ───── FEATURED PRODUCTS ───── */}
            <section className="py-32 bg-secondary relative overflow-hidden">
                <div className="absolute -bottom-48 -right-48 w-[800px] h-[800px] bg-accent/10 blur-[200px] rounded-full" />

                <div className="container mx-auto px-6">
                    <motion.div
                        className="flex flex-col md:flex-row items-center justify-between mb-20"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7 }}
                    >
                        <div>
                            <span className="text-accent font-black text-xs uppercase tracking-[0.4em] italic mb-4 block">{t("newDrops")}</span>
                            <h2 className="text-5xl font-black text-white tracking-tighter">
                                {t("featuredHardware")}
                            </h2>
                        </div>
                        <Link to="/products" className="mt-8 md:mt-0 px-8 py-3 bg-white/5 backdrop-blur-md border border-white/10 text-white rounded-xl text-xs font-black tracking-widest hover:bg-accent hover:border-accent transition-all uppercase">
                            {t("viewAllProducts")}
                        </Link>
                    </motion.div>

                    {loading ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                            {[...Array(4)].map((_, i) => (
                                <div key={i} className="h-[480px] rounded-[45px] bg-white/5 animate-pulse" />
                            ))}
                        </div>
                    ) : (
                        <motion.div
                            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
                            variants={stagger}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.1 }}
                        >
                            {products.map((item, i) => (
                                <motion.div key={item._id} variants={fadeInUp} custom={i}>
                                    <ProductCard product={item} t={t} addToCart={addToCart} language={language} />
                                </motion.div>
                            ))}
                        </motion.div>
                    )}
                </div>
            </section>

            {/* ───── NEWSLETTER ───── */}
            <section className="py-32 bg-primary dark:bg-[#060a0f]">
                <div className="container mx-auto px-6">
                    <motion.div
                        className="relative group p-12 md:p-24 rounded-[70px] bg-secondary overflow-hidden shadow-[0_60px_100px_-30px_rgba(0,0,0,0.5)]"
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-accent/20 blur-[150px] rounded-full -translate-y-1/2 translate-x-1/2 group-hover:bg-accent/30 transition-colors duration-700" />
                        <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-500/10 blur-[80px] rounded-full translate-y-1/2 -translate-x-1/2" />

                        <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-12">
                            <div className="text-center lg:text-left">
                                <h2 className="text-4xl md:text-6xl font-black text-white leading-[0.9] mb-6">
                                    {t("getFirstDibs")}
                                </h2>
                            </div>
                            <div className="bg-white/5 backdrop-blur-3xl p-3 rounded-[32px] w-full max-w-xl flex flex-col sm:flex-row items-center border border-white/10 focus-within:border-accent/50 transition-all p-4 shadow-2xl">
                                <input
                                    type="email"
                                    placeholder={t("emailPlaceholder")}
                                    className="flex-1 bg-transparent px-6 py-5 outline-none text-white font-bold placeholder:text-white/20 text-lg"
                                />
                                <button className="w-full sm:w-auto px-12 py-5 bg-accent text-white rounded-2xl font-black text-lg hover:bg-white hover:text-secondary transition-all shadow-2xl hover:shadow-accent/40 active:scale-95">
                                    {t("joinUs")}
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* ───── FOOTER ───── */}
            <footer className="bg-white dark:bg-[#0a0f16] pt-32 pb-16 border-t border-slate-100 dark:border-white/5">
                <div className="container mx-auto px-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-20 mb-32">
                        <div>
                            <Link to="/" className="flex items-center gap-3 mb-10 group">
                                <div className="bg-secondary dark:bg-white p-1.5 rounded-lg shadow-xl group-hover:bg-accent transition-colors">
                                    <span className="text-2xl text-white dark:text-secondary">🖥️</span>
                                </div>
                                <span className="text-2xl font-black text-secondary dark:text-white tracking-tighter">Tech<span className="text-accent">Shop</span></span>
                            </Link>
                            <p className="text-secondary/50 dark:text-white/50 font-medium leading-relaxed text-sm pr-6">
                                The ultimate destination for high-performance computer hardware in Sri Lanka.
                            </p>
                        </div>

                        <div>
                            <h4 className="font-black text-secondary/30 dark:text-white/30 mb-8 uppercase tracking-[0.3em] text-[11px] italic">Quick Menu</h4>
                            <ul className="space-y-4 text-secondary/60 dark:text-white/60 font-bold text-sm">
                                {categories.slice(0, 4).map(c => (
                                    <li key={c.name}><Link to={`/products?category=${c.slug}`} className="hover:text-accent transition-all">{c.name}</Link></li>
                                ))}
                            </ul>
                        </div>

                        <div>
                            <h4 className="font-black text-secondary/30 dark:text-white/30 mb-8 uppercase tracking-[0.3em] text-[11px] italic">Legal info</h4>
                            <ul className="space-y-4 text-secondary/60 dark:text-white/60 font-bold text-sm">
                                <li><a href="#" className="hover:text-accent">Terms</a></li>
                                <li><a href="#" className="hover:text-accent">Privacy</a></li>
                                <li><a href="#" className="hover:text-accent">Warranty Policy</a></li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="font-black text-secondary/30 dark:text-white/30 mb-8 uppercase tracking-[0.3em] text-[11px] italic">Socials</h4>
                            <div className="flex gap-4">
                                {[FaFacebook, FaTwitter, FaInstagram, FaLinkedin].map((Icon, idx) => (
                                    <a key={idx} href="#" className="w-12 h-12 rounded-2xl bg-secondary/5 dark:bg-white/5 flex items-center justify-center text-secondary/60 dark:text-white/60 hover:bg-accent hover:text-white transition-all text-xl">
                                        <Icon />
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="pt-12 border-t border-slate-100 dark:border-white/5 text-center">
                        <p className="text-secondary/20 dark:text-white/20 font-black text-[10px] uppercase tracking-[0.5em]">© 2025 TechShop Inc. All Rights Reserved. Stay Ahead.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
}

// ───── PREMIUM PRODUCT CARD WITH 3D TILT ─────
function ProductCard({ product, t, addToCart, language }) {
    const navigate = useNavigate();

    function handleAddToCart(e) {
        e.stopPropagation();
        addToCart(product, 1);
        toast.success(
            language === "si"
                ? `${product.name} කරත්තයට එකතු විය! 🛒`
                : `${product.name} added to cart! 🛒`
        );
    }

    return (
        <Tilt
            tiltMaxAngleX={8}
            tiltMaxAngleY={8}
            glareEnable={true}
            glareMaxOpacity={0.08}
            glareColor="#02a9f7"
            glarePosition="all"
            scale={1.02}
            transitionSpeed={1200}
            className="rounded-[45px]"
        >
            <div
                onClick={() => navigate(`/products/${product._id}`)}
                className="group relative h-[480px] bg-white/5 backdrop-blur-xl rounded-[45px] p-3 border border-white/10 hover:bg-white/10 hover:shadow-[0_40px_100px_-20px_rgba(0,0,0,0.4)] transition-all duration-700 cursor-pointer overflow-hidden flex flex-col hover:border-white/20 active:scale-[0.98]"
            >
                {/* Ambient overlay */}
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                {/* Image */}
                <div className="relative h-60 w-full rounded-[36px] overflow-hidden bg-white/5 flex items-center justify-center p-10 group-hover:p-8 transition-all duration-700">
                    <div className="absolute inset-0 bg-white/5 opacity-40 backdrop-blur-md" />
                    {product.image?.[0] ? (
                        <img
                            src={product.image[0]}
                            alt={product.name}
                            className="relative z-10 h-full w-full object-contain group-hover:scale-110 drop-shadow-2xl transition-transform duration-700"
                        />
                    ) : (
                        <span className="relative z-10 text-8xl select-none group-hover:scale-110 transition-transform duration-700 drop-shadow-2xl">🖥️</span>
                    )}

                    {/* Stock Badges */}
                    <div className="absolute top-5 left-5 z-20 flex flex-col gap-2">
                        {product.stock <= 5 && product.stock > 0 && (
                            <div className="px-3 py-1 bg-red-500 text-white text-[9px] font-black italic rounded-full shadow-lg animate-pulse">{t("limitedStock")}</div>
                        )}
                        {!product.stock && (
                            <div className="px-3 py-1 bg-secondary text-white text-[9px] font-black italic rounded-full shadow-lg">{t("outOfStock")}</div>
                        )}
                    </div>
                </div>

                {/* Info */}
                <div className="p-7 pt-9 flex flex-col flex-1 relative z-10">
                    <div className="flex items-center justify-between mb-4">
                        <span className="text-[10px] font-black text-accent uppercase tracking-[0.3em] italic">{product.category || "General"}</span>
                        <div className="flex items-center gap-1.5 px-2 py-1 rounded-full bg-white/5 border border-white/10">
                            <FaStar className="text-yellow-400 text-[10px]" />
                            <span className="text-white font-black text-[10px]">4.9</span>
                        </div>
                    </div>

                    <h3 className="text-lg font-black text-white leading-tight mb-6 group-hover:text-accent transition-colors line-clamp-2 min-h-12 tracking-tight">
                        {product.name}
                    </h3>

                    <div className="mt-auto flex items-center justify-between">
                        <div>
                            <p className="text-[10px] font-black text-white/30 uppercase tracking-widest mb-1">{t("elitePrice")}</p>
                            <p className="text-2xl font-black text-white tracking-tighter">
                                Rs. {product.price?.toLocaleString()}
                            </p>
                        </div>

                        <button
                            onClick={handleAddToCart}
                            disabled={!product.stock}
                            className="w-14 h-14 bg-accent text-white rounded-[22px] flex items-center justify-center shadow-2xl shadow-accent/40 hover:bg-white hover:text-secondary group/btn transition-all active:scale-90 disabled:opacity-40 disabled:cursor-not-allowed"
                        >
                            <FaShoppingCart className="group-hover/btn:scale-110 transition-transform" />
                        </button>
                    </div>
                </div>
            </div>
        </Tilt>
    );
}
