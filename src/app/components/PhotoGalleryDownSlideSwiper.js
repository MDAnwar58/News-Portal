"use client";
import React, { Fragment, useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

import "../vote-swiper.css";

// import required modules
import { Autoplay, Pagination } from "swiper/modules";
import { Card } from "react-bootstrap";
import { BackendPublicUrl } from "../react/url";

export default function PhotoGalleryDownSlideSwiper({
   setActiveIndex,
   photos,
}) {
   return (
      <div className="vote-swiper-area position-relative">
         <Swiper
            slidesPerView={2}
            spaceBetween={5}
            breakpoints={{
               1200: {
                  slidesPerView: 6,
                  spaceBetween: 15,
               },
               1024: {
                  slidesPerView: 5,
                  spaceBetween: 15,
               },
               768: {
                  slidesPerView: 4,
                  spaceBetween: 15,
               },
               475: {
                  slidesPerView: 3,
                  spaceBetween: 10,
               },
               320: {
                  slidesPerView: 2,
                  spaceBetween: 5,
               },
            }}
            modules={[Autoplay, Pagination]}
            autoplay={{
               delay: 3000, // 3 seconds delay between slides
               disableOnInteraction: false, // keeps autoplay after interaction
            }}
            pagination={{
               clickable: true,
               el: ".swiper-photo-gallery-pagination",
            }}
            className="photo-gallery-swiper p-1 z-0"
         >
            {photos?.length > 0 &&
               photos.map((photo, i) => (
                  <SwiperSlide key={i}>
                     <Card
                        className="border-0 rounded-0"
                        style={{ cursor: "pointer" }}
                        onClick={() => {
                           setActiveIndex(i);
                        }}
                     >
                        {photo?.photo_gallery && (
                           <Card.Img
                              variant="top"
                              src={BackendPublicUrl + photo?.photo_gallery}
                              className=" rounded-0"
                           />
                        )}
                     </Card>
                  </SwiperSlide>
               ))}
         </Swiper>
         <div className="photo-gallery-swiper-pagination-area py-2">
            <div className="swiper-photo-gallery-pagination d-flex justify-content-end"></div>
         </div>
      </div>
   );
}
