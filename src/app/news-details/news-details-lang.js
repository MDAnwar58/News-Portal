export const newsDetailsLang = (lang) => {
   return {
      home_btn_title: lang === "en" ? "Home" : lang === "hi" ? "होम" : "হোম",
      post_title:
         lang === "en"
            ? "Posted by"
            : lang === "hi"
            ? "पोस्ट किया गया"
            : "পোস্ট কররেছেন",
      read: lang === "en" ? "Read" : lang === "hi" ? "पড़ें" : "পড়ুন",
      tags: lang === "en" ? "Tags" : lang === "hi" ? " टैग समूह" : "ট্যাগসমুহ",
      share_title:
         lang === "en"
            ? "Share the news"
            : lang === "hi"
            ? "ख़बर साझा करें"
            : "খবর শেয়ার করুন",
      review_title:
         lang === "en"
            ? "You must log in first to give a review."
            : lang === "hi"
            ? "रिव्यू देने के लिए पहले लॉग इन करना होगा।"
            : "রিভিউ দেওয়ার জন্য আগে লগ ইন করতে হবে",
      login_link_name:
         lang === "en"
            ? "Login page"
            : lang === "hi"
            ? "लॉगिन पेज"
            : "লগ ইন পেজ",
      related_news_title:
         lang === "en"
            ? "Related News"
            : lang === "hi"
            ? "संबंधित समाचार"
            : "সম্পর্কিত খবর",
   };
};
