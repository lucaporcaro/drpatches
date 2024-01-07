export function capitalizeWords(str: string): string {
  // Split the string into an array of words
  let words: string | string[];

  if (str.includes("_")) {
    words = str.split("_");
  } else {
    words = str.split(" ");
  }

  // Capitalize the first character of each word
  let capitalizedWords = words.map((word) => {
    return word.charAt(0).toUpperCase() + word.slice(1);
  });

  // Join the capitalized words back into a string
  let capitalizedStr = capitalizedWords.join(" ");

  return capitalizedStr;
}
