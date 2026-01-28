// Simple classname utility function
export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes
    .filter((cls) => typeof cls === 'string' && cls.trim().length > 0)
    .join(' ');
}
