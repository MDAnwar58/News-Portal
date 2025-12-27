import React from "react";
import { Card, Col, Image, Row } from "react-bootstrap";
import { IoReorderFourOutline } from "react-icons/io5";
import { BackendAPIUrl, BackendPublicUrl } from "../react/url";
import Link from "next/link";

function FirstCategoryNews({ first, language }) {
   return (
      <Row className="mt-2">
         <Col lg={8} md={7} sm={12}>
            <Card className="rounded-0">
               <div className="border-bottom border-dark d-flex">
                  <div
                     className="d-flex align-items-center gap-1 ps-3 py-2 pe-5"
                     style={{
                        backgroundColor: "#000",
                        color: "#fff",
                        width: "auto",
                        clipPath: "polygon(0 0, 80% 0%, 100% 100%, 0% 100%)",
                     }}
                  >
                     <span>
                        <IoReorderFourOutline className="fs-4" />
                     </span>
                     <span className="fs-5">
                        {language === "en"
                           ? first?.category?.category_name
                           : language === "hi"
                           ? first?.category?.category_name_hi
                           : first?.category?.category_name_bn}
                     </span>
                  </div>
               </div>
            </Card>

            <Row className="pt-3">
               <Col lg={6} sm={12}>
                  {first?.news?.length > 0 &&
                     first?.news.map(
                        (news, index) =>
                           index + 1 === 1 && (
                              <Card key={index + 1} className="rounded-0">
                                 <Card.Img
                                    variant="top"
                                    src={BackendPublicUrl + news?.image}
                                    className="rounded-0"
                                 />
                                 <Card.Body>
                                    <Card.Title
                                       as={Link}
                                       href={`/news-details?slug=${news.slug}`}
                                       className="text-decoration-none"
                                    >
                                       {language === "en"
                                          ? news?.title
                                          : language === "hi"
                                          ? news?.title_hi
                                          : news?.title_bn}
                                    </Card.Title>
                                 </Card.Body>
                              </Card>
                           )
                     )}
               </Col>
               <Col lg={6} sm={12}>
                  <div className="pt-lg-0 pt-3">
                     {first?.news?.length > 0 &&
                        first?.news.map((news, index) =>
                           index + 1 >= 2 && index + 1 <= 3 ? (
                              <div
                                 key={index + 1}
                                 className="bg-light d-flex p-2"
                                 style={{
                                    borderBottom:
                                       index + 1 > 1 && index + 1 < 4
                                          ? "1px dashed #000"
                                          : index + 1 > 1 &&
                                            index + 1 < 3 &&
                                            "1px dashed #000",
                                 }}
                              >
                                 {news?.image && (
                                    <Image
                                       src={BackendPublicUrl + news?.image}
                                       alt="tab news image"
                                       style={{
                                          width: "70%",
                                          height: "91px",
                                       }}
                                    />
                                 )}
                                 <Link
                                    className="p-2 text-decoration-none text-secondary-emphasis"
                                    href={`/news-details?slug=${news.slug}`}
                                 >
                                    {language === "en"
                                       ? news?.title
                                       : language === "hi"
                                       ? news?.title_hi
                                       : news?.title_bn}
                                 </Link>
                              </div>
                           ) : (
                              index + 1 > 3 &&
                              index + 1 <= 4 && (
                                 <Link
                                    key={index + 1}
                                    className="bg-light d-flex p-2 text-decoration-none text-secondary-emphasis"
                                    href={`/news-details?slug=${news.slug}`}
                                 >
                                    {news?.image && (
                                       <Image
                                          src={BackendPublicUrl + news?.image}
                                          alt="tab news image"
                                          style={{
                                             width: "70%",
                                             height: "91px",
                                          }}
                                       />
                                    )}
                                    <div className="p-2">
                                       {language === "en"
                                          ? news?.title
                                          : language === "hi"
                                          ? news?.title_hi
                                          : news?.title_bn}
                                    </div>
                                 </Link>
                              )
                           )
                        )}
                  </div>
               </Col>
            </Row>
         </Col>
         <Col lg={4} md={5} sm={12}>
            <Card className="bg-body-secondary rounded-0 border-0 px-5">
               <Row className="gap-3">
                  {first?.news?.length > 0 &&
                     first?.news.map(
                        (news, index) =>
                           index + 1 > 4 &&
                           index + 1 <= 5 && (
                              <Col
                                 key={index + 1}
                                 sm={12}
                                 as={Link}
                                 href={`/news-details?slug=${news.slug}`}
                              >
                                 {news?.image && (
                                    <Image
                                       key={index + 1}
                                       src={BackendPublicUrl + news?.image}
                                       alt="image"
                                       className="w-100"
                                    />
                                 )}
                              </Col>
                           )
                     )}
               </Row>
            </Card>
         </Col>
      </Row>
   );
}

export default FirstCategoryNews;
