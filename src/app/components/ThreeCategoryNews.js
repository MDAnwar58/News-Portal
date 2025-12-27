import React from "react";
import { Card, Col, Image, Row } from "react-bootstrap";
import { FaRegArrowAltCircleRight } from "react-icons/fa";
import { BackendPublicUrl } from "../react/url";
import Link from "next/link";
import { getSeeMore } from "../react/see-more";

function ThreeCategoryNews({ categoryWithNews, language }) {
   return (
      <Row className="pt-3">
         {categoryWithNews?.length > 0 &&
            categoryWithNews.map((data, index) => (
               <Col key={index + 1} lg={4} md={6} className="pt-3">
                  <div
                     className="d-flex bg-body-secondary"
                     style={{ borderLeft: "3px solid #000" }}
                  >
                     <div className="w-100 d-flex justify-content-between align-items-center gap-1 px-3 py-2">
                        <a className="fs-5 text-decoration-none text-muted pt-1">
                           {language === "en"
                              ? data?.category?.category_name
                              : language === "hi"
                              ? data?.category?.category_name_hi
                              : data?.category?.category_name_bn}
                        </a>
                        <Link
                           href={`/news?category=${data?.category?.category_slug}`}
                           className="fs-5 text-decoration-none text-muted d-flex align-items-center gap-1"
                        >
                           <div className="pt-1">{getSeeMore(language)}</div>
                           <div>
                              <FaRegArrowAltCircleRight />
                           </div>
                        </Link>
                     </div>
                  </div>

                  <Card className="p-2 rounded-0 mt-2">
                     {data?.news?.length > 0 &&
                        data?.news.map((news, index) =>
                           index + 1 === 1 ? (
                              <div
                                 key={index + 1}
                                 className=" position-relative"
                              >
                                 {news?.image && (
                                    <Image
                                       src={BackendPublicUrl + news?.image}
                                       alt="image"
                                       className="w-100"
                                    />
                                 )}
                                 <div
                                    className="position-absolute bottom-0 start-0 pb-3 px-3 text-white z-0"
                                    style={{
                                       background:
                                          "linear-gradient(to bottom, rgba(0, 0, 0, 0) 0, rgba(0, 0, 0, .4) 30%, rgba(0, 0, 0, .6) 100%)",
                                       width: "100%",
                                       margin: "0",
                                    }}
                                 >
                                    <Link
                                       href={`/news-details?slug=${news?.slug}`}
                                       className="text-black fs-5 text-decoration-none z-3 position-relative"
                                       style={{ lineHeight: "1.2" }}
                                    >
                                       {language === "en"
                                          ? news?.title
                                          : language === "hi"
                                          ? news?.title_hi
                                          : news?.title_bn}
                                    </Link>
                                 </div>
                              </div>
                           ) : (
                              <div
                                 key={index + 1}
                                 className=" d-flex pt-2 border-top mt-2"
                              >
                                 <Image
                                    src={BackendPublicUrl + news?.image}
                                    alt="tab news image"
                                    style={{ width: "70%", height: "91px" }}
                                 />
                                 <Link
                                    href={`/news-details?slug=${news?.slug}`}
                                    className="p-2 text-decoration-none text-secondary-emphasis"
                                 >
                                    {language === "en"
                                       ? news?.title
                                       : language === "hi"
                                       ? news?.title_hi
                                       : news?.title_bn}
                                 </Link>
                              </div>
                           )
                        )}
                  </Card>
               </Col>
            ))}
      </Row>
   );
}

export default ThreeCategoryNews;
