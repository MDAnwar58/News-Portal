// src/context/LanguageContext.js or .tsx
"use client";
import { createContext, useContext, useState } from "react";

const LanguageContext = createContext();

export function GlobalFragment({ children }) {
   const [language, setLanguage] = useState("bd");

   return (
      <LanguageContext.Provider value={{ language, setLanguage }}>
         {children}
      </LanguageContext.Provider>
   );
}

export function useLanguage() {
   return useContext(LanguageContext);
}
