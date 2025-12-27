"use client";
import React, { Fragment, useRef, useState } from "react";
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
import { Alert } from "../react/alert";
import { toDigits } from "../react/date";

export default function VoteSwiper({ votingBlogs, voteStore, language }) {
   const [voteing, setVoteing] = useState({
      blogId: null,
      vote: null,
   });

   const onHandleVoting = (vote, blog_id) => {
      setVoteing({
         blogId: blog_id,
         vote,
      });
   };

   return (
      <div className="vote-swiper-area position-relative">
         <Swiper
            slidesPerView={1}
            spaceBetween={0}
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
            navigation={{
               nextEl: ".swiper-vote-next",
               prevEl: ".swiper-vote-prev",
            }}
            modules={[Navigation]}
            className="vote-swiper p-1 z-0"
         >
            {votingBlogs.length > 0 &&
               votingBlogs.map((blog, i) => (
                  <SwiperSlide key={i + 1}>
                     <Card className="border-0">
                        <Card.Img
                           variant="top"
                           src={BackendPublicUrl + blog.image}
                        />
                        <Card.Body>
                           <Card.Title>
                              {language === "en"
                                 ? blog?.title
                                 : language === "hi"
                                 ? blog?.title_hi
                                 : blog?.title_bn}
                           </Card.Title>
                           <Card.Text
                              dangerouslySetInnerHTML={{
                                 __html:
                                    language === "en"
                                       ? blog?.description
                                       : language === "hi"
                                       ? blog?.description_hi
                                       : blog?.description_bn,
                              }}
                           />
                           <div className="vote-rating">
                              <Form>
                                 {["radio"].map((type) => (
                                    <Fragment key={`reverse-${type}`}>
                                       <div
                                          className="mb-2 p-1 d-flex align-items-center justify-content-between"
                                          style={{ backgroundColor: "#CBFDD8" }}
                                       >
                                          <Form.Check
                                             label={
                                                language === "en"
                                                   ? "Yes"
                                                   : language === "hi"
                                                   ? "ह्या"
                                                   : "হ্যা"
                                             }
                                             name={`vote-${blog?.id}`}
                                             type={type}
                                             id={`reverse-yes-${blog?.id}`}
                                             onChange={() =>
                                                onHandleVoting("Yes", blog?.id)
                                             }
                                             checked={
                                                voteing?.blogId === blog?.id &&
                                                voteing?.vote === "Yes"
                                             }
                                          />
                                          <div className="fs-6 fw-semibold">
                                             {toDigits(70, language)}%
                                          </div>
                                       </div>

                                       <div
                                          className="mb-2 p-1 d-flex align-items-center justify-content-between"
                                          style={{ backgroundColor: "#E8F5C6" }}
                                       >
                                          <Form.Check
                                             label={
                                                language === "en"
                                                   ? "No"
                                                   : language === "hi"
                                                   ? "ना"
                                                   : "না"
                                             }
                                             name={`vote-${blog?.id}`}
                                             type={type}
                                             id={`reverse-no-${blog?.id}`}
                                             onChange={() =>
                                                onHandleVoting("No", blog?.id)
                                             }
                                             checked={
                                                voteing?.blogId === blog?.id &&
                                                voteing?.vote === "No"
                                             }
                                          />
                                          <div className="fs-6 fw-semibold">
                                             {toDigits(30, language)}%
                                          </div>
                                       </div>

                                       <div
                                          className="mb-2 p-1 d-flex align-items-center justify-content-between"
                                          style={{ backgroundColor: "#E3F8F8" }}
                                       >
                                          <Form.Check
                                             label={
                                                language === "en"
                                                   ? "Nothing"
                                                   : language === "hi"
                                                   ? "कुछ नहीं"
                                                   : "কিছুই না"
                                             }
                                             name={`vote-${blog?.id}`}
                                             type={type}
                                             id={`reverse-other-${blog?.id}`}
                                             onChange={() =>
                                                onHandleVoting(
                                                   "Nothing",
                                                   blog?.id
                                                )
                                             }
                                             checked={
                                                voteing?.blogId === blog?.id &&
                                                voteing?.vote === "Nothing"
                                             }
                                          />
                                          <div className="fs-6 fw-semibold">
                                             {toDigits(50, language)}%
                                          </div>
                                       </div>
                                    </Fragment>
                                 ))}
                              </Form>
                           </div>
                           <div className="text-center pb-4">
                              <button
                                 type="button"
                                 className="btn text-white px-4"
                                 style={{ backgroundColor: "#00A0D2" }}
                                 onClick={() => {
                                    if (blog?.id === voteing?.blogId) {
                                       voteStore(blog?.id, voteing?.vote);
                                    } else {
                                       Alert({
                                          type: "error",
                                          msg: "আপনি এখন ভোট দিন করতে পারবেন",
                                       });
                                       // alert("আপনি এখন ভোট দিন করতে পারবেন");
                                    }
                                 }}
                              >
                                 {language === "en"
                                    ? "Vote"
                                    : language === "hi"
                                    ? "वोट दें"
                                    : "ভোট দিন"}
                              </button>
                           </div>
                           <div className="d-flex flex-xl-row flex-column gap-xl-0 gap-2 justify-content-between align-items-center">
                              <a
                                 href="#"
                                 className="text-decoration-none text-muted d-flex align-items-center btn btn-success gap-1"
                              >
                                 <span>
                                    <FaFacebook className=" text-white" />
                                 </span>
                                 <span className=" text-white pt-1">
                                    FACEBOOK
                                 </span>
                              </a>
                              <a
                                 href="#"
                                 className="text-decoration-none text-muted d-flex align-items-center btn btn-success gap-1"
                              >
                                 <span>
                                    <FaTwitter className=" text-white" />
                                 </span>
                                 <span className=" text-white pt-1">
                                    Twitter
                                 </span>
                              </a>
                           </div>
                        </Card.Body>
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
