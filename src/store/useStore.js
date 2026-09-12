import { create } from "zustand";
import { persist } from "zustand/middleware";

const useStore = create(
    persist(
        (set, get) => ({
            // ── Auth ──
            user: JSON.parse(localStorage.getItem("user") || "null"),
            token: localStorage.getItem("token") || null,
            setUser: (user, token) => {
                localStorage.setItem("user", JSON.stringify(user));
                localStorage.setItem("token", token);
                set({ user, token });
            },
            logout: () => {
                localStorage.removeItem("user");
                localStorage.removeItem("token");
                set({ user: null, token: null });
            },

            // ── Cart ──
            cart: JSON.parse(localStorage.getItem("cart") || "[]"),
            get cartCount() {
                return get().cart.reduce((sum, item) => sum + item.qty, 0);
            },
            addToCart: (product, qty = 1) => {
                const cart = [...get().cart];
                const existing = cart.find((i) => i._id === product._id);
                if (existing) {
                    existing.qty += qty;
                } else {
                    cart.push({ ...product, qty });
                }
                localStorage.setItem("cart", JSON.stringify(cart));
                set({ cart });
            },
            removeFromCart: (productId) => {
                const cart = get().cart.filter((i) => i._id !== productId);
                localStorage.setItem("cart", JSON.stringify(cart));
                set({ cart });
            },
            clearCart: () => {
                localStorage.removeItem("cart");
                set({ cart: [] });
            },
            syncCart: () => {
                const cart = JSON.parse(localStorage.getItem("cart") || "[]");
                set({ cart });
            },

            // ── Language ──
            language: localStorage.getItem("lang") || "en",
            setLanguage: (lang) => {
                localStorage.setItem("lang", lang);
                set({ language: lang });
            },

            // ── Theme (Dark/Light) ──
            theme: localStorage.getItem("theme") || "light",
            toggleTheme: () => {
                const current = get().theme;
                const nextTheme = current === "light" ? "dark" : "light";
                localStorage.setItem("theme", nextTheme);
                
                if (nextTheme === "dark") {
                    document.documentElement.classList.add("dark");
                } else {
                    document.documentElement.classList.remove("dark");
                }
                
                set({ theme: nextTheme });
            },
        }),
        {
            name: "techshop-store",
            partialize: (state) => ({ language: state.language, theme: state.theme }),
        }
    )
);

export default useStore;
