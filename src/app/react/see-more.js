export const getSeeMore = (lang) => {
   let text = "";
   if (lang === "en") {
      text = "See more";
   } else if (lang === "hi") {
      text = "और";
   } else {
      text = "আরো";
   }
   return text;
};
