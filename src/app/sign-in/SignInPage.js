"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Container, Form, Button, Card, Spinner } from "react-bootstrap";
import Axios from "../react/axios";
import { BackendUrl } from "../react/url";
import { useLanguage } from "../react/GlobalFragment";
import { Toaster } from "../react/toaster";
import { getLocalStorage, setLocalStorage } from "../react/local-storage";

export default function SignInPage() {
   const { language } = useLanguage();
   const [formData, setFormData] = useState({
      email: "",
      password: "",
   });
   const [errors, setErrors] = useState({});
   const [isLoading, setIsLoading] = useState(false);
   const [pageLoading, setPageLoading] = useState(false);

   useEffect(() => {
      let authToken = getLocalStorage("auth_token");
      if (!authToken) {
         setTimeout(() => {
            setPageLoading(true);
         }, 2500);
      } else {
         setPageLoading(false);
         setTimeout(() => {
            window.location.href = "/";
         }, 2500);
      }
   }, []);

   const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData((prev) => ({
         ...prev,
         [name]: value,
      }));
      // if (errors[name]) {
      //    setErrors((prev) => ({
      //       ...prev,
      //       [name]: "",
      //    }));
      // }
   };

   const validateForm = () => {
      const res = Axios.post("/login", formData);
      console.log(res.data);
      return res.data;
   };

   /*************  ✨ Windsurf Command ⭐  *************/
   /**
    * Handles form submission of the sign in form. Validates form first, if errors are present
    * then sets the errors state and returns. If no errors are present, then sets the isLoading
    * state to true and attempts to log in. If the login is successful, then sets the isLoading
    * state to false after 1.5 seconds and alerts the user that the login was successful.
    * @param {Event} e - The form submission event.
    */
   /*******  b9716c6a-a462-44c4-bb81-6ed24eea91f9  *******/
   const handleSubmit = async (e) => {
      e.preventDefault();
      // const newErrors = validateForm();

      // if (Object.keys(newErrors).length > 0) {
      //    setErrors(newErrors);
      //    return;
      // }

      try {
         setIsLoading(true);

         const res = await Axios.post("/auth/login", formData);
         if (res.data.status === true) {
            setIsLoading(false);
            Toaster(res.data.message);
            setLocalStorage("auth_token", res.data.token);
            window.location.href = "/";
         }
      } catch (error) {
         console.error(error);
         setIsLoading(false);
         if (
            error?.response &&
            error?.response?.data &&
            error?.response?.data?.status === false
         ) {
            Toaster(error?.response?.data?.message, null, "warning");
         } else {
            setErrors(error?.response?.data?.errors || {});
         }
      }
   };

   const form = {
      head_title: "Welcome Back & Login",
      head_title_bn: "আবার স্বাগতম লগইন করুন",
      head_title_hi: "फिर से स्वागत है लॉगिन करें",
      head_p: "Sign in to your account",
      head_p_bn: "আপনার অ্যাকাউন্টে সাইন ইন করুন",
      head_p_hi: "अपना एकाउंट में साइन इन करें",
      input_label_email: "Email",
      input_label_email_bn: "ইমেল",
      input_label_email_hi: "ईमेल",
      input_label_password: "Password",
      input_label_password_bn: "পাসওয়ার্ড",
      input_label_password_hi: "पासवर्ड",
      input_placeholder_email: "Enter your email",
      input_placeholder_email_bn: "আপনার ইমেল দিন",
      input_placeholder_email_hi: "अपना ईमेल दें",
      input_placeholder_password: "Enter your password",
      input_placeholder_password_bn: "আপনার পাসওয়ার্ড দিন",
      input_placeholder_password_hi: "अपना पासवर्ड दें",
      button_text: "Sign In",
      button_text_bn: "সাইন ইন",
      button_text_hi: "साइन इन करें",
      don_t_have_account: "Don't have an account?",
      don_t_have_account_bn: "কোন অ্যাকাউন্ট নেই?",
      don_t_have_account_hi: "कोई अकाउंट नहीं है?",
      sign_up: "Sign Up",
      sign_up_bn: "সাইন ইন",
      sign_up_hi: "साइन इन करें",
   };

   if (!pageLoading) return null;

   return (
      <Container className="d-flex align-items-center justify-content-center py-5">
         <Card className="w-100" style={{ maxWidth: "450px" }}>
            <Card.Body>
               <div className="text-center mb-4">
                  <h2>
                     {language === "en"
                        ? form?.head_title
                        : language === "hi"
                        ? form?.head_title_hi
                        : form?.head_title_bn}
                  </h2>
                  <p className="text-muted">
                     {language === "en"
                        ? form?.head_p
                        : language === "hi"
                        ? form?.head_p_hi
                        : form?.head_p_bn}
                  </p>
               </div>

               <Form onSubmit={handleSubmit}>
                  <Form.Group controlId="email" className="mb-3">
                     <Form.Label>
                        {language === "en"
                           ? form?.input_label_email
                           : language === "hi"
                           ? form?.input_label_email_hi
                           : form?.input_label_email_bn}
                     </Form.Label>
                     <Form.Control
                        type="email"
                        name="email"
                        placeholder={
                           language === "en"
                              ? form?.input_placeholder_email
                              : language === "hi"
                              ? form?.input_placeholder_email_hi
                              : form?.input_placeholder_email_bn
                        }
                        value={formData.email}
                        onChange={handleChange}
                        isInvalid={errors?.email && !!errors?.email}
                     />
                     <Form.Control.Feedback type="invalid">
                        {errors?.email && errors?.email}
                     </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group controlId="password" className="mb-3">
                     <Form.Label>
                        {language === "en"
                           ? form?.input_label_password
                           : language === "hi"
                           ? form?.input_label_password_hi
                           : form?.input_label_password_bn}
                     </Form.Label>
                     <Form.Control
                        type="password"
                        name="password"
                        placeholder={
                           language === "en"
                              ? form?.input_placeholder_password
                              : language === "hi"
                              ? form?.input_placeholder_password_hi
                              : form?.input_placeholder_password_bn
                        }
                        value={formData.password}
                        onChange={handleChange}
                        isInvalid={errors?.password && !!errors?.password}
                     />
                     <Form.Control.Feedback type="invalid">
                        {errors?.password && errors?.password}
                     </Form.Control.Feedback>
                  </Form.Group>

                  {/* <div className="d-flex justify-content-between align-items-center mb-3">
                     <Form.Check label="Remember me" />
                     <a href="#" className="small text-primary">
                        Forgot password?
                     </a>
                  </div> */}

                  <Button
                     variant="primary"
                     type="submit"
                     disabled={isLoading}
                     className="w-100"
                  >
                     {isLoading ? (
                        <>
                           <Spinner
                              as="span"
                              animation="border"
                              size="sm"
                              role="status"
                              aria-hidden="true"
                              className="me-2"
                           />
                           {language === "en"
                              ? form?.button_text
                              : language === "hi"
                              ? form?.button_text_hi
                              : form?.button_text_bn}
                           ...
                        </>
                     ) : (
                        <>
                           {language === "en"
                              ? form?.button_text
                              : language === "hi"
                              ? form?.button_text_hi
                              : form?.button_text_bn}
                        </>
                     )}
                  </Button>
               </Form>

               <div className="text-center mt-4">
                  <p className="text-muted">
                     {language === "en"
                        ? form?.don_t_have_account
                        : language === "hi"
                        ? form?.don_t_have_account_hi
                        : form?.don_t_have_account_bn}{" "}
                     <Link href="/sign-up" className="text-primary">
                        {language === "en"
                           ? form?.sign_up
                           : language === "hi"
                           ? form?.sign_up_hi
                           : form?.sign_up_bn}
                     </Link>
                  </p>
               </div>

               {/* <hr />

               <div className="text-center">
                  <p className="text-muted mb-2">Or continue with</p>
                  <Row className="gx-2">
                     <Col>
                        <Button variant="outline-secondary" className="w-100">
                           Google
                        </Button>
                     </Col>
                     <Col>
                        <Button variant="outline-secondary" className="w-100">
                           GitHub
                        </Button>
                     </Col>
                  </Row>
               </div> */}
            </Card.Body>
         </Card>
      </Container>
   );
}
