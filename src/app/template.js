"use client";
import React, { useEffect } from "react";
import AppNavbar from "./components/Navbar";
import Breadcramb from "./components/Breadcramb";
import "bootstrap/dist/css/bootstrap.min.css";
import "./page.module.css";
import AppFooter from "./components/AppFooter";
import "./main.css";
import Axios from "./react/axios";
import { GlobalFragment, LanguageProvider } from "./react/GlobalFragment";
import "toastr/build/toastr.min.css";
import { usePathname } from "next/navigation";

export default function template({ children }) {
   const [categories, setCategories] = React.useState([]);
   const pathname = usePathname();

   useEffect(() => {
      getCategories();
   }, []);

   const getCategories = async () => {
      const res = await Axios.get("/home/categories");
      if (res.data.status === true) setCategories(res.data.data);
   };
   return (
      <>
         <GlobalFragment>
            <AppNavbar />
            <Breadcramb categories={categories} />
            {children}
            <AppFooter />
         </GlobalFragment>
      </>
   );
}
