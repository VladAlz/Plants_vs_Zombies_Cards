"use client";

import { useEffect, useRef, useState } from "react";

interface Vec { x: number; y: number; }

const CANVAS_W = 600;
const CANVAS_H = 400;
const SHIP_W = 40;
const SHIP_H = 20;
const ALIEN_W = 30;
const ALIEN_H = 20;

function createAliens(): Vec[] {
    const rows = 4;
    const cols = 10;
    const spacingX = 50;
    const spacingY = 40;
    const startX = 50;
    const startY = 30;
    const arr: Vec[] = [];
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            arr.push({ x: startX + c * spacingX, y: startY + r * spacingY });
        }
    }
    return arr;
}

export default function SpaceInvaders() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    // initialize image refs as null; create Image objects in effect so `Image` is only accessed on client
    const shipImg = useRef<HTMLImageElement | null>(null);
    const alienImg = useRef<HTMLImageElement | null>(null);
    const [shipLoaded, setShipLoaded] = useState(false);
    const [alienLoaded, setAlienLoaded] = useState(false);
    const [started, setStarted] = useState(false); // wait for user to begin
    const [shipX, setShipX] = useState(CANVAS_W / 2 - SHIP_W / 2);
    const [bullets, setBullets] = useState<Vec[]>([]);
    const [aliens, setAliens] = useState<Vec[]>(createAliens());
    const [alienDir, setAlienDir] = useState(1);
    const [score, setScore] = useState(0);
    const [gameOver, setGameOver] = useState(false);

    // preload sprites
    useEffect(() => {
        // create Image objects lazily to avoid referencing global Image during SSR
        if (!shipImg.current) shipImg.current = new Image();
        if (!alienImg.current) alienImg.current = new Image();
        const s = shipImg.current;
        const a = alienImg.current;
        s.src = "/ship.png";   // coloca la nave en public/ship.png
        a.src = "/alien.png"; // coloca el enemigo en public/alien.png
        s.onload = () => setShipLoaded(true);
        a.onload = () => setAlienLoaded(true);
        // handle loading error by leaving flag false, fallback will draw colored boxes
        s.onerror = () => setShipLoaded(false);
        a.onerror = () => setAlienLoaded(false);
    }, []);

    const moveShip = (dx: number) => {
        setShipX(x => Math.max(0, Math.min(CANVAS_W - SHIP_W, x + dx)));
    };

    useEffect(() => {
        const handleKey = (e: KeyboardEvent) => {
            if (!started) {
                // begin game when user presses W or space
                if (e.key.toLowerCase() === "w" || e.key === " ") {
                    setStarted(true);
                }
                return;
            }
            if (gameOver) return;
            if (e.key === "ArrowLeft" || e.key.toLowerCase() === "a") {
                moveShip(-20);
            } else if (e.key === "ArrowRight" || e.key.toLowerCase() === "d") {
                moveShip(20);
            } else if (e.key.toLowerCase() === "w") {
                // shoot with W key
                setBullets(b => [...b, { x: shipX + SHIP_W / 2, y: CANVAS_H - SHIP_H - 5 }]);
            }
        };
        window.addEventListener("keydown", handleKey);
        return () => window.removeEventListener("keydown", handleKey);
    }, [shipX, gameOver, started]);

    useEffect(() => {
        if (gameOver || !started) return;
        const interval = setInterval(() => {
            // move bullets
            let newBullets = bullets
                .map(bb => ({ x: bb.x, y: bb.y - 10 }))
                .filter(bb => bb.y > 0);

            // move aliens
            let newAliens = aliens.map(a => ({ x: a.x + alienDir * 5, y: a.y }));
            const hitEdge = newAliens.some(a => a.x < 0 || a.x + ALIEN_W > CANVAS_W);
            if (hitEdge) {
                newAliens = newAliens.map(a => ({ x: a.x, y: a.y + ALIEN_H }));
                setAlienDir(d => -d);
            }

            // collisions: bullet vs alien
            let scoreInc = 0;
            newBullets = newBullets.filter(bb => {
                const hitIndex = newAliens.findIndex(a =>
                    bb.x > a.x && bb.x < a.x + ALIEN_W && bb.y > a.y && bb.y < a.y + ALIEN_H
                );
                if (hitIndex !== -1) {
                    newAliens.splice(hitIndex, 1);
                    scoreInc += 10;
                    return false; // remove bullet
                }
                return true;
            });

            if (scoreInc > 0) setScore(s => s + scoreInc);

            // game over when aliens reach ship line
            if (newAliens.some(a => a.y + ALIEN_H >= CANVAS_H - SHIP_H)) {
                setGameOver(true);
            }

            setBullets(newBullets);
            setAliens(newAliens);
        }, 100);
        return () => clearInterval(interval);
    }, [alienDir, gameOver, bullets, aliens]);

    // draw to canvas whenever relevant state changes
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        ctx.clearRect(0, 0, CANVAS_W, CANVAS_H);

        // ship sprite or gradient fallback
        if (shipLoaded && shipImg.current?.naturalWidth! > 0) {
            // non-null assertion used above since we already checked shipLoaded
            ctx.drawImage(shipImg.current!, shipX, CANVAS_H - SHIP_H - 5, SHIP_W, SHIP_H);
        } else {
            const shipGradient = ctx.createLinearGradient(shipX, CANVAS_H - SHIP_H - 5, shipX + SHIP_W, CANVAS_H - SHIP_H - 5);
            shipGradient.addColorStop(0, "#0ff");
            shipGradient.addColorStop(1, "#00f");
            ctx.fillStyle = shipGradient;
            ctx.fillRect(shipX, CANVAS_H - SHIP_H - 5, SHIP_W, SHIP_H);
        }

        // bullets
        ctx.fillStyle = "#ff4444";
        bullets.forEach(b => ctx.fillRect(b.x - 2, b.y, 4, 10));

        // aliens sprite or color block
        aliens.forEach(a => {
            if (alienLoaded && alienImg.current?.naturalWidth! > 0) {
                ctx.drawImage(alienImg.current!, a.x, a.y, ALIEN_W, ALIEN_H);
            } else {
                ctx.fillStyle = "#b19cd9";
                ctx.beginPath();
                ctx.rect(a.x, a.y, ALIEN_W, ALIEN_H);
                ctx.fill();
            }
        });

        if (gameOver) {
            ctx.fillStyle = "rgba(0,0,0,0.7)";
            ctx.fillRect(0, 0, CANVAS_W, CANVAS_H);
            ctx.fillStyle = "white";
            ctx.font = "bold 32px sans-serif";
            ctx.textAlign = "center";
            ctx.fillText("GAME OVER", CANVAS_W / 2, CANVAS_H / 2 - 20);
            ctx.fillText(`Score: ${score}`, CANVAS_W / 2, CANVAS_H / 2 + 20);
        }
    }, [shipX, bullets, aliens, gameOver, score, shipLoaded, alienLoaded]);

    const restart = () => {
        setShipX(CANVAS_W / 2 - SHIP_W / 2);
        setBullets([]);
        setAliens(createAliens());
        setAlienDir(1);
        setScore(0);
        setGameOver(false);
        setStarted(true); // keep playing after restart
    };

    return (
        <div className="relative flex flex-col items-center justify-center h-full p-8 bg-gradient-to-b from-black via-red-900 to-black rounded-2xl text-white">
            {/* start screen overlay */}
            {!started && (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/80">
                    <h1 className="text-5xl font-extrabold tracking-widest drop-shadow-lg">
                        SPACE INVADERS
                    </h1>
                    <p className="mt-4 text-xl">
                        Presiona <span className="text-yellow-300">W</span> para comenzar
                    </p>
                </div>
            )}

            <div className="w-[600px] flex justify-between items-center mb-4 text-white font-bold text-2xl">
                <div>Score: <span className="text-yellow-300">{score}</span></div>
                <div className="text-sm">←→ izquierda/derecha | W para disparar</div>
            </div>
            <canvas
                ref={canvasRef}
                width={CANVAS_W}
                height={CANVAS_H}
                className="border-4 border-white bg-black shadow-2xl ring-4 ring-indigo-500"
            />
            {gameOver && (
                <div className="flex flex-col items-center mt-4">
                    <div className="text-3xl text-red-500 font-black">GAME OVER</div>
                    <button
                        onClick={restart}
                        className="mt-2 px-6 py-2 bg-red-500 text-white font-bold rounded-full hover:bg-red-400 transition"
                    >
                        Restart
                    </button>
                </div>
            )}
        </div>
    );
}
