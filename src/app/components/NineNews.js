import Link from "next/link";
import React from "react";
import { Card, Col, Row } from "react-bootstrap";
import { BackendPublicUrl } from "../react/url";

export default function NineNews({ nineNews, language }) {
   return (
      <Col className="mt-4">
         <Row>
            {nineNews.length > 0 &&
               nineNews.map((news, index) => (
                  <Col
                     key={index + 1}
                     xl={4}
                     sm={6}
                     className="pb-3 col-xs-6 col-xss-6"
                  >
                     <Card>
                        <Card.Img
                           variant="top"
                           src={BackendPublicUrl + news.image}
                        />
                        <Card.Body>
                           <Card.Title
                              as={Link}
                              href={`/news-details?slug=${news.slug}`}
                              className="text-decoration-none"
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
               ))}
         </Row>
      </Col>
   );
}
