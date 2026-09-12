import { useEffect, useRef } from "react";

export default function CustomCursor() {
    const dotRef = useRef(null);
    const ringRef = useRef(null);

    useEffect(() => {
        const dot = dotRef.current;
        const ring = ringRef.current;
        if (!dot || !ring) return;

        let mouseX = 0, mouseY = 0;
        let ringX = 0, ringY = 0;
        let animFrame;

        const onMouseMove = (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            dot.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
        };

        const animateRing = () => {
            ringX += (mouseX - ringX) * 0.12;
            ringY += (mouseY - ringY) * 0.12;
            ring.style.transform = `translate(${ringX}px, ${ringY}px)`;
            animFrame = requestAnimationFrame(animateRing);
        };
        animFrame = requestAnimationFrame(animateRing);

        // Expand ring on hoverable elements
        const onMouseOver = (e) => {
            if (
                e.target.closest("a, button, [data-cursor='pointer'], input, textarea, select")
            ) {
                ring.classList.add("cursor-hover");
                dot.classList.add("dot-hover");
            }
        };
        const onMouseOut = () => {
            ring.classList.remove("cursor-hover");
            dot.classList.remove("dot-hover");
        };

        window.addEventListener("mousemove", onMouseMove);
        document.addEventListener("mouseover", onMouseOver);
        document.addEventListener("mouseout", onMouseOut);

        return () => {
            window.removeEventListener("mousemove", onMouseMove);
            document.removeEventListener("mouseover", onMouseOver);
            document.removeEventListener("mouseout", onMouseOut);
            cancelAnimationFrame(animFrame);
        };
    }, []);

    return (
        <>
            {/* Small dot — instant */}
            <div
                ref={dotRef}
                className="custom-cursor-dot"
                style={{
                    position: "fixed",
                    top: 0,
                    left: 0,
                    width: 8,
                    height: 8,
                    borderRadius: "50%",
                    backgroundColor: "#02a9f7",
                    pointerEvents: "none",
                    zIndex: 99999,
                    translate: "-50% -50%",
                    willChange: "transform",
                    mixBlendMode: "difference",
                    transition: "width 0.2s, height 0.2s, background-color 0.2s",
                }}
            />
            {/* Lagging ring */}
            <div
                ref={ringRef}
                className="custom-cursor-ring"
                style={{
                    position: "fixed",
                    top: 0,
                    left: 0,
                    width: 36,
                    height: 36,
                    borderRadius: "50%",
                    border: "2px solid rgba(2, 169, 247, 0.6)",
                    pointerEvents: "none",
                    zIndex: 99998,
                    translate: "-50% -50%",
                    willChange: "transform",
                    transition: "width 0.25s ease, height 0.25s ease, border-color 0.25s ease",
                }}
            />
            {/* Inline CSS for hover state */}
            <style>{`
                * { cursor: none !important; }
                .cursor-hover {
                    width: 64px !important;
                    height: 64px !important;
                    border-color: rgba(2, 169, 247, 0.9) !important;
                    background-color: rgba(2, 169, 247, 0.08);
                    backdrop-filter: blur(4px);
                }
                .dot-hover {
                    width: 4px !important;
                    height: 4px !important;
                    background-color: #fff !important;
                }
                @media (hover: none) {
                    .custom-cursor-dot, .custom-cursor-ring { display: none; }
                    * { cursor: auto !important; }
                }
            `}</style>
        </>
    );
}
