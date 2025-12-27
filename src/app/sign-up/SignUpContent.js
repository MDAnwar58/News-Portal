"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Container, Form, Button, Card, Spinner } from "react-bootstrap";
import Axios from "../react/axios";
import axios from "axios";
import { useLanguage } from "../react/GlobalFragment";
import { Toaster } from "../react/toaster";
import { setLocalStorage } from "../react/local-storage";

export default function SignUpContent() {
   const { language } = useLanguage();
   const [formData, setFormData] = useState({
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
   });
   const [errors, setErrors] = useState({});
   const [isLoading, setIsLoading] = useState(false);
   const [csrfToken, setCsrfToken] = useState("");

   const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData((prev) => ({
         ...prev,
         [name]: value,
      }));

      if (errors[name]) {
         setErrors((prev) => ({
            ...prev,
            [name]: "",
         }));
      }
   };

   const validateForm = () => {
      const newErrors = {};

      if (!formData.name) {
         newErrors.name = "Name is required";
      }

      if (!formData.email) {
         newErrors.email = "Email is required";
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
         newErrors.email = "Email is invalid";
      }

      if (!formData.password) {
         newErrors.password = "Password is required";
      } else if (formData.password.length < 6) {
         newErrors.password = "Password must be at least 6 characters";
      }

      if (!formData.confirmPassword) {
         newErrors.confirmPassword = "Confirm password is required";
      } else if (formData.confirmPassword !== formData.password) {
         newErrors.confirmPassword = "Passwords do not match";
      }

      return newErrors;
   };

   const handleSubmit = async (e) => {
      e.preventDefault();
      try {
         setErrors({});
         setIsLoading(true);
         const payload = {
            name: formData.name,
            email: formData.email,
            password: formData.password,
            password_confirmation: formData.confirmPassword,
         };
         const res = await axios.post(
            "https://news.nweightloss.shop/api/auth/register",
            payload,
            {
               headers: {
                  "Content-Type": "application/json",
               },
               withCredentials: true, // ✅ send cookies
               xsrfCookieName: "XSRF-TOKEN", // ✅ Laravel's default
               xsrfHeaderName: "X-XSRF-TOKEN",
            }
         );
         if (res.data.status === true) {
            setIsLoading(false);
            Toaster(res.data.message);
            setLocalStorage("auth_token", res.data.token);
            window.location.href = "/";
         }
      } catch (error) {
         setErrors(error.response.data.errors);
         setIsLoading(false);
      }
   };

   const signUpForm = {
      head_title: "Create an Account",
      head_title_bn: "অ্যাকাউন্ট তৈরি করুন",
      head_title_hi: "एक एकाउंट बनाएँ",
      head_p: "Sign up to get started",
      head_p_bn: "অ্যাকাউন্ট খুলতে সাইন আপ করুন",
      head_p_hi: "खाता खोलने के लिए साइन अप करें",
      input_name: "Full Name",
      input_name_bn: "সম্পূর্ণ নাম",
      input_name_hi: "पूरा नाम",
      input_placeholder: "Enter your full name",
      input_placeholder_bn: "আপনার সম্পূর্ণ পূরা নাম টাইপ করুন",
      input_placeholder_hi: "अपना पूरा नाम टाइप करें",
      input_email: "Email",
      input_email_bn: "ইমেল",
      input_email_hi: "ईमेल",
      input_placeholder_email: "Enter your email",
      input_placeholder_email_bn: "আপনার ইমেল টাইপ করুন",
      input_placeholder_email_hi: "अपना ईमेल टाइप करें",
      input_password: "Password",
      input_password_bn: "পাসওয়ার্ড",
      input_password_hi: "पासवर्ड",
      input_placeholder_password: "Enter your password",
      input_placeholder_password_bn: "আপনার পাসওয়ার্ড টাইপ করুন",
      input_placeholder_password_hi: "अपना पासवर्ड टाइप करें",
      input_confirm_password: "Confirm Password",
      input_confirm_password_bn: "পাসওয়ার্ড নিশ্চিত করুন",
      input_confirm_password_hi: "पासवर्ड की पुष्टि करें",
      input_placeholder_confirm_password: "Confirm your password",
      input_placeholder_confirm_password_bn: "আপনার পাসওয়ার্ড নিশ্চিত করুন",
      input_placeholder_confirm_password_hi: "अपना पासवर्ड की पुष्टि करें",
      submit: "Sign Up",
      submit_bn: "সাইন আপ করুন",
      submit_hi: "साइन अप करें",
      already_have_an_account: "Already have an account?",
      already_have_an_account_bn: "একটি অ্যাকাউন্ট আছে?",
      already_have_an_account_hi: "एक अकाउंट है?",
      sign_in: "Sign In",
      sign_in_bn: "সাইন ইন করুন",
      sign_in_hi: "साइन इन करें",
   };

   return (
      <Container className="d-flex align-items-center justify-content-center py-5">
         <Card className="w-100" style={{ maxWidth: "450px" }}>
            <Card.Body>
               <div className="text-center mb-4">
                  <h2>
                     {" "}
                     {language === "en"
                        ? signUpForm?.head_title
                        : language === "hi"
                        ? signUpForm?.head_title_hi
                        : signUpForm?.head_title_bn}
                  </h2>
                  <p className="text-muted">
                     {language === "en"
                        ? signUpForm?.head_p
                        : language === "hi"
                        ? signUpForm?.head_p_hi
                        : signUpForm?.head_p_bn}
                  </p>
               </div>

               <Form onSubmit={handleSubmit}>
                  <Form.Group controlId="name" className="mb-3">
                     <Form.Label>
                        {language === "en"
                           ? signUpForm?.input_name
                           : language === "hi"
                           ? signUpForm?.input_name_hi
                           : signUpForm?.input_name_bn}
                     </Form.Label>
                     <Form.Control
                        type="text"
                        name="name"
                        placeholder={
                           language === "en"
                              ? signUpForm?.input_placeholder
                              : language === "hi"
                              ? signUpForm?.input_placeholder_hi
                              : signUpForm?.input_placeholder_bn
                        }
                        value={formData.name}
                        onChange={handleChange}
                        isInvalid={!!errors.name}
                     />
                     <Form.Control.Feedback type="invalid">
                        {errors.name}
                     </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group controlId="email" className="mb-3">
                     <Form.Label>
                        {language === "en"
                           ? signUpForm?.input_email
                           : language === "hi"
                           ? signUpForm?.input_email_hi
                           : signUpForm?.input_email_bn}
                     </Form.Label>
                     <Form.Control
                        type="email"
                        name="email"
                        placeholder={
                           language === "en"
                              ? signUpForm?.input_placeholder_email
                              : language === "hi"
                              ? signUpForm?.input_placeholder_email_hi
                              : signUpForm?.input_placeholder_email_bn
                        }
                        value={formData.email}
                        onChange={handleChange}
                        isInvalid={!!errors.email}
                     />
                     <Form.Control.Feedback type="invalid">
                        {errors.email}
                     </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group controlId="password" className="mb-3">
                     <Form.Label>
                        {language === "en"
                           ? signUpForm?.input_password
                           : language === "hi"
                           ? signUpForm?.input_password_hi
                           : signUpForm?.input_password_bn}
                     </Form.Label>
                     <Form.Control
                        type="password"
                        name="password"
                        placeholder={
                           language === "en"
                              ? signUpForm?.input_placeholder_password
                              : language === "hi"
                              ? signUpForm?.input_placeholder_password_hi
                              : signUpForm?.input_placeholder_password_bn
                        }
                        value={formData.password}
                        onChange={handleChange}
                        isInvalid={!!errors.password}
                     />
                     <Form.Control.Feedback type="invalid">
                        {errors.password}
                     </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group controlId="confirmPassword" className="mb-3">
                     <Form.Label>
                        {language === "en"
                           ? signUpForm?.input_confirm_password
                           : language === "hi"
                           ? signUpForm?.input_confirm_password_hi
                           : signUpForm?.input_confirm_password_bn}
                     </Form.Label>
                     <Form.Control
                        type="password"
                        name="confirmPassword"
                        placeholder={
                           language === "en"
                              ? signUpForm?.input_placeholder_confirm_password
                              : language === "hi"
                              ? signUpForm?.input_placeholder_confirm_password_hi
                              : signUpForm?.input_placeholder_confirm_password_bn
                        }
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        isInvalid={!!errors.confirmPassword}
                     />
                     <Form.Control.Feedback type="invalid">
                        {errors.confirmPassword}
                     </Form.Control.Feedback>
                  </Form.Group>

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
                              ? signUpForm?.submit
                              : language === "hi"
                              ? signUpForm?.submit_hi
                              : signUpForm?.submit_bn}
                           ...
                        </>
                     ) : (
                        <>
                           {language === "en"
                              ? signUpForm?.submit
                              : language === "hi"
                              ? signUpForm?.submit_hi
                              : signUpForm?.submit_bn}
                        </>
                     )}
                  </Button>
               </Form>

               <div className="text-center mt-4">
                  <p className="text-muted">
                     {language === "en"
                        ? signUpForm?.already_have_an_account
                        : language === "hi"
                        ? signUpForm?.already_have_an_account_hi
                        : signUpForm?.already_have_an_account_bn}{" "}
                     <Link href="/sign-in" className="text-primary">
                        {language === "en"
                           ? signUpForm?.sign_in
                           : language === "hi"
                           ? signUpForm?.sign_in_hi
                           : signUpForm?.sign_in_bn}
                     </Link>
                  </p>
               </div>

               {/* <hr />

               <div className="text-center">
                  <p className="text-muted mb-2">Or sign up with</p>
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
