"use client";

import { useEffect, useRef } from "react";

export function FooterWaveCanvas() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let animationFrameId: number;
        let time = 0;

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = 300; // Height of the wave area
        };

        const draw = () => {
            if (!ctx || !canvas) return;

            ctx.clearRect(0, 0, canvas.width, canvas.height);
            time += 0.005; // Speed of wave

            // Gradients for modern feel
            const gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
            gradient.addColorStop(0, "rgba(14, 165, 233, 0.1)"); // Sky 500
            gradient.addColorStop(0.5, "rgba(34, 197, 94, 0.1)"); // Green 500
            gradient.addColorStop(1, "rgba(56, 189, 248, 0.1)"); // Sky 400

            ctx.fillStyle = gradient;

            // Draw multiple waves
            for (let i = 0; i < 3; i++) {
                ctx.beginPath();
                // Start drawing from bottom-left
                ctx.moveTo(0, canvas.height);

                // Draw wave function across width
                for (let x = 0; x <= canvas.width; x += 10) {
                    // Complex sine wave function for organic look
                    const y = Math.sin(x * 0.003 + time + i * 2) * 20 +
                        Math.sin(x * 0.001 + time * 0.5) * 20 +
                        (canvas.height - 50 - i * 30); // Base height
                    ctx.lineTo(x, y);
                }

                // Close path to bottom-right corner
                ctx.lineTo(canvas.width, canvas.height);
                ctx.closePath();
                ctx.fill();
            }

            animationFrameId = requestAnimationFrame(draw);
        };

        window.addEventListener("resize", resize);
        resize();
        draw();

        return () => {
            window.removeEventListener("resize", resize);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="absolute bottom-0 left-0 w-full h-[300px] pointer-events-none z-0 opacity-60 mix-blend-multiply dark:mix-blend-screen"
        />
    );
}
