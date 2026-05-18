'use client';

import { useEffect } from "react";

interface ToastProps {
    message: string;
    type?: 'success' | 'error' | 'info';
    duration?: number;
    onClose: () => void;
}

export default function Toast({ message, type = 'info', duration = 4000, onClose }: ToastProps) {
    
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose();
        }, duration);

        return () => clearTimeout(timer);
    }, [duration, onClose]);

    const bgColors = {
        success: 'bg-green-600 border-green-500 text-white',
        error: 'bg-red-600 border-red-500 text-white',
        info: 'bg-blue-600 border-blue-500 text-white'
    };

    return (
        <div className={`fixed bottom-5 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 px-6 py-3 rounded-lg shadow-2xl border backdrop-blur-sm transition-all duration-300 transform animate-fade-in-down ${bgColors[type]}`}>
            <span className="text-sm font-semibold tracking-wide whitespace-nowrap">{message}</span>
            
            <button 
                onClick={onClose} 
                className="ml-4 text-white/70 hover:text-white focus:outline-none text-xs font-bold bg-white/10 hover:bg-white/20 w-5 h-5 rounded-full flex items-center justify-center transition-colors"
            >
                ✕
            </button>
        </div>
    );
}