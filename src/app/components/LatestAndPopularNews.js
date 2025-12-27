"use client";
import React, { useCallback } from "react";
import { Button, Card, Col, Image } from "react-bootstrap";
import { BackendPublicUrl } from "../react/url";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function LatestAndPopularNews({
   sideTab,
   setSideTab,
   latestNews,
   popularNews,
   setModalShow,
   getLiveTv,
   language,
}) {
   const [date, setDate] = React.useState("");
   const router = useRouter();

   const onHandleSearnWithDate = useCallback(() => {
      if (date) router.push(`/search-news?dws=${date}`);
   }, [date]);

   return (
      <Col xl={3} md={4}>
         <div
            className=" mt-md-0 mt-3"
            style={{ cursor: "pointer" }}
            onClick={() => {
               getLiveTv(null);
            }}
         >
            <Card className="bg-dark text-white rounded-0 fs-5 fw-medium px-3 py-1">
               Live TV
            </Card>
            <Image
               src="/images/youtube.webp"
               alt="live tv"
               className="w-100 rounded-0 border"
            />
         </div>
         <div className="mt-3">
            <Card className="bg-dark text-white rounded-bottom-0 fs-5 fw-medium px-3 py-1">
               {language === "en"
                  ? "Oldest News"
                  : language === "hi"
                  ? "पुरोनो खबर"
                  : "পুরোনো খবর"}
            </Card>
            <div className="d-flex justify-content-between py-2">
               <input
                  type="date"
                  onChange={(e) => setDate(e.target.value)}
                  className="fs-5"
               />
               <Button
                  className="py-0 rounded-0 bg-secondary border-0"
                  onClick={onHandleSearnWithDate}
               >
                  Search
               </Button>
            </div>
         </div>

         <div className="d-flex border-top border-dark">
            <Button
               variant={sideTab === "all-end" ? "dark" : "transpernt"}
               className="w-100 rounded-0"
               onClick={() => setSideTab("all-end")}
            >
               {language === "en"
                  ? "Latest"
                  : language === "hi"
                  ? "नवीनतम"
                  : "সর্বশেষ"}
            </Button>
            <Button
               variant={sideTab === "popular" ? "dark" : "transpernt"}
               className="w-100 rounded-0"
               onClick={() => setSideTab("popular")}
            >
               {language === "en"
                  ? "Popular"
                  : language === "hi"
                  ? "लोकप्रिय"
                  : "জনপ্রিয়"}
            </Button>
         </div>

         <div className="pt-1 d-flex flex-column gap-2 w-100">
            {sideTab === "popular"
               ? popularNews.length > 0 &&
                 popularNews.map((news, i) => (
                    <div
                       key={i + 1}
                       className="border-0 border-bottom card-popular"
                    >
                       <div className="card-popular-image">
                          <Image
                             src={BackendPublicUrl + news.image}
                             alt="tab news image"
                             style={{
                                height: screen >= 320 ? "91px" : "auto",
                             }}
                             className="w-100"
                          />
                       </div>
                       <Link
                          href={`/news-details?slug=${news.slug}`}
                          className="p-2 card-popular-title text-decoration-none text-secondary-emphasis"
                       >
                          {language === "en"
                             ? news.title
                             : language === "hi"
                             ? news.title_hi
                             : news.title_bn}
                       </Link>
                    </div>
                 ))
               : latestNews.length > 0 &&
                 latestNews.map((news, i) => (
                    <div
                       key={i}
                       className="border-0 border-bottom card-popular"
                    >
                       <div className="card-popular-image">
                          <Image
                             src={BackendPublicUrl + news.image}
                             alt="tab news image"
                             style={{
                                height: screen >= 320 ? "91px" : "auto",
                             }}
                             className="w-100"
                          />
                       </div>
                       <Link
                          href={`/news-details?slug=${news.slug}`}
                          className="p-2 card-popular-title text-decoration-none text-secondary-emphasis"
                       >
                          {language === "en"
                             ? news.title
                             : language === "hi"
                             ? news.title_hi
                             : news.title_bn}
                       </Link>
                    </div>
                 ))}
         </div>
      </Col>
   );
}
