import React from "react";
import { Expert } from "../types";

interface ExpertCardProps {
  expert: Expert;
  key?: React.Key;
}

export default function ExpertCard({ expert }: ExpertCardProps) {
  return (
    <div className="flex flex-col items-center space-y-4">
      <div className="h-48 w-48 overflow-hidden rounded-full border-4 border-white shadow-lg">
        <img
          src={expert.image}
          alt={expert.name}
          className="h-full w-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
        />
      </div>
      <div className="text-center">
        <h3 className="text-lg font-bold">{expert.name}</h3>
        <p className="text-sm text-gray-500 uppercase tracking-widest">{expert.role}</p>
      </div>
    </div>
  );
}
