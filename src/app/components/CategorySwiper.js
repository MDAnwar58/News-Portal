import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "../category-news-swiper.css";

// import required modules
import { Pagination } from "swiper/modules";
import { Card, Image } from "react-bootstrap";
import { BackendPublicUrl } from "../react/url";
import Link from "next/link";

export default function CategorySwiper({ secondCategoryNews = [], language }) {
   return (
      <>
         <Swiper
            slidesPerView={1}
            breakpoints={{
               1024: {
                  slidesPerView: 4,
                  spaceBetween: 15,
               },
               768: {
                  slidesPerView: 3,
                  spaceBetween: 15,
               },
               475: {
                  slidesPerView: 2,
                  spaceBetween: 10,
               },
               320: {
                  slidesPerView: 1,
                  spaceBetween: 5,
               },
            }}
            pagination={{
               clickable: true,
               el: ".category-swiper-pagination",
            }}
            modules={[Pagination]}
            className="mySwiper pb-1"
         >
            {secondCategoryNews?.length > 0 &&
               secondCategoryNews.map((news, index) => (
                  <SwiperSlide key={index + 1}>
                     <Card className=" p-2 rounded-0">
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
                  </SwiperSlide>
               ))}
         </Swiper>
         <div className="swiper-down">
            <div className="category-swiper-pagination"></div>
         </div>
      </>
   );
}
