import { twMerge } from "tailwind-merge";
import clsx, { type ClassValue } from "clsx";

export const clsxm = (...classes: ClassValue[]) => twMerge(clsx(...classes));
