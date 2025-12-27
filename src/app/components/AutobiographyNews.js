import React from "react";
import { Card, Col, Image, Row } from "react-bootstrap";
import { FaRegArrowAltCircleRight } from "react-icons/fa";
import { BackendPublicUrl } from "../react/url";
import Link from "next/link";
import { getSeeMore } from "../react/see-more";

function AutobiographyNews({ autobiographyNews, language }) {
   return (
      <Row>
         <Col sm={12}>
            <div
               className="d-flex bg-body-secondary"
               style={{ borderLeft: "3px solid #000" }}
            >
               <div className="w-100 d-flex justify-content-between align-items-center gap-1 px-3 py-2">
                  <a className="fs-5 text-decoration-none text-dark pt-1">
                     {language === "en"
                        ? autobiographyNews?.category?.category_name
                        : language === "hi"
                        ? autobiographyNews?.category?.category_name_hi
                        : autobiographyNews?.category?.category_name_bn}
                  </a>
                  <Link
                     href={`/news?category=${autobiographyNews?.category?.category_slug}`}
                     className="fs-5 text-decoration-none text-dark d-flex align-items-center gap-1"
                  >
                     <div className="pt-1">{getSeeMore(language)}</div>
                     <div>
                        <FaRegArrowAltCircleRight />
                     </div>
                  </Link>
               </div>
            </div>
         </Col>

         {autobiographyNews?.news?.length > 0 &&
            autobiographyNews?.news.map(
               (news, index) =>
                  index + 1 === 1 && (
                     <Col key={index + 1} lg={5} sm={6} className="pb-3 mt-3">
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
                                    ? news?.title
                                    : language === "hi"
                                    ? news?.title_hi
                                    : news?.title_bn}
                              </Card.Title>
                           </Card.Body>
                        </Card>
                     </Col>
                  )
            )}
         <Col lg={7} sm={6} className="pb-3 mt-3">
            <Row>
               {autobiographyNews?.news?.length > 0 &&
                  autobiographyNews?.news.map(
                     (news, index) =>
                        index + 1 > 1 &&
                        index + 1 <= 5 && (
                           <Col key={index + 1} lg={6} sm={12} className="mb-4">
                              <Card className=" p-2 bg-dark">
                                 <div className="position-relative">
                                    {news?.image && (
                                       <Image
                                          src={BackendPublicUrl + news?.image}
                                          alt="image"
                                          className="w-100"
                                       />
                                    )}
                                    <Link
                                       href={`/news-details?slug=${news?.slug}`}
                                       className="w-100 position-absolute bottom-0 start-0 text-white py-1 px-2 text-decoration-none "
                                       style={{
                                          backgroundColor: "rgba(0, 0, 0, .2)",
                                          backdropFilter: "blur(2px)",
                                       }}
                                    >
                                       {language === "en"
                                          ? news?.title
                                          : language === "hi"
                                          ? news?.title_hi
                                          : news?.title_bn}
                                    </Link>
                                 </div>
                              </Card>
                           </Col>
                        )
                  )}
            </Row>
         </Col>
      </Row>
   );
}

export default AutobiographyNews;
