"use client";
import React from "react";
import { Button, Card, Col, Image } from "react-bootstrap";
import { BackendPublicUrl } from "../react/url";

export default function NewsDetailsLatestAndPopularNews({
   sideTab,
   setSideTab,
   latestNews,
   popularNews,
   language,
}) {
   return (
      <Col xl={3} md={4} className="mt-3">
         <div className="d-flex border-top border-dark">
            <Button
               variant={sideTab === "all-end" ? "dark" : "transpernt"}
               className="w-100 rounded-0"
               onClick={() => setSideTab("all-end")}
            >
               সর্বশেষ
            </Button>
            <Button
               variant={sideTab === "popular" ? "dark" : "transpernt"}
               className="w-100 rounded-0"
               onClick={() => setSideTab("popular")}
            >
               জনপ্রিয়
            </Button>
         </div>

         <div className="pt-1 d-flex flex-column gap-2 w-100">
            {sideTab === "popular"
               ? popularNews.length > 0 &&
                 popularNews.map((news, i) => (
                    <div
                       key={i}
                       className="border-0 border-bottom card-popular"
                    >
                       <div className="card-popular-image">
                          <Image
                             src={BackendPublicUrl + news.image}
                             alt="tab news image"
                             style={{
                                height: screen >= 320 ? "91px" : "auto",
                             }}
                             className="w-100"
                          />
                       </div>
                       <div className="p-2 card-popular-title">
                          {language == "en"
                             ? news?.title
                             : language == "hi"
                             ? news?.title_hi
                             : news?.title_bn}
                       </div>
                    </div>
                 ))
               : latestNews.length > 0 &&
                 latestNews.map((news, i) => (
                    <div
                       key={i}
                       className="border-0 border-bottom card-popular"
                    >
                       <div className="card-popular-image">
                          <Image
                             src={BackendPublicUrl + news.image}
                             alt="tab news image"
                             style={{
                                height: screen >= 320 ? "91px" : "auto",
                             }}
                             className="w-100"
                          />
                       </div>
                       <div className="p-2 card-popular-title">
                          {language == "en"
                             ? news?.title
                             : language == "hi"
                             ? news?.title_hi
                             : news?.title_bn}
                       </div>
                    </div>
                 ))}
         </div>
      </Col>
   );
}
