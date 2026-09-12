import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
    en: {
        translation: {
            // Navbar
            home: "Home",
            products: "Products",
            myOrders: "My Orders",
            login: "Log In",
            logout: "Logout",
            startJourney: "Start Journey",
            cart: "Cart",
            profile: "Profile",

            // Hero
            heroTag: "Forged for Elite Performance",
            heroTitle1: "UNLEASH THE",
            heroTitle2: "POSSIBILITY.",
            heroSub: "Welcome to TechShop — the home of premium rigs, precision gear, and the next generation of computing excellence.",
            heroCta1: "BUILD YOUR SETUP",
            heroCta2: "VIEW SPECIALS",

            // Stats
            premiumGear: "Premium Gear",
            globalRating: "Global Rating",
            expertSupport: "Expert Support",

            // Features
            fastShipping: "Fast Shipping",
            fastShippingDesc: "Get your tech delivered to your doorstep within 24-48 hours islandwide.",
            expertSupportTitle: "Expert Support",
            expertSupportDesc: "Our tech experts are available 24/7 to help you choose the right gear.",
            officialWarranty: "Official Warranty",
            officialWarrantyDesc: "All products come with 1-Year official manufacturer warranty.",

            // Products
            newDrops: "New Drops",
            featuredHardware: "FEATURED HARDWARE.",
            viewAllProducts: "View All Products",
            addToCart: "Add to Cart",
            limitedStock: "LIMITED STOCK",
            outOfStock: "OUT OF STOCK",
            elitePrice: "Elite Price",

            // Categories
            ourCollections: "Our Collections",
            chooseGear: "CHOOSE YOUR LEGACY GEAR.",

            // Newsletter
            getFirstDibs: "GET FIRST DIBS ON NEW RELEASES.",
            joinUs: "JOIN US",
            emailPlaceholder: "your.email@techshop.lk",

            // Chatbot
            chatTitle: "TechShop Assistant",
            chatSubtitle: "Ask me anything about our products",
            chatPlaceholder: "Type your message...",
            chatSend: "Send",
            chatWelcome: "👋 Hi! I'm TechShop AI. Ask me about any product, price, or specs!",

            // General
            loading: "Loading...",
            search: "Search products...",
        },
    },
    si: {
        translation: {
            // Navbar
            home: "මුල් පිටුව",
            products: "නිෂ්පාදන",
            myOrders: "මගේ ඇණවුම්",
            login: "ප්‍රවේශ වන්න",
            logout: "ඉවත් වන්න",
            startJourney: "ගමන ආරම්භ කරන්න",
            cart: "කරත්තය",
            profile: "පැතිකඩ",

            // Hero
            heroTag: "ශ්‍රේෂ්ඨ කාර්ය සාධනය සඳහා",
            heroTitle1: "හැකියාව",
            heroTitle2: "විවෘත කරන්න.",
            heroSub: "TechShop වෙත සාදරයෙන් පිළිගනිමු — ශ්‍රී ලංකාවේ ප්‍රිමියම් පරිගණක දෘඩාංග හා තාක්ෂණ ගවේෂකයන්ගේ නිවස.",
            heroCta1: "ඔබේ ඩෙස්ක් ටොප් හදාගන්න",
            heroCta2: "බලන්න",

            // Stats
            premiumGear: "ප්‍රිමියම් ගියර්",
            globalRating: "ගෝලීය ශ්‍රේණිය",
            expertSupport: "විශේෂඥ සහාය",

            // Features
            fastShipping: "වේගවත් බෙදාහැරීම",
            fastShippingDesc: "ශ්‍රී ලංකාව පුරා ඔබේ ගෙදරට පැය 24-48ක් ඇතුළත.",
            expertSupportTitle: "විශේෂඥ සහාය",
            expertSupportDesc: "නිවැරදි ගියර් තෝරා ගැනීමට 24/7 සේවය.",
            officialWarranty: "නිල වගකීම",
            officialWarrantyDesc: "සියලු නිෂ්පාදන සඳහා 1 වසරක නිල වගකීම.",

            // Products
            newDrops: "නව නිෂ්පාදන",
            featuredHardware: "ප්‍රමුඛ දෘඩාංග.",
            viewAllProducts: "සියලු නිෂ්පාදන",
            addToCart: "කරත්තයට දමන්න",
            limitedStock: "සීමිත ප්‍රමාණයක්",
            outOfStock: "තොගය අවසන්",
            elitePrice: "මිල",

            // Categories
            ourCollections: "අපගේ එකතුව",
            chooseGear: "ඔබේ ගියර් තෝරන්න.",

            // Newsletter
            getFirstDibs: "නව නිෂ්පාදන ගැන ප්‍රථමයෙන් දැන ගන්න.",
            joinUs: "එකතු වන්න",
            emailPlaceholder: "ඔබේ.ඊමේල්@techshop.lk",

            // Chatbot
            chatTitle: "TechShop සහායක",
            chatSubtitle: "අපගේ නිෂ්පාදන ගැන ඕනෑම දෙයක් අහන්න",
            chatPlaceholder: "ඔබේ පණිවිඩය ටයිප් කරන්න...",
            chatSend: "යවන්න",
            chatWelcome: "👋 හෙලෝ! මම TechShop AI. නිෂ්පාදන, මිල හෝ specs ගැන ඕනෑම දෙයක් අහන්න!",

            // General
            loading: "ලෝඩ් වෙනවා...",
            search: "නිෂ්පාදන සොයන්න...",
        },
    },
};

i18n.use(initReactI18next).init({
    resources,
    lng: localStorage.getItem("lang") || "en",
    fallbackLng: "en",
    interpolation: {
        escapeValue: false,
    },
});

export default i18n;
