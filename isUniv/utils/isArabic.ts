/*eslint-disable prettier/prettier*/

export default function isArabic(text: string): boolean {
  // Regular expressions to match Arabic  Unicode characters
  var arabicRegex = /[\u0600-\u06FF]/;

  // Check if the text contains any Arabic or French characters
  return arabicRegex.test(text);
}
