import { useEffect, useState } from "react";

export function usePathname() {
   const [path, setPath] = useState("");
   useEffect(() => {
      if (typeof window !== "undefined") setPath(window.location.pathname);
   }, []);
   return path;
}
export function useScreen() {
   const [screen, setScreen] = useState(null);
   useEffect(() => {
      if (typeof window !== "undefined") setScreen(window);
   }, []);
   return screen;
}
