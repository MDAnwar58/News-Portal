import Link from "next/link";
import React, { useEffect } from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { BackendPublicUrl } from "../react/url";
import LoadingSpinner from "./LoadingSpinner";

export default function SubCategoryNews({
   tab,
   setSubCategory,
   subCategories,
   subCategoryNews,
   subCategoryNewsDataLoad,
   language,
}) {
   const [isLoading, setIsLoading] = React.useState(false);
   const [seeMoreBtn, setSeeMoreBtn] = React.useState(false);

   useEffect(() => {
      if (subCategoryNews?.length <= 0) {
         setIsLoading(true);
      } else {
         setIsLoading(false);
      }
   }, [subCategoryNews]);

   return (
      <div className="bg-black text-white py-4">
         <Container>
            <div className="d-flex flex-wrap gap-1">
               <Button
                  variant={tab === "সমস্ত" ? "danger" : ""}
                  className={
                     tab !== "সমস্ত"
                        ? "bg-dark text-white border-0"
                        : " border-0"
                  }
                  onClick={() => {
                     setIsLoading(true);
                     setSubCategory("সমস্ত", 0);
                  }}
               >
                  {language === "en"
                     ? "All"
                     : language === "hi"
                     ? "सभी"
                     : "সমস্ত"}
               </Button>
               {subCategories.length > 0 &&
                  subCategories.map((subCategory, i) =>
                     i + 1 < 16 ? (
                        <Button
                           key={i + 1}
                           variant={
                              tab ===
                              `${
                                 subCategory?.subcategory_slug +
                                 subCategories?.id
                              }`
                                 ? "danger"
                                 : ""
                           }
                           className={
                              tab !==
                              `${
                                 subCategory?.subcategory_slug +
                                 subCategories?.id
                              }`
                                 ? "bg-dark text-white border-0"
                                 : " border-0"
                           }
                           onClick={() =>
                              setSubCategory(
                                 subCategory?.subcategory_slug,
                                 subCategories?.id
                              )
                           }
                        >
                           {language === "en"
                              ? subCategory.subcategory_name
                              : language === "hi"
                              ? subCategory.subcategory_name_hi
                              : subCategory.subcategory_name_bn}
                        </Button>
                     ) : (
                        seeMoreBtn && (
                           <Button
                              key={i + 1}
                              variant={
                                 tab ===
                                 `${
                                    subCategory?.subcategory_slug +
                                    subCategories?.id
                                 }`
                                    ? "danger"
                                    : ""
                              }
                              className={
                                 tab !==
                                 `${
                                    subCategory?.subcategory_slug +
                                    subCategories?.id
                                 }`
                                    ? "bg-dark text-white border-0"
                                    : " border-0"
                              }
                              onClick={() =>
                                 setSubCategory(
                                    subCategory?.subcategory_slug,
                                    subCategories?.id
                                 )
                              }
                           >
                              {language === "en"
                                 ? subCategory.subcategory_name
                                 : language === "hi"
                                 ? subCategory.subcategory_name_hi
                                 : subCategory.subcategory_name_bn}
                           </Button>
                        )
                     )
                  )}
               {!seeMoreBtn && subCategories.length > 16 && (
                  <div className="ps-2 d-flex align-items-center">...</div>
               )}
               {!seeMoreBtn && subCategories.length > 16 && (
                  <Button
                     variant="transperent"
                     className="text-white"
                     onClick={() => setSeeMoreBtn(!seeMoreBtn)}
                  >
                     {language === "en"
                        ? "See More"
                        : language === "hi"
                        ? "और"
                        : "আরো"}
                  </Button>
               )}
            </div>

            <Row className="mt-3">
               {isLoading && subCategoryNewsDataLoad ? (
                  <LoadingSpinner />
               ) : subCategoryNews.length > 0 ? (
                  subCategoryNews.map((news, index) => (
                     <Col
                        key={index + 1}
                        lg={3}
                        md={4}
                        sm={6}
                        className="pb-3 col-xss-6"
                     >
                        <Card className="bg-dark p-2">
                           {news?.image && (
                              <Card.Img
                                 variant="top"
                                 src={BackendPublicUrl + news?.image}
                              />
                           )}
                           <Card.Body>
                              <Card.Title
                                 className="text-white text-decoration-none"
                                 as={Link}
                                 href={`/news-details?slug=${news?.slug}`}
                              >
                                 {language === "en"
                                    ? news.title
                                    : language === "hi"
                                    ? news.title_hi
                                    : news.title_bn}
                              </Card.Title>
                           </Card.Body>
                        </Card>
                     </Col>
                  ))
               ) : (
                  <div className="text-center text-white">Data Not Found</div>
               )}
            </Row>
         </Container>
      </div>
   );
}
