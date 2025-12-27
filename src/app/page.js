"use client";
import { Card, Col, Container, Image, Row } from "react-bootstrap";
import RecentNews from "./components/RecentNews";
import { Fragment, useCallback, useEffect, useState } from "react";
import { IoReorderFourOutline, IoVideocamOutline } from "react-icons/io5";
import { FaPlay, FaRegArrowAltCircleRight } from "react-icons/fa";
import CategorySwiperSecond from "./components/CategorySwiperSecond";
import { RxCross2 } from "react-icons/rx";
import VoteSwiper from "./components/VoteSwiper";
import { CiCamera } from "react-icons/ci";
import PhotoGallery from "./components/PhotoGallery";
import VideoModal from "./components/VideoModal";
import SlideSwiper from "./components/SlideSwiper";
import Axios from "./react/axios";
import LatestAndPopularNews from "./components/LatestAndPopularNews";
import OpinionSection from "./components/OpinionSection";
import GoToUpHeroSection from "./components/GoToUpHeroSection";
import ThreeNews from "./components/ThreeNews";
import NineNews from "./components/NineNews";
import SubCategoryNews from "./components/SubCategoryNews";
import FirstCategoryNews from "./components/FirstCategoryNews";
import SecondCategoryNews from "./components/SecondCategoryNews";
import ThreeFourFiveCategoryNews from "./components/ThreeFourFiveCategoryNews";
import ThreeCategoryNews from "./components/ThreeCategoryNews";
import ThreeCategorySliderNews from "./components/ThreeCategorySliderNews";
import TwoCategoryNews from "./components/TwoCategoryNews";
import AutobiographyNews from "./components/AutobiographyNews";
import SixCategoryNews from "./components/SixCategoryNews";
import LastCategoryNews from "./components/LastCategoryNews";
import VideosGallery from "./components/VideosGallery";
import { useLanguage } from "./react/GlobalFragment";
import Preloader from "./components/preloader";
import Marquee from "./components/Marquee";

