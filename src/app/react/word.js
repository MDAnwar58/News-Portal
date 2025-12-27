export function getWordLimit(text, limit = 3) {
   if (text) {
      const truncated =
         text.length > limit ? text.slice(0, limit) + "..." : text;
      return truncated;
   } else {
      return null;
   }
}
