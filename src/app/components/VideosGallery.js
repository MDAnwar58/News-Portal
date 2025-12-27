import React from "react";
import { Col, Image } from "react-bootstrap";
import { FaPlay } from "react-icons/fa";
import { IoVideocamOutline } from "react-icons/io5";
import { BackendPublicUrl } from "../react/url";
import Link from "next/link";

function VideosGallery({ videos, getLiveTv, setModalShow, language }) {
   return (
      <Col xl={3} md={4}>
         <div className="group d-flex border-3 border-start border-dark bg-light ps-3 py-2">
            <Link
               href="/videos"
               className="d-flex align-items-center gap-2 text-decoration-none text-muted  group-hover:text-primary d-flex align-items-center gap-1 fs-5 fw-semibold"
            >
               <span>
                  <IoVideocamOutline className="fs-3 text-muted  group-hover:text-primary" />
               </span>
               <span>ভিডিও গ্যালারি</span>
            </Link>
         </div>

         <div className="mt-2 p-1 d-flex flex-column gap-2 bg-white border">
            {videos?.length > 0 &&
               videos.map((video, index) => (
                  <div
                     key={index + 1}
                     className="border-0 border-bottom card-popular"
                  >
                     <div className="card-popular-image ">
                        <div
                           className="group position-relative"
                           onClick={() => {
                              getLiveTv({ live_url: video?.video_url });
                              setModalShow(true);
                           }}
                        >
                           {video?.video_image && (
                              <Image
                                 src={BackendPublicUrl + video?.video_image}
                                 alt="tab news image"
                                 style={{
                                    height: screen >= 320 ? "91px" : "auto",
                                 }}
                                 className="w-100"
                              />
                           )}

                           <div className="w-100 h-100 position-absolute top-0 left-0 d-flex justify-content-center align-items-center">
                              <button
                                 type="button"
                                 className="btn border-2 border-light text-white group-hover:border-transparent group-hover:bg-light group-hover:text-gray pt-1 pb-2 rounded-circle"
                              >
                                 <FaPlay />
                              </button>
                           </div>
                        </div>
                     </div>
                     <div className="p-2 card-popular-title text-decoration-none text-secondary-emphasis">
                        {language === "en"
                           ? video?.video_title
                           : language === "hi"
                           ? video?.video_title_hi
                           : video?.video_title_bn}
                     </div>
                  </div>
               ))}
         </div>
      </Col>
   );
}

export default VideosGallery;
