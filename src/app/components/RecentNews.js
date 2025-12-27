"use client";
import React from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import "../recent-news.css";

// import required modules
import { Pagination, Navigation } from "swiper/modules";
import { Card } from "react-bootstrap";
import { BackendPublicUrl } from "../react/url";
import Link from "next/link";

export default function RecentNews({ sliders, language }) {
   return (
      <>
         {sliders?.length > 0 && (
            <Swiper
               pagination={{
                  type: "fraction",
               }}
               navigation={true}
               modules={[Pagination, Navigation]}
               className="recentNews"
            >
               {sliders.map((news, index) => (
                  <SwiperSlide key={index + 1}>
                     <Card className="text-white p-0">
                        <Card.Img
                           src={BackendPublicUrl + news?.image}
                           alt="Card image"
                           style={{
                              height: "285px",
                           }}
                        />
                        <Card.ImgOverlay className="d-flex align-items-end p-0">
                           <Card.Title
                              className="m-0 px-3 py-2 rounded-bottom w-100 text-decoration-none"
                              style={{
                                 backgroundColor: "rgba(0, 0, 0, .2)",
                                 backdropFilter: "blur(3px)",
                              }}
                              as={Link}
                              href={`/news-details?slug=${news?.slug}`}
                           >
                              {language === "en"
                                 ? news.title
                                 : language === "hi"
                                 ? news.title_hi
                                 : news.title_bn}
                           </Card.Title>
                        </Card.ImgOverlay>
                     </Card>
                  </SwiperSlide>
               ))}
            </Swiper>
         )}
      </>
   );
}
