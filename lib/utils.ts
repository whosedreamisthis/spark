import { clsx, type ClassValue } from "clsx"
import { differenceInYears } from "date-fns"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function calculateAge(dob: Date) {
  return differenceInYears(new Date(), dob);
}

export function isOnline(lastActive: Date | null) {
  if (!lastActive) return false;
  
  const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000);
  return lastActive > fiveMinutesAgo;
}