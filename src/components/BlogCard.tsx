import React from "react";
import { MessageSquare } from "lucide-react";
import { Blog } from "../types";

interface BlogCardProps {
  blog: Blog;
  key?: React.Key;
}

export default function BlogCard({ blog }: BlogCardProps) {
  return (
    <div className="flex flex-col space-y-4">
      <div className="aspect-[16/10] overflow-hidden bg-stone-100">
        <img
          src={blog.image}
          alt={blog.title}
          className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
        />
      </div>
      <div className="space-y-2">
        <div className="flex items-center space-x-1 text-xs text-primary uppercase font-bold">
          <span>By {blog.author}</span>
          <span className="text-gray-300">/</span>
          <span className="text-gray-500">{blog.date}</span>
        </div>
        <h3 className="text-xl font-bold hover:text-primary cursor-pointer transition-colors leading-tight">
          {blog.title}
        </h3>
        <p className="text-sm text-gray-600 line-clamp-2">
          {blog.snippet}
        </p>
        <div className="flex items-center justify-between pt-2">
          <button className="text-xs font-bold uppercase tracking-widest border-b-2 border-black pb-1 hover:text-primary hover:border-primary transition-all">
            Continue Reading
          </button>
          <div className="flex items-center space-x-1 text-gray-400">
            <MessageSquare size={14} />
            <span className="text-xs">0</span>
          </div>
        </div>
      </div>
    </div>
  );
}