export default function Home() {
   const [isLargeScreen, setIsLargeScreen] = useState(false);
   const [screen, setScreen] = useState(0);
   const [sideTab, setSideTab] = useState("all-end");
   const [tab, setTab] = useState("সমস্ত");
   const [voteArea, setVoteArea] = useState(true);
   const [modalShow, setModalShow] = useState(false);
   const [latestNews, setLatestNews] = useState([]);
   const [popularNews, setPopularNews] = useState([]);
   const [votingBlogs, setVotingBlogs] = useState([]);
   const [opinions, setOpinions] = useState([]);
   const [opinionMain, setOpinionMain] = useState({});
   const [sliders, setSliders] = useState([]);
   const [threeNews, setThreeNews] = useState([]);
   const [nineNews, setNineNews] = useState([]);
   const [liveTv, setLiveTv] = useState({});
   const [subCategories, setSubCategories] = useState([]);
   const [subCategoryNews, setSubCategoruNews] = useState([]);
   const [subCategoryNewsDataLoad, setSubCategoryNewsDataLoad] =
      useState(false);
   const [firstCategortNews, setFirstCategortNews] = useState([]);
   const [threeCategoryNews, setThreeCategoryNews] = useState([]);
   const [twoCategoryNews, setTwoCategoryNews] = useState([]);
   const [threeSliderCategoryNews, setThreeSliderCategoryNews] = useState([]);
   const [autobiographyNews, setAutobiographyNews] = useState([]);
   const [categoryWithNews, setCategoryWithNews] = useState([]);
   const [lastCategoryNews, setLastCategoryNews] = useState([]);
   const [videos, setVideos] = useState([]);
   const [photos, setPhotos] = useState([]);
   const [carosals, setCarosals] = useState([]);
   const [video, setVideo] = useState(null);
   const { language } = useLanguage();
   const [csrfToken, setCsrfToken] = useState("");
   const [pageLoad, setPageLoad] = useState(false);

   useEffect(() => {
      const updateScreenSize = () => {
         setScreen(window.innerWidth); // Dynamically update screen width on resize
      };
      getFirstSections();
      getHighlights();
      getNewsWithSubCategory("");
      getFirstCategortNews();
      getVotingBlogs();
      getThiredCategoryNews();
      getOpinions();
      getCarosals();
      getSecondCategoryNews();
      getLastCategoryNews();
      getPhotoGallery();
      getVideos();
      getCsrfToken();

      window.addEventListener("resize", updateScreenSize);
      return () => window.removeEventListener("resize", updateScreenSize); // Cleanup listener
   }, []);

   const scrollToTop = () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
   };
   const getFirstSections = async () => {
      setPageLoad(false);
      const res = await Axios.get("/home/first-section");
      setSliders(res.data.slider);
      setThreeNews(res.data.three);
      setNineNews(res.data.nine);
      setPageLoad(true);
   };
   const getHighlights = async () => {
      const res = await Axios.get("/home/highlights");
      setLatestNews(res.data.latest_news);
      setPopularNews(res.data.popular_news);
   };
   const getNewsWithSubCategory = async (slug) => {
      setSubCategoryNewsDataLoad(true);
      const res = await Axios.get(`/home/sub-categories-home?slug=${slug}`);
      setSubCategories(res.data.subcategories);
      setSubCategoruNews(res.data.news);
      setTimeout(() => {
         setSubCategoryNewsDataLoad(false);
      }, 100);
   };
   const getFirstCategortNews = async () => {
      const res = await Axios.get("/home/first-category");
      setFirstCategortNews(res.data.categories);
   };
   const getVotingBlogs = async () => {
      const res = await Axios.get("/home/voting-blogs");
      setVotingBlogs(res.data.voting_blogs);
   };
   const getThiredCategoryNews = async () => {
      const res = await Axios.get("/home/thired-category");
      setThreeCategoryNews(res.data.categories3);
      setTwoCategoryNews(res.data.categories2);
      setThreeSliderCategoryNews(res.data.categorySlide3);
   };
   const getOpinions = async () => {
      const res = await Axios.get("/home/opinions");
      setOpinionMain(res.data.opinion_main);
      setOpinions(res.data.opinions);
   };
   const getCarosals = async () => {
      const res = await Axios.get("/home/carosul");
      setCarosals(res.data.slider);
   };
   const getSecondCategoryNews = async () => {
      const res = await Axios.get("/home/second-category");
      setCategoryWithNews(res.data.categories);
      setAutobiographyNews(res.data.categorySlide2);
   };
   const getLastCategoryNews = async () => {
      const res = await Axios.get("/home/last-category");
      setLastCategoryNews(res.data.categories);
   };
   const getPhotoGallery = async () => {
      const res = await Axios.get("/home/photo-galary");
      setPhotos(res.data.photos);
   };
   const getVideos = async () => {
      const res = await Axios.get("/video");
      setVideos(res.data);
   };
   const getLiveTv = async (url) => {
      setLiveTv({});
      if (!url) {
         const res = await Axios.get("/home/live-tv");
         setLiveTv(res.data.live_tv);
         setModalShow(true);
      } else {
         setLiveTv(url);
      }
   };

   const setSubCategory = async (slug, id) => {
      setSubCategoruNews([]);
      if (slug !== "সমস্ত") {
         getNewsWithSubCategory(slug);
         setTab(`${slug + id}`);
      } else {
         getNewsWithSubCategory("");
         setTab("সমস্ত");
      }
   };
   const getCsrfToken = async () => {
      const res = await Axios.get("/csrf-token");
      setCsrfToken(res.data.csrf_token);
   };

   const voteStore = useCallback(
      async (blogId, radio) => {
         const res = await Axios.post(
            "/home/vote/store",
            {
               blog_id: blogId,
               radio,
            },
            {
               headers: {
                  "X-CSRF-TOKEN": csrfToken, // Use the appropriate header key
               },
               withCredentials: true,
            }
         );
         console.log(res.data);
      },
      [csrfToken]
   );
   if (!pageLoad) return <Preloader />;
   return (
      <>
         <Marquee />
         <Container className="pt-3 pb-5">
            <Row>
               <Col xl={9} md={8}>
                  <Row>
                     <Col xl={7} md={12}>
                        <RecentNews sliders={sliders} language={language} />
                     </Col>
                     <Col
                        xl={5}
                        md={12}
                        className="d-flex flex-column gap-3 pt-xl-0 pt-5"
                     >
                        <ThreeNews
                           screen={screen}
                           threeNews={threeNews}
                           language={language}
                        />
                     </Col>

                     <NineNews nineNews={nineNews} language={language} />
                  </Row>
               </Col>
               <LatestAndPopularNews
                  sideTab={sideTab}
                  setSideTab={setSideTab}
                  latestNews={latestNews}
                  popularNews={popularNews}
                  getLiveTv={getLiveTv}
                  language={language}
               />
            </Row>
         </Container>
         <SubCategoryNews
            tab={tab}
            setSubCategory={setSubCategory}
            subCategories={subCategories}
            subCategoryNews={subCategoryNews}
            subCategoryNewsDataLoad={subCategoryNewsDataLoad}
            language={language}
         />
         <Container className="pb-5">
            {firstCategortNews.length > 0 &&
               firstCategortNews.map((first, i) => (
                  <Fragment key={i + 1}>
                     {i + 1 === 1 ? (
                        <FirstCategoryNews first={first} language={language} />
                     ) : (
                        i + 1 === 2 && (
                           <SecondCategoryNews
                              first={first}
                              language={language}
                           />
                        )
                     )}
                  </Fragment>
               ))}

            <Row>
               {firstCategortNews.length > 0 &&
                  firstCategortNews.map((first, i) => (
                     <Fragment key={i + 1}>
                        {i + 1 > 2 && (
                           <ThreeFourFiveCategoryNews
                              first={first}
                              language={language}
                           />
                        )}
                     </Fragment>
                  ))}
            </Row>
         </Container>
         <OpinionSection
            opinionMain={opinionMain}
            opinions={opinions}
            language={language}
         />
         <Container>
            <ThreeCategoryNews
               categoryWithNews={categoryWithNews}
               language={language}
            />

            <ThreeCategorySliderNews
               threeSliderCategoryNews={threeSliderCategoryNews}
               language={language}
            />

            {voteArea && (
               <Row className="pb-5">
                  <Col sm={12} className="pt-2">
                     <Card className="rounded-0">
                        <div
                           className="d-flex flex-sm-row flex-column justify-content-between align-items-center pe-1"
                           style={{ backgroundColor: "#FFE3BF" }}
                        >
                           <div
                              className="d-flex align-items-center gap-1 ps-3 py-2 pe-5"
                              style={{
                                 backgroundColor: "#3B2F1F",
                                 color: "#fff",
                                 width: "auto",
                              }}
                           >
                              <span className="fs-5">
                                 {language === "en"
                                    ? "Please cast your vote"
                                    : language === "hi"
                                    ? "कृपया अपना वोट दें"
                                    : "অনুগ্রহ করে আপনার ভোট দিন"}
                              </span>
                           </div>
                           <button
                              type="button"
                              style={{ height: "100%" }}
                              className="btn btn-warning"
                              onClick={() => setVoteArea(!voteArea)}
                           >
                              <RxCross2 className="fs-4" />
                           </button>
                        </div>
                     </Card>
                  </Col>
                  <Col sm={12} className="mt-4 mt-3.5">
                     <VoteSwiper
                        votingBlogs={votingBlogs}
                        voteStore={voteStore}
                        language={language}
                     />
                  </Col>
               </Row>
            )}

            <TwoCategoryNews
               threeCategoryNews={threeCategoryNews}
               language={language}
            />
         </Container>

         <div className="bg-black py-4">
            <Container>
               <AutobiographyNews
                  autobiographyNews={autobiographyNews}
                  language={language}
               />
            </Container>
         </div>

         <Container>
            <SixCategoryNews
               twoCategoryNews={twoCategoryNews}
               language={language}
            />

            <Row className=" pt-5">
               <Col sm={12} className="pt-3">
                  <SlideSwiper carosals={carosals} />
               </Col>
            </Row>

            <LastCategoryNews
               lastCategoryNews={lastCategoryNews}
               language={language}
            />

            <Row>
               <Col xl={9} md={8}>
                  <Row>
                     <Col sm={12}>
                        <div className="group d-flex border-3 border-start border-dark bg-light ps-3 py-2">
                           <a
                              href="#"
                              className="d-flex align-items-center gap-2 text-decoration-none text-muted group-hover:text-primary d-flex align-items-center gap-1 fs-5 fw-semibold"
                           >
                              <span>
                                 <CiCamera className="fs-3 text-muted group-hover:text-primary" />
                              </span>
                              <span>ফটো গ্যালারি</span>
                           </a>
                        </div>
                     </Col>
                     <Col sm={12} className="mt-4">
                        <PhotoGallery photos={photos} />
                     </Col>
                  </Row>
               </Col>
               <VideosGallery
                  videos={videos}
                  getLiveTv={getLiveTv}
                  setModalShow={setModalShow}
                  language={language}
               />
            </Row>
         </Container>

         <GoToUpHeroSection scrollToTop={scrollToTop} />
         <VideoModal
            show={modalShow}
            liveTv={liveTv}
            onHide={() => {
               setLiveTv({});
               setModalShow(false);
            }}
         />
      </>
   );
}
