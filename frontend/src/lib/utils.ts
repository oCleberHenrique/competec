import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const getApiUrl = () => {
  return (process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000").replace(/\/$/, "");
};

export const getImageUrl = (path: string | null | undefined) => {
  if (!path) return "";
  
  
  if (path.startsWith("http")) return path;

 
  const apiUrl = getApiUrl();

  const cleanPath = path.startsWith("/") ? path.substring(1) : path;

  if (!cleanPath.startsWith("media/")) {
      return `${apiUrl}/media/${cleanPath}`;
  }

  return `${apiUrl}/${cleanPath}`;
};
