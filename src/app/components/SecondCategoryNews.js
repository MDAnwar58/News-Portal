import React from "react";
import { Card, Col, Row } from "react-bootstrap";
import { IoReorderFourOutline } from "react-icons/io5";
import CategorySwiper from "./CategorySwiper";

function SecondCategoryNews({ first, language }) {
   return (
      <>
         <Row className="pt-3">
            <Col>
               <Card className="rounded-0">
                  <div className="d-flex bg-body-secondary">
                     <div
                        className="d-flex align-items-center gap-1 ps-3 py-2 pe-5"
                        style={{
                           backgroundColor: "#000",
                           color: "#fff",
                           width: "auto",
                           clipPath: "polygon(0 0, 100% 0%, 86% 100%, 0% 100%)",
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
            </Col>
         </Row>
         <Row className="pt-2">
            <Col>
               <CategorySwiper
                  secondCategoryNews={first?.news}
                  language={language}
               />
            </Col>
         </Row>
      </>
   );
}

export default SecondCategoryNews;
