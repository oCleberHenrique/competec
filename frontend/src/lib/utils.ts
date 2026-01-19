import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"


export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export const getImageUrl = (path: string | null | undefined) => {
  if (!path) return "";
  
  
  if (path.startsWith("http")) return path;

  const apiUrl = (process.env.NEXT_PUBLIC_API_URL || "").replace(/\/$/, "");
  const cleanPath = path.startsWith("/") ? path : `/${path}`;

  return `${apiUrl}${cleanPath}`;
};