"use client";
import Link from "next/link";
import React, { useCallback, useEffect, useState } from "react";
import { Button, Card, CardBody, Container, Nav } from "react-bootstrap";
import { IoHomeOutline } from "react-icons/io5";
import { getWordLimit } from "../react/word";
import { useLanguage } from "../react/GlobalFragment";
import { usePathname, useScreen } from "../react/params";
import { HiOutlineBars3 } from "react-icons/hi2";
import { AiOutlineClose } from "react-icons/ai";
import { FaGripLines } from "react-icons/fa";

export default function Breadcramb({ categories }) {
   const { language } = useLanguage();
   const [showingAllCategories, setShowingAllCategories] = useState(false);
   const [breadcrambLimit, setBreadcrambLimit] = useState(0);
   const [categoriesManus, setCategoriesManus] = useState(false);
   const pathname = usePathname();
   const [width, setWidth] = useState(0);
   const screen = useScreen();

   useEffect(() => {
      const handleResize = () => setWidth(screen.innerWidth);
      if (screen !== null) setWidth(screen.innerWidth);
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
   }, [screen]);

   useEffect(() => {
      if (width > 1400) setBreadcrambLimit(10);
      else if (width > 1200) setBreadcrambLimit(9);
      else if (width > 992) setBreadcrambLimit(8);
      else if (width > 768) setBreadcrambLimit(6);
      else setBreadcrambLimit(9);
   }, [width]);

   const onHandleCategoriesManus = () => setCategoriesManus(!categoriesManus);

   return (
      <Card className="p-0 rounded-0 bg-secondary-subtle sticky-top">
         <CardBody>
            <Container className="d-flex flex-md-row flex-column flex-md-wrap my-0 gap-2">
               <div className="d-md-none d-flex justify-content-end">
                  <Button
                     variant="dark"
                     onClick={() => onHandleCategoriesManus()}
                     className="d-flex flex-column"
                  >
                     {/* only line icon for manu */}
                     {/* <FaGripLines /> */}
                     <HiOutlineBars3 className="fs-5" />
                     {/* <AiOutlineClose /> */}
                  </Button>
               </div>
               <Nav.Link
                  href="/"
                  as={Link}
                  className="text-secondary-emphasis fs-5 card px-3 py-2 d-md-flex d-none"
               >
                  <IoHomeOutline />
               </Nav.Link>
               <div
                  className={`${
                     width > 768
                        ? "d-md-flex d-none"
                        : categoriesManus
                        ? "d-flex"
                        : "d-none"
                  }  flex-md-row flex-column flex-md-wrap my-0 gap-2`}
                  style={{
                     maxHeight: "55vh",
                     overflowY: "auto",
                     paddingBottom: width > 768 ? "0" : "7rem",
                     scrollbarWidth: "none",
                  }}
               >
                  {categories.length > 0 &&
                     categories.map((category, i) =>
                        !showingAllCategories && i + 1 < breadcrambLimit ? (
                           <div
                              key={i + 1}
                              className=" position-relative group"
                           >
                              {pathname === "/news" ? (
                                 <>
                                    <a
                                       href={`/news?category=${category.category_slug}`}
                                       className="text-decoration-none"
                                    >
                                       <Card className="text-secondary-emphasis fs-5 px-2 py-1 group text-decoration-none">
                                          {getWordLimit(
                                             language === "en"
                                                ? category?.category_name
                                                : language === "hi"
                                                ? category?.category_name_hi
                                                : category?.category_name_bn,
                                             19
                                          )}
                                       </Card>
                                    </a>
                                 </>
                              ) : (
                                 <Card
                                    className="text-secondary-emphasis fs-5 px-2 py-1 group text-decoration-none"
                                    role="button"
                                    tabIndex={0}
                                    as={Link}
                                    href={`/news?category=${category.category_slug}`}
                                 >
                                    {getWordLimit(
                                       language === "en"
                                          ? category?.category_name
                                          : language === "hi"
                                          ? category?.category_name_hi
                                          : category?.category_name_bn,
                                       19
                                    )}
                                 </Card>
                              )}

                              {category?.subcategories?.length > 0 && (
                                 <Card
                                    className="group-hover:d-flex group-hover:flex-column d-none position-absolute top-5 left-0 p-1 bg-light"
                                    style={{ width: "250px", zIndex: 100 }}
                                 >
                                    {category?.subcategories?.map(
                                       (sub_category, i) =>
                                          pathname !== "/sub-category-news" ? (
                                             <Link
                                                key={i + 1}
                                                href={`/sub-category-news?sc=${sub_category.subcategory_slug}`}
                                                className="text-secondary-emphasis fs-6 px-3 py-1 mb-1 text-center text-decoration-none btn btn-light"
                                             >
                                                {language === "en"
                                                   ? sub_category?.subcategory_name
                                                   : language === "hi"
                                                   ? sub_category?.subcategory_name_hi
                                                   : sub_category?.subcategory_name_bn}
                                             </Link>
                                          ) : (
                                             <a
                                                key={i + 1}
                                                href={`/sub-category-news?sc=${sub_category.subcategory_slug}`}
                                                className="text-secondary-emphasis fs-6 px-3 py-1 mb-1 text-center text-decoration-none btn btn-light"
                                             >
                                                {language === "en"
                                                   ? sub_category?.subcategory_name
                                                   : language === "hi"
                                                   ? sub_category?.subcategory_name_hi
                                                   : sub_category?.subcategory_name_bn}
                                             </a>
                                          )
                                    )}
                                 </Card>
                              )}
                           </div>
                        ) : (
                           showingAllCategories && (
                              <div
                                 key={i + 1}
                                 className=" position-relative group"
                              >
                                 {pathname === "/news" ? (
                                    <>
                                       <a
                                          href={`/news?category=${category.category_slug}`}
                                          className="text-decoration-none"
                                       >
                                          <Card className="text-secondary-emphasis fs-5 px-2 py-1 group text-decoration-none">
                                             {getWordLimit(
                                                language === "en"
                                                   ? category?.category_name
                                                   : language === "hi"
                                                   ? category?.category_name_hi
                                                   : category?.category_name_bn,
                                                19
                                             )}
                                          </Card>
                                       </a>
                                    </>
                                 ) : (
                                    <Card
                                       className="text-secondary-emphasis fs-5 px-2 py-1 group text-decoration-none"
                                       role="button"
                                       tabIndex={0}
                                       as={Link}
                                       href={`/news?category=${category.category_slug}`}
                                    >
                                       {getWordLimit(
                                          language === "en"
                                             ? category?.category_name
                                             : language === "hi"
                                             ? category?.category_name_hi
                                             : category?.category_name_bn,
                                          19
                                       )}
                                    </Card>
                                 )}

                                 {category?.subcategories?.length > 0 && (
                                    <Card
                                       className="group-hover:d-flex group-hover:flex-column d-none position-absolute top-5 left-0 p-1 bg-light"
                                       style={{ width: "250px", zIndex: 100 }}
                                    >
                                       {category?.subcategories?.map(
                                          (sub_category, i) => (
                                             <a
                                                key={i + 1}
                                                href=""
                                                className="text-secondary-emphasis fs-6 px-3 py-1 mb-1 text-center text-decoration-none btn btn-light"
                                             >
                                                {language === "en"
                                                   ? sub_category?.subcategory_name
                                                   : language === "hi"
                                                   ? sub_category?.subcategory_name_hi
                                                   : sub_category?.subcategory_name_bn}
                                             </a>
                                          )
                                       )}
                                    </Card>
                                 )}
                              </div>
                           )
                        )
                     )}
               </div>
               {!showingAllCategories && categories.length > 8 && (
                  <div className="d-md-flex d-none align-items-center">...</div>
               )}
               {!showingAllCategories && categories.length > 8 && (
                  <div
                     className={` ${
                        width > 768
                           ? "d-md-flex d-none"
                           : !categoriesManus
                           ? "d-none"
                           : "d-flex"
                     } justify-content-center`}
                  >
                     <Card
                        className="text-secondary-emphasis fs-5 px-2 py-1 group text-decoration-none"
                        role="button"
                        tabIndex={0}
                        onClick={() => {
                           setShowingAllCategories(!showingAllCategories);
                        }}
                     >
                        {language === "en"
                           ? "See All"
                           : language === "hi"
                           ? "सभी देखें"
                           : "আরো"}
                     </Card>
                  </div>
               )}
            </Container>
         </CardBody>
      </Card>
   );
}
