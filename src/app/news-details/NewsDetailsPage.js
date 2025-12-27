"use client";
import React, { useEffect, useState } from "react";
import { Button, Card, Col, Container, Image, Row } from "react-bootstrap";
import { IoHomeOutline, IoReorderFourOutline } from "react-icons/io5";
import { IoReorderThreeOutline } from "react-icons/io5";
import { MdOutlineKeyboardDoubleArrowRight } from "react-icons/md";
import { IoMdEye } from "react-icons/io";
import { FaFacebookSquare } from "react-icons/fa";
import RelativeNewsSwiper from "../components/RelativeNewsSwiper";
import Axios from "../react/axios";
import Link from "next/link";
import { BackendPublicUrl } from "../react/url";
import NewsDetailsLatestAndPopularNews from "../components/NewsDetailsLatestAndPopularNews";
import { useLanguage } from "../react/GlobalFragment";
import { newsDetailsLang } from "./news-details-lang";
import Preloader from "../components/preloader";

export default function NewsDetailsPage() {
   const [isLargeScreen, setIsLargeScreen] = useState(false);
   const [screen, setScreen] = useState(0);
   const [sideTab, setSideTab] = useState("all-end");
   const [tab, setTab] = useState("সমস্ত");
   const [news, setNews] = useState({});
   const [relatedNews, setRelatedNews] = useState([]);
   const [tags, setTags] = useState([]);
   const [latestNews, setLatestNews] = useState([]);
   const [popularNews, setPopularNews] = useState([]);
   const { language } = useLanguage();
   const news_details_page = newsDetailsLang(language);
   const [pageLoad, setPageLoad] = useState(false);

   useEffect(() => {
      const updateScreenSize = () => {
         setScreen(window.innerWidth); // Dynamically update screen width on resize
      };
      // how to search params
      const searchParams = new URLSearchParams(window.location.search);
      const slug = searchParams.get("slug");
      getNewsDetails(slug);
      getHighlights();

      window.addEventListener("resize", updateScreenSize);
      return () => window.removeEventListener("resize", updateScreenSize); // Cleanup listener
   }, []);

   const getNewsDetails = async (slug) => {
      setPageLoad(false);
      const res = await Axios.get(`news/${slug}`);
      setNews(res.data.news);
      setRelatedNews(res.data.related);
      setTags(res.data.tags);
      setPageLoad(true);
   };
   const getHighlights = async () => {
      const res = await Axios.get("/home/highlights");
      setLatestNews(res.data.latest_news);
      setPopularNews(res.data.popular_news);
   };
   if (!pageLoad) return <Preloader />;
   console.log(news);
   return (
      <>
         <Container className="pb-5">
            <Row>
               <Col xl={9} md={8}>
                  <Row className=" pt-3 ">
                     <Col sm={12}>
                        <div className="d-flex align-items-center bg-body-secondary">
                           <Link
                              href="/"
                              className="d-flex align-items-center gap-1 text-decoration-none bg-danger text-white px-3 py-1"
                           >
                              <IoHomeOutline className=" fs-5" />
                              <div className="fs-5 fw-medium">
                                 {news_details_page?.home_btn_title}
                              </div>
                           </Link>
                           <a className="d-flex align-items-center gap-1 text-decoration-none bg-secondary text-white px-2 py-1">
                              <IoReorderThreeOutline className=" fs-5" />
                              <div className="fs-5 fw-normal">
                                 {news?.category && language === "en"
                                    ? news?.category?.category_name
                                    : language === "hi"
                                    ? news?.category?.category_name_hi
                                    : news?.category?.category_name_bn}
                              </div>
                              <MdOutlineKeyboardDoubleArrowRight className=" fs-5" />
                           </a>
                        </div>
                     </Col>
                     <Col sm={12} className="mt-4">
                        <h3>
                           {language === "en"
                              ? news?.news_title
                              : language === "hi"
                              ? news?.news_title_hi
                              : news?.news_title_bn}
                        </h3>
                        <div className="d-flex gap-2">
                           {news.image && (
                              <Image
                                 src="https://blog.nweightloss.shop/public//storage/news/673e304975dcf.webp"
                                 alt="image"
                                 style={{
                                    width: "3rem",
                                 }}
                              />
                           )}
                           <div className="w-100">
                              <div className="border-bottom pb-1">
                                 <span>{news_details_page?.post_title}</span>{" "}
                                 <span>
                                    <a href="">Admin</a>
                                 </span>{" "}
                              </div>
                              <div className="d-flex gap-1 align-items-center">
                                 <span>/</span>{" "}
                                 <span>
                                    <IoMdEye className="fs-6" />
                                 </span>
                                 <span>{news_details_page?.read}</span>
                              </div>
                           </div>
                        </div>
                        <div className="pt-3">
                           <div>
                              <Image
                                 src={BackendPublicUrl + news.image}
                                 alt="image"
                                 className="w-100"
                                 style={{
                                    height: "30rem",
                                 }}
                              />
                           </div>
                           <div>
                              {/* {news?.news_title_bn && (
                                 <h5 className="pt-1">{news?.news_title_bn}</h5>
                              )} */}

                              {news?.news_details && (
                                 <div
                                    className="pt-1"
                                    dangerouslySetInnerHTML={{
                                       __html:
                                          language === "en"
                                             ? news?.news_details
                                             : language === "hi"
                                             ? news?.news_details_hi
                                             : news?.news_details_bn,
                                    }}
                                 />
                              )}
                              <div className="d-flex flex-row gap-2 align-items-center pt-3">
                                 <span className="fs-6">
                                    {news_details_page?.tags} :
                                 </span>
                                 {tags.length > 0 &&
                                    tags.map((tag, i) => (
                                       <a
                                          key={i + 1}
                                          className="btn btn-outline-danger py-0 px-2 rounded-5"
                                       >
                                          {tag}
                                       </a>
                                    ))}
                              </div>
                              {/* <div className="d-flex flex-row gap-2 align-items-center pt-3">
                                 <span className="fs-6">Tags :</span>
                                 <a
                                    href=""
                                    className="btn btn-outline-danger py-0 px-2 rounded-5"
                                 >
                                    Hindu Society
                                 </a>
                              </div> */}
                           </div>
                        </div>
                     </Col>
                  </Row>
               </Col>
               <NewsDetailsLatestAndPopularNews
                  sideTab={sideTab}
                  setSideTab={setSideTab}
                  latestNews={latestNews}
                  popularNews={popularNews}
                  language={language}
               />

               <Col sm={12}>
                  <div className="pt-5">
                     <h4 className="">{news_details_page?.share_title} </h4>
                     <div className="px-2 border-bottom border-top pt-2 pb-3">
                        <button
                           type="button"
                           className="btn btn-info fs-6 text-white mt-2"
                        >
                           Copy Link
                        </button>

                        <div className="d-flex flex-row gap-2 pt-3">
                           <a href="" className="btn btn-outline-dark pt-1">
                              <FaFacebookSquare />
                           </a>
                           <a href="" className="btn btn-outline-dark pt-1">
                              <FaFacebookSquare />
                           </a>
                           <a href="" className="btn btn-outline-dark pt-1">
                              <FaFacebookSquare />
                           </a>
                           <a href="" className="btn btn-outline-dark pt-1">
                              <FaFacebookSquare />
                           </a>
                           <a href="" className="btn btn-outline-dark pt-1">
                              <FaFacebookSquare />
                           </a>
                           <a href="" className="btn btn-outline-dark pt-1">
                              <FaFacebookSquare />
                           </a>
                           <a href="" className="btn btn-outline-dark pt-1">
                              <FaFacebookSquare />
                           </a>
                        </div>
                     </div>
                     <h6 className="fw-bold my-3">
                        {news_details_page?.review_title}{" "}
                        <Link href="/sign-in">
                           {news_details_page?.login_link_name}{" "}
                        </Link>
                     </h6>

                     <Row>
                        <Col>
                           <Card className="rounded-0">
                              <div className="d-flex bg-body-secondary">
                                 <div
                                    className="d-flex align-items-center gap-1 ps-3 py-2 pe-5"
                                    style={{
                                       backgroundColor: "#000",
                                       color: "#fff",
                                       width: "auto",
                                       clipPath:
                                          "polygon(0 0, 100% 0%, 86% 100%, 0% 100%)",
                                    }}
                                 >
                                    <span className="fs-5">
                                       {news_details_page?.related_news_title}
                                    </span>
                                 </div>
                              </div>
                           </Card>
                        </Col>
                     </Row>

                     <Row className="pt-2 mb-5">
                        <Col>
                           <RelativeNewsSwiper
                              relatedNews={relatedNews}
                              language={language}
                           />
                        </Col>
                     </Row>
                  </div>
               </Col>
            </Row>
         </Container>
      </>
   );
}
