import Link from "next/link";
import React from "react";
import { Card } from "react-bootstrap";
import { BackendPublicUrl } from "../react/url";

const ThreeNews = ({ screen, threeNews, language }) => {
   return (
      <>
         {threeNews.length > 0 &&
            threeNews.map((news, index) => (
               <Card key={index + 1} className="recent-news-card">
                  <div className="d-flex">
                     <img
                        src={BackendPublicUrl + news.image}
                        alt={`news ${index + 1}`}
                        className="rounded-start"
                        style={{
                           width:
                              screen >= 525
                                 ? "50%"
                                 : screen >= 320
                                 ? "100%"
                                 : "115px",
                           height: "auto",
                        }}
                     />
                     <Link
                        href={`/news-details?slug=${news.slug}`}
                        className="fs-6 px-2 py-1 text-decoration-none text-secondary-emphasis"
                     >
                        {language === "en"
                           ? news.title
                           : language === "hi"
                           ? news.title_hi
                           : news.title_bn}
                     </Link>
                  </div>
               </Card>
            ))}
      </>
   );
};

export default ThreeNews;
