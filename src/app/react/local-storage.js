export function getLocalStorage(key) {
   if (typeof window === "undefined") return null;
   if (!key) return null;
   return localStorage.getItem(key);
}
export function setLocalStorage(key, value) {
   if (typeof window === "undefined") return null;
   localStorage.setItem(key, value);
}
export function removeLocalStorage(key) {
   if (typeof window === "undefined") return null;
   localStorage.removeItem(key);
}
