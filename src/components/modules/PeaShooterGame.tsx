"use client";

import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default function PeaShooterGame({ onGoBack }: { onGoBack: () => void }) {
    const [ballPosition, setBallPosition] = useState({ x: 150, y: 350 });
    const [isShooting, setIsShooting] = useState(false);
    const [score, setScore] = useState(0);
    const [trajectory, setTrajectory] = useState<{x: number, y: number}[]>([]);

    const shoot = () => {
        if (isShooting) return;
        setIsShooting(true);

        // Simple parabolic trajectory
        const newTrajectory: {x: number, y: number}[] = [];
        for (let t = 0; t < 30; t++) {
            const x = 150 + t * 20;
            const y = 350 - (8 * t - 0.2 * t * t);
            newTrajectory.push({ x, y });
        }
        setTrajectory(newTrajectory);
    };

    useEffect(() => {
        if (isShooting) {
            const lastPoint = trajectory[trajectory.length - 1];
            if (lastPoint && lastPoint.x > 700 && lastPoint.x < 750 && lastPoint.y > 200 && lastPoint.y < 250) {
                setScore(score + 1);
            }
            const timer = setTimeout(() => {
                setIsShooting(false);
                setTrajectory([]);
                setBallPosition({ x: 150, y: 350 });
            }, 1500);
            return () => clearTimeout(timer);
        }
    }, [isShooting, trajectory, score]);


    return (
        <div className="w-full h-full bg-blue-300 relative p-4 flex flex-col items-center justify-center">
             <button
                onClick={onGoBack}
                className="absolute top-4 left-4 z-10 p-2 bg-white/50 text-black rounded-full hover:bg-white transition-all"
                title="Volver a la Biblioteca"
            >
                <ArrowLeft className="w-6 h-6" />
            </button>
            <div className="absolute top-4 right-4 bg-white/80 p-2 rounded-lg">
                <p className="font-bold">Score: {score}</p>
            </div>
            <svg width="800" height="500" className="bg-white rounded-lg shadow-lg">
                {/* Peashooter */}
                <rect x="100" y="350" width="50" height="50" fill="green" />
                <rect x="150" y="360" width="30" height="30" fill="darkgreen" />

                {/* Hoop */}
                <rect x="750" y="200" width="10" height="100" fill="gray" />
                <rect x="700" y="250" width="50" height="10" fill="none" stroke="red" strokeWidth="4" />

                {/* Ball */}
                {isShooting && trajectory.map((p, i) => (
                    <circle key={i} cx={p.x} cy={p.y} r="15" fill="orange" />
                ))}
                 {!isShooting && <circle cx={ballPosition.x} cy={ballPosition.y} r="15" fill="orange" />}

            </svg>
            <Button onClick={shoot} className="mt-4">¡Lanzar Guisante!</Button>
        </div>
    );
}