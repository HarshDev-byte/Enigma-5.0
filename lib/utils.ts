import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function generateArchitectId(name: string, domain: string): string {
  const cleanName = name.trim().toUpperCase().replace(/[^A-Z]/g, '').slice(0, 3) || 'ARC';
  const domainPrefix = domain.slice(0, 3).toUpperCase() || 'GEN';
  const randomHex = Math.floor(Math.random() * 0xffffff).toString(16).padStart(6, '0').toUpperCase();
  return `ARC-${domainPrefix}-${cleanName}-${randomHex}`;
}

export function generateCryptoHash(): string {
  return '0x' + Array.from({ length: 16 }, () => Math.floor(Math.random() * 16).toString(16)).join('');
}
