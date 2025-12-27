import React from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { FaFacebookF } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { useLanguage } from "../react/GlobalFragment";
import Axios from "../react/axios";
import { Toaster } from "../react/toaster";

export default function AppFooter() {
   const { language } = useLanguage();
   const [name, setName] = React.useState("");
   const [email, setEmail] = React.useState("");
   const [error, setError] = React.useState({});

   const onSubmitSubscription = async () => {
      try {
         const payload = {
            name,
            email,
         };
         const res = await Axios.post("/subscribe", payload);
         if (res.status === 200) {
            setName("");
            setEmail("");
            setError({});
            Toaster(res.data.message);
         }
      } catch (error) {
         setError(error.response.data.errors);
      }
   };

   return (
      <div className="bg-black text-white py-4">
         <Container>
            <div
               className="d-flex flex-wrap justify-content-center gap-3 pb-4 pt-3"
               style={{ borderBottom: "1px solid rgb(75, 75, 75)" }}
            >
               <Card
                  className=" px-3 py-1 bg-black text-white rounded-0"
                  style={{ border: "1px solid rgb(75, 75, 75)" }}
               >
                  {language === "en"
                     ? "About Us"
                     : language === "hi"
                     ? "आमादें के बारे में"
                     : "আমাদের সম্পর্কে"}
               </Card>
               <Card
                  className=" px-3 py-1 bg-black text-white rounded-0"
                  style={{ border: "1px solid rgb(75, 75, 75)" }}
               >
                  {language === "en"
                     ? "Advertisement"
                     : language === "hi"
                     ? "विज्ञापन"
                     : "বিজ্ঞাপন"}
               </Card>
               <Card
                  className=" px-3 py-1 bg-black text-white rounded-0"
                  style={{ border: "1px solid rgb(75, 75, 75)" }}
               >
                  {language === "en"
                     ? "Circulation"
                     : language === "hi"
                     ? "प्रसार"
                     : "সার্কুলেশন"}
               </Card>
               <Card
                  className=" px-3 py-1 bg-black text-white rounded-0"
                  style={{ border: "1px solid rgb(75, 75, 75)" }}
               >
                  {language === "en"
                     ? "Privacy"
                     : language === "hi"
                     ? "गोपनीयता"
                     : "গোপনীয়তা"}
               </Card>
               <Card
                  className=" px-3 py-1 bg-black text-white rounded-0"
                  style={{ border: "1px solid rgb(75, 75, 75)" }}
               >
                  {language === "en"
                     ? "Policy or Principle"
                     : language === "hi"
                     ? "नीति"
                     : "নীতি"}
               </Card>
               <Card
                  className=" px-3 py-1 bg-black text-white rounded-0"
                  style={{ border: "1px solid rgb(75, 75, 75)" }}
               >
                  {language === "en"
                     ? "Contact US"
                     : language === "hi"
                     ? "संपर्क करें"
                     : "যোগাযোগ করুন"}
               </Card>
               <Card
                  className=" px-3 py-1 bg-black text-white rounded-0"
                  style={{ border: "1px solid rgb(75, 75, 75)" }}
               >
                  {language === "en"
                     ? "Comment Publishing Policy"
                     : language === "hi"
                     ? "टिप्पणी प्रकाशन नीति"
                     : "মন্তব্য প্রকাশের নীতিমালা"}
               </Card>
               <Card
                  className=" px-3 py-1 bg-black text-white rounded-0"
                  style={{ border: "1px solid rgb(75, 75, 75)" }}
               >
                  {language === "en"
                     ? "Terms and Conditions"
                     : language === "hi"
                     ? "नियम और शर्तें"
                     : "শর্তাবলি"}
               </Card>
            </div>

            <Row className="pt-5">
               <Col lg={3} md={6} className="mb-4">
                  <div>
                     <h4 className="fs-5 fw-medium">
                        {language === "en"
                           ? "Office"
                           : language === "en"
                           ? "अफिस"
                           : "অফিস"}{" "}
                        :
                     </h4>
                     <div
                        className="position-relative"
                        style={{ height: "3px" }}
                     >
                        <div
                           className="bg-secondary position-absolute start-0 top-0"
                           style={{ width: "31px", height: "100%" }}
                        ></div>
                        <div
                           className="w-100 border-secondary border-bottom position-absolute start-0"
                           style={{
                              top: "45%",
                              transform: "translateY(-50%)",
                           }}
                        ></div>
                     </div>
                  </div>

                  <div className="pt-3">
                     <div className="fs-6 fw-normal">New Yorlk, USA</div>
                     <div className="fs-6 fw-normal">
                        ইমেইল : news@gov.cc.info
                     </div>
                     <div className="fs-6 fw-normal">মোবাইল : 91456874</div>
                  </div>
               </Col>
               <Col lg={4} md={6} className="mb-4">
                  <div>
                     <h4 className="fs-5 fw-medium">আমাদের সম্পর্কে</h4>
                     <div
                        className="position-relative"
                        style={{ height: "3px" }}
                     >
                        <div
                           className="bg-secondary position-absolute start-0 top-0"
                           style={{ width: "31px", height: "100%" }}
                        ></div>
                        <div
                           className="w-100 border-secondary border-bottom position-absolute start-0"
                           style={{
                              top: "45%",
                              transform: "translateY(-50%)",
                           }}
                        ></div>
                     </div>
                  </div>

                  <div className="pt-3">
                     <p className="fs-6 fw-normal">
                        Meta Platforms was told by EU tech regulators on Friday
                        to provide more details on measures taken to tackle
                        child sexual abuse material on its photo and video
                        sharing app
                     </p>
                  </div>
               </Col>
               <Col lg={5} md={12} className="mb-4">
                  <div>
                     <h4 className="fs-5 fw-medium">
                        {language === "en"
                           ? "Subscribe to get the latest updates"
                           : language === "hi"
                           ? "अगली अपडेट पाने के लिए सब्सक्राइब करें"
                           : "সাবস্কাইব করুন পরবর্তী আপডেট পেতে"}
                     </h4>
                     <div
                        className="position-relative"
                        style={{ height: "3px" }}
                     >
                        <div
                           className="bg-secondary position-absolute start-0 top-0"
                           style={{ width: "31px", height: "100%" }}
                        ></div>
                        <div
                           className="w-100 border-secondary border-bottom position-absolute start-0"
                           style={{
                              top: "45%",
                              transform: "translateY(-50%)",
                           }}
                        ></div>
                     </div>
                  </div>

                  <div className="pt-3">
                     <div className="pb-3">
                        <label
                           htmlFor="name"
                           className="fs-6 fw-normal d-flex gap-1 mb-1"
                        >
                           <span>
                              {language === "en"
                                 ? "Name"
                                 : language === "hi"
                                 ? "नाम"
                                 : "নাম"}
                           </span>
                           <span className="text-danger">*</span>
                        </label>
                        <input
                           type="text"
                           className="form-control"
                           value={name}
                           onChange={(e) => setName(e.currentTarget.value)}
                        />
                        {error?.name && (
                           <span className="text-danger">{error.name}</span>
                        )}
                     </div>
                     <div className="pb-3">
                        <label
                           htmlFor="email"
                           className="fs-6 fw-normal d-flex gap-1 mb-1"
                        >
                           <span>
                              {language === "en"
                                 ? "Email"
                                 : language === "hi"
                                 ? "ईमेल"
                                 : "ইমেইল"}
                           </span>
                           <span className="text-danger">*</span>
                        </label>
                        <input
                           type="email"
                           className="form-control"
                           value={email}
                           onChange={(e) => setEmail(e.currentTarget.value)}
                        />
                        {error?.email && (
                           <span className="text-danger">{error.email}</span>
                        )}
                     </div>
                     <Button
                        type="button"
                        variant="success"
                        onClick={onSubmitSubscription}
                     >
                        {language === "en"
                           ? "Subscribe"
                           : language === "hi"
                           ? "सब्सक्राइब"
                           : "সাবস্কাইব"}
                     </Button>
                  </div>
               </Col>
            </Row>

            <Row
               className="py-3 gap-md-0 gap-3"
               style={{
                  borderTop: "1px solid rgb(75, 75, 75)",
                  borderBottom: "1px solid rgb(75, 75, 75)",
               }}
            >
               <Col
                  md={6}
                  className="d-flex justify-content-md-start justify-content-center align-items-center"
               >
                  <div className="d-flex">
                     <div className="d-flex flex-column align-items-center w-md-auto w-100">
                        <div>অনুসরণ করুন</div>
                        <div className="pt-2 d-flex flex-wrap gap-3">
                           <a
                              href=""
                              className="bg-white rounded-circle px-2 pb-1 fs-4"
                           >
                              <FaFacebookF />
                           </a>
                           <a
                              href=""
                              className="bg-white text-info rounded-circle px-2 pb-1 fs-4"
                           >
                              <FaTwitter />
                           </a>
                           <a
                              href=""
                              className="bg-white rounded-circle text-warning px-2 pb-1 fs-4"
                           >
                              <FaInstagram />
                           </a>
                           <a
                              href=""
                              className="bg-white text-danger rounded-circle px-2 pb-1 fs-4"
                           >
                              <FaYoutube />
                           </a>
                           <a
                              href=""
                              className="bg-white rounded-circle px-2 pb-1 fs-4"
                           >
                              <FaLinkedin />
                           </a>
                        </div>
                     </div>
                  </div>
               </Col>
               <Col
                  md={6}
                  className="d-flex justify-content-md-end justify-content-center"
               >
                  <div className="d-flex flex-column align-md-items-end align-items-center justify-content-center">
                     <div>মোবাইল অ্যাপস ডাউনলোড করুন </div>
                     <div>মোবাইল অ্যাপস ডাউনলোড করুন </div>
                  </div>
               </Col>
            </Row>

            <div className="d-flex flex-wrap justify-content-between py-3">
               <div>© সর্বস্বত্ব সংরক্ষিত © News Portal </div>
               <div>
                  থিম তৈরি করেছে {">"} <a href="">News Portal</a>
               </div>
            </div>
         </Container>
      </div>
   );
}
