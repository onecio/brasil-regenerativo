/**
 * Armazenamento local seguro.
 * - prefixo próprio para não colidir com outras apps
 * - try/catch (privacidade: nunca guardamos dados sensíveis)
 * - validação de tamanho
 */
const PREFIX = 'br-regenerativo:';
const MAX_BYTES = 64 * 1024;

function sizeOf(s: string): number {
  return new Blob([s]).size;
}

export function load<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(PREFIX + key);
    if (raw == null) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

export function save<T>(key: string, value: T): boolean {
  try {
    const raw = JSON.stringify(value);
    if (sizeOf(raw) > MAX_BYTES) return false;
    localStorage.setItem(PREFIX + key, raw);
    return true;
  } catch {
    return false;
  }
}

export function remove(key: string): void {
  try {
    localStorage.removeItem(PREFIX + key);
  } catch {
    /* noop */
  }
}
