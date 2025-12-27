"use client";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Link from "next/link";
import { IoCalendarOutline } from "react-icons/io5";
import { TiSocialFacebook } from "react-icons/ti";
import { FaTwitter, FaUser } from "react-icons/fa";
import { SlSocialYoutube } from "react-icons/sl";
import { useCallback, useEffect, useState } from "react";
import { getLocalStorage, removeLocalStorage } from "../react/local-storage";
import axios from "axios";
import { useLanguage } from "../react/GlobalFragment";
import { getCurrentDate } from "../react/date";
import Dropdown from "react-bootstrap/Dropdown";
import { useRouter } from "next/navigation";
import { usePathname } from "../react/params";

function AppNavbar() {
   const { language, setLanguage } = useLanguage();
   const localUsers = getLocalStorage("users");
   const [auth, setAuth] = useState(false);
   const [search, setSearch] = useState("");
   const router = useRouter();
   const pathname = usePathname();

   useEffect(() => {
      const authToken = getLocalStorage("auth_token");
      if (authToken) {
         setAuth(true);
      }
      fetchLang();
   }, []);

   const fetchLang = async () => {
      const lang = await getLocalUser(); // ✅ Await the result
      onSetLanguage(lang);
   };

   const getLocalUser = async () => {
      try {
         const local_users = JSON.parse(localUsers);
         const res = await axios.get("https://api64.ipify.org?format=json");
         const ip = res.data.ip;
         if (local_users?.length > 0 && ip) {
            const local_user = local_users.find((user) => user.ip === ip);
            if (local_user) {
               return local_user?.lang;
            } else {
               return "bd";
            }
         }
      } catch (error) {
         console.error("Connection error!");
      }
   };

   const onSetLanguage = async (lang) => {
      try {
         const res = await axios.get("https://api64.ipify.org?format=json");
         const ip = res.data.ip;
         const local_users = JSON.parse(localUsers);
         if (local_users?.length > 0) {
            const local_user = local_users.find((user) => user.ip === ip);
            if (local_user) {
               local_user.lang = lang;
               localStorage.setItem("users", JSON.stringify(local_users));
            } else {
               local_users.push({ lang, ip });
               localStorage.setItem("users", JSON.stringify(local_users));
            }
         } else {
            localStorage.setItem("users", JSON.stringify([{ lang, ip }]));
         }
         setLanguage(lang);
      } catch (error) {
         console.log("connection error");
      }
   };

   const onHandleSearch = useCallback(() => {
      if (pathname === "/search-news") {
         if (search) window.location.href = `/search-news?s=${search}`;
      } else {
         if (search) router.push(`/search-news?s=${search}`);
      }
   }, [search]);

   return (
      <Navbar expand="xl" className="bg-light-subtle py-3 shadow-none">
         <Container>
            <Navbar.Brand href="/" as={Link}>
               News Portal
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="navbarScroll" />
            <Navbar.Collapse id="navbarScroll">
               <Nav
                  className="me-auto my-2 my-lg-0"
                  style={{ maxHeight: "100px" }}
                  navbarScroll
               >
                  <div className="d-flex justify-content-center pt-xl-0 pt-3 pb-xl-0 pb-2">
                     <span>
                        <IoCalendarOutline className="p-0 m-0" />
                     </span>
                     <span className="ps-2">{getCurrentDate(language)}</span>
                     {/* <span className="ps-2">২৩-মার্চ-২০২৫</span> */}
                  </div>
               </Nav>
               <div className="d-flex flex-xl-row flex-column align-items-center gap-xl-0 gap-3">
                  <div className="order-xl-1 order-1 d-flex gap-xl-4 gap-1 pe-xl-5 pe-0">
                     <Button
                        variant={language === "en" ? "secondary" : ""}
                        onClick={() => onSetLanguage("en")}
                     >
                        English
                     </Button>
                     <Button
                        variant={language === "bd" ? "secondary" : ""}
                        className="rounded-sm"
                        onClick={() => onSetLanguage("bd")}
                     >
                        Bangla
                     </Button>
                     <Button
                        variant={language === "hi" ? "secondary" : ""}
                        onClick={() => onSetLanguage("hi")}
                     >
                        Hindi
                     </Button>
                  </div>
                  <Form className="order-xl-2 order-3 d-flex">
                     <Form.Control
                        type="search"
                        placeholder="Search"
                        className="rounded-end-0 focus-ring-none"
                        aria-label="Search"
                        onChange={(e) => setSearch(e.target.value)}
                     />
                     <Button
                        variant="dark"
                        className="rounded-start-0"
                        onClick={onHandleSearch}
                     >
                        Search
                     </Button>
                  </Form>
                  <div className="order-xl-3 order-2 d-flex align-items-center gap-3 ps-xl-5 ps-0 pb-xl-0 pb-2">
                     <div>
                        <TiSocialFacebook className="fs-4 text-info" />
                     </div>
                     <div>
                        <FaTwitter className="fs-5 text-primary" />
                     </div>
                     <div>
                        <SlSocialYoutube className="fs-5 text-danger" />
                     </div>
                     <div>
                        {!auth ? (
                           <Button as={Link} href="/sign-in" variant="dark">
                              Sing In
                           </Button>
                        ) : (
                           <Dropdown>
                              <Dropdown.Toggle
                                 variant="transparent"
                                 id="dropdown-basic"
                                 className="border-0"
                                 as="div"
                              >
                                 <FaUser className="fs-5 text-primary" />
                              </Dropdown.Toggle>

                              <Dropdown.Menu
                                 className="dropdown-menu-end"
                                 style={{ zIndex: 100000 }}
                              >
                                 <Dropdown.Item as={Link} href="/profile">
                                    Profile
                                 </Dropdown.Item>
                                 <Dropdown.Item
                                    onClick={() => {
                                       removeLocalStorage("auth_token");
                                       router.push("/sign-in");
                                    }}
                                 >
                                    Sign Out
                                 </Dropdown.Item>
                              </Dropdown.Menu>
                           </Dropdown>
                        )}
                     </div>
                  </div>
               </div>
            </Navbar.Collapse>
         </Container>
      </Navbar>
   );
}

export default AppNavbar;
