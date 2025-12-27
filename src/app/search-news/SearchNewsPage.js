"use client";
import { Button, Card, Col, Container, Row, Spinner } from "react-bootstrap";
import { useCallback, useEffect, useState } from "react";
import { TbArrowBadgeRight } from "react-icons/tb";
import { IoHomeOutline } from "react-icons/io5";
import CategoryLatestAndPopularNews from "../components/CategoryLatestAndPopularNews";
import Axios from "../react/axios";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { BackendPublicUrl } from "../react/url";
import { useLanguage } from "../react/GlobalFragment";
import Preloader from "../components/preloader";

export default function SearchNewsPage() {
   const [isLargeScreen, setIsLargeScreen] = useState(false);
   const [screen, setScreen] = useState(0);
   const [sideTab, setSideTab] = useState("all-end");
   const [tab, setTab] = useState("সমস্ত");
   const [latestNews, setLatestNews] = useState([]);
   const [popularNews, setPopularNews] = useState([]);
   const [category, setCategory] = useState({});
   const [news, setNews] = useState([]);
   const router = useRouter();
   const { language } = useLanguage();
   const [pageLoader, setPageLoader] = useState(true);
   const [limit, setlimit] = useState(6);
   const [search, setSearch] = useState("");
   const [dateWithSearch, setDateWithSearch] = useState("");
   const [pageLoad, setPageLoad] = useState(false);
   const [loadMoreBtn, setLoadMoreBtn] = useState(false);
   const [totalLength, setTotalLength] = useState(0);
   const [datalLimit, setDatalLimit] = useState(0);
   const [showingLoadMore, setShowingLoadMore] = useState(false);

   useEffect(() => {
      const updateScreenSize = () => setScreen(window.innerWidth);

      window.addEventListener("resize", updateScreenSize);
      return () => window.removeEventListener("resize", updateScreenSize); // Cleanup listener
   }, []);

   useEffect(() => {
      const checkSearchParams = (limit, pageLoad) => {
         const searchParams = new URLSearchParams(window.location.search);
         const search = searchParams.get("s");
         const dateWithSearch = searchParams.get("dws");

         if (!search && !dateWithSearch) {
            setTimeout(() => {
               router.push("/");
            }, 0); // Defer to avoid React render cycle violation
            return;
         }

         getNews(limit, search, dateWithSearch, pageLoad);
         getHighlights();
      };

      checkSearchParams(limit, pageLoad); // Initial check
   }, [limit, pageLoad]);

   const getHighlights = async () => {
      const res = await Axios.get("/home/highlights");
      setLatestNews(res.data.latest_news);
      setPopularNews(res.data.popular_news);
   };

   const getNews = async (limit, search, date_with_search, pageLoad) => {
      if (pageLoad === false) {
         setPageLoader(true); // Optional: move this *after* fetch if needed
      }
      setLoadMoreBtn(true);
      try {
         setSearch(search);
         setDateWithSearch(date_with_search);
         const res = await Axios.get(
            `/search?limit=${limit}&search=${search}&date_with_search=${date_with_search}`
         );
         // console.log(res.data);
         setTotalLength(res.data?.data?.total_results);
         setDatalLimit(res.data?.data?.limit);
         // setCategory(res.data.category);
         setNews(res.data?.data.search_results);
      } catch (error) {
         console.error("Failed to load category news:", error);
      } finally {
         setPageLoader(false); // ✅ Always in async-safe part
         setPageLoad(true);
         setLoadMoreBtn(false);
         setTimeout(() => {
            setShowingLoadMore(true);
         }, 2500);
      }
   };

   const onHandleLoadMore = useCallback(
      (l) => {
         setlimit(limit + l);
         getNews(limit + l, search, dateWithSearch, pageLoad);
      },
      [limit, search, dateWithSearch, pageLoad]
   );

   if (pageLoader) return <Preloader />;

   return (
      <>
         <Container className="pt-3 pb-5">
            <Row>
               <Col xl={9} md={8}>
                  <Row>
                     <Col sm={12}>
                        <div
                           className="d-flex align-items-center gap-1 bg-light border-top border-start border-end py-2 px-3 "
                           style={{
                              borderBottom: "3px solid rgba(0, 0, 0, 1)",
                           }}
                        >
                           <Link href="/" className="pb-1">
                              <IoHomeOutline className="text-dark fs-5" />
                           </Link>
                           <span className="pb-1">
                              <TbArrowBadgeRight className="fs-5" />
                           </span>
                           <span className="fs-5">
                              {language === "en"
                                 ? "Search News"
                                 : language === "hi"
                                 ? "खबर खोजें"
                                 : "খবর খুঁজুন"}
                           </span>
                        </div>
                     </Col>
                     <Col sm={12} className="mt-4">
                        <Row>
                           {news && news.length > 0 ? (
                              news.map((searchNews, i) => (
                                 <Col
                                    key={i + 1}
                                    xl={4}
                                    sm={6}
                                    className="pb-3 col-xs-6 col-xss-6"
                                 >
                                    <Card>
                                       <Card.Img
                                          variant="top"
                                          src={
                                             BackendPublicUrl +
                                             searchNews?.image
                                          }
                                       />
                                       <Card.Body>
                                          <Card.Title
                                             as={Link}
                                             href={`/news-details?slug=${searchNews?.slug}`}
                                             className="text-decoration-none"
                                          >
                                             {language === "en"
                                                ? searchNews?.title
                                                : language === "hi"
                                                ? searchNews?.title_hi
                                                : searchNews?.title_bn}
                                          </Card.Title>
                                       </Card.Body>
                                    </Card>
                                 </Col>
                              ))
                           ) : (
                              <Col sm={12} className="text-center mb-5">
                                 <Card>
                                    <Card.Body>
                                       <p className="fs-5 fw-semibold">
                                          News not found!
                                       </p>
                                    </Card.Body>
                                 </Card>
                              </Col>
                           )}
                           {showingLoadMore &&
                              news?.length > 0 &&
                              totalLength > news.length && (
                                 <Col
                                    sm={12}
                                    className="d-flex justify-content-center pb-5"
                                 >
                                    <Button
                                       variant="dark"
                                       className={`fs-6 fw-semibold ${
                                          loadMoreBtn ? "opacity-50" : ""
                                       }`}
                                       onClick={() => onHandleLoadMore(6)}
                                       disabled={loadMoreBtn}
                                    >
                                       <span>Load More</span>
                                       {loadMoreBtn && (
                                          <Spinner
                                             animation="border"
                                             role="status"
                                             size="sm"
                                             className="ms-2"
                                          >
                                             <span className="visually-hidden">
                                                Loading...
                                             </span>
                                          </Spinner>
                                       )}
                                    </Button>
                                    {/* <CategoryPagination /> */}
                                 </Col>
                              )}
                        </Row>
                     </Col>
                  </Row>
               </Col>
               <CategoryLatestAndPopularNews
                  sideTab={sideTab}
                  setSideTab={setSideTab}
                  latestNews={latestNews}
                  popularNews={popularNews}
                  language={language}
               />
            </Row>
         </Container>
      </>
   );
}
