"use client";
import React, { useEffect, useState } from "react";
import {
   Container,
   Row,
   Col,
   Card,
   Form,
   Button,
   Image,
   ListGroup,
   Spinner,
} from "react-bootstrap";
import Axios from "../react/axios";
import { getLocalStorage } from "../react/local-storage";
import { useRouter } from "next/navigation";
import Preloader from "../components/preloader";
import { useLanguage } from "../react/GlobalFragment";
import { Toaster } from "../react/toaster";

export default function ProfileContent() {
   const { language } = useLanguage();
   const [profile, setProfile] = useState({});
   const [isSaving, setIsSaving] = useState(false);
   const [auth, setAuth] = useState(false);
   const router = useRouter();
   const [form, setForm] = useState({
      name: "",
      email: "",
   });
   const [formP, setFormP] = useState({
      current_password: "",
      new_password: "",
      new_password_confirmation: "",
   });
   const [pageLoading, setPageLoading] = useState(false);
   const [isSavingFP, setIsSavingFP] = useState(false);
   // const [profile, setProfile] = useState({});
   const [error, setError] = useState({});

   useEffect(() => {
      const authToken = getLocalStorage("auth_token");
      if (authToken) setAuth(true);
      else return router.push("/sign-in");
      if (authToken) getProfile();
   }, []);

   const getProfile = async () => {
      setPageLoading(false);
      const authToken = getLocalStorage("auth_token");
      const res = await Axios.get("/auth/profile", {
         headers: {
            Authorization: `Bearer ${authToken}`,
         },
      });
      if (res.data.status === true) {
         setProfile(res.data.user);
         setPageLoading(true);
         setForm({
            name: res.data.user.name,
            email: res.data.user.email,
         });
      }
   };

   const handleChange = (e) => {
      const { name, value } = e.target;
      setForm((prev) => ({
         ...prev,
         [name]: value,
      }));
   };

   const handleSubmit = async (e) => {
      e.preventDefault();
      setIsSaving(true);
      try {
         const authToken = getLocalStorage("auth_token");
         const res = await Axios.post("/auth/profile-update", form, {
            headers: {
               Authorization: `Bearer ${authToken}`,
            },
            // withCredentials: true,
         });
         if (res.data.status === true) {
            Toaster(res.data.message);
            setForm({
               name: res.data.user.name,
               email: res.data.user.email,
            });
         }
         setIsSaving(false);
      } catch (error) {
         setIsSaving(false);
         setError(error.response.data.errors);
      }
   };

   const onChangeFormField = (e) => {
      const { name, value } = e.target;
      setFormP((prev) => ({
         ...prev,
         [name]: value,
      }));
   };
   const onSubmitPForm = async (e) => {
      e.preventDefault();
      setIsSavingFP(true);
      try {
         const authToken = getLocalStorage("auth_token");
         const res = await Axios.post("/auth/change-password", formP, {
            headers: {
               Authorization: `Bearer ${authToken}`,
            },
         });
         if (res.data.status === true) {
            setFormP({
               current_password: "",
               new_password: "",
               new_password_confirmation: "",
            });
            Toaster(res.data.message);
         }
         setIsSavingFP(false);
      } catch (error) {
         setIsSavingFP(false);
         setError(error.response.data.errors);
      }
   };

   if (!auth) return null;
   if (!pageLoading) return <Preloader />;
   return (
      <Container className="py-5">
         <Row className="">
            {/* Left: Profile summary */}
            {/* <Col md={4}>
               <Card className="mb-4 text-center">
                  <Card.Body>
                     <Image
                        src="https://via.placeholder.com/150"
                        roundedCircle
                        width={120}
                        height={120}
                        className="mb-3"
                     />
                     <h4>{profile?.name}</h4>
                     <p className="text-muted">{profile?.email}</p>
                     <p className="text-secondary small">{profile?.address}</p>
                  </Card.Body>
               </Card>
            </Col> */}

            {/* Right: Profile edit form */}
            <Col md={7} className="mb-md-0 mb-4">
               <Card>
                  <Card.Header>
                     {language === "en"
                        ? "Edit Profile"
                        : language === "hi"
                        ? "प्रोफ़ाइल संपादित करें"
                        : "প্রোফাইল এডিট করুন"}
                  </Card.Header>
                  <Card.Body>
                     <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="name">
                           <Form.Label>
                              {language === "en"
                                 ? "Full Name"
                                 : language === "hi"
                                 ? "पूरा नाम"
                                 : "সম্পূর্ণ নাম"}
                           </Form.Label>
                           <Form.Control
                              type="text"
                              name="name"
                              value={form?.name}
                              onChange={handleChange}
                              placeholder="Enter your name"
                           />
                           {error?.name && (
                              <Form.Text className="text-danger">
                                 {error?.name}
                              </Form.Text>
                           )}
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="email">
                           <Form.Label>
                              {language === "en"
                                 ? "Email"
                                 : language === "hi"
                                 ? "ईमेल"
                                 : "ইমেল"}
                           </Form.Label>
                           <Form.Control
                              type="email"
                              name="email"
                              value={form?.email}
                              onChange={handleChange}
                              placeholder="Enter email"
                           />
                           {error?.email && (
                              <Form.Text className="text-danger">
                                 {error?.email}
                              </Form.Text>
                           )}
                        </Form.Group>

                        <div className="text-end">
                           <Button
                              variant="primary"
                              type="submit"
                              disabled={isSaving}
                           >
                              {isSaving ? (
                                 <>
                                    <Spinner
                                       animation="border"
                                       size="sm"
                                       className="me-2"
                                    />
                                    {language === "en"
                                       ? "Saving..."
                                       : language === "hi"
                                       ? "सेव कर रहा है..."
                                       : "সংরক্ষণ করা হচ্ছে..."}
                                 </>
                              ) : language === "en" ? (
                                 "Save Changes"
                              ) : language === "hi" ? (
                                 "स्टोर करें"
                              ) : (
                                 "সংরক্ষণ করুন"
                              )}
                           </Button>
                        </div>
                     </Form>
                  </Card.Body>
               </Card>
            </Col>
            <Col md={5}>
               <Card>
                  <Card.Header>
                     {language === "en"
                        ? "Edit Password"
                        : language === "hi"
                        ? "पासवर्ड संपादित करें"
                        : "পাসওয়ার্ড এডিট করুন"}
                  </Card.Header>
                  <Card.Body>
                     <Form onSubmit={onSubmitPForm}>
                        <Form.Group className="mb-3" controlId="email">
                           <Form.Label>
                              {language === "en"
                                 ? "Old Password"
                                 : language === "hi"
                                 ? "पुराना पासवर्ड"
                                 : "পুরানো পাসওয়ার্ড"}
                           </Form.Label>
                           <Form.Control
                              type="password"
                              name="current_password"
                              onChange={onChangeFormField}
                              placeholder="Enter old password"
                              value={formP?.current_password}
                           />
                           {error?.current_password && (
                              <Form.Text className="text-danger">
                                 {error?.current_password}
                              </Form.Text>
                           )}
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="email">
                           <Form.Label>
                              {language === "en"
                                 ? "New Password"
                                 : language === "hi"
                                 ? "नया पासवर्ड"
                                 : "নতুন পাসওয়ার্ড"}
                           </Form.Label>
                           <Form.Control
                              type="password"
                              name="new_password"
                              onChange={onChangeFormField}
                              placeholder="Enter new password"
                              value={formP?.new_password}
                           />
                           {error?.new_password && (
                              <Form.Text className="text-danger">
                                 {error?.new_password}
                              </Form.Text>
                           )}
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="email">
                           <Form.Label>
                              {language === "en"
                                 ? "Confirm Password"
                                 : language === "hi"
                                 ? "पासवर्ड की पुष्टि करें"
                                 : "পাসওয়ার্ড নিশ্চিত করুন"}
                           </Form.Label>
                           <Form.Control
                              type="password"
                              name="new_password_confirmation"
                              onChange={onChangeFormField}
                              placeholder="Enter confirm password"
                              value={formP?.new_password_confirmation}
                           />
                           {error?.new_password_confirmation && (
                              <Form.Text className="text-danger">
                                 {error?.new_password_confirmation}
                              </Form.Text>
                           )}
                        </Form.Group>

                        <div className="text-end">
                           <Button
                              variant="primary"
                              type="submit"
                              disabled={isSavingFP}
                           >
                              {isSavingFP ? (
                                 <>
                                    <Spinner
                                       animation="border"
                                       size="sm"
                                       className="me-2"
                                    />
                                    {language === "en"
                                       ? "Saving..."
                                       : language === "hi"
                                       ? "सेव कर रहा है..."
                                       : "সংরক্ষণ করা হচ্ছে..."}
                                 </>
                              ) : language === "en" ? (
                                 "Save Changes"
                              ) : language === "hi" ? (
                                 "स्टोर करें"
                              ) : (
                                 "সংরক্ষণ করুন"
                              )}
                           </Button>
                        </div>
                     </Form>
                  </Card.Body>
               </Card>
            </Col>
         </Row>
      </Container>
   );
}
