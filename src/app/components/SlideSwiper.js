"use client";
import React, { Fragment, useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

import "../vote-swiper.css";

// import required modules
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Card, Form } from "react-bootstrap";
import { FaChevronRight, FaFacebook, FaTwitter } from "react-icons/fa";
import { FaChevronLeft } from "react-icons/fa";
import { BackendPublicUrl } from "../react/url";
import Link from "next/link";

export default function SlideSwiper({ carosals }) {
   const [votes, setVotes] = useState([]);

   const onHandleVoting = (vote, id) => {
      setVotes((prev) => {
         return {
            id,
            no: vote,
         };
      });
   };

   const submitVote = () => {
      console.log(votes);
   };

   return (
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
         modules={[Autoplay]}
         autoplay={{
            delay: 3000, // 3 seconds delay between slides
            disableOnInteraction: false, // keeps autoplay after interaction
         }}
         className="slide-swiper p-1 z-0"
      >
         {carosals?.length > 0 &&
            carosals.map((carosal, i) => (
               <SwiperSlide key={i + 1}>
                  <a
                     href={carosal?.url}
                     target="_blank"
                     className="text-decoration-none"
                  >
                     <Card className="border-0 rounded-0 px-3">
                        <Card.Img
                           variant="top"
                           src={BackendPublicUrl + carosal?.image || ""}
                           className=" rounded-circle"
                        />
                        <Card.Title className="text-center pt-2">
                           {carosal?.title}
                        </Card.Title>
                     </Card>
                  </a>
               </SwiperSlide>
            ))}
      </Swiper>
   );
}
