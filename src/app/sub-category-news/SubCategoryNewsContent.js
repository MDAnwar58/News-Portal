"use client";
import {
   Button,
   Card,
   Col,
   Container,
   Image,
   Row,
   Spinner,
} from "react-bootstrap";
import { useCallback, useEffect, useState } from "react";
import { TbArrowBadgeRight } from "react-icons/tb";
import { IoHomeOutline } from "react-icons/io5";
import CategoryPagination from "../components/CategoryPagination";
import CategoryLatestAndPopularNews from "../components/CategoryLatestAndPopularNews";
import Axios from "../react/axios";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { BackendPublicUrl } from "../react/url";
import { useLanguage } from "../react/GlobalFragment";
import Preloader from "../components/preloader";

export default function SubCategoryNewsContent() {
   const [isLargeScreen, setIsLargeScreen] = useState(false);
   const [screen, setScreen] = useState(0);
   const [sideTab, setSideTab] = useState("all-end");
   const [tab, setTab] = useState("সমস্ত");
   const [latestNews, setLatestNews] = useState([]);
   const [popularNews, setPopularNews] = useState([]);
   const [subCategory, setSubCategory] = useState({});
   const [news, setNews] = useState([]);
   const router = useRouter();
   const { language } = useLanguage();
   const [pageLoader, setPageLoader] = useState(true);
   const [slug, setSlug] = useState("");
   const [totalLength, setTotalLength] = useState(0);
   const [limit, setLimit] = useState(1);
   const [pageLoad, setPageLoad] = useState(false);
   const [loadMoreBtn, setLoadMoreBtn] = useState(false);
   const [showingLoadMore, setShowingLoadMore] = useState(false);

   useEffect(() => {
      const updateScreenSize = () => setScreen(window.innerWidth);

      window.addEventListener("resize", updateScreenSize);
      return () => window.removeEventListener("resize", updateScreenSize); // Cleanup listener
   }, []);

   useEffect(() => {
      const checkSearchParams = (limit, pageLoad) => {
         const searchParams = new URLSearchParams(window.location.search);
         const subCategorySlug = searchParams.get("sc");

         if (!subCategorySlug) {
            setTimeout(() => {
               router.push("/");
            }, 0); // Defer to avoid React render cycle violation
            return;
         }

         getNewsWithSubCategory(subCategorySlug, limit, pageLoad);
         getHighlights();
      };

      checkSearchParams(limit, pageLoad); // Initial check
   }, [limit, pageLoad]);

   const getHighlights = async () => {
      const res = await Axios.get("/home/highlights");
      setLatestNews(res.data.latest_news);
      setPopularNews(res.data.popular_news);
   };

   const getNewsWithSubCategory = async (slug, limit, pageLoad) => {
      if (pageLoad === false) {
         setPageLoader(true); // Optional: move this *after* fetch if needed
      }
      setLoadMoreBtn(true);
      try {
         setSlug(slug);
         const res = await Axios.get(
            `/home/sub-categories-news?sub_category_slug=${slug}&limit=${limit}`
         );
         setSubCategory(res.data.subcategory);
         setTotalLength(res.data.total_news);
         setNews(res.data.news);
      } catch (error) {
         setTimeout(() => {
            setLoadMoreBtn(false);
         }, 2500);
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
      (nl) => {
         setLimit(limit + nl);
         getNewsWithSubCategory(slug, limit + nl, pageLoad);
      },
      [slug, limit, pageLoad]
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
                                 ? subCategory?.subcategory_name
                                 : language === "hi"
                                 ? subCategory?.subcategory_name_hi
                                 : subCategory?.subcategory_name_bn}
                           </span>
                        </div>
                     </Col>
                     <Col sm={12} className="mt-4">
                        <Row>
                           {news.length > 0
                              ? news.map((categoryNews, i) => (
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
                                               categoryNews?.image
                                            }
                                         />
                                         <Card.Body>
                                            <Card.Title
                                               as={Link}
                                               href={`/news-details?slug=${categoryNews?.slug}`}
                                               className="text-decoration-none"
                                            >
                                               {language === "en"
                                                  ? categoryNews?.title
                                                  : language === "hi"
                                                  ? categoryNews?.title_hi
                                                  : categoryNews?.title_bn}
                                            </Card.Title>
                                         </Card.Body>
                                      </Card>
                                   </Col>
                                ))
                              : null}
                           {showingLoadMore &&
                              news?.length > 0 &&
                              totalLength > news?.length && (
                                 <Col
                                    sm={12}
                                    className="d-flex justify-content-center pb-5"
                                 >
                                    <Button
                                       variant="dark"
                                       className={`fs-6 fw-semibold ${
                                          loadMoreBtn ? "opacity-50" : ""
                                       } d-flex align-items-center gap-1`}
                                       onClick={() => onHandleLoadMore(1)}
                                    >
                                       <span>Load More</span>
                                       {loadMoreBtn ? (
                                          <Spinner
                                             as="span"
                                             animation="border"
                                             size="sm"
                                             role="status"
                                             aria-hidden="true"
                                          />
                                       ) : null}
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
