// utils/banglaDate.js
export const toDigits = (number, lang) => {
   const enDigits = "0123456789";
   let digits = "";
   if (lang === "bn") {
      digits = "০১২৩৪৫৬৭৮৯";
   } else {
      digits = "०१२३४५६७८९";
   }
   return number
      .toString()
      .replace(/[0-9]/g, (d) => digits[enDigits.indexOf(d)]);
};
const toHindiDigits = (number) => {
   const enDigits = "0123456789";
   const hiDigits = "०१२३४५६७८९";
   return number
      .toString()
      .replace(/[0-9]/g, (d) => hiDigits[enDigits.indexOf(d)]);
};

const banglaMonths = [
   "জানু", // জানুয়ারি
   "ফেব্রু", // ফেব্রুয়ারি
   "মার্চ",
   "এপ্রি", // এপ্রিল
   "মে",
   "জুন",
   "জুলা", // জুলাই
   "আগস", // আগস্ট
   "সেপ্টে", // সেপ্টেম্বর
   "অক্টো", // অক্টোবর
   "নভে", // নভেম্বর
   "ডিসে", // ডিসেম্বর
];

// months name in hindi
const hindiMonths = [
   "जनवरी", // January
   "फरवरी", // February
   "मार्च", // March
   "अप्रैल", // April
   "मई", // May
   "जून", // June
   "जुलाई", // July
   "अगस्त", // August
   "सितंबर", // September
   "अक्टूबर", // October
   "नवंबर", // November
   "दिसंबर", // December
];
const englishMonths = [
   "Jan",
   "Feb",
   "Mar",
   "Apr",
   "May",
   "Jun",
   "Jul",
   "Aug",
   "Sep",
   "Oct",
   "Nov",
   "Dec",
];

export const getCurrentDate = (lang) => {
   const today = new Date();
   if (lang === "en") {
      return `${today.getDate()}-${
         englishMonths[today.getMonth()]
      }-${today.getFullYear()}`;
   } else if (lang === "hi") {
      const day = toDigits(today.getDate(), "hi");
      const month = hindiMonths[today.getMonth()];
      const year = toDigits(today.getFullYear(), "hi");
      return `${day}-${month}-${year}`;
   } else {
      const day = toDigits(today.getDate(), "bn");
      const month = banglaMonths[today.getMonth()];
      const year = toDigits(today.getFullYear(), "bn");
      return `${day}-${month}-${year}`;
   }
};
