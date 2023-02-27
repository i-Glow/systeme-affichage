export default function isArabic(text: string): boolean {
    // Regular expression to match Arabic Unicode characters
    var arabicRegex = /[\u0600-\u06FF]/;
  
    // Check if the text contains any Arabic characters
    return arabicRegex.test(text);
  }
