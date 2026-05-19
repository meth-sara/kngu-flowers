import React from 'react';

interface LogoProps {
  className?: string;
  size?: number;
  textColor?: 'dark' | 'light' | 'primary';
}

export default function Logo({ className = "", size = 48, textColor = 'dark' }: LogoProps) {
  const colors = {
    dark: "#2B2B2B",
    light: "#ffffff",
    primary: "#E85D75"
  };

  const color = colors[textColor];

  return (
    <div className={`flex flex-col items-center justify-center ${className}`} style={{ width: size * 2 }}>
      {/* Floral Icon Part */}
      <svg
        width={size}
        height={size}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M50 20C55 35 70 45 85 45C70 45 60 60 60 75C60 60 40 60 40 75C40 60 30 45 15 45C30 45 45 35 50 20Z"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M50 35C52 45 60 50 70 50C60 50 55 58 55 65C55 58 45 58 45 65C45 58 40 50 30 50C40 50 48 45 50 35Z"
          fill={color}
          fillOpacity="0.2"
        />
        <circle cx="50" cy="50" r="3" fill={color} />
      </svg>
      
      {/* Text Part */}
      <div className="flex flex-col items-center -mt-1">
        <span className="text-xl font-bold font-serif tracking-[0.2em] italic uppercase leading-none" style={{ color }}>
          Kngu.
        </span>
        <span className="text-[7px] font-bold tracking-[0.4em] uppercase mt-1 opacity-60" style={{ color }}>
          Flower Shop
        </span>
      </div>
    </div>
  );
}
