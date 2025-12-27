import React from "react";
import { Col, Container, Image, Row } from "react-bootstrap";
import { BiRightArrow } from "react-icons/bi";
import { BackendPublicUrl } from "../react/url";

function OpinionSection({ opinionMain, opinions = [], language }) {
   return (
      <div className="bg-warning-subtle">
         <Container>
            <Row>
               <Col lg={4} md={12} className="py-3">
                  <div className="border py-5 px-3 h-100">
                     <div className="d-flex gap-3 pb-3">
                        <h5 className="text-dark fs-4 fw-medium">
                           বিশেষ মতামত
                        </h5>
                        <span className="text-danger">
                           <BiRightArrow />
                        </span>
                     </div>
                     <h4 className="text-black fs-4 fw-bold pb-3">
                        {opinionMain &&
                        opinionMain.length > 0 &&
                        language === "en"
                           ? opinionMain[0]?.title
                           : language === "hi"
                           ? opinionMain[0]?.hi_title
                           : opinionMain[0]?.bn_title}
                     </h4>
                     <a
                        href="#"
                        className="text-primary fs-6 fw-semibold text-decoration-none"
                        dangerouslySetInnerHTML={{
                           __html:
                              opinionMain &&
                              opinionMain.length > 0 &&
                              language === "en"
                                 ? opinionMain[0]?.description
                                 : language === "hi"
                                 ? opinionMain[0]?.hi_description
                                 : opinionMain[0]?.bn_description,
                        }}
                     />
                  </div>
               </Col>
               <Col lg={8} md={12} className="py-3">
                  {opinions.length > 0 &&
                     opinions.map((option, i) => (
                        <div key={i + 1} className="d-flex gap-3 pb-3">
                           <Image
                              src={BackendPublicUrl + option.image}
                              alt="image"
                              style={{ width: "150px" }}
                           />
                           <p>
                              {language === "en"
                                 ? option.title
                                 : language === "hi"
                                 ? option.hi_title
                                 : option.bn_title}
                           </p>
                        </div>
                     ))}
               </Col>
            </Row>
         </Container>
      </div>
   );
}

export default OpinionSection;
