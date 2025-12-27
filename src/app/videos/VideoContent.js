"use client";
import React, { useCallback, useEffect } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import Axios from "../react/axios";
import { BackendPublicUrl } from "../react/url";
import { useLanguage } from "../react/GlobalFragment";
import { FaRegPlayCircle } from "react-icons/fa";
import Preloader from "../components/preloader";
import Spinner from "react-bootstrap/Spinner";

const videos = [
   {
      id: 1,
      title: "Breaking News: Market Update",
      description: "The stock market saw major shifts today...",
      thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/mqdefault.jpg",
      url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
   },
   {
      id: 2,
      title: "Tech Trends 2025",
      description: "Experts discuss upcoming technology breakthroughs...",
      thumbnail: "https://img.youtube.com/vi/3GwjfUFyY6M/mqdefault.jpg",
      url: "https://www.youtube.com/watch?v=3GwjfUFyY6M",
   },
   {
      id: 3,
      title: "Weather Update",
      description: "Severe weather expected this weekend...",
      thumbnail: "https://img.youtube.com/vi/L_jWHffIx5E/mqdefault.jpg",
      url: "https://www.youtube.com/watch?v=L_jWHffIx5E",
   },
   // Add more video items...
];

export default function VideosContent() {
   const [videos, setVideos] = React.useState([]);
   const [totalLength, setTotalLength] = React.useState(0);
   const { language } = useLanguage();
   const [pageLoad, setPageLoad] = React.useState(false);
   const [loading, setLoading] = React.useState(false);
   const [limit, setLimit] = React.useState(2);
   const [loadingMore, setLoadingMore] = React.useState(false);

   useEffect(() => {
      getVideos(limit, loading);
   }, [limit, loading]);
   const getVideos = useCallback(
      async (limit, loading) => {
         if (loading === false) {
            setPageLoad(false);
            setLoadingMore(true);
         }
         const res = await Axios.get(`/videos?limit=${limit}`);
         setVideos(res.data?.videos);
         setTotalLength(res.data?.lengths);
         setPageLoad(true);
         setLoading(true);
         setLoadingMore(false);
      },
      [loading]
   );

   const loadMore = useCallback(
      (l) => {
         const newLimit = limit + l;
         setLimit(newLimit);
         getVideos(newLimit, loading);
      },
      [limit, loading]
   );

   if (!pageLoad) return <Preloader />;

   return (
      <Container className="py-5">
         <h2 className="mb-4">News Videos</h2>
         <Row>
            {videos.length > 0 &&
               videos.map((item, i) => (
                  <Col key={i + 1} xs={12} sm={6} md={4} className="mb-4">
                     <Card className="h-100 position-relative">
                        <a
                           href={item.video_url}
                           target="_blank"
                           rel="noopener noreferrer"
                        >
                           <Card.Img
                              variant="top"
                              src={BackendPublicUrl + item.video_image}
                           />
                        </a>
                        <Card.Body>
                           <Card.Title>
                              {language === "en"
                                 ? item.video_title
                                 : language === "hi"
                                 ? item.video_title_hi
                                 : item.video_title_bn}
                           </Card.Title>
                        </Card.Body>
                        <a
                           href={item.video_url}
                           target="_blank"
                           rel="noopener noreferrer"
                           className=" position-absolute text-white display-2"
                           style={{
                              top: "39%",
                              left: "50%",
                              transform: "translate(-50%, -50%)",
                              cursor: "pointer",
                           }}
                        >
                           <FaRegPlayCircle />
                        </a>
                     </Card>
                  </Col>
               ))}
            {videos.length > 0 && totalLength > videos.length && (
               <Col sm={12} className="d-flex justify-content-center">
                  <Button
                     onClick={() => loadMore(3)}
                     variant="dark"
                     className="fs-6 fw-semibold d-flex align-items-center gap-2"
                     disabled={loadingMore}
                     style={{
                        opacity: loadingMore ? 0.5 : 1,
                     }}
                  >
                     <span>Load More</span>
                     {loadingMore && (
                        <Spinner animation="border" role="status" size="sm">
                           <span className="visually-hidden">Loading...</span>
                        </Spinner>
                     )}
                  </Button>
               </Col>
            )}
         </Row>
      </Container>
   );
}
