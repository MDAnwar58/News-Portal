"use client";
import React, { Fragment, useEffect, useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

import "../vote-swiper.css";

// import required modules
import { Navigation } from "swiper/modules";
import { Card, Form } from "react-bootstrap";
import { FaChevronRight, FaFacebook, FaTwitter } from "react-icons/fa";
import { FaChevronLeft } from "react-icons/fa";
import { BackendPublicUrl } from "../react/url";

export default function PhotoGallerySwiper({ activeIndex, photos }) {
   const [swiperRef, setSwiperRef] = useState(null);
   const [screen, setScreen] = useState(null);

   useEffect(() => {
      if (swiperRef && typeof activeIndex === "number") {
         swiperRef.slideTo(activeIndex);
      }
   }, [activeIndex, swiperRef]);

   useEffect(() => {
      const updateScreenSize = () => {
         setScreen(window.innerWidth); // Dynamically update screen width on resize
      };

      window.addEventListener("resize", updateScreenSize);
      return () => window.removeEventListener("resize", updateScreenSize); // Cleanup listener
   }, []);

   return (
      <div className="vote-swiper-area position-relative">
         <Swiper
            onSwiper={(swiper) => setSwiperRef(swiper)}
            slidesPerView={1}
            spaceBetween={0}
            navigation={{
               nextEl: ".swiper-vote-next",
               prevEl: ".swiper-vote-prev",
            }}
            modules={[Navigation]}
            className="vote-swiper p-1 z-0"
         >
            {photos?.length > 0 &&
               photos.map((photo, i) => (
                  <SwiperSlide key={i}>
                     <Card className="border-0 rounded-0">
                        {photo?.photo_gallery && (
                           <Card.Img
                              variant="top"
                              src={BackendPublicUrl + photo?.photo_gallery}
                              className=" rounded-0"
                              style={{
                                 height:
                                    screen && screen > 1399
                                       ? "75vh"
                                       : screen > 1399
                                       ? "65vh"
                                       : screen > 992
                                       ? "55vh"
                                       : screen > 525
                                       ? "45vh"
                                       : "auto",
                              }}
                           />
                        )}
                     </Card>
                  </SwiperSlide>
               ))}
         </Swiper>

         <div className="swiper-vote-navigation position-absolute top-50 start-0 translate-middle-y w-100 z-1">
            <div className="vote-navigations d-flex justify-content-between align-items-center">
               <button
                  type="button"
                  className="swiper-vote-prev btn border-0"
                  style={{ color: "#FFC0CB" }}
               >
                  <FaChevronLeft className="fs-3" />
               </button>
               <button
                  type="button"
                  className="swiper-vote-next btn border-0"
                  style={{ color: "#FFC0CB" }}
               >
                  <FaChevronRight className="fs-3" />
               </button>
            </div>
         </div>
      </div>
   );
}
